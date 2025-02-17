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
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferTitle = this.page.getByTestId('form_title');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.closeButton = this.page.getByTestId('close-button');
  }
}
