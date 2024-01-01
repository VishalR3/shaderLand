import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InstancedObjects from "../Instancing/InstancedObjects";

const InstanceBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 0, 10.0] }}>
      <InstancedObjects />
      <OrbitControls />
      <axesHelper />
    </Canvas>
  );
};

export default InstanceBase;
