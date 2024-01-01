uniform int uOctaves;
uniform float uAmplitude;
uniform float uMultiplier;
varying vec2 vUv;
varying float distort;
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
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
    float amplitude = uAmplitude;
    // Loop of octaves
    for (int i = 0; i < uOctaves; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
  vUv = uv;

  vec4 worldPositioned =  modelMatrix*vec4( position, 1.0 );
  vec2 worldPos = vec2(worldPositioned.xz);
  vec2 pos = vec2( worldPos * uMultiplier);
  distort = fbm(pos);
  float height = -0.12*distort;
  vec3 newPosition = position;
  newPosition.z +=height;
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}