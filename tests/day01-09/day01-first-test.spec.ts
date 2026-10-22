/*
 * Playwright with TypeScript | Session 1: Setup Environment and Writing Tests
 * File   : day01-first-test.spec.ts
 * Topic  : First Playwright test, verify page title and URL
 *
 * Run (headless, all browsers) : npx playwright test day01-first-test.spec.ts
 * Run (headed, Chromium only)  : npx playwright test day01-first-test.spec.ts --project=chromium --headed
 * Run by title                 : npx playwright test -g "Verify page title"
 * Debug                        : npx playwright test day01-first-test.spec.ts --debug
 * Open HTML report             : npx playwright show-report
 */

import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    await page.goto('https://example.com');

    // page.title() returns Promise<string>, so it must be awaited
    const title: string = await page.title();
    console.log('Page title is:', title);

    // Option 1: plain assertion on a string value (checked once)
    expect(title).toBe('Example Domain');

    // Option 2: web-first assertion on the page (auto-retries until timeout)
    await expect(page).toHaveTitle('Example Domain');

    // NOTE: The session slide used expect(title).toHaveURL('Example Domain').
    // That is incorrect: toHaveURL() checks the page URL and is used on page, not on a string.
});

test('Verify page URL', async ({ page }) => {
    await page.goto('https://example.com');

    // page.url() is synchronous: it returns a string directly (no await needed)
    const url: string = page.url();
    console.log('Page URL is:', url);

    expect(url).toContain('example.com');
    await expect(page).toHaveURL('https://example.com/');
});
