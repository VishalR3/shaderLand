import { useCallback, useMemo, useRef } from "react";
import { Vector2 } from "three";
import QuadTree, { InsertChildren } from "../Chunking/QuadTree";
import { createNoise2D } from "simplex-noise";
import { useControls } from "leva";

const noise2D = createNoise2D();

const ProceduralTerrain = () => {
  const vertices = useRef([]);
  const indices = useRef([]);
  const verticesAndIndices = useRef({});
  const { maxSize, posX, posZ } = useControls("QuadPlane", {
    maxSize: {
      value: 40,
      min: 1,
      max: 1000,
    },
    posX: {
      value: 3,
    },
    posZ: {
      value: 3,
    },
  });

  const treeRoot = useMemo(() => {
    const params = {
      min: new Vector2(-maxSize, -maxSize),
      max: new Vector2(maxSize, maxSize),
    };
    const root = QuadTree(params);
    InsertChildren(root, new Vector2(posX, posZ));
    return root;
  }, [maxSize, posX, posZ]);

  const getVerticesAndIndices = useCallback(() => {
    vertices.current = [];
    indices.current = [];
    verticesAndIndices.current = [];
    const getPlanes = (node, planesArray) => {
      if (node.children.length > 0) {
        for (let c of node.children) {
          getPlanes(c, planesArray);
        }
      } else {
        planesArray.push(node);
      }
      return planesArray;
    };

    const planes = getPlanes(treeRoot, []);

    const addPoint = (x, z) => {
      const index = vertices.current.length / 3;
      if (verticesAndIndices.current[`${x},${z}`] == undefined) {
        verticesAndIndices.current[`${x},${z}`] = index;
        let y = 2 * noise2D(x / 50, z / 50);
        y += 4 * noise2D(x / 100, z / 100);
        y += 0.2 * noise2D(x / 10, z / 10);
        vertices.current.push(x);
        vertices.current.push(y);
        vertices.current.push(z);
        return index;
      } else {
        return verticesAndIndices.current[`${x},${z}`];
      }
    };

    let planeCount = 0;

    for (const plane of planes) {
      // Calculating Vertices
      // top left point - 0
      const index0 = addPoint(plane.bounds.min.x, plane.bounds.max.y);

      // top right point - 1
      const index1 = addPoint(plane.bounds.max.x, plane.bounds.max.y);

      // bottom left point - 2
      const index2 = addPoint(plane.bounds.min.x, plane.bounds.min.y);

      // bottom right point - 3
      const index3 = addPoint(plane.bounds.max.x, plane.bounds.min.y);
      // Calculating Indices
      // 0,1,2  & 2,1,3
      indices.current.push(index0);
      indices.current.push(index1);
      indices.current.push(index2);

      indices.current.push(index2);
      indices.current.push(index1);
      indices.current.push(index3);
      planeCount++;
    }
  }, [maxSize, posX, posZ]);

  getVerticesAndIndices();

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={vertices.current.length / 3}
          array={new Float32Array(vertices.current)}
          itemSize={3}
        />
        <bufferAttribute
          attach={"index"}
          count={indices.current.length}
          array={new Uint8Array(indices.current)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
};

export default ProceduralTerrain;
