import {
  BoxGeometry,
  DoubleSide,
  Matrix4,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import { useEffect, useRef } from "react";
import { noise2D } from "./utils";
import treevsh from "./shaders/treevsh.glsl?raw";
import treefsh from "./shaders/treefsh.glsl?raw";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader } from "@react-three/fiber";

const Trees = ({ scale }) => {
  const meshRef = useRef();
  const colorMap = useLoader(TextureLoader, "treesTex.png");

  const geometry = new PlaneGeometry(10, 10);
  const material = new MeshBasicMaterial({
    map: colorMap,
    side: DoubleSide,
    transparent: true,
  });

  const count = 20;

  const matrix = new Matrix4();
  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * scale;
        let z = (Math.random() - 0.5) * scale;
        let y = 2 * noise2D(x / 50, z / 50);
        y += 4 * noise2D(x / 100, z / 100);
        y += 0.2 * noise2D(x / 10, z / 10);
        y += 5;
        const position = new Vector3(x, y, z);
        matrix.setPosition(position);
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef, scale]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
    ></instancedMesh>
  );
};

export default Trees;
