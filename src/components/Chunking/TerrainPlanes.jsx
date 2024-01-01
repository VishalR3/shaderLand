import { useControls } from "leva";
import { useMemo, useRef } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";

const TerrainPlanes = ({ plane }) => {
  const mesh = useRef();
  const {
    octaves,
    amplitude,
    multiplier,
    mountainColor,
    groundColor,
    waterColor,
    resolution,
  } = useControls("Terrain", {
    octaves: {
      value: 8,
      min: 1,
      max: 20,
      step: 1,
    },
    amplitude: {
      value: 0.5,
      min: 0.0,
      max: 1.0,
    },
    multiplier: {
      value: 12.0,
      min: 1.0,
      max: 20.0,
    },
    mountainColor: {
      value: "#991234",
    },
    groundColor: {
      value: "#00ff00",
    },
    waterColor: {
      value: "#0000ff",
    },
    resolution: {
      value: 5,
      min: 1,
      max: 100,
    },
  });
  const uniforms = useMemo(
    () => ({
      uOctaves: {
        value: octaves,
      },
      uAmplitude: {
        value: amplitude,
      },
      uMultiplier: {
        value: multiplier,
      },
      uMColor: {
        value: new Color(mountainColor),
      },
      uGColor: {
        value: new Color(groundColor),
      },
      uWColor: {
        value: new Color(waterColor),
      },
    }),
    []
  );
  useFrame(() => {
    mesh.current.material.uniforms.uOctaves.value = octaves;
    mesh.current.material.uniforms.uAmplitude.value = amplitude;
    mesh.current.material.uniforms.uMultiplier.value = multiplier;
    mesh.current.material.uniforms.uMColor.value = new Color(mountainColor);
    mesh.current.material.uniforms.uGColor.value = new Color(groundColor);
    mesh.current.material.uniforms.uWColor.value = new Color(waterColor);
  });
  return (
    <mesh
      ref={mesh}
      position={[plane.center.x, 0, plane.center.y]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry
        args={[plane.size.x, plane.size.y, resolution, resolution]}
      />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      />
      {/* <meshStandardMaterial wireframe /> */}
    </mesh>
  );
};

export default TerrainPlanes;
