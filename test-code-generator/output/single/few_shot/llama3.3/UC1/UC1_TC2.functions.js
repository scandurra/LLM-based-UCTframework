import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const insertWrongCredentials = async function(page, reporter) {
  const loginPage = new LoginPage(page);
  const wrongEmail = 'wrong-email@example.com';
  const wrongPassword = 'wrong-password';

  let startTime = Date.now();
  await loginPage.fillEmail(wrongEmail);
  await loginPage.fillPassword(wrongPassword);
  let endTime = Date.now();

  if (reporter) {
    reporter.addStep('UC1_TC2_ID1', 
      'Inserisci credenziali errate', 
      `Credenziali errate inserite`, 
      `Credenziali errate inserite`, 
      true, 
      { wrongEmail, wrongPassword }, 
      endTime - startTime
    );
  }
}

// Step 2
export const clickLoginButton = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let passFail = 0;  
  let startTime = Date.now();
  await loginPage.clickLoginButton();
  if (await loginPage.isEmailFieldVisible()) {
    passFail = 1;
  }
  let endTime = Date.now();

  if (reporter) {
    reporter.addStep('UC1_TC2_ID2', 
      'Clicca il tasto “Login”', 
      "L’utente visualizza un messaggio di errore relativo alle credenziali", 
      passFail ? "L’utente visualizza un messaggio di errore relativo alle credenziali" : "Non è stato visualizzato un messaggio di errore",
      passFail,
      {},
      endTime - startTime
    );
  }
}

// Step 3
export const retryLogin = async function(page, reporter) {
  const loginPage = new LoginPage(page);

  let passFail = 0;  
  let startTime = Date.now();
  if (await loginPage.isEmailFieldVisible()) {
    passFail = 1;
  }
  let endTime = Date.now();

  if (reporter) {
    reporter.addStep('UC1_TC2_ID3', 
      'Visualizza la possibilità di riprovare l’accesso', 
      "Il sistema consente all’utente di ripetere il tentativo di login", 
      passFail ? "Il sistema consente all’utente di ripetere il tentativo di login" : "Non è possibile riprovare l’accesso",
      passFail,
      {},
      endTime - startTime
    );
  }
}