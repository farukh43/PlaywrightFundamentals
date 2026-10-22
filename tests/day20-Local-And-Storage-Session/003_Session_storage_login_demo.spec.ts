import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Login using Saved Session Storage', async ({ browser }) => {

    // =========================
    // Login as Admin
    // =========================

    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    // Read Session Storage from file
    const adminSessionStorageData = JSON.parse(fs.readFileSync('./storage_data/admin_session_data.json', 'utf8'));

    //set session storage
    /* await context.addInitScript((storage) => {
        Object.keys(storage).forEach(key => {
            sessionStorage.setItem(key, storage[key]);
        });
    }, sessionStorageData);
   */

    //or using loop 
    await adminContext.addInitScript((storage) => {
        for (const key in storage) {
            sessionStorage.setItem(key, storage[key]);
        }
    }, adminSessionStorageData);

    console.log('Session Storage restored successfully.');

    await adminPage.goto('https://sdetqa.vercel.app/login_app');
    await expect(adminPage.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
    await expect(adminPage.locator('#displayUser')).toContainText('admin');

    console.log('Login as Admin successful using Session storage.');

    //------------


    // =========================
    // Login as Test User
    // =========================

    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();

    // Read Session Storage from file
    const userSessionStorageData = JSON.parse(fs.readFileSync('./storage_data/user_session_data.json', 'utf8'));

    // Using loop to set session storage
    await userContext.addInitScript((storage) => {
        for (const key in storage) {
            sessionStorage.setItem(key, storage[key]);
        }
    }, userSessionStorageData);

    console.log('Session Storage restored successfully.');


    await userPage.goto('https://sdetqa.vercel.app/login_app');
    await expect(userPage.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
    await expect(userPage.locator('#displayUser')).toContainText('testuser');

    console.log('Login as Test User successful using Session storage.');

    // Close both contexts
    await adminContext.close();
    await userContext.close();

});