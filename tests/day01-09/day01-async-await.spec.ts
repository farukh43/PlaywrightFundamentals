/*
 * Playwright with TypeScript | Session 1: Setup Environment and Writing Tests
 * File   : day01-async-await.spec.ts
 * Topic  : Why Playwright tests use async and await
 *
 * Run    : npx playwright test day01-async-await.spec.ts --project=chromium
 *
 * async : declares a function that returns a Promise and allows await inside it
 * await : pauses execution until the Promise resolves
 */

import { test, expect } from '@playwright/test';

test('async and await demo', async ({ page }) => {
    // page.goto() returns a Promise: await waits until navigation finishes
    await page.goto('https://example.com');

    // WRONG: without await you get a pending Promise, not the title text
    const titlePromise: Promise<string> = page.title();
    console.log('Without await :', titlePromise);      // Promise { <pending> }

    // RIGHT: with await you get the actual value
    const title: string = await titlePromise;
    console.log('With await    :', title);             // Example Domain

    expect(title).toBe('Example Domain');
});

test('Promise returning vs synchronous APIs', async ({ page }) => {
    await page.goto('https://example.com');   // Promise<Response | null>  -> await
    const title = await page.title();         // Promise<string>           -> await
    const url = page.url();                   // string (synchronous)      -> no await

    console.log(`Title: ${title} | URL: ${url}`);
    await expect(page).toHaveTitle(title);    // web-first assertion       -> await
});
