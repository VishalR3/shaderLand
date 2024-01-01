import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import Terrain1 from "./Terrain1";
import { useControls } from "leva";

const TerrainGenerator = () => {
  const [terrains, setTerrains] = useState([]);
  const camera = useThree((state) => state.camera);
  const { speedX, speedY, multiplier } = useControls("Camera Movement", {
    speedX: {
      value: 0.1,
      min: 0,
      max: 1,
    },
    speedY: {
      value: 0.001,
      min: 0,
      max: 0.1,
    },
    multiplier: {
      value: 5,
      min: 0,
      max: 10,
    },
  });

  const generateTerrain = () => {
    const cameraPos = camera.position;
    const camX = Math.floor(cameraPos.x);
    const camZ = Math.floor(cameraPos.z);
    // console.log(camX, camZ);
    const terrainArray = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        terrainArray.push({
          position: [i * 2 + camX, 0, j * 2 + camZ],
        });
      }
    }
    setTerrains(terrainArray);
  };
  setTimeout(() => {
    generateTerrain();
  }, 50);
  useFrame((state, delta) => {
    const { camera, clock } = state;
    // camera.position.x += speedX * delta;
    // camera.position.y -= speedY * Math.sin(multiplier * clock.getElapsedTime());
  });

  return terrains.map((terrain, index) => (
    <Terrain1 position={terrain.position} key={index} />
  ));
};

export default TerrainGenerator;
