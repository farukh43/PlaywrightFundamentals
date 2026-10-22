# Playwright Fundamentals (TypeScript)

A hands-on learning workspace for **Playwright Test** with **TypeScript**, organized day by day.
Each folder under `tests/` covers one topic and contains:

- **demo** specs: worked examples of a concept
- **lab** specs: practice exercises that apply it

## Tech stack

- [@playwright/test](https://playwright.dev) ^1.63
- TypeScript / Node.js (LTS)
- Browsers: Chromium, Firefox, WebKit
- CI: GitHub Actions (`.github/workflows/playwright.yml`)

## Getting started

```bash
# install dependencies
npm ci

# install Playwright browsers
npx playwright install --with-deps
```

## Running tests

```bash
# run everything (all 3 browsers)
npx playwright test

# run a single folder or file
npx playwright test tests/day24-Pom
npx playwright test tests/day06-checkbox.spec.ts

# run in one browser, headed
npx playwright test --project=chromium --headed

# interactive UI mode / debug
npx playwright test --ui
npx playwright test --debug

# open the last HTML report
npx playwright show-report
```

## Project structure

```
PlaywrightFundamentals/
├── .github/workflows/     # CI pipeline (runs tests on push/PR)
├── Notes/                 # Course notes (Word document)
├── testdata/              # Data files for data-driven tests (CSV, JSON, XLSX)
├── Uploads/               # Sample files used by the file upload tests
├── tests/                 # Test specs, one folder per day/topic
├── playwright.config.ts   # Global Playwright configuration
└── package.json
```

`playwright-report/` and `test-results/` are generated on each run and are git-ignored.

## Curriculum

| Day | Folder | Topics |
|-----|--------|--------|
| 01 | `day01-09` | async/await, first test, test syntax |
| 02 | `day01-09` | Built-in locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByAltText`, `getByTitle`, `getByTestId`), locator filters |
| 03 | `day01-09` | Dynamic elements, XPath (absolute vs. relative, functions) |
| 04 | `day01-09` | XPath axes |
| 05 | `day01-09` | CSS locators |
| 06 | `day01-09` | Checkboxes, radio buttons, text inputs |
| 07 | `day01-09` | Dropdowns: single, multi-select, sorted, duplicates |
| 08 | `day01-09` | Auto-suggest and Bootstrap hidden dropdowns |
| 09 | `day01-09` | Text methods comparison, static web tables |
| 10 | `day10-20` | Dynamic and paginated tables |
| 11 | `day11-DatePickers` | jQuery date picker, date ranges, booking calendars |
| 12 | `day12-popupAlerts` | Pop-ups, alerts and dialogs |
| 13 | `day13-fileuploadAnddownload` | Auth pop-ups, new tabs, file upload and download |
| 14 | `day14-mouse-actions` | Mouse actions, keyboard actions, drag and drop, sliders |
| 15 | `day15-scrolling` | Scrolling, lazy loading, infinite scrolling |
| 16 | `day16-shadowdom-svg` | Shadow DOM, SVG elements |
| 17 | `day17-frames` | iframes and nested frames |
| 18 | `day18-autowait-Assertions` | Auto-waiting, assertions, soft vs. hard assertions |
| 19 | `day19-coockies` | Cookies, logging in with cookies |
| 20 | `day20-Local-And-Storage-Session` | Browser contexts (multiple users), local storage, session storage, saving login state |
| 21 | `day21-data-driven-testing` | Parameterized tests from arrays, JSON, CSV and Excel |
| 22 | `day22-screenshot-video-traceviewer` | Screenshots, videos, Trace Viewer, flaky tests |
| 23 | `day23-Allure-Reporting` | Allure reporting, custom reporter |
| 24 | `day24-Pom` | Page Object Model (`LoginPage`, `HomePage`, `CartPage`, `SignUpPage`) |

## Configuration highlights

From `playwright.config.ts`:

- `testDir: './tests'`
- Tests run fully in parallel. On CI: 2 retries, 1 worker, `test.only` is forbidden.
- Reporter: `html`
- Trace is recorded `on-first-retry`
- Projects: `chromium`, `firefox`, `webkit`

## Notes

The course notes are in `Notes/Playwright_TypeScript_Fundamentals_Notes.docx`.
