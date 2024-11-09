import { expect, type Page } from "@playwright/test";
import { waitLoading } from "../utils/waitLoading";
import Button from "./components/button";
import Form from "./components/form";
import Header from "./components/header";
import MenuItem from "./components/menuItem";
import NavBar from "./components/navBar";
import Popup from "./components/popup";
export abstract class BasePage {
  public header: Header;
  public navBar: NavBar;
  public button: Button;
  public popup: Popup;
  public form: Form;
  public menuItem: MenuItem;

  constructor(
    readonly page: Page,
    public path: string,
    public title: string = ""
  ) {
    this.header = new Header(this.page);
    this.navBar = new NavBar(this.page);
    this.button = new Button(this.page);
    this.popup = new Popup(this.page);
    this.form = new Form(this.page);
    this.menuItem = new MenuItem(this.page);
  }

  async open(path?: string) {
    await this.page.goto(path || this.path);
    await waitLoading(this.page);
  }

  async verifyPageLocated() {
    await expect(this.page).toHaveURL(this.path);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.title && (await this.header.verifyPageTitle(this.title));
  }
}
