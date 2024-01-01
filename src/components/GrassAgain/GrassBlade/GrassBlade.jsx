import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const GrassBlade = ({ position, resolution }) => {
  const mesh = useRef();
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
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <mesh ref={mesh} position={[position.x, 0.5, position.y]}>
      <planeGeometry args={[0.25, 1, 1, resolution]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        side={2}
        uniforms={uniforms}
        // wireframe
      />
    </mesh>
  );
};

export default GrassBlade;
