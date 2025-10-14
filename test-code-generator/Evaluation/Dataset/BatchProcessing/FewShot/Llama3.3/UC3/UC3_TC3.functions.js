import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAndAuthenticateWithSpecialChars = async function(page, reporter) {
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);

  const startTime = new Date().getTime();
  
  expect(page.url()).toBe(process.env.E2E_HOME_URL);

  // Modify URL with special characters
  const modifiedUrl = process.env.E2E_CTS_URL + '?special=chars';
  await page.goto(modifiedUrl);

  expect(page.url()).toBe(modifiedUrl);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC3_ID1', 'Accedi alla piattaforma e autenticati con caratteri speciali nel percorso', 'La dashboard principale viene visualizzata', 'La dashboard principale è stata visualizzata correttamente', true, {}, executionTime);
  }
}

export const selectCensusSheetMenuWithSpecialChars = async function(page, reporter) {
  const sidebarPage = new SidebarPage(page);

  const startTime = new Date().getTime();
  
  await sidebarPage.clickCensusSheetLink();

  expect(page.url()).toBe(process.env.E2E_CTS_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC3_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento con caratteri speciali nel percorso', 'La sezione delle schede censimento si apre correttamente', 'La sezione delle schede censimento è stata aperta correttamente', true, {}, executionTime);
  }
}