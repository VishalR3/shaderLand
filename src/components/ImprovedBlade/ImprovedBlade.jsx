import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const getVertices = (position) => {
  return new Float32Array([
    position.x - 0.3,
    position.y,
    position.z,
    position.x + 0.3,
    position.y,
    position.z,
    position.x + 0.3,
    position.y + 1,
    position.z,
    position.x - 0.3,
    position.y + 1,
    position.z,
    position.x - 0.2,
    position.y + 2,
    position.z,
    position.x + 0.2,
    position.y + 2,
    position.z,
    position.x,
    position.y + 3,
    position.z,
  ]);
};
const uvMatrix = new Float32Array([
  0, 0, 1, 0, 0, 0.33, 1, 0.33, 0.33, 0.66, 0.66, 0.66, 1, 1,
]);

const indices = new Uint32Array([0, 1, 2, 2, 3, 0, 3, 2, 5, 5, 4, 3, 4, 5, 6]);

const ImprovedBlade = ({ position }) => {
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
    <mesh ref={mesh} rotation={[0, (Math.random() * Math.PI) / 2, 0]}>
      {/* <planeGeometry args={[0.3, 2, 20, 20]} /> */}
      <bufferGeometry>
        <bufferAttribute
          attach={"index"}
          array={new Uint32Array(indices)}
          itemSize={1}
          count={indices.length}
        />
        <bufferAttribute
          attach={"attributes-position"}
          array={getVertices(position)}
          itemSize={3}
          count={7}
        />
        <bufferAttribute
          attach={"attributes-uv"}
          array={uvMatrix}
          itemSize={2}
          count={uvMatrix.length / 2}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={2}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default ImprovedBlade;
