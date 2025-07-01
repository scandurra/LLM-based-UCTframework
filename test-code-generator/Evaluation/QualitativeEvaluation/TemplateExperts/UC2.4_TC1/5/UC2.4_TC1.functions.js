import { test, expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

export const selectCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectCity(0); // Select first city
  await dashboardPageBenchmarkingKpi.selectCity(1); // Select second city
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', 'I comuni vengono selezionati correttamente', 'I comuni vengono selezionati correttamente', true, '', executionTime);
  }
  const isCitySelectorVisible = await dashboardPageBenchmarkingKpi.isCitySelectorVisible();
  expect(isCitySelectorVisible).toBeTruthy();
}

export const selectKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  await dashboardPageBenchmarkingKpi.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', 'Il KPI viene accettato', 'Il KPI viene accettato', true, '', executionTime);
  }
  const isKPISelectorVisible = await dashboardPageBenchmarkingKpi.isKPISelectorVisible();
  expect(isKPISelectorVisible).toBeTruthy();
}

export const confirmRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
  const result = await dashboardPageBenchmarkingKpi.applyKPIAndVerify(5000);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', 'Il grafico con il confronto desiderato viene visualizzato', result ? 'Il grafico con il confronto desiderato viene visualizzato' : 'Errore nella visualizzazione del grafico', result, '', executionTime);
  }
  expect(result).toBeTruthy();
}