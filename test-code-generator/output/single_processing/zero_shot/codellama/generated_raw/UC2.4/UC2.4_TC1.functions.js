// Import necessary libraries and page object models
import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import DashboardPageBenchmarkingKpi from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

// Function to select two or more cities from the dropdown menu
export const step1_SelectTwoOrMoreCities = async function (loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Login as a registered user
    await step1_LoginAsRegisteredUser(loginPage, sidebarPage);
    
    // Open the Dashboard section
    await step2_OpenDashboardSection(sidebarPage);
    
    // Select two or more cities from the dropdown menu
    await dashboardPageBenchmarkingKpi.selectCity(10);
    await dashboardPageBenchmarkingKpi.selectCity(35);
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.dashboard-section')).toBe('Dashboard Section');
}

// Function to select a valid KPI for benchmarking
export const step2_SelectValidKpi = async function (loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Login as a registered user
    await step1_LoginAsRegisteredUser(loginPage, sidebarPage);
    
    // Open the Dashboard section
    await step2_OpenDashboardSection(sidebarPage);
    
    // Select a valid KPI for benchmarking
    await dashboardPageBenchmarkingKpi.selectKPI();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Scegli un KPI valido per il confronto', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.dashboard-section')).toBe('Dashboard Section');
}

// Function to confirm the request by clicking on the button
export const step3_ConfirmRequest = async function (loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Login as a registered user
    await step1_LoginAsRegisteredUser(loginPage, sidebarPage);
    
    // Open the Dashboard section
    await step2_OpenDashboardSection(sidebarPage);
    
    // Confirm the request by clicking on the button
    const isResultsVisible = await dashboardPageBenchmarkingKpi.applyKPIAndVerify();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', isResultsVisible, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.dashboard-section')).toBe('Dashboard Section');
}