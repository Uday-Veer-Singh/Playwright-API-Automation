import { test, expect } from "@playwright/test";
import { authData } from "../fixtures/auth-data";
import { AuthApi } from "../api/authApi";
import { UserApi } from "../api/userApi";
import {
  expectNoUserDataExposed,
  expectErrorResponseWithoutToken,
  expectValidUserResponse,
} from "../utils/assertions";
import { getAccessToken } from "../utils/authHelper";
import { UserResponse } from "../types/userTypes";

/*
test.describe("API login test scenarios", () => {
  test("Login with valid credentials", async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(authData.validUser);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("accessToken");
    expect(responseBody.accessToken).toBeTruthy();
    expect(typeof responseBody.accessToken).toBe("string");
  });

  test("Login with wrong password", async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(authData.wrongPasswordUser);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toContain("Invalid credentials");
    expect(responseBody).not.toHaveProperty("accessToken");
  });

  test("Login with missing username", async ({ request }) => {
    const authApi = new AuthApi(request);
    const response = await authApi.login(authData.missingUsernameUser);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toContain("Username and password required");
    expect(responseBody).not.toHaveProperty("accessToken");
  });
});

test("Get current authenticated user with valid token", async ({ request }) => {
  // 1. Create AuthApi object
  const authApi = new AuthApi(request);

  // 2. Login with valid user
  const loginResponse = await authApi.login(authData.validUser);
  expect(loginResponse.status()).toBe(200);

  // 3. Extract accessToken
  const responseBody = await loginResponse.json();
  expect(responseBody).toHaveProperty("accessToken");
  expect(responseBody.accessToken).toBeTruthy();
  expect(typeof responseBody.accessToken).toBe("string");

  // 4. Send GET request to /auth/me using Authorization header
  const accessToken = responseBody.accessToken;

  const userApi = new UserApi(request);
  const meResponse = await userApi.getCurrentUserWithToken(accessToken);

  // 5. Validate status 200
  expect(meResponse.status()).toBe(200);

  // 6. Validate username is emilys
  const meResponseBody = await meResponse.json();
  expect(meResponseBody).toHaveProperty("username");
  expect(meResponseBody.username).toBe("emilys");
  expect(meResponseBody).toHaveProperty("email");
  expect(typeof meResponseBody.email).toBe("string");
  expect(meResponseBody.email).toContain("@");
});

test("Get current user without token", async ({ request }) => {
  const userApi = new UserApi(request);

  const unauthorizedResponse = await userApi.getCurrentUserWithoutToken();

  expect(unauthorizedResponse.status()).toBe(401);

  const responseBody = await unauthorizedResponse.json();

  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBeTruthy();

  expect(responseBody).not.toHaveProperty("id");
  expect(responseBody).not.toHaveProperty("username");
  expect(responseBody).not.toHaveProperty("email");
  expect(responseBody).not.toHaveProperty("accessToken");
});

test("Get current user with invalid token", async ({ request }) => {
  const userApi = new UserApi(request);

  const unauthorizedResponse = await userApi.getCurrentUserWithToken(
    "invalid-token"
  );
  expect(unauthorizedResponse.status()).toBe(401);

  const unauthorizedResponseBody = await unauthorizedResponse.json();
  expect(unauthorizedResponseBody).toHaveProperty("message");
  expect(unauthorizedResponseBody.message).toBeTruthy();
  expect(unauthorizedResponseBody.message).toContain("Invalid/Expired Token!");
  expect(unauthorizedResponseBody).not.toHaveProperty("id");
  expect(unauthorizedResponseBody).not.toHaveProperty("username");
  expect(unauthorizedResponseBody).not.toHaveProperty("email");
  expect(unauthorizedResponseBody).not.toHaveProperty("accessToken");
});

// response validation helpers.

test("Get current user withh invalid token", async ({ request }) => {
  const userApi = new UserApi(request);

  const unauthorizedResponse = await userApi.getCurrentUserWithToken(
    "invalid-token"
  );
  expect(unauthorizedResponse.status()).toBe(401);

  const unauthorizedResponseBody = await unauthorizedResponse.json();
  expect(unauthorizedResponseBody).toHaveProperty("message");
  expect(unauthorizedResponseBody.message).toBeTruthy();
  expect(unauthorizedResponseBody.message).toContain("Invalid/Expired Token!");
  expectNoUserDataExposed(unauthorizedResponseBody);
});

test("Login with wrong password", async ({ request }) => {
  const authApi = new AuthApi(request);
  const response = await authApi.login(authData.wrongPasswordUser);

  expect(response.status()).toBe(400);

  const responseBody = await response.json();
  expectErrorResponseWithoutToken(responseBody);
  expect(responseBody.message).toContain("Invalid credentials");
});

test("Login with missing username", async ({ request }) => {
  const authApi = new AuthApi(request);
  const response = await authApi.login(authData.missingUsernameUser);

  expect(response.status()).toBe(400);

  const responseBody = await response.json();
  expectErrorResponseWithoutToken(responseBody);
  expect(responseBody.message).toContain("Username and password required");
});

// reusable login helper

test("Get current authenticated userr with valid token", async ({
  request,
}) => {
  const userApi = new UserApi(request);
  const accessToken = await getAccessToken(request);

  const meResponse = await userApi.getCurrentUserWithToken(accessToken);

  expect(meResponse.status()).toBe(200);

  const meResponseBody = await meResponse.json();
  expect(meResponseBody).toHaveProperty("username");
  expect(meResponseBody.username).toBe("emilys");
  expect(meResponseBody).toHaveProperty("email");
  expect(typeof meResponseBody.email).toBe("string");
  expect(meResponseBody.email).toContain("@");
});

// response type safety
*/

