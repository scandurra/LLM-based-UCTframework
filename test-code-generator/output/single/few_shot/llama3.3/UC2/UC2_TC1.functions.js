import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessPlatformAsRegisteredUser = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Access platform as registered user', 'Home page is visible', 'Home page is visible', true, '', executionTime);
  }
  await expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const selectDashboardMenu = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickDashboardLink();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', 'Dashboard section opens correctly', 'Dashboard section opens correctly', true, '', executionTime);
  }
  await expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}