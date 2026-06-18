import { APIRequestContext } from "@playwright/test";

export class UserApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getCurrentUserWithToken(accessToken: string) {
    return await this.request.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getCurrentUserWithoutToken() {
    return await this.request.get("/auth/me");
  }
}
