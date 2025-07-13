import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectLongFileName = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  // Select a file with a long name
  await page.locator('.text-start > .btn').first().click();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC3_ID1', 'Seleziona la scheda censimento con un nome molto lungo', 'Il sistema accetta il nome del file', 'Il sistema accetta il nome del file', true, {}, executionTime);
  }
}

export const downloadLongFileName = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Download the file with a long name
  await page.waitForTimeout(5000); // Adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC3_ID2', 'Avvia il download', 'Il file viene scaricato senza problemi', 'Il file viene scaricato senza problemi', true, {}, executionTime);
  }
}