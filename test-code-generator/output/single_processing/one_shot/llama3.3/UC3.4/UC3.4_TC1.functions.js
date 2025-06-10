import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

export const clickAzioniButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.waitForTimeout(1000); // wait for the page to load
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4_TC1_ID2', 'Click azioni button', 'Azioni button clicked', 'Azioni button clicked', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('.text-start > .btn')).toBeVisible();
}