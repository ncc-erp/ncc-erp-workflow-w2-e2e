/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker, Faker } from "@faker-js/faker";

type FakerFunction = (faker: Faker) => any;

export function fakeData(generator: FakerFunction): any {
  return (target: any, context: any) => {
    return function () {
      return generator(faker);
    };
  };
}

export function label(labelText: string): any {
  return (target: any, context: any) => {
    return function () {
      if (!this["extends"]) {
        this["extends"] = {};
      }
      this["extends"][context.name] = { ...this["extends"][context.name], label: labelText };
      return this[context.name];
    };
  };
}

export function required(isRequired: boolean = true): any {
  return (target: any, context: any) => {
    return function () {
      if (!this["extends"]) {
        this["extends"] = {};
      }
      this["extends"][context.name] = { ...this["extends"][context.name], required: isRequired };
      return this[context.name];
    };
  };
}

export class BaseFactory {
  constructor(data?: Partial<BaseFactory>) {
    Object.assign(this, data);
  }

  public toFields(filter?: Record<string, any>): Record<string, string>[] {
    let results: Record<string, string>[] = [];

    for (const key of Object.getOwnPropertyNames(this)) {
      if (key === "extends") continue;
      // Check if the property exists in `extends`
      if (filter && this["extends"] && this["extends"][key]) {
        let match = true;

        // Check each filter criteria against the `extends` property
        for (const filterKey in filter) {
          if (this["extends"][key][filterKey] !== filter[filterKey]) {
            match = false;
            break;
          }
        }

        // If all filter criteria match, add the item to results
        if (match) {
          results.push({ ...this["extends"][key], value: this[key] });
        }
      } else {
        results.push({ ...this["extends"][key], value: this[key] });
      }
    }

    return results;
  }
}

export class TestFactory extends BaseFactory {
  @label("Full Name")
  @fakeData((faker: Faker) => faker.person.fullName())
  fullName: string;

  @label("Address Line 1")
  @required()
  @fakeData((faker: Faker) => faker.location.streetAddress())
  addressLine1: string = "";

  @label("Zip / Postcode")
  @fakeData((faker: Faker) => faker.location.zipCode())
  zipPostcode: string = "";
}
