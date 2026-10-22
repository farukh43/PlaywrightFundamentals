/*
 * Playwright with TypeScript | Session 4: XPath Axes Locators
 * File   : day04-xpath-axes.spec.ts
 * Topic  : self, parent, child, ancestor, descendant, following,
 *          following-sibling, preceding, preceding-sibling
 *
 * Practice page : https://www.w3schools.com/html/html_tables.asp  (table id="customers")
 * Run           : npx playwright test day04-xpath-axes.spec.ts --project=chromium --headed
 *
 * Syntax : //startNode/axis::tagName[predicate]
 *          e.g. //td[text()='Germany']/parent::tr
 *
 * Table (header row + 6 data rows, 3 cells each = 18 <td>):
 *   Company                    | Contact        | Country
 *   Alfreds Futterkiste        | Maria Anders   | Germany
 *   Centro comercial Moctezuma | Francisco Chang| Mexico   ...
 */

import { test, expect, Locator } from '@playwright/test';

test('XPath Axes demo', async ({ page }) => {
    await page.goto('https://www.w3schools.com/html/html_tables.asp');

    // 1. self: selects the current node itself
    const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText('Germany');

    // 2. parent: the <tr> that contains the "Germany" cell
    const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText('Maria Anders');
    // Full row text: cell texts are joined with whatever whitespace is in the HTML source
    // (on w3schools that is a newline, so the plain string also works there).
    // A regex with \s* works either way:
    await expect(parentRow).toContainText(/Alfreds Futterkiste\s*Maria Anders\s*Germany/);
    console.log(await parentRow.textContent());

    // 3. child: direct children of the current node
    const tbody: Locator = page.locator("//table[@id='customers']/child::tbody"); // browser auto-inserts <tbody>
    await expect(tbody).toHaveCount(1);
    const secondRowCells: Locator = page.locator("//table[@id='customers']//tr[2]/child::td"); // tr[1] is the header row
    await expect(secondRowCells).toHaveCount(3);

    // 4. ancestor: parent, grandparent ... up to the root
    const table: Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id', 'customers');

    // 5. descendant: children, grandchildren ... (all levels below)
    const allTds: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allTds).toHaveCount(18);

    // 6. following: everything AFTER the current node in document order (not only siblings)
    const followingCell: Locator = page.locator("//td[normalize-space()='Germany']/following::td[1]");
    await expect(followingCell).toHaveText('Centro comercial Moctezuma');   // first cell of the NEXT row

    // 7. following-sibling: same parent, to the RIGHT
    const noRightSiblings: Locator = page.locator("//td[normalize-space()='Germany']/following-sibling::td");
    await expect(noRightSiblings).toHaveCount(0);                          // Germany is the last cell in its row
    const rightSiblings: Locator = page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
    await expect(rightSiblings).toHaveCount(1);                            // Germany

    // 8. preceding: everything BEFORE the current node in document order
    //    Reverse axis: [1] = the NEAREST node before, not the first in the page
    const precedingCell: Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingCell).toHaveText('Maria Anders');

    // 9. preceding-sibling: same parent, to the LEFT
    const leftSiblings: Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(leftSiblings).toHaveCount(2);
    // Playwright returns matches in document order, so nth(0) is the leftmost cell
    await expect(leftSiblings.nth(0)).toHaveText('Alfreds Futterkiste');
    await expect(leftSiblings.nth(1)).toHaveText('Maria Anders');
});
