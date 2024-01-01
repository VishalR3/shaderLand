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

extend({ InstancedMesh: InstancedMesh });

const GrassBed = ({ characterRef }) => {
  const meshRef = useRef();
  const PARAMS = useControls("GrassBed", {
    gridDistance: {
      value: 80,
    },
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
  const count = (PARAMS.gridDistance * PARAMS.gridDistance) / PARAMS.gridSize;

  const matrix = new Matrix4();
  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const position = new Vector3(
          (Math.random() - 0.5) * PARAMS.gridDistance,
          0.5,
          (Math.random() - 0.5) * PARAMS.gridDistance
        );
        matrix.setPosition(position);
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef, PARAMS]);
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
