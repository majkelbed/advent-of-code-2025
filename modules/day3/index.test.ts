import { describe, it, expect, test } from "vitest";
import { Bank, joltage } from "./index.ts";

describe("joltage", () => {
  describe("Bank", () => {
    it("should find biggest battery within boundary", () => {
      expect(
        new Bank("111111111111119").findBiggestBattery({ start: 0, end: 5 })
      ).toStrictEqual({
        index: 0,
        value: 1,
      });
    });

    it("should find biggest joltage within bank of capacity 2", () => {
      expect(
        new Bank("111111111111119").findBiggestJoltage(2)
      ).toBe(19)
    });

    it("should find biggest joltage within bank of capacity 12", () => {
      expect(
        new Bank("987654321111111").findBiggestJoltage(12)
      ).toBe(987654321111)
    });
  });

  it("should return correct value for given example", () => {
    expect(
      joltage([
        "987654321111111",
        "811111111111119",
        "234234234234278",
        "818181911112111",
      ])
    ).toBe(3121910778619);
  });
});
