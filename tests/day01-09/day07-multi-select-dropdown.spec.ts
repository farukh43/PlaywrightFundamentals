/*
 * Playwright with TypeScript | Session 7: Handle Dropdowns | Select Options (Part 1)
 * File   : day07-multi-select-dropdown.spec.ts
 * Topic  : Multi select dropdown (<select id="colors" multiple>)
 *
 * Run    : npx playwright test day07-multi-select-dropdown.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Multi Select Drop down', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const colors: Locator = page.locator('#colors');

    // 1) Select multiple options: pass an ARRAY (4 ways)
    await colors.selectOption(['Red', 'Blue', 'Green']);                                   // visible text
    await colors.selectOption(['red', 'green', 'white']);                                  // value attribute
    await colors.selectOption([{ label: 'Red' }, { label: 'Green' }, { label: 'Yellow' }]); // label
    await colors.selectOption([{ index: 0 }, { index: 2 }, { index: 4 }]);                 // index

    // Each call REPLACES the previous selection. Verify the current one:
    await colors.selectOption(['Red', 'Blue']);
    await expect(colors).toHaveValues(['red', 'blue']);

    // 2) Check number of options
    const dropdownOptions: Locator = page.locator('#colors > option');
    await expect(dropdownOptions).toHaveCount(7);

    // 3) Check an option is present
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(optionsText);
    expect(optionsText).toContain('Green');

    // 4) Print options
    for (const option of optionsText) {
        console.log(option);
    }
});
