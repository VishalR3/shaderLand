import { useEffect, useMemo, useRef } from "react";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

const GrassLand = ({ grassPositions, scale }) => {
  const mesh = useRef();
  const positions = Array.from(Array(scale), () => new Array(scale).fill(0));
  const vertices = useMemo(() => {
    const tempArray = [];
    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        let x = -i + scale / 2;
        let z = -j + scale / 2;
        let y = 2 * noise2D(x / 50, z / 50);
        y += 4 * noise2D(x / 100, z / 100);
        y += 0.2 * noise2D(x / 10, z / 10);
        // y = 0;
        tempArray.push(x);
        tempArray.push(y);
        tempArray.push(z);
        positions[x - 1 + scale / 2][z - 1 + scale / 2] = y;
      }
    }
    return new Float32Array(tempArray);
  }, [scale]);
  grassPositions.current = positions;
  const indices = useMemo(() => {
    const indicesArray = [];
    for (let i = 0; i < scale; i++) {
      for (let j = 0; j < scale; j++) {
        if (j < scale - 1 && i < scale - 1) {
          indicesArray.push(j + i * scale);
          indicesArray.push(j + 1 + i * scale);
          indicesArray.push(j + 1 + (i + 1) * scale);

          indicesArray.push(j + 1 + (i + 1) * scale);
          indicesArray.push(j + (i + 1) * scale);
          indicesArray.push(j + i * scale);
        }
      }
    }
    return new Uint32Array(indicesArray);
  }, [scale]);
  useEffect(() => {
    console.log("Rendering at Scale: ", scale);
    console.log(vertices);
  }, [scale]);

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={vertices.length / 3}
          array={vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach={"index"}
          count={indices.length}
          array={indices}
          itemSize={1}
        />
      </bufferGeometry>
      <meshBasicMaterial color={"#0d3304"} side={2} />
    </mesh>
  );
};

export default GrassLand;
