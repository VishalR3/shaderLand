import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls } from "@react-three/drei";
import Terrain1 from "./Terrain1";
import TerrainGenerator from "./TerrainGenerator";

const Base = () => {
  return (
    <Canvas camera={{ position: [0.0, 0, 3.0] }}>
      <TerrainGenerator />
      {/* <axesHelper /> */}
      <FirstPersonControls />
      {/* <OrbitControls /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default Base;
