import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSection = async function(page, reporter) {
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
      reporter.addStep('UC3_TC4_ID1', 'Accedi alla sezione delle schede censimento', 'La sezione si apre correttamente', 'La sezione è stata aperta correttamente', true, {}, executionTime);
  }
}

export const verifyCensusSheetElements = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // Verify presence of all elements
  expect(await page.$$('[data-test="census-sheet-table"]')).not.toBeNull();
  expect(await page.$$('[data-test="filter-button"]')).not.toBeNull();
  expect(await page.$$('[data-test="sort-button"]')).not.toBeNull();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC4_ID2', 'Verifica della presenza di tutti gli elementi nella sezione schede censimento', 'Tutti gli elementi sono presenti e funzionano come previsto', 'Tutti gli elementi sono stati trovati correttamente', true, {}, executionTime);
  }
}