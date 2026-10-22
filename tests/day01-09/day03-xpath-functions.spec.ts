/*
 * Playwright with TypeScript | Session 3: XPath Locators
 * File   : day03-xpath-functions.spec.ts
 * Topic  : contains(), starts-with(), text(), last(), position()
 *          + working with multiple elements: count(), first(), last(), nth(), allTextContents()
 *
 * Run    : npx playwright test day03-xpath-functions.spec.ts --project=chromium --headed
 */

import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
});

test('3. contains(): partial match on an attribute', async ({ page }) => {
    // Featured products whose link (href) contains "computer"
    const products: Locator = page.locator("//h2/a[contains(@href,'computer')]");

    const productsCount: number = await products.count();
    console.log('No of computer related products:', productsCount);
    expect(productsCount).toBeGreaterThan(0);   // plain value assertion, no await needed

    // console.log(await products.textContent());  // Error: strict mode violation (matches many)

    console.log('First product :', await products.first().textContent());
    console.log('Last product  :', await products.last().textContent());
    console.log('Nth product   :', await products.nth(2).textContent());  // index starts from 0
    // NOTE: nth(4) (as first tried in the session) is the 5th element; with only 4 matches it times out.

    // All matched texts into an array
    const productTitles: string[] = await products.allTextContents();
    console.log('All computer related product titles:', productTitles);

    for (const pt of productTitles) {
        console.log(pt.trim());
    }
});

test('4. starts-with(): attribute value starts with a string', async ({ page }) => {
    // Useful for dynamic ids/classes where only the beginning is stable
    const buildingProducts: Locator = page.locator("//h2/a[starts-with(@href,'/build')]"); // may return multiple
    const count: number = await buildingProducts.count();
    console.log('Products starting with /build:', count);
    expect(count).toBeGreaterThan(0);
});

test('5. text(): match by exact inner text', async ({ page }) => {
    const regLink: Locator = page.locator("//a[text()='Register']");
    await expect(regLink).toBeVisible();

    // Partial text match
    const fictionTitles: Locator = page.locator("//*[contains(text(),'Fiction')]");
    console.log('Elements containing Fiction:', await fictionTitles.count());
});

test('6. last() and 7. position(): pick by index in XPath', async ({ page }) => {
    // Last item under the FOLLOW US footer menu (Google+)
    const lastItem: Locator = page.locator("//div[@class='column follow-us']//li[last()]");
    await expect(lastItem).toBeVisible();
    console.log('Text content of last element:', await lastItem.textContent());

    // 3rd item. NOTE: The session wrote li[position(3)], which is INVALID XPath
    // (position() takes no argument). Correct forms: li[position()=3] or simply li[3]
    const positionItem: Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
    await expect(positionItem).toBeVisible();
    console.log('Text content of positional element:', await positionItem.textContent());

    // XPath indexes start at 1, Playwright nth() starts at 0. These two are the same element:
    await expect(page.locator("//div[@class='column follow-us']//li[3]"))
        .toHaveText(await page.locator("//div[@class='column follow-us']//li").nth(2).innerText());
});
