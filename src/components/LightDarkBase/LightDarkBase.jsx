import { Canvas } from "@react-three/fiber";
import TexturePlane from "./TexturePlane";
import { OrbitControls, Stats } from "@react-three/drei";

const LightDarkBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 0, 10.0] }}>
      <ambientLight intensity={Math.PI / 1.5} />
      <TexturePlane />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </Canvas>
  );
};

export default LightDarkBase;
