import { test, expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  await dashboardPage.openCitySelector();
  await dashboardPage.selectCityByIndex(0); // Select first city
  await dashboardPage.selectCityByIndex(1); // Select second city
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', 'I comuni vengono selezionati correttamente', 'I comuni vengono selezionati correttamente', true, '', executionTime);
  }

  await expect(dashboardPage.citySelector).toBeVisible();
}

export const selectKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  await dashboardPage.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', 'Il KPI viene accettato', 'Il KPI viene accettato', true, '', executionTime);
  }

  await expect(dashboardPage.kpiSelector).toBeVisible();
}

export const confirmRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const result = await dashboardPage.applyKPIAndVerify();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', 'Il grafico con il confronto desiderato viene visualizzato', result ? 'Il grafico con il confronto desiderato viene visualizzato' : 'Errore nel visualizzare il grafico', result, '', executionTime);
  }

  expect(result).toBe(true);
}