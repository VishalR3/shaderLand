import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { MathUtils } from "three";

const Blob = () => {
  const mesh = useRef();
  const hover = useRef();
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_intensity: {
        value: 0.3,
      },
    }),
    []
  );
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });
  return (
    <mesh
      ref={mesh}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
