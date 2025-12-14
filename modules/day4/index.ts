export type Field = "@" | ".";

class Fields {
  public readonly values: Field[][];

  constructor(values: Field[][]) {
    this.values = values;
  }

  print() {
    return this.values.flatMap((row) => row.join("")).join("\n");
  }
}

export class Grid {
  private fields: Fields;
  private width: number;
  private height: number;

  constructor(fields: Field[][]) {
    this.fields = new Fields(fields);
    this.width = fields[0].length;
    this.height = fields.length;

    if (this.width < 0 || this.height < 0) {
      throw new Error(
        "Grid has to be at least one row tall and one column wide"
      );
    }
  }

  public cleanupRolls() {
    let total = 0;
    let iterationCount = 0;

    for (var cleanupRun = 0; cleanupRun >= 0; cleanupRun++) {
      this.forEachRoll((row, column) => {
        if (this.isFieldAccessible(row, column)) {
          iterationCount++;
          this.clearField(row, column);
        }
      });

      if (iterationCount === 0) {
        break;
      }

      total += iterationCount;
      iterationCount = 0;
    }

    console.log(`Clean up runs: ${cleanupRun}`);
    return total;
  }

  private clearField(row: number, column: number) {
    this.fields.values[row][column] = ".";
  }

  public countAccessibleRolls() {
    let count = 0;

    this.forEachRoll((row, column) => {
      if (this.isFieldAccessible(row, column)) {
        count++;
      }
    });

    return count;
  }

  public isFieldAccessible(row: number, column: number) {
    let takenFields = 0;

    for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
      for (let offsetColumn = -1; offsetColumn <= 1; offsetColumn++) {
        if (offsetColumn === 0 && offsetRow === 0) continue;

        if (this.isFieldTaken(row + offsetRow, column + offsetColumn)) {
          takenFields++;
        }
      }
    }

    return takenFields < 4;
  }

  public isFieldTaken(row: number, column: number) {
    if (row < 0 || row >= this.height || column < 0 || column >= this.width)
      return false;

    return this.fields.values[row][column] === "@";
  }

  private forEach(fn: (row: number, column: number, field: Field) => void) {
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        fn(row, column, this.fields.values[row][column]);
      }
    }
  }

  private forEachRoll(fn: (row: number, column: number) => void) {
    this.forEach((row, column, field) => {
      if (field === ".") {
        return;
      }

      fn(row, column);
    });
  }
}

export function forklifts(layout: string[]) {
  const fields = layout.map((row, rowIndex) =>
    row.split("").map((char, charIndex) => {
      switch (char) {
        case "@":
        case ".":
          return char;
        default:
          throw new Error(
            `Unexpected input: ${char} at ${rowIndex}, ${charIndex}`
          );
      }
    })
  );

  const grid = new Grid(fields);

  return grid.cleanupRolls();
}
