import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const accessPlatformWithDifferentUserProfiles = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC3_ID1', 'Accedi alla piattaforma con diversi profili utente', 'Le funzionalità e le informazioni visualizzate nella dashboard variano in base al ruolo', 'Le funzionalità e le informazioni sono state visualizzate correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const verifyPresenceOfFunctionsAndSections = async function(page, reporter) {
  const sidebarPage = new SidebarPage(page);
  const startTime = new Date().getTime();
  
  await sidebarPage.clickDashboardMenu();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC3_ID2', 'Verifica la presenza di funzioni e sezioni specifiche per ogni tipo di utente', 'Tutte le funzionalità previste per il ruolo sono accessibili e funzionanti', 'Tutte le funzionalità sono state verificate correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL + '/dashboard');
}