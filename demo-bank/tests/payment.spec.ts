import { test, expect, Page } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { PulpitPage } from '../pages/pulpit.page';
import { PaymentPage } from '../pages/payment.page';
import { loginToService } from '../helper/login.helper';

test.describe('Payment tests', async () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    //Arrange
    const pulpitPage = new PulpitPage(page);

    // Act
    paymentPage = new PaymentPage(page);
    await loginToService(page, loginData.userId, loginData.userPwd);
    await pulpitPage.sideMenu.payment.click();
  });

  test(
    'simple payment',
    { tag: ['@payment', '@integration'] },
    async ({ page }) => {
      //Arrange
      const transferReceiver = 'Jan Nowak';
      const transferAccount = '12 3456 7890 1234 5678 9012 34569';
      const transferAmount = '123';
      const transferTitle = 'Tytuł';
      const expectedMsg = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

      //Act
      await paymentPage.simplePayment(
        transferReceiver,
        transferAccount,
        transferAmount,
        transferTitle,
      );

      //Assert
      await expect(paymentPage.message).toHaveText(expectedMsg);
    },
  );
});
