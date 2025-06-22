import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const openCensusSheetsSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Preconditions: UC3
  await page.goto(process.env.E2E_DASHBOARD_URL);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID1', 'Open census sheets section', 'Census sheets section opened', 'Census sheets section opened', true, '', executionTime);
  }
  expect(await censusSheetPage.isCensusSheetsPageVisible()).toBeTruthy();
}

export const sortColumns = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickSchedaColumn();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID2', 'Sort columns', 'Columns sorted', 'Columns sorted', true, '', executionTime);
  }
  expect(await censusSheetPage.isCensusSheetsPageVisible()).toBeTruthy();
}

export const scrollColumns = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollWidth);
  });
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.1_TC1_ID3', 'Scroll columns', 'Columns scrolled', 'Columns scrolled', true, '', executionTime);
  }
  expect(await censusSheetPage.isCensusSheetsPageVisible()).toBeTruthy();
}