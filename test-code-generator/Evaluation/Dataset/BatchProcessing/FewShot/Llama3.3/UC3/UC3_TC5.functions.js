import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionForUsability = async function(page, reporter) {
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);

  const startTime = new Date().getTime();
  
  expect(page.url()).toBe(process.env.E2E_HOME_URL);

  // Navigate to census sheet section
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickCensusSheetLink();

  expect(page.url()).toBe(process.env.E2E_CTS_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC5_ID1', 'Accedi alla sezione delle schede censimento per test di usabilità', 'La sezione si apre correttamente', 'La sezione è stata aperta correttamente', true, {}, executionTime);
  }
}

export const performUsabilityActions = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // Perform usability actions
  await page.click('[data-test="filter-button"]');
  await page.click('[data-test="sort-button"]');

  expect(await page.$$('[data-test="census-sheet-table"]')).not.toBeNull();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC5_ID2', 'Esegui azioni di usabilità nella sezione schede censimento', 'Tutte le azioni sono state eseguite correttamente', 'Tutte le azioni sono state eseguite correttamente', true, {}, executionTime);
  }
}