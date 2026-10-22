/*
 * Playwright with TypeScript | Session 3: XPath Locators
 * File   : day03-xpath-absolute-relative.spec.ts
 * Topic  : 1) Absolute XPath   2) Relative XPath
 *
 * Run    : npx playwright test day03-xpath-absolute-relative.spec.ts --project=chromium --headed
 *
 * XPath  : XML Path Language. Navigates elements and attributes of an XML/HTML
 *          document. XPath works on the DOM (the tree of nodes), not on raw HTML.
 * Playwright treats a selector as XPath automatically ONLY when it starts with // or ..
 * A selector starting with a single / is parsed as CSS and fails, so prefix it with xpath=
 */

import { test, expect, Locator } from '@playwright/test';

test('XPath demo: absolute vs relative', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

    // 1. Absolute XPath (Full XPath): starts with a single /, full path from the root.
    //    Breaks easily if any element in the path changes. Avoid in real projects.
    //    page.locator('/html[1]/...') fails (parsed as CSS). Two ways that work:
    //    a) prefix with xpath=   b) start with //html (as done in the session)
    const absoluteLogo: Locator = page.locator('xpath=/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]');
    await expect(absoluteLogo).toBeVisible();

    const absoluteLogo2: Locator = page.locator('//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]');
    await expect(absoluteLogo2).toBeVisible();

    // 2. Relative XPath (Partial XPath): starts with //, jumps directly to the element
    //    using attributes. Shorter, easier to maintain. PREFERRED.
    const relativeLogo: Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativeLogo).toBeVisible();
});
