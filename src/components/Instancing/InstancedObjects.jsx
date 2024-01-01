import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Vector3,
} from "three";

extend({ InstancedMesh: InstancedMesh });

const InstancedObjects = () => {
  const meshRef = useRef();
  const count = 1000;
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0xff0000 });

  const matrix = new Matrix4();

  useEffect(() => {
    if (meshRef.current) {
      // Populate the matrix array with random positions
      for (let i = 0; i < count; i++) {
        const position = new Vector3(
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        );
        matrix.setPosition(position);
        meshRef.current.setMatrixAt(i, matrix);
      }

      // Update the instanced mesh
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]}>
      <mesh geometry={geometry} material={material} />
    </instancedMesh>
  );
};

export default InstancedObjects;
