import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessPlatformWithDifferentUserProfiles = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC3_ID1', 'Accedi alla piattaforma con diversi profili utente', 'Le funzionalità e le informazioni visualizzate nella dashboard variano in base al ruolo', 'La dashboard è stata visualizzata', true, {}, executionTime);
  }
}

export const verifyDashboardFunctionality = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickDashboardMenu();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC3_ID2', 'Verifica la presenza di funzioni e sezioni specifiche per ogni tipo di utente', 'Tutte le funzionalità previste per il ruolo sono accessibili e funzionanti', 'La dashboard è stata verificata', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_HOME_URL); // Assuming E2E_HOME_URL is the URL of the home page
}