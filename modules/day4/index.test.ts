import { describe, it, expect } from "vitest";
import { forklifts, Grid, type Field } from "./index.ts";

describe("forklifts", () => {
  describe("Grid", () => {
    it("isFieldTaken returns true for '@', false for '.' and false for out-of-bounds", () => {
      const fields: Field[][] = [["@"]];
      const grid = new Grid(fields);

      expect(grid.isFieldTaken(0, 0)).toBe(true);
      expect(grid.isFieldTaken(0, 1)).toBe(false);
      expect(grid.isFieldTaken(-1, 0)).toBe(false);
    });

    it("isFieldAccessible returns false when 4 adjacent fields are taken", () => {
      const fields: Field[][] = [
        ["@", "@", "."],
        ["@", "@", "@"],
        [".", ".", "."],
      ];
      const grid = new Grid(fields);

      expect(grid.isFieldAccessible(1, 1)).toBe(false);
    });

    it("isFieldAccessible returns true when fewer than 4 adjacent fields are taken", () => {
      const fields: Field[][] = [
        ["@", "@", "."],
        ["@", ".", "."],
        [".", ".", "."],
      ];
      const grid = new Grid(fields);

      expect(grid.isFieldAccessible(1, 1)).toBe(true);
      expect(grid.isFieldAccessible(0, 0)).toBe(true);
    });
  })

  it("should return correct value for given example", () => {
    expect(
      forklifts([
        "..@@.@@@@.",
        "@@@.@.@.@@",
        "@@@@@.@.@@",
        "@.@@@@..@.",
        "@@.@@@@.@@",
        ".@@@@@@@.@",
        ".@.@.@.@@@",
        "@.@@@.@@@@",
        ".@@@@@@@@.",
        "@.@.@@@.@.",
      ])
    ).toBe(43);
  });
});
