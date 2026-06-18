import { APIRequestContext } from "@playwright/test";
import { endpoints } from "../constants/endpoints";
import { AddProductRequest, ProductResponse } from "../types/productTypes";

export class ProductApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createProduct(payload: AddProductRequest) {
    return await this.request.post(endpoints.products.add, {
      data: payload,
    });
  }

  async getProductById(id: number) {
    return await this.request.get(endpoints.products.getById(id));
  }

  async updateProductById(id: number, payload: Partial<ProductResponse>) {
    return await this.request.put(endpoints.products.updateById(id), {
      data: payload,
    });
  }

  async deleteProductByValidId(id: number) {
    return await this.request.delete(endpoints.products.deleteById(id));
  }
}
