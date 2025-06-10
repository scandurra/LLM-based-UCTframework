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

  // Include Playwright assertions
  await expect(page).toHaveURL(process.env.E2E_LOGIN_URL);
}

export const verifyLogoutSuccessMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Assuming there's a way to get the success message
  // For demonstration purposes, let's assume it's an element with the text "Logout successful"
  const successMessage = page.locator('text="Logout successful"');
  await expect(successMessage).toBeVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC6_TC1_ID3', 'Verify logout success message', 'Success message displayed', 'Success message displayed', true, '', executionTime);
  }
}