import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PersonalAccountsPage {
  sideMenu: SideMenuComponent;
  dialogBox: Locator;
  dialogBoxDetails: Locator;
  personalAccounts: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.personalAccounts = this.page.getByRole('link', {
      name: 'konta osobiste',
    });
    this.dialogBox = this.page
      .locator('#aggregation_list div')
      .filter({ hasText: 'Konto na życie' })
      .first();
    this.dialogBoxDetails = this.page
      .locator('#aggregation_list div')
      .filter({ hasText: 'saldo' })
      .first();
  }

  async hideAccountDetails(): Promise<void> {
    //Act
    await this.personalAccounts.click();
    await this.dialogBox.click();
  }
  async showAccountDetails(): Promise<void> {
    //Act
    await this.personalAccounts.click();
    await this.dialogBox.click();
  }
}
