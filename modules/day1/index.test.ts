import { describe, it, expect } from "vitest";
import { passwordMethod0x434C49434B } from "./index.ts";

describe("passwordMethod0x434C49434B", () => {
  it("should return correct value for given example", () => {
    expect(
      passwordMethod0x434C49434B([
        "L68",
        "L30",
        "R48",
        "L5",
        "R60",
        "L55",
        "L1",
        "L99",
        "R14",
        "L82",
      ])
    ).toBe(6);
  });

  it("should count none when rotating without passing trough 0", () => {
    expect(passwordMethod0x434C49434B(["L10", "L10", "R10", "R10"], 50)).toBe(
      0
    );
  });

  it("should count once when stopping on 0", () => {
    expect(passwordMethod0x434C49434B(["L50"], 50)).toBe(1);
    expect(passwordMethod0x434C49434B(["R50"], 50)).toBe(1);
  });

  it("should count once when passing trough 0 once", () => {
    expect(passwordMethod0x434C49434B(["L60"], 50)).toBe(1);
    expect(passwordMethod0x434C49434B(["R60"], 50)).toBe(1);
  });

  it("should count once when passing trough 0 once and starting from 0", () => {
    expect(passwordMethod0x434C49434B(["L150"], 0)).toBe(1);
    expect(passwordMethod0x434C49434B(["R150"], 0)).toBe(1);
  });

  it("should count few when passing trough 0 multiple times", () => {
    expect(passwordMethod0x434C49434B(["L300"], 50)).toBe(3);
    expect(passwordMethod0x434C49434B(["R300"], 50)).toBe(3);
  });

    it("should count few when passing trough 0 multiple times and starting from 0", () => {
    expect(passwordMethod0x434C49434B(["L300"], 50)).toBe(3);
    expect(passwordMethod0x434C49434B(["R300"], 50)).toBe(3);
  });
});
