function splitString(str: string, partitions: number) {
  const elementsPerPartition = str.length / partitions;
  return Array.from({ length: partitions }, (_, index) =>
    str.substring(
      elementsPerPartition * index,
      elementsPerPartition * (index + 1)
    )
  );
}

function dividers(num: number, cache: Record<number, number[]>): number[] {
  const entry = cache[num];
  if(entry) return entry;

  const dividers = [];
  for (let n = 2; n <= num; n++) {
    if (num % n === 0) dividers.push(n);
  }

  cache[num] = dividers;
  return dividers;
}

export function longestReapetingSequence([ranges]: string[]) {
  const dividersCache: Record<number, number[]> = {}
  let sum = 0;

  for (const range of ranges.split(",")) {
    const [start, end] = range.split("-").map(Number);
    const ids = Array.from({ length: end - start + 1 }, (_, index) =>
      String(index + start)
    );

    for (const id of ids) {
      const divs = dividers(Number(id.length), dividersCache);

      for (const divider of divs) {
        const splits = splitString(id, divider);

        let hasSequence = true;

        for (let i = 1; i < splits.length; i++) {
          const prev = splits[i -1];
          const curr = splits[i];

          if (prev !== curr) {
            hasSequence = false;
            break;
          }
        }

        if (hasSequence) {
          sum += Number(id);
          break;
        }
      }
    }
  }

  return sum;
}
