import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useMemo } from "react";
const Blade = ({ blade }) => {
  const uniforms = useMemo(
    () => ({
      u_rand: {
        value: Math.random(),
      },
    }),
    []
  );
  return (
    <mesh
      position={blade.position}
      rotation={[0, (Math.random() * Math.PI) / 2, 0]}
    >
      <planeGeometry args={[0.3, 2, 20, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={2}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blade;
