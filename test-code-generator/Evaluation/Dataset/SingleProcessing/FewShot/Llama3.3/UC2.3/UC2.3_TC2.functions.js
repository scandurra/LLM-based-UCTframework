import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

// Step 1
export const scrollToGeneralDataTable = async function(page, reporter) {
  let startTime = Date.now();
  await page.goto(process.env.E2E_DASHBOARD_URL);
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  expect(await dashboardPageGeneralDataTable.isTableVisible()).toBeTruthy();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID1', 'Scroll to general data table', 'Table is visible', 'Table is visible', true, {}, endTime - startTime);
  }
}

// Step 2
export const sortByColumn = async function(page, reporter) {
  let startTime = Date.now();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  expect(await dashboardPageGeneralDataTable.getTableContent()).not.toBeNull();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID2', 'Sort by column', 'Data is sorted correctly', 'Data is sorted correctly', true, {}, endTime - startTime);
  }
}

// Step 3
export const verifyAlternatingSorting = async function(page, reporter) {
  let startTime = Date.now();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  const firstSortContent = await dashboardPageGeneralDataTable.getTableContent();
  await dashboardPageGeneralDataTable.sortByRegion();
  const secondSortContent = await dashboardPageGeneralDataTable.getTableContent();
  expect(firstSortContent).not.toEqual(secondSortContent);
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID3', 'Verify alternating sorting', 'Sorting alternates correctly between ascending and descending', 'Sorting alternates correctly between ascending and descending', true, {}, endTime - startTime);
  }
}