import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const searchForCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await page.fill('#search-input', 'city-name');
  await page.click('#search-button');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC5_ID1', 'Utilizza la funzione di ricerca per trovare i comuni desiderati', 'I comuni vengono trovati correttamente', 'I comuni sono stati trovati', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
}

export const selectKPIUsingFilter = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await page.click('#filter-button');
  await page.selectOption('#kpi-select', 'kpi-value');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC5_ID2', 'Scegli un KPI valido per il confronto utilizzando il filtro', 'Il KPI viene accettato', 'Il KPI è stato selezionato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithSearchedCitiesAndFilteredKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.applyKPIAndVerify();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC5_ID3', 'Conferma la richiesta cliccando sul pulsante con i comuni cercati e il KPI filtrato', 'Il grafico con il confronto desiderato viene visualizzato correttamente', 'Il grafico è stato visualizzato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeTruthy();
}