/*
 * Playwright with TypeScript | Session 5: CSS Locators
 * File   : day05-css-locators.spec.ts
 * Topic  : CSS selectors with page.locator(): tag#id, tag.class, tag[attribute=value],
 *          tag.class[attribute=value], absolute vs relative, children, pattern matching,
 *          :not(), sibling (+)
 *
 * Run    : npx playwright test day05-css-locators.spec.ts --project=chromium --headed
 *
 * CSS = Cascading Style Sheets (web page = HTML + JS + CSS)
 * page.locator() accepts both CSS and XPath (XPath only when it starts with // or ..)
 *
 *   tag with id                  tag#id                     or  #id
 *   tag with class               tag.class                  or  .class
 *   tag with any attribute       tag[attribute=value]       or  [attribute=value]
 *   tag with class + attribute   tag.class[attribute=value] or  .class[attribute=value]
 */

import { test, expect, Locator } from '@playwright/test';

test('Verify CSS Locators (demowebshop)', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

    // tag#id  /  #id
    const searchBox: Locator = page.locator('input#small-searchterms');
    await expect(searchBox).toBeVisible();
    await page.locator('#small-searchterms').fill('T-Shirts');

    // tag.class  /  .class
    await page.locator('input.search-box-text').fill('T-Shirts');
    await page.locator('.search-box-text').fill('T-Shirts');

    // tag[attribute=value]  /  [attribute=value]
    await page.locator('input[name=q]').fill('T-Shirts');
    await page.locator('[name=q]').fill('T-Shirts');

    // tag.class[attribute=value]  /  .class[attribute=value]
    await page.locator("input.search-box-text[value='Search store']").fill('T-Shirts');
    await page.locator(".search-box-text[value='Search store']").fill('T-Shirts');

    await expect(searchBox).toHaveValue('T-Shirts');
    // NOTE: the session used page.waitForTimeout(5000) only to watch the result; avoid hard waits.
});

test('CSS selector types (eviltester practice page)', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/basic-web-page-test.html');
    // Page has: <p id="para1" class="main">...</p>  <p id="para2" class="sub">...</p>

    // 1. Absolute CSS: full path from html, using > (direct child)
    await expect(page.locator('html > body > div > div > p#para1')).toBeVisible();

    // 2. Relative CSS: shortcut, space = any descendant
    await expect(page.locator('p#para2')).toBeVisible();
    await expect(page.locator('p.main')).toHaveAttribute('id', 'para1');
    await expect(page.locator('[class="sub"]')).toHaveAttribute('id', 'para2');

    // Pattern matching on attribute values
    await expect(page.locator("p[class^='ma']")).toHaveAttribute('id', 'para1'); // starts with
    await expect(page.locator("p[class$='ub']")).toHaveAttribute('id', 'para2'); // ends with
    await expect(page.locator("p[class*='ai']")).toHaveAttribute('id', 'para1'); // contains

    // Combining selectors
    await expect(page.locator("p[id='para1'][class='main']")).toHaveCount(1);    // AND
    await expect(page.locator("p#para1:not(.sub)")).toHaveCount(1);
    await expect(page.locator("p:not([id='para1'])[class='sub']")).toHaveAttribute('id', 'para2');

    // Adjacent sibling (+): the <p> right after #para1
    await expect(page.locator("p[id='para1'] + p")).toHaveAttribute('id', 'para2');

    // Position among siblings (1 based): first-child, last-child, nth-child(n)
    const firstP: Locator = page.locator('p:first-child');
    console.log('First child p text:', await firstP.first().textContent());
});
