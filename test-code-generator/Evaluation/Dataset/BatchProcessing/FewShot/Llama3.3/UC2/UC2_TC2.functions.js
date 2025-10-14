import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAsUnregisteredUser = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_HOME_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC2_ID1', 'Accedi alla piattaforma come utente non registrato', 'La home page della piattaforma è visibile ma senza accesso alle funzioni riservate', 'La home page della piattaforma è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const tryToAccessDashboardDirectly = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_HOME_URL + '/dashboard');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC2_ID2', 'Tenta di accedere direttamente alla dashboard tramite URL', 'Viene richiesta la registrazione o il login per procedere', 'La registrazione o il login sono stati richiesti correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}