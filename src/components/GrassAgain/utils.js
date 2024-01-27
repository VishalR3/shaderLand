import { createNoise2D } from "simplex-noise";

export const noise2D = createNoise2D();

export const noiseFract = (x, z) => {
  return (
    2 * noise2D(x / 50, z / 50) +
    4 * noise2D(x / 100, z / 100) +
    0.2 * noise2D(x / 10, z / 10)
  );
};
