import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { loginToService } from '../helper/login.helper';

test.describe('Login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'login - correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Positive path',
        description: 'Basic positive test for login',
      },
    },
    async ({ page }) => {
      //Arrange
      const expectedUser = 'Jan Demobankowy';
      const pulpitPage = new PulpitPage(page);

      //Act
      await loginToService(page, loginData.userId, loginData.userPwd);

      //Assert
      await expect(pulpitPage.username).toHaveText(expectedUser);
    },
  );

  test(
    'unsuccessful login - short login',
    {
      tag: ['@login', '@negative'],
      annotation: {
        type: 'Negative path',
        description: 'Login with less than 8 characters',
      },
    },
    async ({ page }) => {
      //Arrange
      const incorrectUserId = '1234567';
      const expectedErrorMsg = 'identyfikator ma min. 8 znaków';

      //Act
      await loginPage.loginInput.fill(incorrectUserId);
      await loginPage.passwordInput.click();

      //Assert
      await expect(loginPage.loginError).toHaveText(expectedErrorMsg);
    },
  );

  test(
    'unsuccessful login - short pwd',
    {
      tag: ['@login', '@negative'],
      annotation: {
        type: 'Negative path',
        description: 'Password with less than 8 characters',
      },
    },
    async ({ page }) => {
      //Arrange
      const incorrectUserPwd = '1234567';
      const expectedErrorMsg = 'hasło ma min. 8 znaków';

      //Act
      await loginPage.loginInput.fill(loginData.userId);
      await loginPage.passwordInput.fill(incorrectUserPwd);
      await loginPage.passwordInput.blur();

      //Assert
      await expect(loginPage.pwdError).toHaveText(expectedErrorMsg);
    },
  );
});
