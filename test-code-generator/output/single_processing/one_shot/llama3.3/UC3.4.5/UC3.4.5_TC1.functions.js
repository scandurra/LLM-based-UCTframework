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
  expect(await page.url()).toContain('dettaglio');
}

export const verifyGeneralData = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  // Add assertions to verify general data
  await expect(page).toContainText('Area:');
  await expect(page).toContainText('Gerarchia dei POD e Aree Omogenee:');
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
  await page.click('text="POD"');
  await page.click('text="Aree Omogenee"');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID3', 'Navigate gerarchia', 'Gerarchia navigated', 'Gerarchia navigated', true, '', executionTime);
  }
  expect(page.url()).toContain('gerarchia');
}