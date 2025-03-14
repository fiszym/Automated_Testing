import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class ReportPage {
  //   sideMenu: SideMenuComponent;
  outcomePieChart: Locator;
  outcomeClassicChart: Locator;
  getTableButton: Locator;
  sideMenu: SideMenuComponent;
  reportFirstPosition: Locator;
  zipDownloadButton: Locator;
  txtDownloadButton: Locator;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
    this.getTableButton = this.page.locator('#get_table_report_btn');
    this.outcomePieChart = this.page.locator('#outcomePieChart');
    this.outcomeClassicChart = this.page.locator('#outcomeChart');
    this.reportFirstPosition = this.page.locator('#item0');
    this.zipDownloadButton = this.page.locator('#btn_dl_zip');
    this.txtDownloadButton = this.page.locator('#btn_dl_txt');
  }

  async generateLastYearReport(): Promise<void> {
    //Act
    await this.getTableButton.click();
  }

  async downloadReportTxt(): Promise<void> {
    //Act

    await this.txtDownloadButton.click();
    
  }

  async downloadReportZip(): Promise<void> {
    //Act

    await this.zipDownloadButton.click();
    
  }
}
