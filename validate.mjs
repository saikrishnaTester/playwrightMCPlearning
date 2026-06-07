#!/usr/bin/env node
// Validation script to check for import/syntax errors

import BasePage from './pages/BasePage.js';
import LoginPage from './pages/LoginPage.js';
import RegistrationPage from './pages/RegistrationPage.js';
import AccountsPage from './pages/AccountsPage.js';
import TransferFundsPage from './pages/TransferFundsPage.js';

console.log('✅ BasePage imported successfully');
console.log('✅ LoginPage imported successfully');
console.log('✅ RegistrationPage imported successfully');
console.log('✅ AccountsPage imported successfully');
console.log('✅ TransferFundsPage imported successfully');

// Check class instantiation
const mockPage = {
  goto: async () => {},
  waitForLoadState: async () => {},
  content: async () => '<html></html>',
  fill: async () => {},
  click: async () => {},
  locator: () => ({ waitFor: async () => {}, textContent: async () => '' }),
  selectOption: async () => {}
};

try {
  const basePage = new BasePage(mockPage);
  console.log('✅ BasePage instantiated successfully');

  const loginPage = new LoginPage(mockPage);
  console.log('✅ LoginPage instantiated successfully');

  const registrationPage = new RegistrationPage(mockPage);
  console.log('✅ RegistrationPage instantiated successfully');

  const accountsPage = new AccountsPage(mockPage);
  console.log('✅ AccountsPage instantiated successfully');

  const transferFundsPage = new TransferFundsPage(mockPage);
  console.log('✅ TransferFundsPage instantiated successfully');

  console.log('\n✨ All validations passed! No syntax errors found.');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
