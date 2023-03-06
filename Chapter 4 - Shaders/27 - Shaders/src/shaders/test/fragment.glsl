// varying float vRandom;

// lowp, mediump, highp: low to high precision
// lowp can create bugs due to lack of precision
// highp = performance hit and might not work on some devices

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv; // get from vertex.glsl
varying float vElevation;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv); // get uv coordinates from geometry.attributes.uv
    textureColor.rgb *= vElevation * 2.0 + 0.8;
    gl_FragColor = textureColor;
}