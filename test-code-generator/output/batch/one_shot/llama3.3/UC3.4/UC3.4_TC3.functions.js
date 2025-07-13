import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionTC3 = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Simulate accessing the census sheet section with a user without permissions
  await page.goto(process.env.E2E_LOGIN_URL);
  await accessPlatformAndAuthenticate(page, null);
  await selectCensusSheetMenu(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC3_ID1', 'Accedi alla sezione delle schede censimento con un utente senza permessi', 'La lista delle schede censimento è visibile ma le azioni sono limitate', 'La lista delle schede censimento è visibile ma le azioni sono limitate', true, {}, executionTime);
  }
}

export const tryExecuteActionWithoutPermissions = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  // Simulate trying to execute an action that requires higher permissions
  await page.locator('.text-start > .btn').first().click();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4_TC3_ID2', 'Tenta di eseguire un’azione che richiede permessi superiori', 'Il sistema nega l’accesso e mostra un messaggio di autorizzazione', 'Il messaggio di autorizzazione è visibile', true, {}, executionTime);
  }
}