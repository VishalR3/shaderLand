import { Vector3 } from "three";
import Blade from "./Blade";
import ImprovedBlade from "../ImprovedBlade/ImprovedBlade";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
const NUM_GRASS_PER_GRID = 3;
const MAX_DISTANCE = 15;

const getImprovedGrassBladesPostions = (posX, posZ) => {
  const params = useControls("Grass", {
    distance: {
      value: MAX_DISTANCE,
    },
    bladePerGrid: {
      value: NUM_GRASS_PER_GRID,
    },
  });
  const blades = [];
  for (let i = -params.distance; i < params.distance; i++) {
    for (let j = -params.distance; j < params.distance; j++) {
      for (let z = 0; z < params.bladePerGrid; z++) {
        blades.push({
          position: new Vector3(
            posX + Math.random() * 0.5 + (2 * i + 1) / 2,
            0,
            posZ + Math.random() * 0.5 + (2 * j + 1) / 2
          ),
        });
      }
    }
  }

  return blades;
};

const Grass = () => {
  const { camera } = useThree();
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
  const blades = getImprovedGrassBladesPostions(posX, posZ);
  return blades.map((blade, index) => <ImprovedBlade key={index} {...blade} />);
};

export default Grass;
