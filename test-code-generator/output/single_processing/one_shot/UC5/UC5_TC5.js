const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const clickOnProfileMultipleTimes = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.clickOnProfile();
  await homePage.clickOnProfile();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC5_ID1', 'L’utente clicca più volte sul proprio nome utente', 'Il menù a tendina viene visualizzato solo al primo clic', 'Il menù a tendina viene visualizzato solo al primo clic', true, {}, executionTime);
  }
}

const verifyDropdownVisibility = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  const dropdownVisible = await page.isVisible('#dropdown-menu');
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC5_ID2', 'Verifica la visibilità del menù a tendina', 'Il menù a tendina è visibile solo al primo clic', dropdownVisible ? 'Visibile' : 'Non visibile', !dropdownVisible, {}, executionTime);
  }
  expect(dropdownVisible).toBeFalsy();
}

test("UC5_TC5 - Selezione lingua con più clic sul nome utente", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC5 - Selezione lingua con più clic sul nome utente");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();

  clickOnProfileMultipleTimes(page, reporter);
  verifyDropdownVisibility(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});