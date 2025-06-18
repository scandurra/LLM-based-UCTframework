import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const insertInvalidParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.insertInvalidParameters();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC3_ID1', 'Inserisci dei parametri di ricerca non validi', 'Il sistema rileva l’errore e richiede la correzione', 'L\'errore è stato rilevato', true, {}, executionTime);
  }
}

export const tryToConfirmSearchWithInvalidParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.tryToApplySearchWithInvalidParameters();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC3_ID2', 'Tenta di confermare la ricerca', 'La ricerca non procede e viene mostrato un messaggio di errore', 'La ricerca non è stata eseguita', true, {}, executionTime);
  }
  expect(await dashboardPageIlluminationSearch.isErrorVisible()).toBeTruthy();
}