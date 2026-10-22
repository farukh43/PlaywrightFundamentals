/*
 * Playwright with TypeScript | Session 2: Playwright Built-In Locators
 * File   : day02-get-by-label-and-placeholder.spec.ts
 * Topic  : 4) page.getByLabel()   5) page.getByPlaceholder()
 *
 * Run    : npx playwright test day02-get-by-label-and-placeholder.spec.ts --project=chromium --headed
 */

import { test, expect } from '@playwright/test';

test('4. getByLabel: locate form control by its label text', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/register');

    // Ideal for form fields with visible labels: <label for="FirstName">First name:</label>
    // page.getByLabel('First name:').type('John');   // type() is DEPRECATED
    await page.getByLabel('First name:').fill('John');
    await page.getByLabel('Last name:').fill('Kenedy');
    await page.getByLabel('Email:').fill('abc@gmail.com');

    await expect(page.getByLabel('First name:')).toHaveValue('John');

    // Need key-by-key typing (e.g. autocomplete)? Use pressSequentially() instead of type()
    // await page.getByLabel('First name:').pressSequentially('John', { delay: 100 });
});

test('5. getByPlaceholder: locate input by placeholder text', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');

    // Best for inputs WITHOUT a label but WITH a placeholder:
    // <input type="text" placeholder="Search store">
    await page.getByPlaceholder('Search store').fill('Apple MacBook Pro');
    await expect(page.getByPlaceholder('Search store')).toHaveValue('Apple MacBook Pro');
});
