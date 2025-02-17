import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  payment: Locator;

  constructor(private page: Page) {
    this.payment = this.page.getByRole('link', { name: 'płatności' });
  }
}
