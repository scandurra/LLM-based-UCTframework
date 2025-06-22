import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessPlatformAndAuthenticate(page, null);
  await selectCensusSheetMenu(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC1_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'La lista delle schede censimento è visibile', true, {}, executionTime);
  }
}

export const clickAzioniButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', 'Viene visualizzata la palette di operazioni disponibili', 'La palette di operazioni è visibile', true, {}, executionTime);
  }
}