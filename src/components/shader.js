export const vertex = `
varying vec2 vUv;
float PI = 3.141592653589793238;

void main() {
    vUv = uv;
    vec3 newPosition = position;
    // newPosition.x += sin(uv.y * PI);
    newPosition.y += sin(uv.x * PI);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragment = `
varying vec2 vUv;
uniform sampler2D uTexture;

void main() {
    vec4 texture = texture2D(uTexture, vUv);
    gl_FragColor = texture;
}
`;
