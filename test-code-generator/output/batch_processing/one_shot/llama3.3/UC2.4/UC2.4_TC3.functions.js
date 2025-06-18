import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMultipleCitiesWithInvalidKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectCity(0);
  await dashboardPageBenchmarkingKpi.selectCity(1);
  // simulate selecting an invalid KPI
  await page.click('#invalid-kpi-option');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC3_ID1', 'Seleziona due o più comuni dal menù a tendina con KPI non valido', 'Il sistema segnala l’errore e richiede la selezione di un KPI diverso', 'L\'errore è stato segnalato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
}

export const tryToConfirmRequestWithInvalidKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.applyKPIAndVerify(1000); // wait for a short time to check if the request is not processed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC3_ID2', 'Tenta di confermare la richiesta cliccando sul pulsante con KPI non valido', 'La richiesta non procede e viene mostrato un messaggio di errore', 'La richiesta non è stata processata', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeFalsy();
}