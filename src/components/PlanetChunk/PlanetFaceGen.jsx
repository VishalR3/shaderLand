import { Vector2 } from "three";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import QuadTree, { InsertChildren } from "../Chunking/QuadTree";
import PlanetFace from "./PlanetFace";

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

const PlanetFaceGen = () => {
  const { maxSize, posX, posZ } = useControls("QuadPlane", {
    maxSize: {
      value: 10,
      min: 1,
      max: 1000,
    },
    posX: {
      value: 200,
    },
    posZ: {
      value: 200,
    },
  });
  const { camera } = useThree();
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
      {planes?.map((plane, index) => (
        <PlanetFace plane={plane} key={index} />
      ))}
    </>
  );
};

export default PlanetFaceGen;
