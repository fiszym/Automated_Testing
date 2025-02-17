import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  transferReceiverInput: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  closeButton: Locator;
  message: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferTitle = this.page.getByTestId('form_title');

    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });

    this.closeButton = this.page.getByTestId('close-button');
    this.message = this.page.locator('#show_messages');
    this.sideMenu = new SideMenuComponent(this.page);
  }

  async simplePayment(
    transferReceiverInput: string,
    transferAccount: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    //Act
    await this.transferReceiverInput.fill(transferReceiverInput);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.closeButton.click();
  }
}
