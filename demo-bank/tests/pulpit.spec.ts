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
      tag: ['@pulpit', '@integratoin'],
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
});
