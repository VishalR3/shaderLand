import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";
import { useControls } from "leva";
import { Color } from "three";

const Terrain1 = ({ position = [0, 0, 0] }) => {
  const mesh = useRef();
  const {
    octaves,
    amplitude,
    multiplier,
    mountainColor,
    groundColor,
    waterColor,
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
  const handleBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      `varying vec3 vViewPosition;`,
      `varying vec3 vViewPosition;
    varying vec2 vUv;
    varying float distort;
    float random (in vec2 st) {
      return fract(sin(dot(st.xy,
                           vec2(12.9898,78.233)))
                   * 43758.5453123);
  }
  
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
  
      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
  
      // Smooth Interpolation
  
      // Cubic Hermine Curve.  Same as SmoothStep()
      vec2 u = f*f*(3.0-2.0*f);
      // u = smoothstep(0.,1.,f);
  
      // Mix 4 coorners percentages
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }
  #define OCTAVES 8
  float fbm (in vec2 st) {
      // Initial values
      float value = 0.0;
      float amplitude = 0.5;
      // Loop of octaves
      for (int i = 0; i < OCTAVES; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
      }
      return value;
  }
    `
    );
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `
      vUv = uv;

      vec4 worldPositioned =  modelMatrix*vec4( position, 1.0 );
      vec2 worldPos = vec2(worldPositioned.xz);
      vec2 pos = vec2(worldPos*12.0);
      distort = fbm(pos);
      float height = -0.12*distort;
      vec3 newPosition = position;
      newPosition.z +=height;


      vec3 transformed = newPosition;
      `
    );
    shader.fragmentShader = fragmentShader;
  };
  return (
    <mesh
      position={position}
      ref={mesh}
      scale={2}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow={true}
      receiveShadow={true}
    >
      <planeGeometry args={[1, 1, 256, 256]} />
      {/* <meshStandardMaterial
        color="#f00"
        onBeforeCompile={handleBeforeCompile}
      /> */}
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Terrain1;
