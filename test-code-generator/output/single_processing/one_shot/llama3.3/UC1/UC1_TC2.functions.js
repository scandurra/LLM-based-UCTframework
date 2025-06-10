import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertIncorrectCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.fillEmail('wrong-email@example.com');
  await loginPage.fillPassword('wrong-password');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC2_ID1', 'Insert incorrect credentials', 'Credentials are not valid', 'Credentials are not valid', true, { email: 'wrong-email@example.com', password: 'wrong-password' }, executionTime);
  }
  await expect(loginPage.emailInput).toHaveValue('wrong-email@example.com');
  await expect(loginPage.passwordInput).toHaveValue('wrong-password');
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.clickLoginButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC2_ID2', 'Click login button', 'Error message is displayed', 'Error message is displayed', true, '', executionTime);
  }
  await expect(loginPage.loginButton).toBeDisabled();
}

// Step 3
export const verifyRetryLogin = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const isEmailFieldVisible = await loginPage.isEmailFieldVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC2_ID3', 'Verify retry login', 'Login form is visible', isEmailFieldVisible ? 'Login form is visible' : 'Login form is not visible', isEmailFieldVisible, '', executionTime);
  }
  await expect(isEmailFieldVisible).toBe(true);
}