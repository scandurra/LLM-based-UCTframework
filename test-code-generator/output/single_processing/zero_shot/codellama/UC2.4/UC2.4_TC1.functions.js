// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardBenchmarkingKpiPage = require("../../models/page_object_models/dashboard_benchmarking_kpi.js");

async function step1_SelezionaDueOpiuComuni(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Seleziona due o più comuni dal menù a tendina
    await DashboardBenchmarkingKpiPage.selectCity(2);
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the city selector is visible and enabled
    await expect(DashboardBenchmarkingKpiPage.citySelector).toBeVisible();
    await expect(DashboardBenchmarkingKpiPage.citySelector).not.toBeDisabled();
}

async function step2_ScegliUnKPIValidoPerIlConfronto(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Scegli un KPI valido per il confronto
    await DashboardBenchmarkingKpiPage.selectKPI();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Scegli un KPI valido per il confronto', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the KPI selector is visible and enabled
    await expect(DashboardBenchmarkingKpiPage.kpiSelector).toBeVisible();
    await expect(DashboardBenchmarkingKpiPage.kpiSelector).not.toBeDisabled();
}

async function step3_ConfermaLaRichiestaCliccandoSulPulsante(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Conferma la richiesta cliccando sul pulsante
    await DashboardBenchmarkingKpiPage.applyKPIAndVerify();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the chart container and point are visible
    await expect(DashboardBenchmarkingKpiPage.chartContainer).toBeVisible();
    await expect(DashboardBenchmarkingKpiPage.chartPoint).toBeVisible();
}