/*
 * Playwright with TypeScript | Session 8: Handle Dropdowns (Part 2)
 * File   : day08-bootstrap-hidden-dropdown.spec.ts
 * Topic  : Bootstrap / hidden dropdown (div role="listbox", not a <select>)
 *
 * Run    : npx playwright test day08-bootstrap-hidden-dropdown.spec.ts --project=chromium --headed
 *
 * Options are added to the DOM only while the list is open and disappear on blur.
 * To inspect: DevTools, Ctrl+Shift+P, "Emulate a focused page".
 */

import { test, expect, Locator } from '@playwright/test';

test('Bootstrap hidden dropdown', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Login steps
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // Click on PIM
    await page.getByText('PIM').click();

    // Click on Job Title dropdown (3rd dropdown icon inside the form)
    await page.locator('form i').nth(2).click();

    // Capture all options and count (wait for the list instead of a hard wait)
    const options: Locator = page.locator("div[role='listbox'] span");
    await expect(options.first()).toBeVisible();

    const count: number = await options.count();
    console.log('Number of options in the dropdown:', count);

    // Print all options
    console.log('All the text contents:', await options.allTextContents());
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).textContent());
    }

    // Select / click an option. Text must match the app EXACTLY (check spelling in the list).
    const jobTitle: string = 'Automaton Tester';
    for (let i = 0; i < count; i++) {
        const text: string = await options.nth(i).innerText();
        if (text === jobTitle) {
            await options.nth(i).click();
            break;
        }
    }

    // Shorter alternative to the loop:
    // await options.filter({ hasText: jobTitle }).click();
    // await page.getByRole('option', { name: jobTitle }).click();

    // Verify the selected value is shown in the dropdown
    await expect(page.locator('form .oxd-select-text-input').nth(2)).toHaveText(jobTitle);
});
