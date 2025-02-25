import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/pulpit.page';
import { loginToService } from '../helper/login.helper';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;
  // All tests in this describe group will get 3 retry attempts.
  test.describe.configure({ retries: 3 });

  test.beforeEach(async ({ page }) => {
    //Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    pulpitPage = new PulpitPage(page);
  });
  test(
    'successful transfer',
    {
      tag: ['@pulpit', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Quick transfer',
        },
        {
          type: 'Flaky test',
          description:
            'Fail due to instability of application (Jira: #1234 www.examplejira.com/issue=1234)',
        },
      ],
    },
    async ({ page }, testInfo) => {
      //Arrange
      const transferTitle = 'Zwrot';
      const transferAmount = '100';
      const receiverId = '2';
      const expectedReceiverName = 'Chuck Demobankowy';

      //Act
      await pulpitPage.quickTransfer(receiverId, transferAmount, transferTitle);

      //Assert
      await expect(pulpitPage.message).toHaveText(
        `Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test(
    'successful moble topup',
    {
      tag: ['@pulpit', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Quick mobile topup',
        },
        {
          type: 'Flaky test',
          description:
            'Fail due to instability of application (Jira: #1235 www.examplejira.com/issue=1235)',
        },
      ],
    },
    async ({ page }) => {
      //Arrange
      const topupAmount = '25';
      const topupReceiver = '502 xxx xxx';
      const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

      const initalBalance = await pulpitPage.moneyValue.innerText();
      const expectedBalance = Number(initalBalance) - Number(topupAmount);

      //Act
      await pulpitPage.topup(topupReceiver, topupAmount);

      //Assert
      await expect(pulpitPage.message).toHaveText(expectedTopupMessage);
      await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    },
  );
  test(
    'financial manager graph',
    {
      tag: ['@pulpit', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Present graph for financial manager',
        },
      ],
    },
    async ({ page }) => {
      //Arrange
      const periodId = '1';

      //Act
      await pulpitPage.manager(periodId);

      //Assert
      await expect(pulpitPage.financialGraph).toBeVisible();
      //Checking visibility of the chart, not veryfying presented values
    },
  );

  test(
    'successful sideBar transfer',
    {
      tag: ['@pulpit', '@sideBar'],
      annotation: [
        {
          type: 'Positive path',
          description:
            'Quick transfer from (sideBar) My Pulpit -> Quick Transfer',
        },
        {
          type: 'Flaky test',
          description:
            'Fail due to instability of application (Jira: #1234 www.examplejira.com/issue=1235)',
        },
      ],
    },
    async ({ page }) => {
      //Arrange
      const transferTitle = 'Zwrot';
      const transferAmount = '100';
      const receiverId = '2';
      const expectedReceiverName = 'Chuck Demobankowy';

      //Act
      await pulpitPage.sideBar_quickTransfer(
        receiverId,
        transferAmount,
        transferTitle,
      );

      //Assert
      await expect(pulpitPage.message).toHaveText(
        `Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test(
    'successful sideBar moble topup',
    {
      tag: ['@pulpit', '@sideBar'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Quick mobile topup',
        },
        {
          type: 'Flaky test',
          description:
            'Fail due to instability of application (Jira: #1235 www.examplejira.com/issue=1235)',
        },
      ],
    },
    async ({ page }) => {
      //Arrange
      const topupAmount = '25';
      const topupReceiver = '502 xxx xxx';
      const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

      //Act
      await pulpitPage.sideBar_topup(topupReceiver, topupAmount);

      //Assert
      await expect(pulpitPage.message).toHaveText(expectedTopupMessage);
    },
  );
  test(
    'sideBar financial manager graph',
    {
      tag: ['@pulpit', '@sideBar'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Present graph for sideBar financial manager',
        },
      ],
    },
    async ({ page }) => {
      //Arrange
      const periodId = '1';

      //Act
      await pulpitPage.sideBar_manager(periodId);

      //Assert
      await expect(pulpitPage.financialGraph).toBeVisible();
      //Checking visibility of the chart, not veryfying presented values
    },
  );
});
