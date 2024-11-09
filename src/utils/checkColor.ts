import { expect, Locator } from "@playwright/test";

export const checkColor = async (
  element: Locator,
  cssProperty: string,
  rgbColors: { red: number; green: number; blue: number }
) => {
  const cssValue = await element.evaluate((el: Element, cssProperty) => {
    return window.getComputedStyle(el).getPropertyValue(cssProperty);
  }, cssProperty);
  const expectedColor = `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`;
  expect(cssValue).toContain(expectedColor);
};
