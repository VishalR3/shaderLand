import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Terrain from "./Terrain";

const DAGBase = () => {
  return (
    <Canvas camera={{ position: [0.0, 5, 10.0] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <Terrain />
      {/* <mesh>
        <icosahedronGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color={"red"} roughness={0.3} />
      </mesh> */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <axesHelper />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};

export default DAGBase;
