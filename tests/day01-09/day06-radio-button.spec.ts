/*
 * Playwright with TypeScript | Session 6: Playwright Actions (Handling HTML Elements)
 * File   : day06-radio-button.spec.ts
 * Topic  : Radio Button
 *
 * Run    : npx playwright test day06-radio-button.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Radio Button Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const maleRadio: Locator = page.locator('#male');   // Male radio button

    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);    // returns boolean, checked once

    await maleRadio.check();                            // select radio button
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked();              // preferable: web-first, auto-retry

    // Selecting another radio in the same group unselects Male
    await page.locator('#female').check();
    await expect(maleRadio).not.toBeChecked();

    // NOTE: maleRadio.uncheck() throws an error: a radio cannot be unchecked directly,
    // only by selecting another option in the same group.
});
