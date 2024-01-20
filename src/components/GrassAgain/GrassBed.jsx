import {
  DoubleSide,
  Euler,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  ShaderMaterial,
  Vector3,
} from "three";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import vertexShader from "./grassShaders/vertexShader.glsl?raw";
import fragmentShader from "./grassShaders/fragmentShader.glsl?raw";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

extend({ InstancedMesh: InstancedMesh });

const GrassBed = ({ grassPositions, scale }) => {
  const meshRef = useRef();
  const PARAMS = useControls("GrassBed", {
    gridSize: {
      value: 0.1,
      min: 0.1,
      max: 5,
    },
  });

  const uniforms = useMemo(
    () => ({
      u_rand: {
        value: (Math.random() - 0.5) * 2,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );
  const geometry = new PlaneGeometry(0.25, 1, 1, 6);
  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    side: DoubleSide,
  });
  const count = (scale * scale) / PARAMS.gridSize;

  const matrix = new Matrix4();
  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * scale;
        let z = (Math.random() - 0.5) * scale;
        let y;
        try {
          y =
            0.75 +
            grassPositions.current[Math.ceil(x + -1 + scale / 2)][
              Math.ceil(z + -1 + scale / 2)
            ];

          // if (y == 0.75) throw new Error("Got Value 0");
        } catch (e) {
          y = 2 * noise2D(x / 50, z / 50);
          y += 4 * noise2D(x / 100, z / 100);
          y += 0.2 * noise2D(x / 10, z / 10);
        }
        const position = new Vector3(x, y, z);
        matrix.setPosition(position);
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef, PARAMS, scale]);

  useFrame((state) => {
    const { clock } = state;
    material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]}>
      <mesh geometry={geometry} material={material} />
    </instancedMesh>
  );
};

export default GrassBed;
