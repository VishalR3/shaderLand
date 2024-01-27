import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const Tree = ({ model, ...rest }) => {
  const treeRef = useRef();

  return (
    <>
      <primitive ref={treeRef} object={model} {...rest} />
    </>
  );
};
export default Tree;
