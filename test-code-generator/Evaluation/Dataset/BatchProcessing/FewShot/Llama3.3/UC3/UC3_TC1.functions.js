import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAndAuthenticate = async function(page, reporter) {
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);

  const startTime = new Date().getTime();
  
  expect(page.url()).toBe(process.env.E2E_HOME_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', 'La dashboard principale viene visualizzata', 'La dashboard principale è stata visualizzata correttamente', true, {}, executionTime);
  }
}

export const selectCensusSheetMenu = async function(page, reporter) {
  const sidebarPage = new SidebarPage(page);

  const startTime = new Date().getTime();
  
  await sidebarPage.clickCensusSheetLink();

  expect(page.url()).toBe(process.env.E2E_CTS_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', 'La sezione delle schede censimento si apre correttamente', 'La sezione delle schede censimento è stata aperta correttamente', true, {}, executionTime);
  }
}