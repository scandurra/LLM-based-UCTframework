import { test, expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

// Step 1: Seleziona due o più comuni dal menù a tendina
export const selectCities = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  await dashboardPage.openCitySelector();
  await dashboardPage.selectCityByIndex(0);
  await dashboardPage.selectCityByIndex(1);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID1', 'Select cities from dropdown menu', 'Cities are selected correctly', 'Cities are selected correctly', true, '', executionTime);
  }
}

// Step 2: Scegli un KPI valido per il confronto
export const selectKPI = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  await dashboardPage.selectKPI();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID2', 'Choose a valid KPI for comparison', 'KPI is accepted', 'KPI is accepted', true, '', executionTime);
  }
}

// Step 3: Conferma la richiesta cliccando sul pulsante
export const confirmRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  const result = await dashboardPage.applyKPIAndVerify();
  expect(result).toBeTruthy();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID3', 'Confirm request by clicking on the button', 'Comparison chart is displayed', 'Comparison chart is displayed', result, '', executionTime);
  }
}