// Above old file
// Below new file

/*
// type-safe response model for /auth/me.

test.describe("Authenticated User API Tests", () => {
  test("Get current authenticated user with valid token", async ({
    request,
  }) => {
    const userApi = new UserApi(request);

    const accessToken = await getAccessToken(request);

    const meResponse = await userApi.getCurrentUserWithToken(accessToken);

    expect(meResponse.status()).toBe(200);

    const meResponseBody: UserResponse = await meResponse.json();

    expect(meResponseBody).toHaveProperty("username");
    expect(meResponseBody.username).toBe("emilys");

    expect(meResponseBody).toHaveProperty("email");
    expect(typeof meResponseBody.email).toBe("string");
    expect(meResponseBody.email).toContain("@");
  });
  */

test.describe("Auth Login API Tests", () => {
  test("Login with valid credentials", async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login(authData.validUser);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("accessToken");
    expect(responseBody.accessToken).toBeTruthy();
    expect(typeof responseBody.accessToken).toBe("string");
  });

  test("Login with wrong password", async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login(authData.wrongPasswordUser);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expectErrorResponseWithoutToken(responseBody);
    expect(responseBody.message).toContain("Invalid credentials");
  });

  test("Login with missing username", async ({ request }) => {
    const authApi = new AuthApi(request);

    const response = await authApi.login(authData.missingUsernameUser);

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expectErrorResponseWithoutToken(responseBody);
    expect(responseBody.message).toContain("Username and password required");
  });
});

test.describe("Authenticated User API Tests", () => {
  test("Get current authenticated user with valid token", async ({
    request,
  }) => {
    const userApi = new UserApi(request);

    const accessToken = await getAccessToken(request);

    const meResponse = await userApi.getCurrentUserWithToken(accessToken);

    expect(meResponse.status()).toBe(200);

    const meResponseBody: UserResponse = await meResponse.json();

    expect(meResponseBody).toHaveProperty("username");
    expect(meResponseBody.username).toBe("emilys");

    expect(meResponseBody).toHaveProperty("email");
    expect(typeof meResponseBody.email).toBe("string");
    expect(meResponseBody.email).toContain("@");
  });

  test("Get current user without token", async ({ request }) => {
    const userApi = new UserApi(request);

    const unauthorizedResponse = await userApi.getCurrentUserWithoutToken();

    expect(unauthorizedResponse.status()).toBe(401);

    const responseBody = await unauthorizedResponse.json();

    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBeTruthy();

    expectNoUserDataExposed(responseBody);
  });

  test("Get current user with invalid token", async ({ request }) => {
    const userApi = new UserApi(request);

    const unauthorizedResponse = await userApi.getCurrentUserWithToken(
      "invalid-token"
    );

    expect(unauthorizedResponse.status()).toBe(401);

    const unauthorizedResponseBody = await unauthorizedResponse.json();

    expect(unauthorizedResponseBody).toHaveProperty("message");
    expect(unauthorizedResponseBody.message).toBeTruthy();
    expect(unauthorizedResponseBody.message).toContain(
      "Invalid/Expired Token!"
    );

    expectNoUserDataExposed(unauthorizedResponseBody);
  });
});

/*
// schema-style validation helper
  test("Get current authenticated user with valid token", async ({
    request,
  }) => {
    const userApi = new UserApi(request);

    const accessToken = await getAccessToken(request);

    const meResponse = await userApi.getCurrentUserWithToken(accessToken);

    expect(meResponse.status()).toBe(200);

    const meResponseBody: UserResponse = await meResponse.json();

    expectValidUserResponse(meResponseBody)
    expect(meResponseBody.username).toBe("emilys")
  });
*/
