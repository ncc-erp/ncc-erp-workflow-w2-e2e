/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseFactory } from "./base.factory";

export class FormFactory {
  static getFullFields<T extends BaseFactory>(constr: { new (...args: any[]): T }) {
    // Create a new instance of T using the constructor
    const instance = new constr();
    return instance.toFields();
  }
  static getRequiredFields<T extends BaseFactory>(constr: { new (...args: any[]): T }) {
    // Create a new instance of T using the constructor
    const instance = new constr();
    return instance.toFields({
      required: true,
    });
  }
}
