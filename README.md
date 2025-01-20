# qa-assignment-circula

 Playwright Test Setup and Instructions

## Prerequisites

Make sure you have the following installed on your machine:
1. [Node.js](https://nodejs.org/) (v16 or later)
2. [Visual Studio Code](https://code.visualstudio.com/)

-----------------------------------------

## Setup Instructions

1. **Clone the Repository** :
  
   git clone <repository-url>
   cd <repository-folder>

2. **Install Dependencies: Install the necessary npm packages, including Playwright** :

   npm install -- Install Dependencies
   npm init playwright@latest -- This will guide you through the installation process, setting up Playwright and the necessary files for end-to-end testing.

3. **Running Tests**
   Run All Tests:
   To execute all Playwright tests:  npx playwright test
   To execute single Playwright test: npx playwright test <test.spec.ts>
   To debug tests: npx playwright test --debug
   To run tests in headed mode: npx playwright test --headed
   To View Test Report: npx playwright show-report

   --------------------------------------------------------------------------------------