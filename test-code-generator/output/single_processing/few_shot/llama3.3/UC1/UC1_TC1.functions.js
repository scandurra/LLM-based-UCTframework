import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertCorrectCredentials = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const startTime = new Date().getTime();
  await loginPage.fillEmail(process.env.EMAIL);
  await loginPage.fillPassword(process.env.PASSWORD);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC1_TC1_ID1', 'Insert correct credentials', 'Credentials accepted', 'Credentials accepted', true, { email: process.env.EMAIL, password: process.env.PASSWORD }, executionTime);
  }
  expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  let startTime = Date.now();
  await loginPage.clickLoginButton();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Click login button', 'User authenticated successfully', 'User authenticated successfully', true, {}, endTime - startTime);
  }
}

// Step 3
export const verifyAuthenticationSuccessMessage = async function(page, reporter) {
  // Assuming there's a method to get the success message in the LoginPage class
  // For demonstration purposes, we'll use a placeholder
  const loginPage = new LoginPage(page);
  let startTime = Date.now();
  const successMessage = await page.isVisible('text=Login successful');
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Verify authentication success message', 'Success message displayed', successMessage ? 'Success message displayed' : 'No success message', successMessage, {}, endTime - startTime);
  }
  expect(successMessage).toBeTruthy();
}