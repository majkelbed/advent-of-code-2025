import { describe, it, expect } from "vitest";
import { longestReapetingSequence } from "./index.ts";

describe("longestReapetingSequence", () => {
  it("should return correct value for given example", () => {
    expect(
      longestReapetingSequence([
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124",
      ])
    ).toBe(4174379265);
  });

  it("should detect 1111", () => {
    expect(longestReapetingSequence(["1110-1111"])).toBe(1111);
  });

  it("should detect 123123", () => {
    expect(longestReapetingSequence(["123120-123123"])).toBe(123123);
  });
});
