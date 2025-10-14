import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMaxCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  for (let i = 0; i < 10; i++) {
    await dashboardPage.selectCity(i);
  }

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC4_ID1', 'Seleziona il massimo numero di comuni possibile dal menù a tendina', 'I comuni vengono selezionati senza errori', 'I comuni sono stati selezionati', true, {}, executionTime);
  }

  expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithMaxCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.selectKPI();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC4_ID2', 'Scegli un KPI valido per il confronto con massimo numero di comuni', 'Il KPI viene accettato', 'Il KPI è stato accettato', true, {}, executionTime);
  }

  expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithMaxCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.applyKPIAndVerify();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC4_ID3', 'Conferma la richiesta cliccando sul pulsante con massimo numero di comuni', 'Il grafico con il confronto desiderato viene visualizzato correttamente', 'Il grafico è stato visualizzato', true, {}, executionTime);
  }

  expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}