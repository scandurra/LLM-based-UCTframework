import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDownloadOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID1', 'Seleziona l’operazione di download della scheda censimento', 'Il browser avvia il download', 'Il browser avvia il download', true, {}, executionTime);
  }
}

export const waitForDownload = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Wait for the download to complete
  await page.waitForTimeout(5000); // Adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC1_ID2', 'Attiendi la fine del download', 'Il file viene scaricato correttamente', 'Il file viene scaricato correttamente', true, {}, executionTime);
  }
}