import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly accountMenuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Dashboard" });
    this.accountMenuButton = page.getByRole("button", { name: "Account menu" });
    this.logoutButton = page.getByRole("menuitem", { name: "logout" });
  }

  async logout() {
    await this.accountMenuButton.click();
    await this.logoutButton.click();
  }
}
