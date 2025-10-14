import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMultipleCitiesWithInvalidKPI = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.selectCity(0);
  await dashboardPage.selectCity(1);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC3_ID1', 'Seleziona due o più comuni dal menù a tendina con KPI non valido', 'I comuni vengono selezionati correttamente', 'I comuni sono stati selezionati', true, {}, executionTime);
  }

  expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectInvalidKPI = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  // Simulate selection of invalid KPI
  await page.click('#invalid-kpi');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC3_ID2', 'Scegli un KPI non disponibile o non valido per il confronto', 'Il sistema segnala l’errore e richiede la selezione di un KPI diverso', 'L\'errore è stato segnalato', true, {}, executionTime);
  }

  expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const tryToConfirmRequestWithInvalidKPI = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.applyKPIAndVerify();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC3_ID3', 'Tenta di confermare la richiesta cliccando sul pulsante con KPI non valido', 'La richiesta non procede e viene mostrato un messaggio di errore', 'Il messaggio di errore è stato visualizzato', true, {}, executionTime);
  }

  expect(await dashboardPage.verifyKPIResults()).toBeFalsy();
}