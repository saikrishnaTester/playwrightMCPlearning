# Page Object Model API Documentation

## 📚 BasePage Methods (Base Class)

All page objects inherit from `BasePage`. These methods are available in all page classes.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `goto()` | `path: string` (default: `/parabank/index.htm`) | `Promise<void>` | Navigate to URL path |
| `waitForPageLoad()` | `state: string` (default: `load`) | `Promise<void>` | Wait for page load state |
| `getPageContent()` | None | `Promise<string>` | Get full page HTML content |
| `isTextVisible()` | `text: string` | `Promise<boolean>` | Check if text exists on page |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `page` | Playwright Page | The Playwright page object |
| `BASE_URL` | string | Base URL: `https://parabank.parasoft.com` |

---

## 🔐 LoginPage Methods

Extends `BasePage`. Used for login operations.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `login()` | `username: string, password: string` | `Promise<void>` | Complete login workflow |
| `navigateToLogin()` | None | `Promise<void>` | Navigate to login page |
| `enterUsername()` | `username: string` | `Promise<void>` | Enter username in field |
| `enterPassword()` | `password: string` | `Promise<void>` | Enter password in field |
| `clickLoginButton()` | None | `Promise<void>` | Click the Login button |
| `clickRegisterLink()` | None | `Promise<void>` | Click Register link |
| `isLoginSuccessful()` | None | `Promise<boolean>` | Check if login was successful |
| `isAccountsOverviewVisible()` | None | `Promise<boolean>` | Check if Accounts Overview is visible |

### Selectors

| Selector | Element |
|----------|---------|
| `usernameInput` | `input[name="username"]` |
| `passwordInput` | `input[name="password"]` |
| `loginButton` | `input[value="Log In"]` |
| `registerLink` | `text=Register` |
| `accountsOverviewHeading` | `h1:has-text("Accounts Overview")` |

---

## 📝 RegistrationPage Methods

Extends `BasePage`. Used for user registration operations.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `navigateToRegistration()` | None | `Promise<void>` | Navigate to registration page |
| `fillRegistrationForm()` | `userData: Object` | `Promise<void>` | Fill entire registration form |
| `registerUser()` | `userData: Object` | `Promise<void>` | Complete registration workflow |
| `clickRegisterButton()` | None | `Promise<void>` | Click Register button |
| `isRegistrationSuccessful()` | None | `Promise<boolean>` | Check if registration succeeded |
| `isSuccessMessageVisible()` | None | `Promise<boolean>` | Check if success message is visible |
| `isPasswordMismatchErrorVisible()` | None | `Promise<boolean>` | Check for password mismatch error |
| `isValidationErrorVisible()` | None | `Promise<boolean>` | Check for validation error |
| `fillFirstName()` | `firstName: string` | `Promise<void>` | Fill first name only |
| `fillLastName()` | `lastName: string` | `Promise<void>` | Fill last name only |
| `fillPasswords()` | `password: string, confirmedPassword: string` | `Promise<void>` | Fill password fields |
| `fillZipCode()` | `zipCode: string` | `Promise<void>` | Fill ZIP code field |

### Expected userData Object Structure

```javascript
{
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  state: string,
  zipCode: string,
  phoneNumber: string,
  ssn: string,
  username: string,
  password: string,
  confirmedPassword: string
}
```

### Selectors

All use form input IDs:
- `firstNameInput`: `input[id="customer.firstName"]`
- `lastNameInput`: `input[id="customer.lastName"]`
- `streetInput`: `input[id="customer.address.street"]`
- `cityInput`: `input[id="customer.address.city"]`
- `stateInput`: `input[id="customer.address.state"]`
- `zipCodeInput`: `input[id="customer.address.zipCode"]`
- `phoneNumberInput`: `input[id="customer.phoneNumber"]`
- `ssnInput`: `input[id="customer.ssn"]`
- `usernameInput`: `input[id="customer.username"]`
- `passwordInput`: `input[id="customer.password"]`
- `confirmedPasswordInput`: `input[id="repeatedPassword"]`
- `registerButton`: `input[value="Register"]`

---

## 💰 AccountsPage Methods

Extends `BasePage`. Used for account operations.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `isAccountsOverviewDisplayed()` | None | `Promise<boolean>` | Check if Accounts Overview is shown |
| `isAccountServicesVisible()` | None | `Promise<boolean>` | Check if Account Services text is visible |
| `isAccountsOverviewAndServicesVisible()` | None | `Promise<boolean>` | Check both Accounts Overview and Services |
| `clickOpenNewAccountLink()` | None | `Promise<void>` | Click "Open New Account" link |
| `isOpenNewAccountFormDisplayed()` | None | `Promise<boolean>` | Check if Open Account form is shown |
| `isAccountTypeOptionsVisible()` | None | `Promise<boolean>` | Check if account type options are visible |
| `clickTransferFundsLink()` | None | `Promise<void>` | Click "Transfer Funds" link |
| `getPageHeading()` | None | `Promise<string>` | Get page heading text |
| `getAccountInfo()` | None | `Promise<string>` | Get account information |

