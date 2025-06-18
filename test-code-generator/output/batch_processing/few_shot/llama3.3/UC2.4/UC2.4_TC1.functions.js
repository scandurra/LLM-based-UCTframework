import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const selectMultipleCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectCity(0);
  await dashboardPageBenchmarkingKpi.selectCity(1);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', 'I comuni vengono selezionati correttamente', 'I comuni sono stati selezionati', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', 'Il KPI viene accettato', 'Il KPI è stato selezionato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.applyKPIAndVerify();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', 'Il grafico con il confronto desiderato viene visualizzato', 'Il grafico è stato visualizzato', true, {}, executionTime);
  }
  expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeTruthy();
}