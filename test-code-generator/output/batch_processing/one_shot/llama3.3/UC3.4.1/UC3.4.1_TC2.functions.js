import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const tryDownloadWithoutSelection = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  // Try to download without selecting a file
  await page.locator('.text-start > .btn').first().click();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC2_ID1', 'Accedi alla sezione di download senza selezionare la scheda censimento', 'Il sistema richiede la selezione del file', 'Il sistema richiede la selezione del file', true, {}, executionTime);
  }
}

export const verifyDownloadError = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Verify that the download does not proceed and an error message is shown
  await page.waitForTimeout(1000); // Adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC2_ID2', 'Tenta di avviare il download senza selezione', 'Il sistema non procede e mostra un messaggio di errore', 'Il sistema non procede e mostra un messaggio di errore', true, {}, executionTime);
  }
}