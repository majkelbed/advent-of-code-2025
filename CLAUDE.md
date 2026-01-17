# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Advent of Code 2025 solutions in TypeScript. Each day's challenge is implemented as a separate module in `modules/day<N>/`.

## Commands

```bash
# Run a specific day (N = 1-25)
pnpm run start --day <N>

# Run with performance benchmarking
pnpm run start --day <N> --benchmark

# Run unit tests
pnpm run test
```

## Architecture

### Module Structure

Each day follows this pattern:
```
modules/day<N>/
├── index.ts        # Main solution function (exported)
├── index.test.ts   # Vitest unit tests
└── input           # Puzzle input file
```

### Entry Point

`index.ts` at the root:
- Parses `--day` and `--benchmark` CLI args
- Reads input from `modules/day<N>/input`
- Splits input by `\r\n` (Windows line endings)
- Routes to appropriate day function via switch statement

### Adding a New Day

1. Create `modules/day<N>/` directory with `index.ts`, `index.test.ts`, and `input`
2. Export main solver function from `index.ts` (takes `inputLines: string[]`, returns result)
3. Import and add case to switch statement in root `index.ts`

### Utilities

- `utils/read-file.ts` - Async file reading with UTF-8 encoding
- `utils/benchmark.ts` - Performance measurement over multiple runs (default: 5)

## Testing

Uses Vitest with globals enabled (`describe`, `it`, `expect` available without imports). Tests are co-located with day modules as `index.test.ts`.
