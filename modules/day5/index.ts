type RawRange = [number, number];

const getInput = (database: string[]) => {
  const freshRanges: RawRange[] = [];
  const productsIds: number[] = [];

  for (const entry of database) {
    if (entry.includes("-")) {
      const range = entry.split("-").map(Number);

      if (range.length === 2) {
        freshRanges.push(range as RawRange);
      } else {
        throw new Error("Invalid range");
      }
    } else {
      const id = Number(entry);
      if (id !== 0) {
        productsIds.push(id);
      }
    }
  }

  return [freshRanges, productsIds] as const;
};

const mergeRanges = (ranges: Range[]) => {
  const sorted = ranges.toSorted(
    (range1, range2) => range1.start - range2.start,
  );

  let merged = [sorted[0]];

  for (const range of sorted) {
    const nextSet = Range.isIntersecting(merged.at(-1), range)
      ? Range.merge(merged.pop(), range)
      : range;

    merged.push(nextSet);
  }

  return merged;
};

export function freshOrSpoiled(database: string[]) {
  const [ranges, productsIds] = getInput(database);
  const freshRanges = mergeRanges(
    ranges.map(([start, end]) => new Range(start, end)),
  );

  let spoiledProductsCount = 0;

  for (const id of productsIds) {
    const isFresh = freshRanges.some(
      (range) => id >= range.start && id <= range.end,
    );

    if (!isFresh) {
      spoiledProductsCount++;
    }
  }

  return spoiledProductsCount;
}

export class Range {
  public start: number;
  public end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  public static isIntersecting(range1: Range, range2: Range) {
    return range1.start <= range2.end && range1.end >= range2.start;
  }

  public static merge(range1: Range, range2: Range) {
    return new Range(
      Math.min(range1.start, range2.start),
      Math.max(range1.end, range2.end),
    );
  }
}
