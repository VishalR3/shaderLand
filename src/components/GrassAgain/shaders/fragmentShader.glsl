varying vec2 vUv;

vec3 getColor(){
  vec3 color = vec3(0.0);
     if (step(fract(vUv.x*10.0),0.9)==1.0 && step(fract(vUv.y*10.0),0.9)==1.0){
    color= vec3(1.0);
  }
  return color;
}

void main() { 
  vec3 color = getColor();

  gl_FragColor = vec4(color,1.0);
}