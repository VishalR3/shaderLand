import { noiseFract } from "./utils";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Matrix4, Object3D, Vector3 } from "three";
import { useEffect, useRef } from "react";

const Forest = ({ scale }) => {
  const treeMat = useLoader(MTLLoader, "Lowpoly_tree_sample.mtl");
  const treeMod = useLoader(OBJLoader, "tree.obj", (loader) => {
    treeMat.preload();
    loader.setMaterials(treeMat);
  });
  const meshRef = useRef();
  const count = 100;
  const geometry = treeMod.children[0].geometry;
  const material = treeMod.children[0].material;

  const matrix = new Matrix4();
  const tempObj = new Object3D();

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        let x = (Math.random() - 0.5) * scale;
        let z = (Math.random() - 0.5) * scale;
        let y = noiseFract(x, z);
        y += 0.5;
        const position = new Vector3(x, y, z);
        matrix.makeRotationY(2 * Math.PI * Math.random());
        matrix.setPosition(position);
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef]);
  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, count]}
      ></instancedMesh>
    </>
  );
};

export default Forest;
