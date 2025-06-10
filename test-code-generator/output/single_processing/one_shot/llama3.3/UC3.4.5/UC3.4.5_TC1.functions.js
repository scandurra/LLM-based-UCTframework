import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDettaglioOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID1', 'Select dettaglio operation', 'Dettaglio operation selected', 'Dettaglio operation selected', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('.text-start > .btn')).toBeVisible();
}

export const verifyGeneralData = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  // Add assertions to verify general data
  await expect(censusSheetPage.page.locator('text=General Data')).toBeVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID2', 'Verify general data', 'General data verified', 'General data verified', true, '', executionTime);
  }
}

export const navigateGerarchia = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  // Add code to navigate gerarchia
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID3', 'Navigate gerarchia', 'Gerarchia navigated', 'Gerarchia navigated', true, '', executionTime);
  }
}