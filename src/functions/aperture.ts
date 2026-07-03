const fullStops = [1.0, 1.2, 1.4, 1.8, 2.0, 2.8, 4, 5.6, 8, 11, 16, 22];

export function nearestApertureStop(value: number) {
  return fullStops.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
  );
}

export function formatAperture(value: number) {
  const rounded = nearestApertureStop(value);
  return `f/${rounded}`;
}
