/*
 * Playwright with TypeScript | Session 3: XPath Locators
 * File   : day03-dynamic-elements.spec.ts
 * Topic  : Handling dynamic elements (START / STOP toggle button)
 *
 * Run    : npx playwright test day03-dynamic-elements.spec.ts --project=chromium --headed
 *
 * The button toggles on every click:
 *   <button name="start" class="start">START</button>   <->   <button name="stop" class="stop">STOP</button>
 * So //button[@name='start'] works for the 1st click only and fails on the 2nd.
 */

import { test, Locator } from '@playwright/test';

const URL = 'https://testautomationpractice.blogspot.com/';

test('Handle Dynamic Elements using XPath', async ({ page }) => {
    await page.goto(URL);

    // Loop to click the button 5 times
    for (let i = 1; i <= 5; i++) {
        // Locate the button with either 'STOP' or 'START' text
        const button: Locator = page.locator('//button[text()="STOP" or text()="START"]');

        // Other options that also work:
        // page.locator('//button[@name="start" or @name="stop"]');   // or
        // page.locator('//button[contains(@name,"st")]');            // contains()
        // page.locator('//button[starts-with(@name,"st")]');         // starts-with()
        // NOTE: The session wrote  let button = await page.locator(...)
        // page.locator() is synchronous and returns a Locator, so await is not needed there.

        await button.click();

        // Hard wait, only to watch the toggle. Avoid in real tests (slow and flaky).
        await page.waitForTimeout(2000);
    }
});

test('Handle Dynamic Elements using CSS locator', async ({ page }) => {
    await page.goto(URL);

    for (let i = 1; i <= 5; i++) {
        // CSS attribute selectors, the comma means OR (name can be 'start' or 'stop')
        const button: Locator = page.locator('button[name="start"], button[name="stop"]');
        await button.click();
        await page.waitForTimeout(2000);
    }
});

test('Handle Dynamic Elements using PW Locators', async ({ page }) => {
    await page.goto(URL);

    for (let i = 1; i <= 5; i++) {
        // Locate button by role and dynamic name (regular expression: START or STOP)
        const button: Locator = page.getByRole('button', { name: /START|STOP/ });
        await button.click();
        await page.waitForTimeout(2000);
    }
});
