#!/usr/bin/env node
/**
 * 连接到已打开的 Chrome，保存 cookies
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const COOKIES_FILE = path.join(DATA_DIR, 'xiaohongshu_cookies.json');

async function connectAndSave() {
    console.log('🔗 连接到已打开的 Chrome...\n');
    
    try {
        // 连接到已打开的 Chrome（使用调试端口）
        const browser = await chromium.connectOverCDP({
            endpointURL: 'http://localhost:9222' // Chrome 调试端口
        });
        
        console.log('✅ 已连接到 Chrome');
        
        // 获取所有上下文
        const contexts = browser.contexts();
        
        if (contexts.length === 0) {
            console.log('⚠️ 没有找到浏览器上下文');
            await browser.close();
            return;
        }
        
        // 获取 cookies
        const cookies = await contexts[0].cookies();
        
        if (cookies.length === 0) {
            console.log('⚠️ 没有找到 cookies');
            console.log('💡 请确保在小红书网页版已登录');
        } else {
            console.log(`✅ 找到 ${cookies.length} 个 cookies`);
            
            // 保存 cookies
            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }
            
            fs.writeFileSync(COOKIES_FILE, JSON.stringify(cookies, null, 2));
            console.log(`💾 Cookies 已保存到: ${COOKIES_FILE}`);
        }
        
        await browser.close();
        console.log('\n🎉 完成！');
        
    } catch (error) {
        console.error('❌ 连接失败:', error.message);
        console.log('\n💡 请先开启 Chrome 调试模式：');
        console.log('   关闭所有 Chrome 窗口，然后运行：');
        console.log('   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222');
    }
}

connectAndSave().catch(console.error);
