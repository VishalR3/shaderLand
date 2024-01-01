import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import GrassLand from "./GrassLand";
import GrassBed from "./GrassBed";
import { useRef } from "react";

const GrassBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 5, 10.0] }}>
      <GrassBed />
      <GrassLand />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};

export default GrassBase;
