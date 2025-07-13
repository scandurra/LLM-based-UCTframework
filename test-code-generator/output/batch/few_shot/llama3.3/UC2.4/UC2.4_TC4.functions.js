import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMaximumNumberOfCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  for (let i = 0; i < 10; i++) { // simulate selecting the maximum number of cities
    await dashboardPageBenchmarkingKpi.selectCity(i);
  }
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC4_ID1', 'Seleziona il massimo numero di comuni possibile dal menù a tendina', 'I comuni vengono selezionati senza errori', 'I comuni sono stati selezionati', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithMaximumNumberOfCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC4_ID2', 'Scegli un KPI valido per il confronto con il massimo numero di comuni selezionati', 'Il KPI viene accettato', 'Il KPI è stato selezionato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithMaximumNumberOfCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.applyKPIAndVerify();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC4_ID3', 'Conferma la richiesta cliccando sul pulsante con il massimo numero di comuni selezionati', 'Il grafico con il confronto desiderato viene visualizzato correttamente', 'Il grafico è stato visualizzato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeTruthy();
}