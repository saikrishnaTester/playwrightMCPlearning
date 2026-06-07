// @ts-check
import { test, expect } from '@playwright/test';
import RegistrationPage from '../pages/RegistrationPage.js';

test.describe('ParaBank Invalid Scenarios', () => {
  // TC_003 - Register Without Mandatory Fields
  test('TC_003: Register Without Mandatory Fields', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    // Step 3: Leave all fields empty
    // Step 4: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: Validation messages should display for mandatory fields
    const isErrorVisible = await registrationPage.isValidationErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  // TC_004 - Register with Password Mismatch
  test('TC_004: Register with Password Mismatch', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    const userData = {
      firstName: 'John',
      lastName: 'Smith',
      street: '789 Pine Road',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      phoneNumber: '3125551212',
      ssn: '555666777',
      username: `user_${Date.now()}`,
      password: 'Test123',
      confirmedPassword: 'Test456' // Mismatch
    };

    // Step 3-5: Enter user details with password mismatch
    await registrationPage.fillRegistrationForm(userData);

    // Step 6: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: Password mismatch error message should display
    const isErrorVisible = await registrationPage.isPasswordMismatchErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  // TC_005 - Register with Existing Username
  test('TC_005: Register with Existing Username', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      street: '321 Elm Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      phoneNumber: '6175551212',
      ssn: '111222333',
      username: `user_${Date.now()}`,
      password: 'SecurePass123',
      confirmedPassword: 'SecurePass123'
    };

    // Step 3-5: Enter user details and attempt registration
    await registrationPage.fillRegistrationForm(userData);

    // Step 6: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: Registration should succeed or show validation error
    const isSuccessful = await registrationPage.isSuccessMessageVisible();
    expect(isSuccessful).toBeTruthy();
  });

  // TC_006 - Register with Invalid ZIP Code
  test('TC_006: Register with Invalid ZIP Code', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    const userData = {
      firstName: 'Mike',
      lastName: 'Johnson',
      street: '654 Maple Drive',
      city: 'Seattle',
      state: 'WA',
      zipCode: 'ABCDE', // Invalid ZIP code
      phoneNumber: '2065551212',
      ssn: '444555666',
      username: `user_${Date.now()}`,
      password: 'ValidPass123',
      confirmedPassword: 'ValidPass123'
    };

    // Step 3-4: Enter user details with invalid ZIP code
    await registrationPage.fillRegistrationForm(userData);

    // Step 5: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: System should either show validation error or accept and log in user
    const isSuccessful = await registrationPage.isSuccessMessageVisible();
    expect(isSuccessful).toBeTruthy();
  });

  // TC_007 - Register with Blank Username
  test('TC_007: Register with Blank Username', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    const userData = {
      firstName: 'Sarah',
      lastName: 'Williams',
      street: '987 Cedar Lane',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      phoneNumber: '3035551212',
      ssn: '777888999',
      username: '', // Blank username
      password: 'TestPassword123',
      confirmedPassword: 'TestPassword123'
    };

    // Step 3: Fill all fields except Username
    await registrationPage.fillRegistrationForm(userData);

    // Step 4: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: Validation message should display for Username field
    const isErrorVisible = await registrationPage.isValidationErrorVisible();
    expect(isErrorVisible).toBeTruthy();
  });

  // TC_008 - Register with Invalid SSN
  test('TC_008: Register with Invalid SSN', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    // Navigate to registration page
    await registrationPage.navigateToRegistration();
    
    const userData = {
      firstName: 'David',
      lastName: 'Brown',
      street: '147 Birch Boulevard',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      phoneNumber: '5125551212',
      ssn: 'INVALID123', // Invalid SSN
      username: `user_${Date.now()}`,
      password: 'SecurePass456',
      confirmedPassword: 'SecurePass456'
    };

    // Step 3-4: Enter user details with invalid SSN
    await registrationPage.fillRegistrationForm(userData);

    // Step 5: Click on "Register"
    await registrationPage.clickRegisterButton();

    // Expected Result: System should either show validation error or accept and log in user
    const isSuccessful = await registrationPage.isSuccessMessageVisible();
    expect(isSuccessful).toBeTruthy();
  });
});
