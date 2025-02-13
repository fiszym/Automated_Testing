import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const userId = 'tester12';
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with correct credentials', async ({ page }) => {
    //Arrange

    const userPwd = 'pwd12345';
    const expectedUser = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPwd);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('unsuccessful login with short login', async ({ page }) => {
    //Arrange
    const incorrectUserId = '1234567';
    const expectedErrorMsg = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMsg,
    );
  });

  test('unsuccessful login with short pwd', async ({ page }) => {
    //Arrange
    const incorrectUserPwd = '1234567';
    const expectedErrorMsg = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPwd);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMsg,
    );
  });
});
