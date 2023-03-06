uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv; // = varying UV
varying float vElevation;

// attribute float aRandom;
// varying float vRandom;

// function
// float add(float a, float b)
// {
//     return a + b;
// }
void main() {
    //////////
    // test //
    //////////
    // vec3 purpleColor = vec3(0.0);
    // purpleColor.r = 0.5;
    // purpleColor.r = 1.0;

    // vec2 foo = vec2(1.0, 2.0);
    // vec3 bar = vec3(foo, 3.0); // => bar = (1.0, 2.0, 3.0)

    // vec3 foo = vec3(1.0, 2.0, 3.0);
    // vec2 bar = foo.xy; // bar = (1.0, 2.0), if foo.yx then x = 2.0, y = 1.0

    // vec4 foo = vec4(1.0, 2.0, 3.0, 4.0); // rgba, xyzw
    // float bar = foo.w;

    // float added = add(1.0, 2.0);

    // long version of the below
    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectedPosition = projectionMatrix * viewPosition;

    // short version of the above
    // gl_Position = projectionMatrix * viewMatrix  * modelMatrix * vec4(position, 1.0);

    ////////////////////////////
    // create a spiky surface //
    ////////////////////////////
    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    // modelPosition.z += aRandom * 0.1;

    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectedPosition = projectionMatrix * viewPosition;

    // gl_Position = projectedPosition;

    // // vRandom = aRandom;

    

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
}