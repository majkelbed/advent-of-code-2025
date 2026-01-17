import path from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";
import { readFile } from "./utils/read-file.ts";
import { passwordMethod0x434C49434B } from "./modules/day1/index.ts";
import { longestReapetingSequence } from "./modules/day2/index.ts";
import { benchmark } from "./utils/benchmark.ts";
import { joltage } from "./modules/day3/index.ts";
import { forklifts } from "./modules/day4/index.ts";
import { freshOrSpoiled, getFreshIDs } from "./modules/day5/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type DayHandler = (inputLines: string[]) => unknown;

const days: Record<number, { part1: DayHandler; part2: DayHandler }> = {
  1: { part1: passwordMethod0x434C49434B, part2: passwordMethod0x434C49434B },
  2: { part1: longestReapetingSequence, part2: longestReapetingSequence },
  3: { part1: joltage, part2: joltage },
  4: { part1: forklifts, part2: forklifts },
  5: { part1: freshOrSpoiled, part2: getFreshIDs },
};

function day(dayNumber: number, part: number, inputLines: string[]) {
  const dayHandler = days[dayNumber];
  
  if (!dayHandler) {
    console.log("Day not completed");
    return;
  }

  const handler = part === 1 ? dayHandler.part1 : dayHandler.part2;
  return handler(inputLines);
}

async function main() {
  const args = parseArgs({
    args: process.argv.slice(2),
    options: {
      day: { type: "string" },
      part: { type: "string" },
      benchmark: { type: "boolean" },
    },
  });

  const dayNumber = Number(args.values.day) || 1;
  const part = Number(args.values.part) || 2;
  const isBenchmark = args.values.benchmark;

  const filepath = path.join(__dirname, "modules", `day${dayNumber}`, "input");
  const input = await readFile(filepath);
  const inputLines = input.split("\r\n");

  const runDay = () => day(dayNumber, part, inputLines);
  if (isBenchmark) {
    benchmark(runDay);
  } else {
    console.log(runDay());
  }
}

main();
