import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import GrassLand from "./GrassLand";
import GrassBed from "./GrassBed";
import Character from "../Character/Character";
import { useRef } from "react";
import { useControls } from "leva";
import CloudsBase from "./CloudsBase";

const GrassBase = () => {
  const { scale } = useControls("Terrain", {
    scale: {
      value: 200,
      step: 2,
    },
  });
  const grassPositions = useRef(new Array(80).fill(Array(80).fill(0)));
  return (
    <Canvas camera={{ position: [0.0, 5, 10.0] }}>
      <ambientLight intensity={Math.PI / 1.5} />
      <spotLight
        position={[0, 40, 0]}
        decay={0}
        distance={45}
        penumbra={1}
        intensity={100}
      />
      <spotLight
        position={[-20, 0, 10]}
        color="red"
        angle={0.15}
        decay={0}
        penumbra={-1}
        intensity={30}
      />
      <spotLight
        position={[20, -10, 10]}
        color="red"
        angle={0.2}
        decay={0}
        penumbra={-1}
        intensity={20}
      />
      <GrassLand grassPositions={grassPositions} scale={scale} />
      <GrassBed grassPositions={grassPositions} scale={scale} />
      {/* <Character /> */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <CloudsBase />
      <OrbitControls />
      <axesHelper />
      <Stats />
    </Canvas>
  );
};

export default GrassBase;
