/*
 * Playwright with TypeScript | Session 7: Handle Dropdowns | Select Options (Part 1)
 * File   : day07-lab-bstackdemo-sort.spec.ts
 * Topic  : LAB ASSIGNMENT SOLUTION: Verify product sorting and information retrieval
 *          (try it yourself first, see Playwright_Assignments_and_Quizzes.docx)
 *
 * Run    : npx playwright test day07-lab-bstackdemo-sort.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test('Verify product sorting: Lowest to highest', async ({ page }) => {
    // 1. Navigate to the webpage
    await page.goto('https://www.bstackdemo.com/');

    // 2. "Order by" dropdown: displayed, enabled, select "Lowest to highest"
    const orderBy: Locator = page.locator('.sort select');
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();
    await orderBy.selectOption({ label: 'Lowest to highest' });

    // 3. Product names and prices
    const names: Locator = page.locator('.shelf-item__title');
    const prices: Locator = page.locator('.shelf-item__price .val');

    // Wait until the list is re-rendered in ascending order before reading it
    const toNumber = (p: string): number => Number(p.replace(/[^0-9.]/g, ''));
    await expect.poll(async () => {
        const values = (await prices.allTextContents()).map(toNumber);
        return values.every((v, i) => i === 0 || values[i - 1] <= v);
    }).toBe(true);

    const productNames: string[] = (await names.allTextContents()).map(t => t.trim());
    const productPrices: string[] = (await prices.allTextContents()).map(t => t.trim());

    expect(productNames.length).toBe(productPrices.length);

    for (let i = 0; i < productNames.length; i++) {
        console.log(`${productNames[i]} : ${productPrices[i]}`);
    }

    // 4. Lowest priced product = first element
    console.log('Lowest priced product :', productNames[0], productPrices[0]);

    // 5. Highest priced product = last element
    console.log('Highest priced product:', productNames[productNames.length - 1], productPrices[productPrices.length - 1]);
});
