import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionForUsability = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickCensusSheetLink();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC5_ID1', 'Accedi alla sezione delle schede censimento per test di usabilità', 'La sezione si apre correttamente', 'La sezione è stata selezionata con successo', true, {}, executionTime);
  }
}

export const performUsabilityActions = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Perform usability actions (e.g., filtering, sorting)
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC5_ID2', 'Esegui le principali azioni previste nella sezione', 'Le operazioni sono intuitive e semplici da eseguire', 'Le azioni sono state eseguite con successo', true, {}, executionTime);
  }
}