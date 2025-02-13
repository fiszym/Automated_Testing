import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPwd = loginData.userPwd;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPwd);
    await page.getByTestId('login-button').click();
  });
  test('Successful transfer', async ({ page }) => {
    //Arrange
    const transferTitle = 'Zwrot';
    const transferAmount = '100';
    const receiverId = '2';
    const expectedReceiverName = 'Chuck Demobankowy';

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedReceiverName} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('Successful moble topup', async ({ page }) => {
    //Arrange
    const topupAmount = '25';
    const topupReceiver = '502 xxx xxx';
    const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;
    const initalBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initalBalance) - Number(topupAmount);
    //Act

    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();

    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedTopupMessage,
    );
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
