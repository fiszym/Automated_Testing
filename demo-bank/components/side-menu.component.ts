import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  payment: Locator;
  myPulpit_quickTransfer: Locator;
  myPulpit_topup: Locator;
  myPulpit_manager: Locator;
  personalAccounts: Locator;

  constructor(private page: Page) {
    this.payment = this.page.getByRole('link', { name: 'płatności' });
    this.myPulpit_quickTransfer = this.page.getByRole('link', {
      name: 'szybki przelew',
    });
    this.myPulpit_topup = this.page.getByRole('link', {
      name: 'doładowanie telefonu',
    });
    this.myPulpit_manager = this.page.getByRole('link', {
      name: 'manager finansowy',
    });
    this.personalAccounts = this.page.getByRole('link', {
      name: 'konta osobiste',
    });
  }
}
