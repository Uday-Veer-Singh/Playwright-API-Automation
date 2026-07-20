# Playwright API Automation Framework

This repository contains an API automation framework built with **Playwright and TypeScript**.  
It demonstrates clean API test design using reusable helpers, endpoint constants, fixtures, test data, and shared assertions.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API Testing
- GitHub Actions / CI-ready structure

## What This Framework Covers

- Authentication API testing
- Positive and negative login scenarios
- Token-based API validation
- Bearer token authorization checks
- Invalid and missing token validation
- Request/response status code validation
- JSON response validation
- Reusable API helper methods
- Shared test data and endpoint constants
- Common assertions for cleaner test files

## Test Scenarios

The framework includes API tests for:

- Valid login
- Invalid login credentials
- Missing required fields
- Fetching authenticated user details with a valid token
- Accessing protected endpoints with an invalid token
- Accessing protected endpoints without a token
- Verifying sensitive user data is not exposed in negative scenarios

## Project Structure

```text
tests/
  auth/
    login.spec.ts
    auth-me.spec.ts

api/
  AuthApi.ts
  UserApi.ts

fixtures/
  authData.ts

constants/
  endpoints.ts

utils/
  assertions.ts

playwright.config.ts
