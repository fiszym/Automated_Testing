import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {

  test('login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('pwd12345');
    await page.getByTestId('login-button').click();
  

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy')

  });

  test('unsuccesful login with short login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')

  });

  test('unsuccesful login with short pwd', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('1234567');
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków')

  });

});