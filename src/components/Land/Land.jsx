import { useRef } from "react";

const Land = () => {
  const mesh = useRef();

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={400}
    >
      <planeGeometry args={[1, 1, 2, 2]} />
      <meshBasicMaterial color={"#316033"} />
    </mesh>
  );
};

export default Land;
