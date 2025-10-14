import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMultipleComuni = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.selectMultipleComuni();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC4_ID1', 'Seleziona più comuni', 'I comuni vengono selezionati correttamente', 'I comuni sono stati selezionati correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.areMultipleComuniSelected()).toBeTruthy();
}

export const confirmSearchWithMultipleComuni = async function(page, reporter) {
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  const startTime = new Date().getTime();
  
  await dashboardPageIlluminationSearch.applySearch();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.2_TC4_ID2', 'Conferma la ricerca con più comuni', 'La mappa si aggiorna con gli impianti di illuminazione trovati per tutti i comuni selezionati', 'La mappa è stata aggiornata correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageIlluminationSearch.isMapUpdated()).toBeTruthy();
}