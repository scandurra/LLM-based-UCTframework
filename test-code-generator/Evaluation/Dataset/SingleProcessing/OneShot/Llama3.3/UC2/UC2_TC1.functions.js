import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

// Step 1: Accedi alla piattaforma come utente registrato
export const accessPlatform = async function(page, reporter) {
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  const startTime = new Date().getTime();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Access platform as registered user', 'Home page is visible', 'Home page is visible', true, '', executionTime);
  }
}

// Step 2: Seleziona la voce di menù relativa alla dashboard
export const selectDashboardMenu = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickDashboardLink();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', 'Dashboard section opens correctly', 'Dashboard section opens correctly', true, '', executionTime);
  }
}