import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectComuneAndSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.selectComune(0);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', 'I parametri vengono accettati', 'I parametri sono stati accettati', true, {}, executionTime);
  }
}

export const confirmSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.applySearch();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID2', 'Conferma la ricerca', 'La mappa si aggiorna con gli impianti di illuminazione trovati', 'La mappa è stata aggiornata', true, {}, executionTime);
  }
  expect(await dashboardPageIlluminationSearch.isMapUpdated()).toBeTruthy();
}

export const viewDetails = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.viewDetails();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', 'Le informazioni vengono visualizzate correttamente', 'Le informazioni sono state visualizzate', true, {}, executionTime);
  }
  expect(await dashboardPageIlluminationSearch.areDetailsVisible()).toBeTruthy();
}