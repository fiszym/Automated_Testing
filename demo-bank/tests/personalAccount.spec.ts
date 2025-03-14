import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { loginToService } from '../helper/login.helper';
import { PersonalAccountsPage } from '../pages/personalAccounts.page';

test(
  'Personal accounts hide details bar test',
  {
    tag: ['@personalAccounts'],
    annotation: [
      {
        type: 'Positive path',
        description: 'Hide account details bar',
      },
    ],
  },
  async ({ page }) => {
    //Arrange
    const personalAccountsPage = new PersonalAccountsPage(page);

    //Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    await personalAccountsPage.hideAccountDetails();

    //Assert
    await expect(personalAccountsPage.dialogBoxDetails).toBeHidden();
  },
);

test(
  'Personal accounts show details bar test',
  {
    tag: ['@personalAccounts'],
    annotation: [
      {
        type: 'Positive path',
        description: 'Show account details bar',
      },
    ],
  },
  async ({ page }) => {
    //Arrange
    const personalAccountsPage = new PersonalAccountsPage(page);

    //Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    await personalAccountsPage.showAccountDetails();

    //Assert
    await expect(personalAccountsPage.dialogBoxDetails).toBeVisible();
  },
);
