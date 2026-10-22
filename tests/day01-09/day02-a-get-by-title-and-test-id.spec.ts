/*
 * Playwright with TypeScript | Session 2: Playwright Built-In Locators
 * File   : day02-get-by-title-and-test-id.spec.ts
 * Topic  : 6) page.getByTitle()   7) page.getByTestId()
 *
 * Needs  : day02-playwrightlocators.html in the same tests/ folder
 * Run    : npx playwright test day02-get-by-title-and-test-id.spec.ts --project=chromium --headed
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

// Build the file:/// URL at runtime instead of hardcoding C:/Users/<name>/...
const localPage: string = pathToFileURL(path.join(__dirname, 'day02-playwrightlocators.html')).href;

test('6. getByTitle: locate element by its title attribute', async ({ page }) => {
    await page.goto(localPage);

    // When to use: the element has a meaningful title attribute.
    // <a href="#" title="Home page link">Home</a>
    await expect(page.getByTitle('Home page link')).toHaveText('Home');

    // <abbr title="HyperText Markup Language">HTML</abbr>
    await expect(page.getByTitle('HyperText Markup Language')).toHaveText('HTML');
});

test('7a. getByTestId: default attribute data-testid', async ({ page }) => {
    await page.goto(localPage);

    // When to use: text or role based locators are unstable or not suitable.
    // <div data-testid="profile-email">john.doe@example.com</div>
    await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
});

test.describe('7b. getByTestId: custom attribute data-pw', () => {
    // Same as setting  use: { testIdAttribute: 'data-pw' }  in playwright.config.ts,
    // but applied only to the tests in this block.
    test.use({ testIdAttribute: 'data-pw' });

    test('uses data-pw instead of data-testid', async ({ page }) => {
        await page.goto(localPage);

        // <div data-pw="profile-email">john.doe@example.com</div>
        await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
        await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
    });
});
