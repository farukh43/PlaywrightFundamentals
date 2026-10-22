/*
 * Playwright with TypeScript | Session 9: Ways to Extract Text from Page Elements
 * File   : day09-comparing-text-methods.spec.ts
 * Topic  : 1) innerText() vs textContent()
 *          2) allInnerTexts() vs allTextContents()
 *          3) all(): Locator -> Locator[]
 *
 * Run    : npx playwright test day09-comparing-text-methods.spec.ts --project=chromium
 */

import { test, expect, Locator } from '@playwright/test';

test('Comparing methods', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

    const products: Locator = page.locator('.product-title');   // 6 featured products
    await expect(products.first()).toBeVisible();

    // 1) innerText() vs textContent()
    // innerText()   : visible rendered text, whitespace and line breaks cleaned, returns string
    // textContent() : raw text of the node incl. hidden elements, extra spaces / line breaks,
    //                 returns string | null
    console.log(await products.nth(1).innerText());     // 14.1-inch Laptop
    console.log(await products.nth(1).textContent());   // \n 14.1-inch Laptop \n (raw)

    const count: number = await products.count();
    for (let i = 0; i < count; i++) {
        const productName: string = await products.nth(i).innerText();
        console.log(productName);

        const rawName: string | null = await products.nth(i).textContent();
        console.log(rawName?.trim());                   // ?. because it can be null
    }

    // 2) allInnerTexts() vs allTextContents(): same difference, for ALL matches, returns string[]
    console.log('**** Comparing allInnerTexts() Vs allTextContents() ****');

    const innerNames: string[] = await products.allInnerTexts();
    console.log('Product names by allInnerTexts():', innerNames);

    const productNames: string[] = await products.allTextContents();
    console.log('Product names by allTextContents():', productNames);

    const productNamesTrimmed: string[] = productNames.map(text => text.trim());
    console.log('Product names after trim:', productNamesTrimmed);
    expect(productNamesTrimmed).toEqual(innerNames);

    // 3) all(): converts Locator -> Locator[] (one locator per matched element, for iteration)
    // NOTE: all() does NOT wait; it returns whatever matches right now (wait first, as above).
    const productsLocators: Locator[] = await products.all();
    console.log('Number of locators:', productsLocators.length);
    console.log(await productsLocators[1].innerText());

    // for...of loop
    for (const productLoc of productsLocators) {
        console.log(await productLoc.innerText());
    }
});
