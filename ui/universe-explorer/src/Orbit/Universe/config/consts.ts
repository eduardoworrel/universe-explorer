const G = 0.04;

export function getAngSpeed(distanceFromReference: number, massReference: number) {
  let mu = G * massReference;
  return Math.sqrt(mu) * Math.pow(distanceFromReference, -1.5);
}
