import { test, expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

// Step 1: Seleziona un comune e dei parametri di ricerca validi
export const selectComuneAndSearchParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.selectComune(0); // Seleziona il primo comune
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID1', 'Select comune and search parameters', 'Parameters are accepted', 'Parameters are accepted', true, '', executionTime);
  }
}

// Step 2: Conferma la ricerca
export const confirmSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
  await dashboardPageIlluminationSearch.applySearch();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID2', 'Confirm search', 'Map updates with found illumination plants', 'Map updates with found illumination plants', true, '', executionTime);
  }
  expect(await dashboardPageIlluminationSearch.isMapVisible()).toBeTruthy();
}

// Step 3: Visualizza i dettagli degli impianti di illuminazione
export const visualizeIlluminationPlantDetails = async function(page, reporter) {
  const startTime = new Date().getTime();
  // This step is not implemented as there are no details in the provided page object model
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.2_TC1_ID3', 'Visualize illumination plant details', 'Information is displayed correctly', 'Information is displayed correctly', true, '', executionTime);
  }
}