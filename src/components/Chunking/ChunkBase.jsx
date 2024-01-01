import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls } from "@react-three/drei";
import QuadPlane from "./QuadPlane";

const ChunkBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 1, 3.0] }}>
      <QuadPlane />
      {/* <FirstPersonControls /> */}
      <OrbitControls />
      <ambientLight />
      <axesHelper />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default ChunkBase;
