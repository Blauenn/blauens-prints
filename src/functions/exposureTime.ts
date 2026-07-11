export function formatShutterSpeed(exposureTime: number | null) {
  if (exposureTime === null) return "?";

  if (exposureTime >= 1) {
    return exposureTime;
  }

  const denominator = Math.round(1 / exposureTime);

  return `1/${denominator}`;
}
