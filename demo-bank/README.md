# Test Automation training based on jaktestowac.pl 
- test site: https://demo-bank.vercel.app/

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox/Edge  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```


##Visual Studio Code
- Preview: for README.md.  
    `double space for broken line`
- Autosave: File -> Autosave
- Timeline: file context menu
- Format document: editor -> RMC -> format document
- Test.only

## Playwright snippets
- import:
    ```typescript
    import { test, expect } from '@playwright/test';
    ```
- test:
    ```typescript
    test('test description', async ({ page }) => {
    
    });
    ```
- describe:
    ```typescript
     test.describe('Group description', () => {

     });
    ```
- running given test: `test.only`

## Locators
- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` for element with attribute `id="some-id"`, `#some-id` is `css` selector 

## Chrome
- open DevTools <kbd>F12</kbd> or right click `Inspect`
- get selector: right click on element -> Copy -> Copy selector
- testing CSS selectors in Console: `$$('selector')`
- use English version!