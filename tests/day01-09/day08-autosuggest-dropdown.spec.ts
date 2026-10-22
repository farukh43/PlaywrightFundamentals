/*
 * Playwright with TypeScript | Session 8: Handle Dropdowns (Part 2)
 * File   : day08-autosuggest-dropdown.spec.ts
 * Topic  : Dynamic / Auto suggest dropdown (options change as you type)
 *
 * Run    : npx playwright test day08-autosuggest-dropdown.spec.ts --project=chromium --headed
 *
 * 3 types of dropdowns:
 *   1. Static dropdown      : <select> tag                  -> selectOption()  (Session 7)
 *   2. Dynamic/Auto suggest : options keep changing as you type
 *   3. Hidden dropdown      : options exist in DOM only while the list is open
 *
 * Inspecting suggestions: they vanish when DevTools takes focus. In DevTools press
 * Ctrl+Shift+P, type "Emulate a focused page", then inspect the list.
 */

import { test, expect, Locator } from '@playwright/test';

test('Autosuggest dropdown', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');

    await page.locator("input[name='q']").fill('smart');      // search text

    // Session used page.waitForTimeout(5000). Better: wait until the first suggestion appears.
    const options: Locator = page.locator('ul > li');
    await expect(options.first()).toBeVisible();

    const count: number = await options.count();
    console.log('Number of suggested options:', count);
    expect(count).toBeGreaterThan(0);

    // nth() is 0 based, so nth(5) is the 6th option (the session comment said "5th")
    console.log('6th option:', await options.nth(5).innerText());

    console.log('Printing all the auto suggestions.....');
    for (let i = 0; i < count; i++) {
        // innerText(): visible rendered text | textContent(): all text, including hidden
        console.log(await options.nth(i).textContent());
    }

    // Select a suggestion that contains a given text
    await options.filter({ hasText: 'smartphone' }).first().click();
});
