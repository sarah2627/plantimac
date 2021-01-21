precision lowp float;

uniform vec3 uColorUp;
uniform vec3 uColorDown;

varying vec2 vUv;

void main() {
    vec3 color1 = uColorDown;
    vec3 color2 = uColorUp;

    float mixValue = distance(vUv.y, 0.);
    vec3 color = mix(color1,color2,mixValue);
    gl_FragColor = vec4(color, 1.);
}