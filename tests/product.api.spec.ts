import { test, expect } from "@playwright/test";
import { ProductApi } from "../api/productApi";
import { productData } from "../fixtures/product-data";
import {
  AddProductRequest,
  AddProductResponse,
  AddProductWithoutTitleResponse,
  EmptyProductResponse,
  ProductResponse,
} from "../types/productTypes";
import {
  expectValidProductResponse,
  expectValidProductResponseWithoutTitle,
} from "../utils/assertions";

test.describe("Product API tests", () => {
  test("@api @products @smoke Create product with valid payload", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);
    const productResponse = await productApi.createProduct(
      productData.validProduct
    );
    expect(productResponse.status()).toBe(201);

    const responseBody: AddProductResponse = await productResponse.json();
    expectValidProductResponse(responseBody);
    expect(responseBody.category).toBe("testing");
  });

  test("@api @products Create product without title should still create product in DummyJSON", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);

    const productResponse = await productApi.createProduct(
      productData.invalidProductWithoutTitle as any
    );

    expect(productResponse.status()).toBe(201);

    const responseBody: AddProductWithoutTitleResponse =
      await productResponse.json();
    expectValidProductResponseWithoutTitle(responseBody);
  });

  test("@api @products Create product with empty payload", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);

    const productResponse = await productApi.createProduct({} as any);

    expect(productResponse.status()).toBe(201);

    const responseBody: EmptyProductResponse = await productResponse.json();
    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("number");

    expect(responseBody).not.toHaveProperty("title");
    expect(responseBody).not.toHaveProperty("description");
    expect(responseBody).not.toHaveProperty("price");
    expect(responseBody).not.toHaveProperty("brand");
    expect(responseBody).not.toHaveProperty("category");
  });
});

test.describe("Get Product API Tests", () => {
  test("@api @products @smoke Get product by valid ID", async ({ request }) => {
    const productApi = new ProductApi(request);

    const productResponse = await productApi.getProductById(1);

    expect(productResponse.status()).toBe(200);

    const responseBody: ProductResponse = await productResponse.json();

    expectValidProductResponse(responseBody);
    expect(responseBody.id).toBe(1);
  });

  test("@api @products @negative Get product by invalid ID and should return 404", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);
    const productResponse = await productApi.getProductById(0);
    expect(productResponse.status()).toBe(404);

    const responseBody = await productResponse.json();
    expect(responseBody).toHaveProperty("message");
    expect(responseBody.message).toBeTruthy();
    expect(responseBody.message).toContain("Product with id '0' not found");
  });
});

test.describe("Put product API tests", async () => {
  test("@api @products @regression Update product by ID", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);
    const updateResponse = await productApi.updateProductById(
      1,
      productData.updateProduct
    );

    expect(updateResponse.status()).toBe(200);

    const responseBody: ProductResponse = await updateResponse.json();
    expectValidProductResponse(responseBody);

    expect(responseBody).toHaveProperty("id");
    expect(responseBody.id).toBe(1);

    expect(responseBody.title).toBe(productData.updateProduct.title);
  });
});

test.describe("Delete product API tests", async () => {
  test("@api @products @regression Delete product by valid ID", async ({
    request,
  }) => {
    const productApi = new ProductApi(request);
    const deleteResponse = await productApi.deleteProductByValidId(1);

    expect(deleteResponse.status()).toBe(200);

    const responseBody = await deleteResponse.json();
    expectValidProductResponse(responseBody);

    expect(responseBody).toHaveProperty("id");
    expect(responseBody.id).toBe(1);

    expect(responseBody).toHaveProperty("isDeleted");
    expect(responseBody.isDeleted).toBe(true);

    expect(responseBody).toHaveProperty("deletedOn");
    expect(typeof responseBody.deletedOn).toBe("string");
  });
});
