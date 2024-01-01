import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import GrassLand from "./GrassLand";
import GrassBed from "./GrassBed";
import Character from "../Character/Character";
import { useRef } from "react";

const GrassBase = () => {
  const characterRef = useRef();
  return (
    <Canvas camera={{ position: [0.0, 0, 10.0] }}>
      <Character characterRef={characterRef} />
      <GrassBed characterRef={characterRef} />
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
