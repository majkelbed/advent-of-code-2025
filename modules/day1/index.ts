export function passwordMethod0x434C49434B(
  steps: string[],
  initialPosition: number = 50
): number {
  let position = initialPosition;
  let count = 0;

  for (const step of steps) {
    const direction = step[0];
    const rotateBy = Number(step.slice(1));
    const rotateByNormalized = rotateBy % 100;
    const rotateTo =
      direction === "R"
        ? position + rotateByNormalized
        : position - rotateByNormalized;

    if (rotateTo === 0 || rotateTo >= 100 || (position !== 0 && rotateTo < 0)) {
      count++;
    }

    count += Math.trunc(rotateBy / 100);
    position = (rotateTo + 100) % 100;
  }

  return count;
}