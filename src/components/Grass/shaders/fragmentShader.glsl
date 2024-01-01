varying vec2 vUv;

vec3 colorA = vec3(0.3, 0.5, 0.1);
vec3 colorB = vec3(0.2, 0.8, 0.2);

void main() {  
  vec3 color = mix(colorA, colorB, vUv.y);

  gl_FragColor = vec4(color,1.0);
}