import { test, expect, Page } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/pulpit.page';
import { PaymentPage } from '../pages/payment.page';
import { loginToService } from '../helper/login.helper';

test.describe('Payment tests', async () => {
  test.beforeEach(async ({ page }) => {
    //Arrange
    const paymentPage = new PaymentPage(page);

    // Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    await paymentPage.payment.click();
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34569';
    const transferAmount = '123';
    const transferTitle = 'Tytuł';
    const expectedMsg = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    const paymentPage = new PaymentPage(page);
    const pulpitPage = new PulpitPage(page);
    //Act
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferTitle.fill(transferTitle);
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();

    //Assert
    await expect(pulpitPage.message).toHaveText(expectedMsg);
  });
});
