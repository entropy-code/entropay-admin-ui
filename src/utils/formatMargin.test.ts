import { formatMargin } from "./formatMargin";

describe("formatMargin", () => {
  it("renders a 0 margin as 0% (pass-through engagement), not the empty indicator", () => {
    expect(formatMargin(0)).toBe("0%");
  });

  it("renders a positive margin with a percent sign", () => {
    expect(formatMargin(45)).toBe("45%");
  });

  it("renders the empty indicator when the margin is null", () => {
    expect(formatMargin(null)).toBe("-");
  });

  it("renders the empty indicator when the margin is undefined", () => {
    expect(formatMargin(undefined)).toBe("-");
  });
});
