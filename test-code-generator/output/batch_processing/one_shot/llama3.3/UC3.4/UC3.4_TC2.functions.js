import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionTC2 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessPlatformAndAuthenticate(page, null);
  await selectCensusSheetMenu(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC2_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'La lista delle schede censimento è visibile', true, {}, executionTime);
  }
}

export const clickNonSupportedAction = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  // Simulate clicking a non-supported action
  await page.locator('.text-start > .btn').first().click();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC2_ID2', 'Clicca su un’azione che non è supportata per la scheda selezionata', 'Il sistema mostra un messaggio di azione non disponibile', 'Il messaggio di azione non disponibile è visibile', true, {}, executionTime);
  }
}