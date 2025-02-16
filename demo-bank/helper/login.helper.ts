import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { loginData } from '../test-data/login.data';

export const loginToService = async (
  page: Page,
  userId: string,
  userPwd: string,
) => {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.loginInput.fill(userId);
  await loginPage.passwordInput.fill(userPwd);
  await loginPage.loginButton.click();
};
