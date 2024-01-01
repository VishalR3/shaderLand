uniform float u_rand;
uniform float u_time;

varying vec2 vUv;
varying vec3 vNormal;

vec3 makeGrassBladeShape(){
  vec3 newPosition = position;
  if(uv.x==0.){
    newPosition.x += 4.0625 - sqrt(16.50390625 - uv.y);
  }else if(uv.x ==1.){
    newPosition.x -= 4.0625 - sqrt(16.50390625 - uv.y);
  }
  return newPosition;
}

vec3 shiftNormals(){
  vec3 newNormal = normal;
  if(uv.x==0.){
    newNormal = vec3(-1.,0.0,1.0);
  }else if(uv.x ==1.){
    // newNormal = position - vec3(position.x-0.125,position.y,position.z-10.); 
    newNormal = vec3(1.,0.0,1.0); 
  }
  return newNormal;
}


void main() {
  vUv = uv;
  vNormal = shiftNormals();
  vec3 newPosition = makeGrassBladeShape();
  
  float randomLean = -u_rand;

  float curveAmount = -randomLean * pow(vUv.y,2.0);

  newPosition = vec3(newPosition.x,newPosition.y,newPosition.z+ curveAmount);
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}