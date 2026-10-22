/*
 * Playwright with TypeScript | Session 6: Playwright Actions (Handling HTML Elements)
 * File   : day06-text-input.spec.ts
 * Topic  : Text Input / Text Box / Input Box
 *
 * Run    : npx playwright test day06-text-input.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Text Input Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const textBox: Locator = page.locator('#name');

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    // getAttribute() returns string | null (null when the attribute does not exist)
    const maxLength: string | null = await textBox.getAttribute('maxlength');
    expect(maxLength).toBe('15');
    await expect(textBox).toHaveAttribute('maxlength', '15');     // web-first alternative

    await textBox.fill('John Candy');

    // textContent() returns EMPTY for <input>: typed text is its value, not inner text
    // console.log(await textBox.textContent());

    const enteredValue: string = await textBox.inputValue();      // reads the typed value
    console.log('Input value of the FirstName:', enteredValue);
    expect(enteredValue).toBe('John Candy');
    await expect(textBox).toHaveValue('John Candy');              // preferable (auto-retry)
});
