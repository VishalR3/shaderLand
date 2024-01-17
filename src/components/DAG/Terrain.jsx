import { useCallback } from "react";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

const Terrain = () => {
  const scale = 10;
  const vertices = useCallback(() => {
    const tempArray = [];
    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        let y = 2 * noise2D(i / 50, j / 50);
        y += 4 * noise2D(i / 100, j / 100);
        y += 0.2 * noise2D(i / 10, j / 10);
        tempArray.push(scale / 2 - i);
        tempArray.push(y);
        tempArray.push(scale / 2 - j);
      }
    }
    return new Float32Array(tempArray);
  }, []);
  const indices = useCallback(() => {
    const indicesArray = [];
    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        if (j < scale - 1 && i < scale - 1) {
          indicesArray.push(j + i * scale);
          indicesArray.push(j + 1 + (i + 1) * scale);
          indicesArray.push(j + 1 + i * scale);

          indicesArray.push(j + 1 + (i + 1) * scale);
          indicesArray.push(j + i * scale);
          indicesArray.push(j + (i + 1) * scale);
        }
      }
    }
    return new Uint32Array(indicesArray);
  }, []);
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={vertices().length / 3}
          array={vertices()}
          itemSize={3}
        />
        <bufferAttribute
          attach={"index"}
          count={indices().length}
          array={indices()}
          itemSize={1}
        />
      </bufferGeometry>
      <meshBasicMaterial color={"red"} side={2} />
    </mesh>
  );
};

export default Terrain;
