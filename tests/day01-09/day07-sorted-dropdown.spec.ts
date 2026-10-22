/*
 * Playwright with TypeScript | Session 7: Handle Dropdowns | Select Options (Part 1)
 * File   : day07-sorted-dropdown.spec.ts
 * Topic  : Verify dropdown options are sorted
 *
 * #animals : sorted     -> test passes
 * #colors  : NOT sorted -> Red, Blue, Green, Yellow, Red, White, Green
 *
 * Run    : npx playwright test day07-sorted-dropdown.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Verify dropdown is sorted', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropDownOptions: Locator = page.locator('#animals > option');
    // const dropDownOptions: Locator = page.locator('#colors > option');   // not sorted, test fails

    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());

    const originalList: string[] = [...optionsText];          // copy (spread operator)
    const sortedList: string[] = [...optionsText].sort();     // sort() changes the array, so sort a copy

    console.log('Original list:', originalList);
    console.log('Sorted list  :', sortedList);

    // The session only printed both lists; this assertion completes the check.
    // Use toEqual (compares contents), not toBe (compares array references).
    expect(originalList).toEqual(sortedList);
});
