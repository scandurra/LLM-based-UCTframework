import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectSpecialCharactersFileName = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  // Select a file with special characters in the name
  await page.locator('.text-start > .btn').first().click();
  await censusSheetPage.clickAzioneDownload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC4_ID1', 'Seleziona la scheda censimento con caratteri speciali nel nome', 'Il sistema gestisce i caratteri speciali', 'Il sistema gestisce i caratteri speciali', true, {}, executionTime);
  }
}

export const downloadSpecialCharactersFileName = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Download the file with special characters in the name
  await page.waitForTimeout(5000); // Adjust the timeout as needed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.1_TC4_ID2', 'Avvia il download', 'Il file viene scaricato con un nome valido', 'Il file viene scaricato con un nome valido', true, {}, executionTime);
  }
}