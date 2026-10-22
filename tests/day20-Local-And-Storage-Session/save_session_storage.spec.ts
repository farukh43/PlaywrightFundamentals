import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function saveSessionStorage(username: string, password: string, storageFile: string) {
    const browser = await chromium.launch({ headless: false });

    // Create browser context
    const context = await browser.newContext();
    const page = await context.newPage();

    // Open application
    await page.goto('https://sdetqa.vercel.app/login_app.html');

    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Select Session Storage option
    await page.getByLabel('⏳ Session').check();

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForSelector('text=Dashboard Welcome', { state: 'visible' });

    // Read all Session Storage data
    const sessionStorageData = await page.evaluate(() => {
        return sessionStorage;
    });

    // Create storage_data folder if it doesn't exist
    const directory = path.dirname(storageFile);

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }


    // Save Session Storage to file
    fs.writeFileSync(storageFile, JSON.stringify(sessionStorageData)); // Save the session storage data to a file

    console.log('Session Storage saved successfully.');

    await browser.close();
}

//Call the function for both users
saveSessionStorage('admin', 'admin123', './storage_data/admin_session_data.json')
saveSessionStorage('testuser', 'testuser123', './storage_data/user_session_data.json')