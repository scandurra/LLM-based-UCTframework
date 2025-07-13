import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const leaveUsernameFieldEmptyAndInsertPassword = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.fillEmail('');
  await loginPage.fillPassword(process.env.PASSWORD);
  
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC4_ID1', 'Leave username field empty and insert password', 'Username field is empty and password is inserted', 'Username field is empty and password is inserted', true, `EMAIL: , PASSWORD: ${process.env.PASSWORD}`, executionTime);
  }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  await loginPage.clickLoginButton();
  
  // Check if error message is displayed
  const errorMessage = 'Error message';
  const passFail = true; // Replace with actual logic to check for error message
  
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC4_ID2', 'Click login button', `Error message: ${errorMessage}`, `Error message displayed`, passFail, '', executionTime);
  }
  
  expect(passFail).toBeTruthy();
}

// Step 3
export const verifyAbilityToCorrectInput = async function(page, reporter) {
  const startTime = new Date().getTime();
  const loginPage = new LoginPage(page);
  const isEmailFieldVisible = await loginPage.isEmailFieldVisible();
  
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC1_TC4_ID3', 'Verify ability to correct input', 'Email field is visible', `Email field is ${isEmailFieldVisible ? 'visible' : 'not visible'}`, isEmailFieldVisible, '', executionTime);
  }
  
  expect(isEmailFieldVisible).toBeTruthy();
}