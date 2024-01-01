import { Canvas } from "@react-three/fiber";
import Land from "./Land/Land";
import Grass from "./Grass/Grass";
import Character from "./Character/Character";
import { OrbitControls } from "@react-three/drei";

const ThreeContainer = () => {
  return (
    <Canvas camera={{ position: [0.0, 2, 10.0] }}>
      <Land />
      <Grass />
      <Character />
      <OrbitControls />
      <axesHelper />
    </Canvas>
  );
};

export default ThreeContainer;
