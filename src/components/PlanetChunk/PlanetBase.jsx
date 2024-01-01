import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PlanetFaceGen from "./PlanetFaceGen";

const PlanetBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 1, 3.0] }}>
      <PlanetFaceGen />
      <OrbitControls />
      <ambientLight />
      <axesHelper />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default PlanetBase;
