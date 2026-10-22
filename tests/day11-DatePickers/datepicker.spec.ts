// Session 11: Handle Date Pickers (Booking.com test case)
// Note: Booking.com is a dynamic site, so these locators may change and need updating.
// Check-in and check-out must be FUTURE dates, so they are calculated from today.
import { test, expect, Page } from '@playwright/test';

// Reusable function: move the calendar forward until the wanted month is shown, then click the day
async function selectDate(page: Page, target: Date) {

    const monthYear = target.toLocaleString('en-US', { month: 'long', year: 'numeric' });   // "December 2026"
    const isoDate = [
        target.getFullYear(),
        String(target.getMonth() + 1).padStart(2, '0'),     // getMonth() is 0-based
        String(target.getDate()).padStart(2, '0'),
    ].join('-');                                            // "2026-12-25"

    const header = page.locator('h3[aria-live="polite"]').first();   // left month of the 2-month calendar

    for (let i = 0; i < 24; i++) {                          // guard: never loop forever
        if ((await header.innerText()) === monthYear) break;
        await page.getByRole('button', { name: 'Next month' }).click();
    }

    await page.locator(`span[data-date="${isoDate}"]`).click();
}

// Short text shown in the date field, e.g. "Dec 25"
function shortDate(d: Date): string {
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
}

test('Verify date selection on Booking.com search', async ({ page }) => {

    // Test data: any future check-in, check-out after check-in
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 60);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 45);

    // Steps 2-3: the sign-in banner appears at an unpredictable time, so register a handler for it
    const dismiss = page.getByRole('button', { name: /Dismiss sign-in/i });
    await page.addLocatorHandler(dismiss, async () => {
        await dismiss.click();
    });

    // Step 1: open the application
    await page.goto('https://www.booking.com/');

    // Steps 4-6: destination with auto-suggestion
    const searchBox = page.getByPlaceholder('Where are you going?');
    await expect(searchBox).toBeVisible();
    await searchBox.fill('Chennai');
    await page.getByRole('option').filter({ hasText: 'Chennai' }).first().click();
    await expect(searchBox).toHaveValue(/Chennai/);

    // Step 7: open the calendar (it may already open after choosing the city)
    const calendar = page.getByTestId('searchbox-datepicker-calendar');
    if (!(await calendar.isVisible())) {
        await page.getByTestId('searchbox-dates-container').click();
    }
    await expect(calendar).toBeVisible();

    // Steps 8-11: select check-in and check-out
    await selectDate(page, checkIn);
    await selectDate(page, checkOut);

    // Step 12: close the calendar by clicking outside
    await page.mouse.click(5, 5);

    // Overall: both dates stay visible in the date field
    await expect(page.getByTestId('date-display-field-start')).toContainText(shortDate(checkIn));
    await expect(page.getByTestId('date-display-field-end')).toContainText(shortDate(checkOut));
});
