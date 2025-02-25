import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButton: Locator;
  message: Locator;
  username: Locator;
  topupReceiver: Locator;
  topupAmount: Locator;
  topupAgreement: Locator;
  topupButton: Locator;
  closeButton: Locator;
  moneyValue: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.message = this.page.locator('#show_messages');
    this.username = this.page.getByTestId('user-name');
    this.topupReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topupAmount = this.page.locator('#widget_1_topup_amount');
    this.topupAgreement = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topupButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.closeButton = this.page.getByTestId('close-button');
    this.moneyValue = this.page.locator('#money_value');
    this.sideMenu = new SideMenuComponent(this.page);
  }
  async topup(topupReceiver: string, topupAmount: string): Promise<void> {
    await this.topupReceiver.selectOption(topupReceiver);
    await this.topupAmount.fill(topupAmount);
    await this.topupAgreement.click();
    await this.topupButton.click();
    await this.closeButton.click();
  }

  async quickTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.closeButton.click();
  }

  async sideBar_quickTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.sideMenu.myPulpit_quickTransfer.click();
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.closeButton.click();
  }

  // });
}
