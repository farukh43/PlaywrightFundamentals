/*
 * Playwright with TypeScript | Session 2: Playwright Built-In Locators
 * File   : day02-get-by-role.spec.ts
 * Topic  : 3) page.getByRole()
 *
 * Run    : npx playwright test day02-get-by-role.spec.ts --project=chromium --headed
 *
 * Role is NOT an HTML attribute. It is the ARIA role (W3C spec) that the browser
 * assigns to an element, e.g. <a href> = link, <button> = button, <h1>..<h6> = heading.
 * Prefer getByRole for interactive elements: buttons, checkboxes, links, lists, headings, tables.
 */

import { test, expect } from '@playwright/test';

test('3. getByRole: locate by ARIA role and accessible name', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');

    // <a href="/register">Register</a>  -> role "link", name "Register"
    await page.getByRole('link', { name: 'Register' }).click();

    // <h1>Register</h1>  -> role "heading"
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    // You can also use: await expect(page.getByText('Register')).toBeVisible();

    // Useful extra options
    await expect(page.getByRole('heading', { name: 'Register', exact: true, level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
});
