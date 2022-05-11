const G = 0.2;

export function getAngSpeed(distanceFromReference: number, massReference: number) {
  const mu = G * massReference;
  return Math.sqrt(mu) * Math.pow(distanceFromReference, -1.5);
}

