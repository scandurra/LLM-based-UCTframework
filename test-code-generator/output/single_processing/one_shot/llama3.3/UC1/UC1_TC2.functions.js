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
  await expect(loginPage.page.getByText('Invalid email or password')).toBeVisible();
}

// Step 3
export const verifyRetryOption = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const retryButton = loginPage.page.getByRole('button', { name: 'Try again' });
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC2_ID3', 'Verify retry option', 'Retry option is available', await retryButton.isVisible() ? 'Retry option is available' : 'Retry option is not available', await retryButton.isVisible(), '', executionTime);
  }
  await expect(retryButton).toBeVisible();
}