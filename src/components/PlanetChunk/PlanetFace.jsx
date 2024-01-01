import { useControls } from "leva";
import { useMemo, useRef } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { Color, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const PlanetFace = ({ plane }) => {
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
    const { position } = mesh.current.geometry.attributes;
    let positions = [];
    // for (let i = 0; i < array.length * 3; i++) {
    //   let half = plane.size.x / 2;
    //   let radius = 10;
    //   let point = new Vector3(array[3 * i], array[3 * i + 1], array[3 * i + 2]);
    //   let p = new Vector3(point.x, point.y, radius);
    //   p.normalize();
    //   p.multiplyScalar(radius);
    //   // p.z = radius;
    //   array[3 * i] = p.x;
    //   array[3 * i + 1] = p.y;
    //   array[3 * i + 2] = p.z;
    // }
    const width = plane.size.x;
    const half = width / 2;
    const radius = 10;
    for (let x = 0; x <= resolution; x++) {
      const xp = (width * x) / resolution;
      for (let y = 0; y <= resolution; y++) {
        const yp = (width * y) / resolution;

        // Compute Position

        let p = new Vector3(xp - half, yp - half, radius);
        p.normalize();
        p.multiplyScalar(radius);
        p.z -= radius;
        positions.push(p.x, p.y, p.z);
      }
      // console.log(positions);
    }
    position.array = new Float32Array(positions);

    //   mesh.current.material.uniforms.uOctaves.value = octaves;
    //   mesh.current.material.uniforms.uAmplitude.value = amplitude;
    //   mesh.current.material.uniforms.uMultiplier.value = multiplier;
    //   mesh.current.material.uniforms.uMColor.value = new Color(mountainColor);
    //   mesh.current.material.uniforms.uGColor.value = new Color(groundColor);
    //   mesh.current.material.uniforms.uWColor.value = new Color(waterColor);
  });
  return (
    <>
      <mesh
        ref={mesh}
        position={[plane.center.x, 10, plane.center.y]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh
        ref={mesh}
        position={[plane.center.x, -10, plane.center.y]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh
        ref={mesh}
        position={[plane.center.x, 0, plane.center.y + 10]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh
        ref={mesh}
        position={[plane.center.x, 0, plane.center.y - 10]}
        rotation={[0, -Math.PI, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh
        ref={mesh}
        position={[plane.center.x + 10, 0, plane.center.y]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
      <mesh
        ref={mesh}
        position={[plane.center.x - 10, 0, plane.center.y]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry
          args={[plane.size.x, plane.size.y, resolution, resolution]}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // wireframe
      /> */}
        <meshStandardMaterial wireframe />
      </mesh>
    </>
  );
};

export default PlanetFace;
