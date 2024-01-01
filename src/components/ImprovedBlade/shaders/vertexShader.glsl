#define PHONG
uniform float u_rand;
uniform float u_time;

varying vec2 vUv;

uint murmurHash12(uvec2 src) {
  const uint M = 0x5bd1e995u;
  uint h = 1190494759u;
  src *= M; src ^= src>>24u; src *= M;
  h *= M; h ^= src.x; h *= M; h ^= src.y;
  h ^= h>>13u; h *= M; h ^= h>>15u;
  return h;
}
uvec4 murmurHash42(uvec2 src) {
    const uint M = 0x5bd1e995u;
    uvec4 h = uvec4(1190494759u, 2147483647u, 3559788179u, 179424673u);
    src *= M; src ^= src>>24u; src *= M;
    h *= M; h ^= src.x; h *= M; h ^= src.y;
    h ^= h>>13u; h *= M; h ^= h>>15u;
    return h;
}
float hash12(vec2 src) {
  uint h = murmurHash12(floatBitsToUint(src));
  return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;
}
// 4 outputs, 2 inputs
vec4 hash42(vec2 src) {
  uvec4 h = murmurHash42(floatBitsToUint(src));
  return uintBitsToFloat(h & 0x007fffffu | 0x3f800000u) - 1.0;
}

float noise12(vec2 p) {
  vec2 i = floor(p);

  vec2 f = fract(p);
  vec2 u = smoothstep(vec2(0.0), vec2(1.0), f);

	float val = mix( mix( hash12( i + vec2(0.0, 0.0) ), 
                        hash12( i + vec2(1.0, 0.0) ), u.x),
                   mix( hash12( i + vec2(0.0, 1.0) ), 
                        hash12( i + vec2(1.0, 1.0) ), u.x), u.y);
  return val * 2.0 - 1.0;
}
float inverseLerp(float minValue, float maxValue, float v) {
  return (v - minValue) / (maxValue - minValue);
}
mat3 rotateAxis(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat3(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c
  );
}
mat3 rotateX(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(1, 0, 0),
        vec3(0, c, -s),
        vec3(0, s, c)
    );
}
// Rotation matrix around the Y axis.
mat3 rotateY(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(c, 0, s),
        vec3(0, 1, 0),
        vec3(-s, 0, c)
    );
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(inMin, inMax, v);
  return mix(outMin, outMax, t);
}

void main() {
  vUv = uv;
   vec3 grassOffset = vec3(position.x, 0.0, position.y);

  // Blade world position
  vec3 grassBladeWorldPos = (modelMatrix * vec4(grassOffset, 1.0)).xyz;
     vec4 hashVal1 = hash42(vec2(grassBladeWorldPos.x, grassBladeWorldPos.z));
  float randomAngle = hashVal1.x * 2.0 * 3.14159;
  float leanAnimation = noise12(vec2(u_time * 0.35) + grassBladeWorldPos.xz * 137.423) * 0.1;

  float randomLean = -u_rand;
  // randomLean *= remap(hashVal1.w, 0.0, 1.0, 0.1, 0.4);
  randomLean+=leanAnimation;

  float curveAmount = -randomLean * pow(vUv.y,2.0);
   float windDir = noise12(grassBladeWorldPos.xz * 0.05 + 0.05 * u_time);
  float windNoiseSample = noise12(grassBladeWorldPos.xz * 0.25 + u_time * 1.0);
  float windLeanAngle = remap(windNoiseSample, -1.0, 1.0, 0.25, 1.0);
  windLeanAngle = pow(windLeanAngle, 2.0) * 1.25;
  vec3 windAxis = vec3(cos(windDir), 0.0, sin(windDir));

  windLeanAngle *= vUv.y;

  mat3 grassMat =  rotateAxis(windAxis, windLeanAngle) * rotateY(randomAngle);



  vec3 newPosition = vec3(position.x,position.y,position.z+ curveAmount);
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}