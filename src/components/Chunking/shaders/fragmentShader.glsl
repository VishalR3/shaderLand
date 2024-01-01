varying vec2 vUv;
varying float distort;

uniform vec3 uMColor;
uniform vec3 uGColor;
uniform vec3 uWColor;

// vec3 mColor = vec3(0.335,0.045,0.082);
// vec3 gColor = vec3(0.078,0.854,0.254);
// vec3 wColor = vec3(0.,0.,1.);

vec3 getColor(float height){
  if(height>0.35)
    return mix(uMColor,uGColor,pow(1.0-height,1.6));
  else return uWColor;
}

void main() {  

  vec3 color = getColor(1.0-distort);

  gl_FragColor = vec4(color,1.0);
}