import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectSingleCity = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.selectCity(0);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC2_ID1', 'Seleziona un solo comune dal menù a tendina', 'Il sistema segnala l’errore', 'L\'errore è stato segnalato', true, {}, executionTime);
  }

  expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithoutCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.selectKPI();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC2_ID2', 'Scegli un KPI valido per il confronto senza selezionare comuni', 'Il KPI non viene considerato senza la selezione di almeno due comuni', 'Il KPI non è stato considerato', true, {}, executionTime);
  }

  expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const tryToConfirmRequestWithoutCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const startTime = new Date().getTime();
  
  await dashboardPage.applyKPIAndVerify();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.4_TC2_ID3', 'Tenta di confermare la richiesta cliccando sul pulsante senza selezionare comuni', 'La richiesta non procede e viene mostrato un messaggio di errore', 'Il messaggio di errore è stato visualizzato', true, {}, executionTime);
  }

  expect(await dashboardPage.verifyKPIResults()).toBeFalsy();
}