import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 1.5
group.add(cube3)

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Position
// mesh.position.z = .7
// mesh.position.y = -.6
// mesh.position.x = 1
mesh.position.set(.7, -.6, 1)

// Scale
mesh.scale.x = 2
mesh.scale.y = .5
mesh.scale.z = .5
mesh.scale.set(2, .5, .5)

// Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * .25
mesh.rotation.y = Math.PI * .25
// mesh.rotation.z = .5
// mesh.rotation.set(2, .5, .5)


// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
// camera.position.set(1, 1, 3)
scene.add(camera)

camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position))
// mesh.position.normalize(camera.position)
// console.log(mesh.position.length())



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)