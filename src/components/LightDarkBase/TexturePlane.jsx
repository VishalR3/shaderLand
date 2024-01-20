import { useMemo, useRef } from "react";
import fsh from "./shaders/fsh.glsl?raw";
import vsh from "./shaders/vsh.glsl?raw";
import { useFrame } from "@react-three/fiber";

const TexturePlane = () => {
  const meshRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
    }),
    []
  );
  useFrame((state, delta) => {
    meshRef.current.material.uniforms.uTime.value += delta;
  });
  return (
    <mesh ref={meshRef} scale={10}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vsh}
        fragmentShader={fsh}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default TexturePlane;
