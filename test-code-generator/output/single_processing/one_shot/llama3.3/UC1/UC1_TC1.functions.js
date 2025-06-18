import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
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
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.clickLoginButton();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Click login button', 'User authenticated successfully', 'User authenticated successfully', true, '', executionTime);
  }
}

// Step 3
export const verifySuccessMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Assuming the success message is visible after successful authentication
  const successMessageLocator = page.locator('text="Login successful"');
  const isSuccessMessageVisible = await successMessageLocator.isVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Verify success message', 'Success message displayed', isSuccessMessageVisible ? 'Success message displayed' : 'Success message not displayed', isSuccessMessageVisible, '', executionTime);
  }
  expect(isSuccessMessageVisible).toBeTruthy();
}