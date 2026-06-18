import { expect } from "@playwright/test";

export function expectNoUserDataExposed(responseBody: any) {
  expect(responseBody).not.toHaveProperty("id");
  expect(responseBody).not.toHaveProperty("username");
  expect(responseBody).not.toHaveProperty("email");
  expect(responseBody).not.toHaveProperty("accessToken");
}

export function expectErrorResponseWithoutToken(responseBody: any) {
  expect(responseBody).toHaveProperty("message");
  expect(responseBody.message).toBeTruthy();
  expect(responseBody).not.toHaveProperty("accessToken");
}

export function expectValidUserResponse(responseBody: any) {
  expect(responseBody).toHaveProperty("id");
  expect(typeof responseBody.id).toBe("number");

  expect(responseBody).toHaveProperty("username");
  expect(typeof responseBody.username).toBe("string");

  expect(responseBody).toHaveProperty("email");
  expect(typeof responseBody.email).toBe("string");
  expect(responseBody.email).toContain("@");

  expect(responseBody).toHaveProperty("firstName");
  expect(typeof responseBody.firstName).toBe("string");

  expect(responseBody).toHaveProperty("lastName");
  expect(typeof responseBody.lastName).toBe("string");

  expect(responseBody).toHaveProperty("gender");
  expect(typeof responseBody.gender).toBe("string");

  expect(responseBody).toHaveProperty("image");
  expect(typeof responseBody.image).toBe("string");
}

export function expectValidProductResponse(responseBody: any) {
  expect(responseBody).toHaveProperty("id");
  expect(typeof responseBody.id).toBe("number");

  expect(responseBody).toHaveProperty("title");
  expect(typeof responseBody.title).toBe("string");

  expect(responseBody).toHaveProperty("price");
  expect(typeof responseBody.price).toBe("number");

  expect(responseBody).toHaveProperty("description");
  expect(typeof responseBody.description).toBe("string");

  expect(responseBody).toHaveProperty("brand");
  expect(typeof responseBody.brand).toBe("string");

  expect(responseBody).toHaveProperty("category");
  expect(typeof responseBody.category).toBe("string");
}

export function expectValidProductResponseWithoutTitle(responseBody: any) {
  expect(responseBody).toHaveProperty("id");
  expect(typeof responseBody.id).toBe("number");

  expect(responseBody).not.toHaveProperty("title");

  expect(responseBody).toHaveProperty("price");
  expect(typeof responseBody.price).toBe("number");

  expect(responseBody).toHaveProperty("description");
  expect(typeof responseBody.description).toBe("string");

  expect(responseBody).toHaveProperty("brand");
  expect(typeof responseBody.brand).toBe("string");

  expect(responseBody).toHaveProperty("category");
  expect(typeof responseBody.category).toBe("string");
}
