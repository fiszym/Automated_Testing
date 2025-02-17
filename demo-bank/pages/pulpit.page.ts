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
}
