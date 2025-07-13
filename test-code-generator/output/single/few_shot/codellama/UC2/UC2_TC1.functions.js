import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const navigateToDashboard = async function(page, reporter) {
    const sidebarPage = new SidebarPage(page);
    
    let startTime = Date.now();
    await sidebarPage.clickDashboardLink();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Navigate to dashboard page', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}