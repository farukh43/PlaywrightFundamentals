// Cookies + Local Storage

import { chromium } from "playwright";

async function saveStorage(username: string, password: string, storageFile: string) {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login
    await page.goto('https://sdetqa.vercel.app/login_app');

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Select storage option
    //await page.getByLabel('🍪 Cookie').check();  // for Cookie storage
    await page.getByLabel('💾 Local').check(); // For local storage

    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForSelector('text=Dashboard Welcome', { state: 'visible' });

    // Save authentication state (Can store both Cookies and Local storage depends on availability from app)
    await context.storageState({ path: storageFile });

    console.log(`${username} authentication state saved successfully.`);

    await browser.close();
}


//Call the function for both users
saveStorage('admin', 'admin123', './storage_data/admin_data.json')
saveStorage('testuser', 'testuser123', './storage_data/user_data.json')