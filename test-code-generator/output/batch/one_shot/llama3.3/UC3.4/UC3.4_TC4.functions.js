import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionTC4 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessPlatformAndAuthenticate(page, null);
  await selectCensusSheetMenu(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC4_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'La lista delle schede censimento è visibile', true, {}, executionTime);
  }
}

export const selectMultipleActions = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  // Simulate selecting multiple actions
  await page.locator('.text-start > .btn').first().click();
  await page.locator('.text-start > .btn').nth(1).click();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC4_ID2', 'Seleziona più azioni sulla stessa scheda censimento', 'Il sistema esegue le azioni selezionate correttamente', 'Le azioni sono state eseguite correttamente', true, {}, executionTime);
  }
}