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
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', 'La home page della piattaforma è visibile', 'La home page della piattaforma è stata visualizzata', true, {}, executionTime);
  }
}

export const selectDashboardMenu = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickDashboardMenu();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', 'La sezione della dashboard si apre correttamente', 'La dashboard è stata selezionata', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_HOME_URL); // Assuming E2E_HOME_URL is the URL of the home page
}