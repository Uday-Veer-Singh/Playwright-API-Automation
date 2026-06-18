import { APIRequestContext } from "@playwright/test";
import { endpoints } from "../constants/endpoints";

export class AuthApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(payload: object) {
    return await this.request.post(endpoints.auth.login, {
      data: payload,
    });
  }
}
