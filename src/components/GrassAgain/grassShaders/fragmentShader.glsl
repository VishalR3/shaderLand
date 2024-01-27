varying vec2 vUv;

// Fog Params
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
varying float vFogDepth;

vec3 colorA = vec3(0.05, 0.2, 0.01);
vec3 colorB = vec3(0.5, 0.5, 0.1);


void main() {
  float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

  vec3 color = mix(colorA, colorB,pow(vUv.y,4.0));
  color = color*(1.0 - fract(length(vUv.x-0.5))*0.5);
  color = mix(color, fogColor, fogFactor );


  gl_FragColor = vec4(color,1.0);
}