import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickOnUsernameAndSelectLogout = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await navbarPage.clickUserIcon();
  await navbarPage.clickLogout();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC6_TC1_ID2', 'Click on username and select logout', 'Logout process starts', 'Logout process starts', true, '', executionTime);
  }
}

export const verifyLogoutSuccessMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Assuming the success message is visible after successful logout
  const successMessageLocator = page.locator('text="Logout successful"');
  const isSuccessMessageVisible = await successMessageLocator.isVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC6_TC1_ID3', 'Verify logout success message', 'Success message displayed', isSuccessMessageVisible ? 'Success message displayed' : 'Success message not displayed', isSuccessMessageVisible, '', executionTime);
  }
  expect(isSuccessMessageVisible).toBeTruthy();
}