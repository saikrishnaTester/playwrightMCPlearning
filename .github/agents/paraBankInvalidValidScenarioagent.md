# ParaBank - Registration Test Cases

## Valid Test Cases

### TC_001 - Register New User with Valid Data

**Scenario:** Verify user can register with valid details.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Enter valid First Name
4. Enter valid Last Name
5. Enter valid Address
6. Enter valid City
7. Enter valid State
8. Enter valid ZIP Code
9. Enter valid SSN
10. Enter unique Username
11. Enter valid Password
12. Enter same Password in Confirm field
13. Click on "Register"

### Expected Result:
User account should be created successfully.


---

### TC_002 - Login with Newly Registered User

**Scenario:** Verify newly registered user can login.

### Steps:
1. Open ParaBank website
2. Enter registered Username
3. Enter registered Password
4. Click on "Log In"

### Expected Result:
User should login successfully and navigate to account page.


---

## Invalid Test Cases

### TC_003 - Register Without Mandatory Fields

**Scenario:** Verify validation messages for empty mandatory fields.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Leave all fields empty
4. Click on "Register"

### Expected Result:
Validation messages should display for mandatory fields.


---

### TC_004 - Register with Password Mismatch

**Scenario:** Verify error when Password and Confirm Password are different.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Enter all valid details
4. Enter Password as `Test123`
5. Enter Confirm Password as `Test456`
6. Click on "Register"

### Expected Result:
Password mismatch error message should display.


---

### TC_005 - Register with Existing Username

**Scenario:** Verify system does not allow duplicate usernames.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Enter valid user details
4. Enter already existing Username
5. Enter valid Password
6. Click on "Register"

### Expected Result:
System should display "Username already exists" message.


---

### TC_006 - Register with Invalid ZIP Code

**Scenario:** Verify validation for invalid ZIP Code.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Enter all valid details
4. Enter invalid ZIP Code with alphabets
5. Click on "Register"

### Expected Result:
Validation error should display for ZIP Code.


---

### TC_007 - Register with Blank Username

**Scenario:** Verify Username field is mandatory.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Fill all fields except Username
4. Click on "Register"

### Expected Result:
Validation message should display for Username field.


---

### TC_008 - Register with Invalid SSN

**Scenario:** Verify validation for invalid SSN.

### Steps:
1. Open ParaBank website
2. Click on "Register"
3. Enter all valid details
4. Enter invalid SSN
5. Click on "Register"

### Expected Result:
Validation error should display for SSN field.