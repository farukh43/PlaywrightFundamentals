/*
 * Playwright with TypeScript | Session 7: Handle Dropdowns | Select Options (Part 1)
 * File   : day07-single-select-dropdown.spec.ts
 * Topic  : Single select dropdown (<select id="country">)
 *
 * Run    : npx playwright test day07-single-select-dropdown.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Single Select Drop down', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const country: Locator = page.locator('#country');

    // 1) Select an option (4 ways)
    await country.selectOption('India');                  // visible text (or value)
    await expect(country).toHaveValue('india');           // verify: value attribute of the selected option
    await country.selectOption({ value: 'uk' });          // by value attribute
    await country.selectOption({ label: 'India' });       // by label (visible text)
    await country.selectOption({ index: 3 });             // by index (0 based)

    // 2) Check number of options
    const dropdownOptions: Locator = page.locator('#country > option');
    await expect(dropdownOptions).toHaveCount(10);

    // 3) Check an option is present
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(optionsText);
    expect(optionsText).toContain('Japan');               // array contains 'Japan'

    // 4) Print options
    for (const option of optionsText) {
        console.log(option);
    }
});
