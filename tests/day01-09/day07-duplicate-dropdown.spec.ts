/*
 * Playwright with TypeScript | Session 7: Handle Dropdowns | Select Options (Part 1)
 * File   : day07-duplicate-dropdown.spec.ts
 * Topic  : Verify dropdown has no duplicate options (using a Set)
 *
 * #colors  : has duplicates (Red, Green) -> assertion fails
 * #animals : no duplicates               -> assertion passes
 *
 * Run    : npx playwright test day07-duplicate-dropdown.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Verify dropdown contains duplicates', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropDownOptions: Locator = page.locator('#animals > option');     // no duplicates
    // const dropDownOptions: Locator = page.locator('#colors > option');   // has duplicates

    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());

    const mySet = new Set<string>();      // Set: duplicates NOT allowed
    const duplicates: string[] = [];      // array: duplicates allowed

    for (const text of optionsText) {
        if (mySet.has(text)) {
            duplicates.push(text);        // seen before, so it is a duplicate
        } else {
            mySet.add(text);
        }
    }

    console.log('Duplicate options are:', duplicates);

    if (duplicates.length > 0) {
        console.log('Duplicate options found.', duplicates);
    } else {
        console.log('No duplicate options found.');
    }

    expect(duplicates.length).toBe(0);
});
