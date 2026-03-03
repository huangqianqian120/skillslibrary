#!/usr/bin/env node
/**
 * 小红书登录脚本 - 使用已安装的浏览器
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const COOKIES_FILE = path.join(DATA_DIR, 'xiaohongshu_cookies.json');

// 使用已安装的浏览器路径
const CHROMIUM_PATH = '/Users/huangqianqian/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium';

async function login() {
    console.log('🏛️ 小红书自动化 - 首次登录\n');
    console.log('📱 请用手机扫码登录...\n');
    
    const browser = await chromium.launch({
        headless: false,
        executablePath: CHROMIUM_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
    
    const page = await context.newPage();
    
    try {
        await page.goto('https://www.xiaohongshu.com', { waitUntil: 'networkidle', timeout: 30000 });
        
        console.log('📱 请扫码登录...');
        console.log('⏰ 等待 60 秒...\n');
        
        await page.waitForTimeout(60000);
        
        const userAvatar = await page.locator('div[data-testid="user-avatar"]').isVisible().catch(() => false);
        
        if (userAvatar) {
            console.log('✅ 登录成功！');
            
            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }
            
            const cookies = await context.cookies();
            fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies, null, 2));
            console.log(`💾 Cookies 已保存`);
        } else {
            console.log('⚠️ 未检测到登录');
            await page.waitForTimeout(30000);
        }
        
        console.log('\n🎉 完成！');
        
    } catch (error) {
        console.error('❌ 错误:', error.message);
    } finally {
        await browser.close();
    }
}

login().catch(console.error);
