import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

// Step 1
export const navigateToLoginPage = async function(page, reporter) {
    let startTime = Date.now();
    await page.goto("https://www.example.com");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Navigate to login page', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const insertCorrectCredentials = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password1234567890");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Inserisci le credenziali corrette nel form della login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const clickLoginButton = async function(page, reporter) {
    const loginPage = new LoginPage(page);
    
    let startTime = Date.now();
    await loginPage.clickLoginButton();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Clicca il tasto “Login”', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 4
export const navigateToDashboard = async function(page, reporter) {
    let startTime = Date.now();
    await page.goto("https://www.example.com/dashboard");
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID4', 'Navigate to dashboard page', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 5
export const selectDashboardLink = async function(page, reporter) {
    const sidebarPage = new SidebarPage(page);
    
    let startTime = Date.now();
    await sidebarPage.clickDashboardLink();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID5', 'Seleziona la voce di menu relativa alla dashboard', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}