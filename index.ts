import path from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";
import { readFile } from "./utils/read-file.ts";
import { passwordMethod0x434C49434B } from "./modules/day1/index.ts";
import { longestReapetingSequence } from "./modules/day2/index.ts";
import { benchmark } from "./utils/benchmark.ts";
import { joltage } from "./modules/day3/index.ts";
import { forklifts } from "./modules/day4/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function day(dayNumber: number, inputLines: string[]) {
  switch (dayNumber) {
    case 1:
      return passwordMethod0x434C49434B(inputLines);
    case 2:
      return longestReapetingSequence(inputLines);
    case 3:
      return joltage(inputLines);
    case 4:
      return forklifts(inputLines);
    default:
      console.log("Day not completed");
  }
}

async function main() {
  const args = parseArgs({
    args: process.argv.slice(2),
    options: { day: { type: "string" }, benchmark: { type: "boolean" } },
  });

  const dayNumber = Number(args.values.day) || 1;
  const isBenchmark = args.values.benchmark;

  const filepath = path.join(__dirname, "modules", `day${dayNumber}`, "input");
  const input = await readFile(filepath);
  const inputLines = input.split("\r\n");

  if (isBenchmark) {
    const fn = () => day(dayNumber, inputLines);
    benchmark(fn);
  } else {
    console.log(day(dayNumber, inputLines));
  }
}

main();
