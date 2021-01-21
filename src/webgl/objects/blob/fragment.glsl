
uniform vec3 color1;
uniform vec3 color2;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  float d = distance(vPosition, normalize(vPosition) * 0.8);
  // vec3 color1 = vec3(1., 0., 1.);
  // vec3 color2 = vec3(0., 0.4, 1.);
  vec3 finalColor = mix(color1, color2, d);

  gl_FragColor = vec4(finalColor, 1.);
}