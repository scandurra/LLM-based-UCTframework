import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessPlatformAsRegisteredUser = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', 'La home page della piattaforma è visibile', 'La home page della piattaforma è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const selectDashboardMenu = async function(page, reporter) {
  const sidebarPage = new SidebarPage(page);
  const startTime = new Date().getTime();
  
  await sidebarPage.clickDashboardMenu();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', 'La sezione della dashboard si apre correttamente', 'La dashboard è stata aperta correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL + '/dashboard');
}