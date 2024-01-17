import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import GrassLand from "./GrassLand";
import GrassBed from "./GrassBed";
import Character from "../Character/Character";
import { useRef } from "react";
import { useControls } from "leva";

const GrassBase = () => {
  const { scale } = useControls("Terrain", {
    scale: {
      value: 80,
      step: 2,
    },
  });
  const grassPositions = useRef(new Array(80).fill(Array(80).fill(0)));
  return (
    <Canvas camera={{ position: [0.0, 5, 10.0] }}>
      <GrassLand grassPositions={grassPositions} scale={scale} />
      <GrassBed grassPositions={grassPositions} scale={scale} />
      {/* <Character /> */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </Canvas>
  );
};

export default GrassBase;
