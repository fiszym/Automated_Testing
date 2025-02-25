import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  payment: Locator;
  myPulpit_quickTransfer: Locator;

  constructor(private page: Page) {
    this.payment = this.page.getByRole('link', { name: 'płatności' });
    this.myPulpit_quickTransfer = this.page.getByRole('link', {
      name: 'szybki przelew',
    });
  }
}
