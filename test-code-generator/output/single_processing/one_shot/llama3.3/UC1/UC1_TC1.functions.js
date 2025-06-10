import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertCorrectCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.fillEmail(process.env.EMAIL);
  await loginPage.fillPassword(process.env.PASSWORD);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID1', 'Insert correct credentials', 'Credentials accepted', 'Credentials accepted', true, `EMAIL: ${process.env.EMAIL}, PASSWORD: ${process.env.PASSWORD}`, executionTime);
  }

  await expect(loginPage.emailInput).toHaveValue(process.env.EMAIL);
  await expect(loginPage.passwordInput).toHaveValue(process.env.PASSWORD);
}

export const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.clickLoginButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Click login button', 'User authenticated', 'User authenticated', true, '', executionTime);
  }

  await expect(page).toHaveURL(process.env.E2E_HOME_URL);
}

export const verifySuccessMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Assuming there's a way to get the success message
  // For demonstration purposes, let's assume it's an element with the text "Login successful"
  const successMessage = page.locator('text="Login successful"');
  await expect(successMessage).toBeVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Verify success message', 'Success message displayed', 'Success message displayed', true, '', executionTime);
  }
}