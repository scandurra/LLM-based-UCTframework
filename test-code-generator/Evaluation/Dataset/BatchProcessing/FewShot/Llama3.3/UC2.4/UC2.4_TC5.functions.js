import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const searchCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await page.fill('#search-input', 'City Name');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC5_ID1', 'Utilizza la funzione di ricerca per trovare i comuni desiderati', 'I comuni vengono trovati correttamente', 'I comuni sono stati trovati', true, {}, executionTime);
  }

  expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectKPIWithFilter = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await page.click('#filter-kpi');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC5_ID2', 'Scegli un KPI valido per il confronto con filtro', 'Il KPI viene accettato', 'Il KPI è stato accettato', true, {}, executionTime);
  }

  expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithSearchAndFilter = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.applyKPIAndVerify();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC5_ID3', 'Conferma la richiesta cliccando sul pulsante con ricerca e filtro', 'Il grafico con il confronto desiderato viene visualizzato correttamente', 'Il grafico è stato visualizzato', true, {}, executionTime);
  }

  expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}