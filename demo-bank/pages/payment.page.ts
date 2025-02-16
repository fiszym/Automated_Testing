import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  payment: Locator;
  transferReceiverInput: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  closeButton: Locator;

  constructor(private page: Page) {
    this.payment = this.page.getByRole('link', { name: 'płatności' });
    // await page.getByRole('link', { name: 'płatności' }).click();
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    // await page.getByTestId('transfer_receiver').fill(transferReceiver);
    this.transferAccount = this.page.getByTestId('form_account_to');

    // await page.getByTestId('form_account_to').fill(transferAccount);
    this.transferAmount = this.page.getByTestId('form_amount');
    // await page.getByTestId('form_amount').fill(transferAmount);
    this.transferTitle = this.page.getByTestId('form_title');
    // await page.getByTestId('form_title').fill(transferTitle);
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    this.closeButton = this.page.getByTestId('close-button');
    // await page.getByTestId('close-button').click();
  }
}
