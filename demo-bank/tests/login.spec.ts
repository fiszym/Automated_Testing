import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPwd = loginData.userPwd;
    const expectedUser = 'Jan Demobankowy';

    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPwd);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUser);
  });

  test('unsuccessful login with short login', async ({ page }) => {
    //Arrange
    const incorrectUserId = '1234567';
    const expectedErrorMsg = 'identyfikator ma min. 8 znaków';

    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorMsg);
    // // await expect(page.getByTestId('error-login-id')).toHaveText(
    //   expectedErrorMsg,
    // );
  });

  test('unsuccessful login with short pwd', async ({ page }) => {
    //Arrange
    const userId = 'tester12';
    const incorrectUserPwd = '1234567';
    const expectedErrorMsg = 'hasło ma min. 8 znaków';

    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPwd);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.pwdError).toHaveText(expectedErrorMsg);
    // await expect(page.getByTestId('error-login-password')).toHaveText(
    //   expectedErrorMsg,
    // );
  });
});
