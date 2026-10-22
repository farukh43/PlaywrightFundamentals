/*
 * Playwright with TypeScript | Session 2: Playwright Built-In Locators
 * File   : day02-get-by-alt-text-and-text.spec.ts
 * Topic  : 1) page.getByAltText()   2) page.getByText()
 *
 * Run    : npx playwright test day02-get-by-alt-text-and-text.spec.ts --project=chromium --headed
 *
 * Locator : identifies an element on the page.
 * DOM     : Document Object Model, an API interface provided by the browser
 *           that represents the page as a tree of elements.
 */

import { test, expect, Locator } from '@playwright/test';

test('1. getByAltText: locate image by alt attribute', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');

    // Identifies images (and similar elements like <area>) by their alt text.
    const logo: Locator = page.getByAltText('nopCommerce demo store');
    await expect(logo).toBeVisible();

    // NOTE: The session code had logo.click(); without await.
    // click() returns a Promise, so it must be awaited:
    // await logo.click();
});

test('2. getByText: locate by visible text', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');

    // Best for NON interactive elements: div, span, p, etc.
    // For interactive elements (button, a, input) prefer getByRole().

    // Full text
    await expect(page.getByText('Welcome to our store')).toBeVisible();

    // Substring / partial text (default matching is case-insensitive substring)
    await expect(page.getByText('Welcome to')).toBeVisible();

    // Exact match (case-sensitive, whole string)
    await expect(page.getByText('Welcome to our store', { exact: true })).toBeVisible();

    // Regular expression: \s+ = one or more spaces, i = ignore case
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();
});
