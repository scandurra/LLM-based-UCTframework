import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMultipleComuni = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.selectMultipleComuni();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC4_ID1', 'Seleziona più comuni', 'I comuni vengono aggiunti alla lista di ricerca', 'I comuni sono stati aggiunti', true, {}, executionTime);
  }
}

export const confirmSearchWithMultipleComuni = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.applySearchWithMultipleComuni();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.2_TC4_ID2', 'Conferma la ricerca', 'La mappa si aggiorna con gli impianti di illuminazione trovati', 'La mappa è stata aggiornata', true, {}, executionTime);
  }
  expect(await dashboardPageIlluminationSearch.isMapUpdated()).toBeTruthy();
}