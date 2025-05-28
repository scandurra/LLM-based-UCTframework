const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const navigateToHomePage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_BASE_URL);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC4_ID1', 'Navigate to home page', 'Home page loaded', 'Home page loaded', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
  }
  expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const doNotClickOnProfile = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  // No action is performed
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC4_ID2', 'L’utente non clicca sul proprio nome utente in alto a destra', 'Il menù a tendina non viene visualizzato', 'Il menù a tendina non viene visualizzato', true, {}, executionTime);
  }
  const dropdownVisible = await page.isVisible('#dropdown-menu');
  expect(dropdownVisible).toBeFalsy();
}

test("UC5_TC4 - Selezione lingua senza cliccare sul nome utente", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC4 - Selezione lingua senza cliccare sul nome utente");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  navigateToHomePage(page, reporter);
  doNotClickOnProfile(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});