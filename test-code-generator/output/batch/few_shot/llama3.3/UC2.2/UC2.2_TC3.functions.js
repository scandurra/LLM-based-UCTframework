import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const insertInvalidParameters = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.insertInvalidParameters();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC3_ID1', 'Inserisci dei parametri di ricerca non validi', 'Il sistema rileva l’errore e richiede la correzione', 'L\'errore è stato rilevato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.isErrorVisible()).toBeTruthy();
}

export const tryToConfirmSearchWithInvalidParameters = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.tryToApplySearch();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC3_ID2', 'Tenta di confermare la ricerca con parametri non validi', 'La ricerca non procede e viene mostrato un messaggio di errore', 'Il messaggio di errore è stato visualizzato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.isErrorVisible()).toBeTruthy();
}