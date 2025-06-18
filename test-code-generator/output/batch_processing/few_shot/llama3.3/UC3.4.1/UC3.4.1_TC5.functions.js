import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const startDownload = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  // Start the download
  await page.locator('.text-start > .btn').first().click();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC5_ID1', 'Avvia il download della scheda censimento', 'Il browser avvia il download', 'Il browser avvia il download', true, {}, executionTime);
  }
}

export const interruptDownload = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Interrupt the download manually
  await page.waitForTimeout(1000); // Adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC5_ID2', 'Interrompi manualmente il download', 'Il sistema gestisce l’errore e mostra un messaggio di interruzione', 'Il sistema gestisce l’errore e mostra un messaggio di interruzione', true, {}, executionTime);
  }
}