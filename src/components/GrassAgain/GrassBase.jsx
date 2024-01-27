import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import GrassLand from "./GrassLand";
import GrassBed from "./GrassBed";
import { Leva, useControls } from "leva";
import CloudsBase from "./CloudsBase";
import { Suspense, useState } from "react";
import Forest from "./Forest";
import CharacterMove from "./CharacterMove";

const GrassBase = () => {
  const [cameraLookPosition, setCameraLookPosition] = useState([0, 5, 0]);
  const { scale } = useControls("Terrain", {
    scale: {
      value: 200,
      step: 2,
    },
  });
  return (
    <Canvas camera={{ position: [0.0, 5.0, 10.0] }}>
      <ambientLight intensity={Math.PI / 1.5} />
      <directionalLight position={[10, 40, 10]} intensity={5} />
      {/* <spotLight
        position={[0, 40, 0]}
        decay={0}
        distance={45}
        penumbra={1}
        intensity={100}
      /> */}
      {/* <spotLight
        position={[-20, 0, 10]}
        color="red"
        angle={0.15}
        decay={0}
        penumbra={-1}
        intensity={30}
      /> */}
      {/* <spotLight
        position={[20, -10, 10]}
        color="red"
        angle={0.2}
        decay={0}
        penumbra={-1}
        intensity={20}
      /> */}
      <GrassLand scale={scale * 2} />
      <GrassBed scale={scale} />
      <Suspense fallback={null}>
        <Forest scale={scale * 3} />
      </Suspense>
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <CloudsBase />
      <fog attach={"fog"} color="white" near={20} far={300} />
      <OrbitControls target={cameraLookPosition} />
      {/* <CharacterMove
        cameraLookPosition={cameraLookPosition}
        setCameraLookPosition={setCameraLookPosition}
      /> */}
      <Stats />
      {/* <Leva hidden /> */}
    </Canvas>
  );
};

export default GrassBase;
