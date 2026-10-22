/*
Browser
│
├── Admin Context
│   └── Admin Page
│       └── admin_data.json
│
└── TestUser Context
    └── TestUser Page
        └── user_data.json


*/


import { test, expect } from "@playwright/test";


// Loading saved session 
/*
test.use({
    storageState: './storage_data/data.json'
});
*/

test('Login as Admin and TestUser using separate storage states', async ({ browser }) => {

    // =========================
    // Login as Admin
    // =========================
    const adminContext = await browser.newContext({ storageState: './storage_data/admin_data.json' });

    const adminPage = await adminContext.newPage();

    await adminPage.goto('https://sdetqa.vercel.app/login_app');

    await expect(adminPage.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
    await expect(adminPage.locator('#displayUser')).toContainText('admin');

    console.log('Login as Admin successful using storage.');


    // =========================
    // Login as Test User
    // =========================
    const userContext = await browser.newContext({ storageState: './storage_data/user_data.json' });

    const userPage = await userContext.newPage();

    await userPage.goto('https://sdetqa.vercel.app/login_app');

    await expect(userPage.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
    await expect(userPage.locator('#displayUser')).toContainText('testuser');

    console.log('Login as Test User successful using storage.');


    // Close both contexts
    await adminContext.close();
    await userContext.close();
});