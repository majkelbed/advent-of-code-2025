import { describe, it, expect } from "vitest";
import { freshOrSpoiled, Range } from "./index.ts";

describe("day5", () => {
  it("should return correct value for given example", () => {
    expect(
      freshOrSpoiled([
        "3-5",
        "10-14",
        "16-20",
        "12-18",
        " ",
        "1",
        "5",
        "8",
        "11",
        "17",
        "32",
      ])
    ).toBe(3);
  });

  it("should return correct value for given example", () => {
    expect(
      freshOrSpoiled([
        "12-18",
        "25-25",
        "10-14",
        "16-20",
        "3-5",
        "2-5",
        " ",
        "1",
        "5",
        "8",
        "11",
        "17",
        "25",
        "32",
      ])
    ).toBe(4);
  });

  describe("Range", () => {
    describe("isIntersecting", () => {
      it("returns true when one range contains the other", () => {
        const a = new Range(5, 15);
        const b = new Range(7, 10);

        expect(Range.isIntersecting(a, b)).toBe(true);
        expect(Range.isIntersecting(b, a)).toBe(true);
      });

      it("returns true when ranges partially overlap", () => {
        const a = new Range(5, 12);
        const b = new Range(10, 20);

        expect(Range.isIntersecting(a, b)).toBe(true);
        expect(Range.isIntersecting(b, a)).toBe(true);
      });

      it("returns true when ranges are identical", () => {
        const a = new Range(3, 8);
        const b = new Range(3, 8);

        expect(Range.isIntersecting(a, b)).toBe(true);
        expect(Range.isIntersecting(b, a)).toBe(true);
      });

      it("returns false when ranges do not intersect", () => {
        const a = new Range(1, 4);
        const b = new Range(5, 10);

        expect(Range.isIntersecting(a, b)).toBe(false);
        expect(Range.isIntersecting(b, a)).toBe(false);
      });
    });

    describe("merge", () => {
      it("merges set when one range contains the other", () => {
        const a = new Range(5, 15);
        const b = new Range(7, 10);

        expect(Range.merge(a, b)).toStrictEqual(new Range(5, 15));
        expect(Range.merge(b, a)).toStrictEqual(new Range(5, 15));
      });

      it("merges set when ranges partially overlap", () => {
        const a = new Range(5, 12);
        const b = new Range(10, 20);

        expect(Range.merge(a, b)).toStrictEqual(new Range(5, 20));
        expect(Range.merge(b, a)).toStrictEqual(new Range(5, 20));
      });

      it("merges set when ranges are identical", () => {
        const a = new Range(3, 8);
        const b = new Range(3, 8);

        expect(Range.merge(a, b)).toStrictEqual(new Range(3, 8));
        expect(Range.merge(b, a)).toStrictEqual(new Range(3, 8));
      });
    });
  });
});
