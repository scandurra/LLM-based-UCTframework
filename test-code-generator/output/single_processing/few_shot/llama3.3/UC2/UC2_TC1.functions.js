import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

// Step 1
export const accessPlatform = async function(page, reporter) {
  let startTime = Date.now();
  await page.goto(process.env.E2E_HOME_URL);
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Access platform', 'Home page is visible', 'Home page is visible', true, {}, endTime - startTime);
  }
  expect(await page.isVisible('text=Home Page')).toBeTruthy();
}

// Step 2
export const selectDashboardMenu = async function(page, reporter) {
  const sidebarPage = new SidebarPage(page);
  let startTime = Date.now();
  await sidebarPage.clickDashboardLink();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', 'Dashboard section opens correctly', 'Dashboard section opens correctly', true, {}, endTime - startTime);
  }
  expect(await page.isVisible('text=Dashboard')).toBeTruthy();
}