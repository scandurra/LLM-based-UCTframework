import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const leaveComuneEmpty = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.leaveComuneEmpty();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC2_ID1', 'Lascia vuoto il campo del comune', 'Il sistema richiede la selezione del comune', 'La selezione del comune è stata richiesta correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.isComuneRequired()).toBeTruthy();
}

export const tryToConfirmSearch = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.tryToApplySearch();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC2_ID2', 'Tenta di confermare la ricerca', 'La ricerca non procede e viene mostrato un messaggio di errore', 'Il messaggio di errore è stato visualizzato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.isErrorVisible()).toBeTruthy();
}