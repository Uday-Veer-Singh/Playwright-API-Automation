import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly provinceDropdown: Locator;
  readonly postalCodeInput: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmationHeading: Locator;
  readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByLabel("Full name");
    this.addressInput = page.getByLabel("Address");
    this.cityInput = page.getByLabel("City");
    this.provinceDropdown = page.getByLabel("Province");
    this.postalCodeInput = page.getByLabel("Postal code");
    this.placeOrderButton = page.getByRole("button", { name: "Place order" });
    this.confirmationHeading = page.getByRole("heading", {
      name: "Order confirmed",
    });
    this.orderId = page.getByTestId("order-id");
  }

  async fillShippingAddress(address: {
    fullName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  }) {
    await this.fullNameInput.fill(address.fullName);
    await this.addressInput.fill(address.address);
    await this.cityInput.fill(address.city);
    await this.provinceDropdown.selectOption(address.province);
    await this.postalCodeInput.fill(address.postalCode);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationHeading).toBeVisible();
  }

  async getOrderId() {
    return await this.orderId.textContent();
  }
}
