export class Bank {
  private baterries: number[]

  constructor(batteries: string) {
    this.baterries = batteries.split("").map(Number);
  }

  public findBiggestBattery(boundary: { start: number, end: number }) {
    if(boundary.start > boundary.end) {
      throw new Error("Incorrect boundaries");
    }

    let max = { value: this.baterries[boundary.start], index: boundary.start };

    for (let index = boundary.start + 1; index <= boundary.end; index++) {
      const battery = this.baterries[index];

      if(battery > max.value) {
        max.value = battery;
        max.index = index;
      }
    }

    return max;
  }

  public findBiggestJoltage(capacity: number) {
    let joltage: number[] = [];
    let boundary = {
      start: 0,
      end: this.baterries.length - capacity
    };
    
    for (let index = 0; index < capacity; index++) {
      const battery = this.findBiggestBattery(boundary);

      boundary.start = battery.index + 1;
      boundary.end++;
      
      joltage.push(battery.value);
    }

    return Number(joltage.join(""));
  }
}

export function joltage(banks: string[]) {
  let sum = 0;

  for (const batteries of banks) {
    const bank = new Bank(batteries);

    sum += bank.findBiggestJoltage(12);
  }

  return sum;
}
