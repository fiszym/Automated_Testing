import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { loginToService } from '../helper/login.helper';
import { ReportPage } from '../pages/report.page';

test.describe('Report tests', () => {
  let reportPage: ReportPage;
  // All flaky tests in describe group will get 3 retry attempts.
  test.describe.configure({ retries: 3 });

  test.beforeEach(async ({ page }) => {
    //Arrange
    reportPage = new ReportPage(page);
    //Act
    await loginToService(page, loginData.userId, loginData.userPwd);
    await reportPage.sideMenu.report.click();
  });

  test(
    'Download half-year raport in .txt',
    {
      tag: ['@report', '@download'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Default half-year raport download in .txt',
        },
      ],
    },
    async ({ page }) => {
      const downloadPromise = page.waitForEvent('download');
      await reportPage.downloadReportTxt();
      const download = await downloadPromise;

      //Assert
      expect(download.suggestedFilename()).toMatch(/\.txt/);
    },
  );

  test(
    'Download half-year raport in .zip',
    {
      tag: ['@report', '@download'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Default half-year raport download in .zip',
        },
      ],
    },
    async ({ page }) => {

      const downloadPromise = page.waitForEvent('download');
      await reportPage.downloadReportZip();
      const download = await downloadPromise;

      //Assert
      expect(download.suggestedFilename()).toMatch(/\.zip/);
    },
  );

  test(
    'Outcome report pie chart',
    {
      tag: ['@report', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Default outcome pie chart',
        },
      ],
    },
    async ({ page }) => {
      await expect(reportPage.outcomePieChart).toBeAttached(); // Checks if it's in the DOM
      await expect(reportPage.outcomePieChart).toBeVisible(); // Checks if it's visible
    },
  );

  test(
    'Outcome report classic line chart',
    {
      tag: ['@report', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Default outcome classic line chart',
        },
      ],
    },
    async ({ page }) => {
      await expect(reportPage.outcomeClassicChart).toBeAttached(); // Checks if it's in the DOM
      await expect(reportPage.outcomeClassicChart).toBeVisible(); // Checks if it's visible
    },
  );

  test(
    'Generating last year report',
    {
      tag: ['@report', '@integration'],
      annotation: [
        {
          type: 'Positive path',
          description: 'Default last year report visibility',
        },
        {
          type: 'Flaky test',
          description:
            'Fail due to instability of application (Jira: #1238 www.examplejira.com/issue=1238)',
        },
      ],
    },
    async ({ page }) => {
      await reportPage.generateLastYearReport();
      await expect(reportPage.reportFirstPosition).toBeVisible();
    },
  );
});