### Selectors

- `accountsOverviewHeading`: `h1:has-text("Accounts Overview")`
- `accountServicesText`: `text=Account Services`
- `openNewAccountLink`: `a:has-text("Open New Account")`
- `openNewAccountForm`: `text=Open New Account`
- `accountTypeCheckingOption`: `text=CHECKING`
- `transferFundsLink`: `a:has-text("Transfer Funds")`

---

## 💸 TransferFundsPage Methods

Extends `BasePage`. Used for fund transfer operations.

### Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `selectAccount()` | `selector: string, accountValue: string` | `Promise<void>` | Select account from dropdown |
| `selectFromAccount()` | `accountValue: string` | `Promise<void>` | Select "from" account |
| `selectToAccount()` | `accountValue: string` | `Promise<void>` | Select "to" account |
| `enterAmount()` | `amount: string` | `Promise<void>` | Enter transfer amount |
| `clickTransferButton()` | None | `Promise<void>` | Click Transfer button |
| `transferFunds()` | `fromAccount: string, toAccount: string, amount: string` | `Promise<void>` | Complete transfer workflow |
| `isTransferSuccessful()` | None | `Promise<boolean>` | Check if transfer succeeded |
| `isSuccessMessageVisible()` | None | `Promise<boolean>` | Check if success message is visible |

### Selectors

- `fromAccountDropdown`: `select[name="fromAccountId"]`
- `toAccountDropdown`: `select[name="toAccountId"]`
- `amountInput`: `input[name="amount"]`
- `transferButton`: `input[value="Transfer"]`
- `successMessage`: `text=Transfer Complete`

---

## 📖 Usage Examples

### Example 1: Login
```javascript
import LoginPage from '../pages/LoginPage.js';

test('Login Example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Option 1: Use complete login method
  await loginPage.login('john', 'demo');
  
  // Option 2: Step by step
  await loginPage.navigateToLogin();
  await loginPage.enterUsername('john');
  await loginPage.enterPassword('demo');
  await loginPage.clickLoginButton();
  
  // Verify
  const isSuccessful = await loginPage.isAccountsOverviewVisible();
  expect(isSuccessful).toBeTruthy();
});
```

### Example 2: Registration
```javascript
import RegistrationPage from '../pages/RegistrationPage.js';

test('Register User', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phoneNumber: '2125551212',
    ssn: '123456789',
    username: `user_${Date.now()}`,
    password: 'Password123',
    confirmedPassword: 'Password123'
  };
  
  await registrationPage.registerUser(userData);
  
  const isSuccessful = await registrationPage.isRegistrationSuccessful();
  expect(isSuccessful).toBeTruthy();
});
```

### Example 3: Fund Transfer
```javascript
import TransferFundsPage from '../pages/TransferFundsPage.js';

test('Transfer Funds', async ({ page }) => {
  const transferFundsPage = new TransferFundsPage(page);
  
  // Option 1: Complete transfer
  await transferFundsPage.transferFunds('account1', 'account2', '100');
  
  // Option 2: Step by step
  await transferFundsPage.selectFromAccount('account1');
  await transferFundsPage.selectToAccount('account2');
  await transferFundsPage.enterAmount('100');
  await transferFundsPage.clickTransferButton();
  
  const isSuccessful = await transferFundsPage.isTransferSuccessful();
  expect(isSuccessful).toBeTruthy();
});
```

---

## 🔄 Inheritance Hierarchy

```
BasePage (49 lines)
├── LoginPage (105 lines)
├── RegistrationPage (201 lines)
├── AccountsPage (113 lines)
└── TransferFundsPage (108 lines)
```

All page objects inherit common functionality from `BasePage`:
- Page navigation (`goto()`)
- Page loading (`waitForPageLoad()`)
- Content retrieval (`getPageContent()`)
- Text visibility checks (`isTextVisible()`)

---

## ✅ Best Practices

1. **Always create a new page object instance per test** (Playwright best practice)
   ```javascript
   test('My Test', async ({ page }) => {
     const loginPage = new LoginPage(page);
   });
   ```

2. **Use complete workflow methods when possible**
   ```javascript
   // ✅ Good: Single method call
   await loginPage.login(username, password);
   
   // ❌ Avoid: Multiple method calls for same task
   await loginPage.navigateToLogin();
   await loginPage.enterUsername(username);
   await loginPage.enterPassword(password);
   await loginPage.clickLoginButton();
   ```

3. **Chain operations naturally**
   ```javascript
   const userData = { /* ... */ };
   await registrationPage.registerUser(userData);
   const isSuccessful = await registrationPage.isRegistrationSuccessful();
   ```

4. **Use descriptive test names**
   ```javascript
   test('TC_001: Login with Valid Credentials', async ({ page }) => {
   ```

---

## 🚀 Now Ready to Use!

All page objects are fully functional and ready for test development. Use this API documentation as a reference when writing new tests.
