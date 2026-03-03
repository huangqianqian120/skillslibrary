/**
 * 小红书自动化 - 发布脚本
 * 
 * 功能：
 * - 浏览器自动化登录
 * - 发布笔记
 * 
 * 使用方法：
 * npx playwright test xhs-publish.spec.ts
 * 
 * 或者直接运行：
 * node xhs_publish.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// 配置
const CONFIG = {
    xiaohongshu: {
        url: 'https://www.xiaohongshu.com',
        loginUrl: 'https://www.xiaohongshu.com/explore',
        publishUrl: 'https://www.xiaohongshu.com/explore/publish'
    },
    cookiesFile: path.join(__dirname, '..', 'data', 'xiaohongshu_cookies.json'),
    headless: false // 开发时设为 false，自动化时设为 true
};

/**
 * 保存 cookies
 */
async function saveCookies(context, filePath) {
    const cookies = await context.cookies();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
    console.log('✅ Cookies 已保存');
}

/**
 * 加载 cookies
 */
async function loadCookies(context, filePath) {
    if (fs.existsSync(filePath)) {
        const cookies = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        await context.addCookies(cookies);
        console.log('✅ Cookies 已加载');
        return true;
    }
    return false;
}

/**
 * 登录流程
 */
async function login(page) {
    console.log('📱 请扫码登录...');
    
    // 等待登录完成
    await page.waitForURL('**/www.xiaohongshu.com**', { timeout: 120000 });
    
    // 检查是否登录成功
    const isLoggedIn = await page.locator('[data-testid="user-avatar"]').isVisible().catch(() => false);
    
    if (isLoggedIn) {
        console.log('✅ 登录成功！');
        return true;
    } else {
        console.log('⚠️ 等待登录...');
        await page.waitForTimeout(30000);
        return true;
    }
}

/**
 * 发布笔记
 */
async function publishNote(page, content) {
    const { title, body, images, tags } = content;
    
    // 前往发布页面
    await page.goto(CONFIG.xiaohongshu.publishUrl);
    await page.waitForLoadState('networkidle');
    
    // 上传图片
    if (images && images.length > 0) {
        const uploadBtn = await page.locator('[data-testid="upload-btn"]');
        await uploadBtn.click();
        
        // 选择文件
        const fileInput = await page.locator('input[type="file"]');
        for (const img of images) {
            await fileInput.setInputFiles(img);
        }
        
        // 等待上传
        await page.waitForTimeout(3000);
    }
    
    // 输入标题
    const titleInput = await page.locator('[data-testid="title-input"]');
    await titleInput.fill(title);
    
    // 输入正文
    const bodyInput = await page.locator('[data-testid="body-input"]');
    await bodyInput.fill(body);
    
    // 添加标签
    if (tags && tags.length > 0) {
        for (const tag of tags) {
            await page.locator('[data-testid="tag-input"]').fill(tag);
            await page.locator('[data-testid="tag-suggestion"]').first().click();
        }
    }
    
    // 发布
    const publishBtn = await page.locator('[data-testid="publish-btn"]');
    await publishBtn.click();
    
    // 等待发布完成
    await page.waitForTimeout(5000);
    
    return true;
}

/**
 * 搜索关键词
 */
async function searchKeyword(page, keyword) {
    await page.goto(`${CONFIG.xiaohongshu.url}/search?keyword=${encodeURIComponent(keyword)}`);
    await page.waitForLoadState('networkidle');
    
    // 获取搜索结果
    const notes = await page.locator('[data-testid="note-card"]').all();
    
    const results = [];
    for (const note of notes.slice(0, 10)) {
        const title = await note.locator('.title').textContent().catch(() => '');
        const likes = await note.locator('.likes').textContent().catch(() => '0');
        
        results.push({ title, likes });
    }
    
    return {
        keyword,
        count: results.length,
        notes: results
    };
}

/**
 * 主函数
 */
async function main() {
    console.log('🏛️ 小红书自动化助手启动...\n');
    
    const browser = await chromium.launch({ headless: CONFIG.headless });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        // 尝试加载 cookies
        const hasCookies = await loadCookies(context, CONFIG.cookiesFile);
        
        // 访问首页
        await page.goto(CONFIG.xiaohongshu.url);
        await page.waitForLoadState('networkidle');
        
        // 检查登录状态
        const isLoggedIn = await page.locator('[data-testid="user-avatar"]').isVisible().catch(() => false);
        
        if (!isLoggedIn && !hasCookies) {
            console.log('⚠️ 未登录，需要登录...');
            await login(page);
            await saveCookies(context, CONFIG.cookiesFile);
        } else if (hasCookies) {
            console.log('✅ 已登录');
        }
        
        // 测试搜索
        console.log('\n🔍 测试搜索功能...');
        const searchResults = await searchKeyword(page, '博物馆');
        console.log(`找到 ${searchResults.count} 篇笔记`);
        
        console.log('\n✅ 自动化脚本运行成功！');
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
    } finally {
        await browser.close();
    }
}

// 导出发布函数（供其他模块调用）
module.exports = {
    publishNote,
    searchKeyword,
    saveCookies,
    loadCookies
};

// 如果直接运行
if (require.main === module) {
    main().catch(console.error);
}
