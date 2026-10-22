/*
 * Playwright with TypeScript | Session 9: Handle Web Tables
 * File   : day09-static-web-table.spec.ts
 * Topic  : Static web table (BookTable): rows, columns, row data, all data,
 *          filter by column value, total of a column
 *
 * Run    : npx playwright test day09-static-web-table.spec.ts --project=chromium
 *
 * Table: header row (th) + 6 data rows, columns: BookName | Author | Subject | Price
 * NOTE: here the header row is INSIDE <tbody>, so tbody tr also returns the header.
 */

import { test, expect, Locator } from '@playwright/test';

test('static web table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    // 1) Count number of rows (including header)
    const rows: Locator = table.locator('tr');
    await expect(rows).toHaveCount(7);                       // approach 1 (web-first)

    const rowCount: number = await rows.count();
    console.log('Number of rows in a table:', rowCount);
    expect(rowCount).toBe(7);                                // approach 2

    // 2) Count number of headers / columns
    const columns: Locator = rows.locator('th');
    await expect(columns).toHaveCount(4);                    // approach 1

    const columnCount: number = await columns.count();
    console.log('Number of columns/headers:', columnCount);
    expect(columnCount).toBe(4);                             // approach 2

    // 3) Read all data from 2nd data row (index 2 = 3rd <tr> including header)
    const secondRowCells: Locator = rows.nth(2).locator('td');
    const secondRowTexts: string[] = await secondRowCells.allInnerTexts();
    console.log('2nd row data:', secondRowTexts);            // [ 'Learn Java', 'Mukesh', 'Java', '500' ]

    // toHaveText() with an ARRAY checks every matched element, in order
    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

    console.log('Printing 2nd row data......');
    for (const text of secondRowTexts) {
        console.log(text);
    }

    // 4) Read all data from the table (excluding header)
    console.log('Printing all table data......');
    const allRowData: Locator[] = await rows.all();          // all() returns array of locators
    console.log('BookName\tAuthor\tSubject\tPrice');

    for (const row of allRowData.slice(1)) {                 // slice(1) -> skip header row
        const cols: string[] = await row.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    // 5) Print book names where author is Mukesh
    console.log('Books written by Mukesh......');
    const mukeshBooks: string[] = [];

    for (const row of allRowData.slice(1)) {
        const cells: string[] = await row.locator('td').allInnerTexts();
        const book: string = cells[0];
        const author: string = cells[1];

        if (author === 'Mukesh') {
            console.log(`${author} \t ${book}`);
            mukeshBooks.push(book);
        }
    }
    expect(mukeshBooks).toHaveLength(2);                     // assertion

    // 6) Calculate total price of all books
    let totalPrice: number = 0;

    for (const row of allRowData.slice(1)) {
        const cells: string[] = await row.locator('td').allInnerTexts();
        const price: string = cells[3];
        totalPrice = totalPrice + parseInt(price);           // use parseFloat / Number for decimals
    }
    console.log('Total price:', totalPrice);
    expect(totalPrice).toBe(7100);                           // assertion
});
