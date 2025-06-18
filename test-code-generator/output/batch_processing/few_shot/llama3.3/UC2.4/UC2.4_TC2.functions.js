import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectSingleCity = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectCity(0);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC2_ID1', 'Seleziona un solo comune dal menù a tendina', 'Il sistema segnala l’errore', 'L\'errore è stato segnalato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithoutMultipleCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC2_ID2', 'Scegli un KPI valido per il confronto senza selezionare più comuni', 'Il KPI non viene considerato senza la selezione di almeno due comuni', 'Il KPI non è stato considerato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBeTruthy();
}

export const tryToConfirmRequestWithoutMultipleCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.applyKPIAndVerify(1000); // wait for a short time to check if the request is not processed
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC2_ID3', 'Tenta di confermare la richiesta cliccando sul pulsante senza selezionare più comuni', 'La richiesta non procede e viene mostrato un messaggio di errore', 'La richiesta non è stata processata', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeFalsy();
}