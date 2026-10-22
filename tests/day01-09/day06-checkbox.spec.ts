/*
 * Playwright with TypeScript | Session 6: Playwright Actions (Handling HTML Elements)
 * File   : day06-checkbox.spec.ts
 * Topic  : Checkboxes: single, all, last 3, toggle, by index, by label
 *
 * Run    : npx playwright test day06-checkbox.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
});

test('1. Select a specific checkbox using getByLabel', async ({ page }) => {
    const sundayCheckbox: Locator = page.getByLabel('Sunday');
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
});

test('2 to 5. All checkboxes: check all, uncheck last 3, toggle', async ({ page }) => {
    // 2. Build an array of locators, one per day
    const checkboxes: Locator[] = days.map(day => page.getByLabel(day));
    expect(checkboxes.length).toBe(7);                  // plain array length, no await

    // 3. Check all and assert
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    // 4. Uncheck last 3 (Thursday, Friday, Saturday)
    //    NOTE: the session first wrote check() here by mistake; uncheck() is correct.
    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    // 5. Toggle: if checked, uncheck; if unchecked, check
    for (const checkbox of checkboxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    // After toggling: Sun to Wed unchecked, Thu to Sat checked
    await expect(checkboxes[0]).not.toBeChecked();
    await expect(checkboxes[6]).toBeChecked();
});

test('6. Select checkboxes by index', async ({ page }) => {
    const checkboxes: Locator[] = days.map(day => page.getByLabel(day));
    const indexes: number[] = [1, 3, 6];                // 0 based: Monday, Wednesday, Saturday

    for (const i of indexes) {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }
});

test('7. Select a checkbox based on the label text', async ({ page }) => {
    const weekName: string = 'Friday';

    for (const label of days) {
        if (label.toLowerCase() === weekName.toLowerCase()) {
            const checkbox: Locator = page.getByLabel(label);
            await checkbox.check();                     // NOTE: the session missed await here
            await expect(checkbox).toBeChecked();
        }
    }
});
