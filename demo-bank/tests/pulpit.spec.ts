import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/pulpit.page';
import { loginToService } from '../helper/login.helper';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    //Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    pulpitPage = new PulpitPage(page);
  });
  test('Successful transfer', async ({ page }) => {
    //Flaky test: 1/10 fail on first only
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
  });

  test('Successful moble topup', async ({ page }) => {
    //Flaky test: 1/10 fail on first only
    //Arrange
    const topupAmount = '25';
    const topupReceiver = '502 xxx xxx';
    const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    const initalBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initalBalance) - Number(topupAmount);
    //Act

    await pulpitPage.topup(topupReceiver, topupAmount);

    //Assert
    await page.waitForLoadState('domcontentloaded'); // wait for all DOM content loaded
    await expect(pulpitPage.message).toHaveText(expectedTopupMessage);
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
