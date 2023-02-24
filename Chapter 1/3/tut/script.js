// console.log(THREE)

const scene = new THREE.Scene()

// Create a red cube
// const geometry = new THREE.BoxGeometry({
//     width: 1,
//     height: 1,
//     depth: 1,
// });
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

console.log(mesh);

// Create a camera
const camSpecs = {
    fov: 75,
    w: 800,
    h: 600
}

// Constructor: PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
const camera = new THREE.PerspectiveCamera(camSpecs.fov, camSpecs.w / camSpecs.h);
camera.position.z = 3
camera.position.x = -1
camera.position.y = 1.25

scene.add(camera);

// Create a renderer
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
console.log(canvas);

renderer.setSize(camSpecs.w, camSpecs.h)


renderer.render(scene, camera)