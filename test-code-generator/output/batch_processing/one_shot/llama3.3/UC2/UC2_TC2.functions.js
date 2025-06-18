import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAsUnregisteredUser = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC2_ID1', 'Accedi alla piattaforma come utente non registrato', 'La home page della piattaforma è visibile ma senza accesso alle funzioni riservate', 'La home page della piattaforma è stata visualizzata', true, {}, executionTime);
  }
}

export const tryToAccessDashboardDirectly = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_HOME_URL);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2_TC2_ID2', 'Tenta di accedere direttamente alla dashboard tramite URL', 'Viene richiesta la registrazione o il login per procedere', 'La dashboard non è accessibile', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_LOGIN_URL); // Assuming E2E_LOGIN_URL is the URL of the login page
}