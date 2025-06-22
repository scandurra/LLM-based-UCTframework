import { test, expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi';

export const selectCities = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  let startTime = Date.now();
  await dashboardPage.openCitySelector();
  await dashboardPage.selectCityByIndex(0); // Select first city
  await dashboardPage.selectCityByIndex(1); // Select second city
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID1', 'Select cities', 'Cities are selected correctly', 'Cities are selected correctly', true, {}, endTime - startTime);
  }
  expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectKPI = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  let startTime = Date.now();
  await dashboardPage.selectKPI();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID2', 'Select KPI', 'KPI is accepted', 'KPI is accepted', true, {}, endTime - startTime);
  }
  expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequest = async function(page, reporter) {
  const dashboardPage = new DashboardPageBenchmarkingKpi(page);
  let startTime = Date.now();
  await dashboardPage.applyKPIAndVerify(5000); // Wait for results and verify
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.4_TC1_ID3', 'Confirm request', 'Graph with desired comparison is displayed', 'Graph with desired comparison is displayed', true, {}, endTime - startTime);
  }
  expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}