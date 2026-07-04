import { APIRequestContext, expect } from "@playwright/test";
import { AuthApi } from "../api/authApi";
import { authData } from "../test-data/auth-data";
import { LoginResponse } from "../types/authTypes";

export async function getAccessToken(
  request: APIRequestContext
): Promise<string> {
  const authApi = new AuthApi(request);
  const loginResponse = await authApi.login(authData.validUser);
  expect(loginResponse.status()).toBe(200);

  const loginResponseBody: LoginResponse = await loginResponse.json();
  expect(loginResponseBody).toHaveProperty("accessToken");
  expect(loginResponseBody.accessToken).toBeTruthy();
  expect(typeof loginResponseBody.accessToken).toBe("string");

  return loginResponseBody.accessToken;
}

/*
I Build Playwright API Test Framework using Typescript for REST API's. 

 */
