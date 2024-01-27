import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { MeshLambertMaterial } from "three";

const CloudsBase = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 5) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 5) / 2;
  });

  return (
    <group ref={ref}>
      <Clouds material={MeshLambertMaterial} limit={400}>
        <Cloud
          concentrate="outside"
          growth={100}
          color="#ffccdd"
          opacity={1.25}
          seed={0.3}
          bounds={250}
          volume={200}
        />
      </Clouds>
    </group>
  );
};

export default CloudsBase;
