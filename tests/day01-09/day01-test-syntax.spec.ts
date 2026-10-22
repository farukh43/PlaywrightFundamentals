/*
 * Playwright with TypeScript | Session 1: Setup Environment and Writing Tests
 * File   : day01-test-syntax.spec.ts
 * Topic  : Basic structure (syntax) of a Playwright test
 *
 * Run    : npx playwright test day01-test-syntax.spec.ts
 */

// test   -> defines a test case
// expect -> used for assertions
import { test, expect } from '@playwright/test';

// Syntax:
// test("title", async ({ page }) => {
//     // step 1
//     // step 2
//     // step 3
// });

// title       : name of the test, shown in the terminal and HTML report
// async       : required because the steps inside use await
// { page }    : built-in fixture, a fresh browser tab given to every test

test('Test syntax demo', async ({ page }) => {
    // step 1: open the application
    await page.goto('https://example.com');

    // step 2: perform an action / read a value
    const title: string = await page.title();

    // step 3: verify the result
    expect(title).toBe('Example Domain');
});
