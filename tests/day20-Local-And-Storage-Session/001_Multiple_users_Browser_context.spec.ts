/*

Browser
│
├── Admin Context
│   └── Admin Page
│
└── testUser Context
    └── testUser Page


* The two contexts are completely isolated.

*/

import { test, expect } from '@playwright/test';

test('Login as Admin and testUser using separate browser contexts', async ({ browser }) => {

    // Create Admin context
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();

    // Login as Admin

    await adminPage.goto("https://opensource-demo.orangehrmlive.com/");
    await adminPage.locator('input[name="username"]').fill('Admin');
    await adminPage.locator('input[name="password"]').fill('admin123');
    await adminPage.locator('button[type="submit"]').click();


    // Create testUser context without logging out Admin
    const testUserContext = await browser.newContext();
    const testUserPage = await testUserContext.newPage();

    // Login as testUser
    await testUserPage.goto("https://opensource-demo.orangehrmlive.com/");
    await testUserPage.locator('input[name="username"]').fill('Testuser');
    await testUserPage.locator('input[name="password"]').fill('Test@123');
    await testUserPage.locator('button[type="submit"]').click();


    // Both users can now be used independently

    //Admin

    //await expect(adminPage.locator('.oxd-userdropdown-name')).toHaveText('John Doe')
    await expect(adminPage.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(adminPage.getByRole('link', { name: 'PIM' })).toBeVisible();


    //Test User

    //await expect(testUserPage.locator('.oxd-userdropdown-name')).toHaveText('Test User')
    await expect(testUserPage.getByRole('link', { name: 'Admin' })).not.toBeVisible();
    await expect(testUserPage.getByRole('link', { name: 'PIM' })).not.toBeVisible();


    // Continue testing both users independently

    await adminContext.close();
    await testUserContext.close();
});