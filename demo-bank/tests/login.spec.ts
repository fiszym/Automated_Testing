import { test, expect } from '@playwright/test';
export const url = 'https://demo-bank.vercel.app/';
export const userId = 'tester12';
export const userPwd = 'pwd12345';
test.describe('User login to Demobank', () => {
  test('login with correct credentials', async ({ page }) => {
    //Arrange

    const expectedUser = 'Jan Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPwd);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('unsuccessful login with short login', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('1234567');
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with short pwd', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill('1234567');
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
