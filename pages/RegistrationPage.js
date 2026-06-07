// @ts-check
import BasePage from './BasePage.js';

/**
 * @typedef {Object} UserData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} phoneNumber
 * @property {string} ssn
 * @property {string} username
 * @property {string} password
 * @property {string} confirmedPassword
 */

/**
 * RegistrationPage - Page Object Model for Registration functionality
 * Handles all registration-related interactions and verifications
 */
class RegistrationPage extends BasePage {
  // Selectors
  get firstNameInput() {
    return 'input[id="customer.firstName"]';
  }

  get lastNameInput() {
    return 'input[id="customer.lastName"]';
  }

  get streetInput() {
    return 'input[id="customer.address.street"]';
  }

  get cityInput() {
    return 'input[id="customer.address.city"]';
  }

  get stateInput() {
    return 'input[id="customer.address.state"]';
  }

  get zipCodeInput() {
    return 'input[id="customer.address.zipCode"]';
  }

  get phoneNumberInput() {
    return 'input[id="customer.phoneNumber"]';
  }

  get ssnInput() {
    return 'input[id="customer.ssn"]';
  }

  get usernameInput() {
    return 'input[id="customer.username"]';
  }

  get passwordInput() {
    return 'input[id="customer.password"]';
  }

  get confirmedPasswordInput() {
    return 'input[id="repeatedPassword"]';
  }

  get registerButton() {
    return 'input[value="Register"]';
  }

  get successMessage() {
    return 'text=Your account was created successfully';
  }

  get passwordMismatchError() {
    return 'text=Passwords did not match';
  }

  get validationError() {
    return 'span.error';
  }

  /**
   * Navigate to registration page
   */
  async navigateToRegistration() {
    await this.goto('/parabank/index.htm');
    await this.page.click('text=Register');
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Fill registration form with user data
   * @param {UserData} userData - User data object
   */
  async fillRegistrationForm(userData) {
    await this.page.fill(this.firstNameInput, userData.firstName);
    await this.page.fill(this.lastNameInput, userData.lastName);
    await this.page.fill(this.streetInput, userData.street);
    await this.page.fill(this.cityInput, userData.city);
    await this.page.fill(this.stateInput, userData.state);
    await this.page.fill(this.zipCodeInput, userData.zipCode);
    await this.page.fill(this.phoneNumberInput, userData.phoneNumber);
    await this.page.fill(this.ssnInput, userData.ssn);
    await this.page.fill(this.usernameInput, userData.username);
    await this.page.fill(this.passwordInput, userData.password);
    await this.page.fill(this.confirmedPasswordInput, userData.confirmedPassword);
  }

  /**
   * Register new user with all details
   * @param {UserData} userData - User data object
   */
  async registerUser(userData) {
    await this.navigateToRegistration();
    await this.fillRegistrationForm(userData);
    await this.clickRegisterButton();
  }

  /**
   * Click Register button
   */
  async clickRegisterButton() {
    await this.page.click(this.registerButton);
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Verify registration success
   * @returns {Promise<boolean>} True if registration was successful
   */
  async isRegistrationSuccessful() {
    const locator = this.page.locator(this.successMessage);
    try {
      await locator.waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if success message is visible
   * @returns {Promise<boolean>} True if success message exists
   */
  async isSuccessMessageVisible() {
    return await this.isTextVisible('Your account was created successfully');
  }

  /**
   * Check if password mismatch error is visible
   * @returns {Promise<boolean>} True if password mismatch error exists
   */
  async isPasswordMismatchErrorVisible() {
    const locator = this.page.locator(this.passwordMismatchError);
    try {
      await locator.waitFor({ timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if validation error exists (for mandatory fields)
   * @returns {Promise<boolean>} True if validation error exists
   */
  async isValidationErrorVisible() {
    const locator = this.page.locator(this.validationError).first();
    try {
      await locator.waitFor({ timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill only first name
   * @param {string} firstName - First name
   */
  async fillFirstName(firstName) {
    await this.page.fill(this.firstNameInput, firstName);
  }

  /**
   * Fill only last name
   * @param {string} lastName - Last name
   */
  async fillLastName(lastName) {
    await this.page.fill(this.lastNameInput, lastName);
  }

  /**
   * Fill password fields
   * @param {string} password - Password
   * @param {string} confirmedPassword - Confirmed password
   */
  async fillPasswords(password, confirmedPassword) {
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmedPasswordInput, confirmedPassword);
  }

  /**
   * Fill ZIP code
   * @param {string} zipCode - ZIP code
   */
  async fillZipCode(zipCode) {
    await this.page.fill(this.zipCodeInput, zipCode);
  }
}

export default RegistrationPage;
