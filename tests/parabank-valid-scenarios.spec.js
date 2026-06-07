// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import RegistrationPage from '../pages/RegistrationPage.js';

// Store registered user credentials to share between tests
let registeredUser = {
  username: '',
  password: ''
};

test.describe('ParaBank Valid Scenarios', () => {
  // TC_001 - Register New User with Valid Data
  test('TC_001: Register New User with Valid Data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const timestamp = Date.now();
    const uniqueUsername = `user_${timestamp}`;
    const password = 'Password123';
    
    // Store credentials for TC_002
    registeredUser.username = uniqueUsername;
    registeredUser.password = password;

    // User data object
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phoneNumber: '2125551212',
      ssn: '123456789',
      username: uniqueUsername,
      password: password,
      confirmedPassword: password
    };

    // Step 1-2: Navigate to registration page
    await registrationPage.navigateToRegistration();

    // Step 3-12: Fill registration form and register
    await registrationPage.registerUser(userData);

    // Expected Result: User account should be created successfully
    const isSuccessful = await registrationPage.isRegistrationSuccessful();
    expect(isSuccessful).toBeTruthy();
  });

  // TC_002 - Login with Newly Registered User
  test('TC_002: Login with Newly Registered User', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1-3: Navigate to login page and login with registered user
    await loginPage.login(registeredUser.username, registeredUser.password);

    // Expected Result: User should login successfully
    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBeTruthy();
  });
});
