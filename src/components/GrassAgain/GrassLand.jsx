import { useRef } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";

const GrassLand = () => {
  const mesh = useRef();

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={80}
    >
      <planeGeometry args={[1, 1, 10, 10]} />
      <meshBasicMaterial color={"#0d3304"} />
      {/* <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      /> */}
    </mesh>
  );
};

export default GrassLand;
