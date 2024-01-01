import { Vector2 } from "three";
import QuadTree, { InsertChildren } from "./QuadTree";
import TerrainPlanes from "./TerrainPlanes";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

const renderPlanes = (node, planesArray) => {
  if (node.children.length > 0) {
    for (let c of node.children) {
      renderPlanes(c, planesArray);
    }
  } else {
    planesArray.push(node);
  }
  return planesArray;
};

const QuadPlane = () => {
  const { maxSize, posX, posZ } = useControls("QuadPlane", {
    maxSize: {
      value: 100,
      min: 1,
      max: 1000,
    },
    posX: {
      value: 0,
    },
    posZ: {
      value: 0,
    },
  });
  const params = {
    min: new Vector2(-maxSize, -maxSize),
    max: new Vector2(maxSize, maxSize),
  };

  const CreateTree = () => {
    const root = QuadTree(params);
    InsertChildren(root, new Vector2(posX, posZ));
    console.log(root);
    return root;
  };
  const planes = renderPlanes(CreateTree(), []);
  return (
    <>
      <mesh position={[posX, 0, posZ]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial />
      </mesh>
      {planes?.map((plane, index) => (
        <TerrainPlanes plane={plane} key={index} />
      ))}
    </>
  );
};

export default QuadPlane;
