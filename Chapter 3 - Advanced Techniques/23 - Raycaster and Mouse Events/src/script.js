import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('lightgreen');

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Cursor
 */
const cursor = new THREE.Vector2() // x and y
window.addEventListener('mousemove', (event) => {
    // normalize values to be between -1 and +1
    cursor.x = event.clientX / sizes.width * 2 - 1
    cursor.y = -(event.clientY / sizes.height * 2 - 1)

    // console.log(cursor.x, cursor.y); // debug
})

// add click on intersect object event
window.addEventListener('click', () => {
    if (currentIntersect) {
        switch (currentIntersect.object) {
            case object1:
                console.log('click on the sphere 1')
                break
            case object2:
                console.log('click on the sphere 2')
                break
            case object3:
                console.log('click on the sphere 3')
                break
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 3, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Model
 */
const gltfLoader = new GLTFLoader()
let model = null
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) => {
        // console.log(gltf); // debug
        model = gltf.scene
        scene.add(model)
        // model.position.y = .5
    }
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#333333',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.7)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    object1.position.y = Math.sin(elapsedTime * .3) * 1.5
    object2.position.y = Math.sin(elapsedTime * .8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // Cast a ray
    raycaster.setFromCamera(cursor, camera)
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    // set object to blue when ray goes through
    for (const intersect of intersects) {
        intersect.object.material.color.set('#0000ff')
    }

    // default color of object
    for (const object of objectsToTest) {
        if (!intersects.find(intersect => intersect.object === object)) {
            object.material.color.set('#ff0000')
        }
    }

    if (intersects.length) {
        if (!currentIntersect) {
            console.log('mouse enter a sphere');
        }
        currentIntersect = intersects[0]
    } else {

        if (currentIntersect) {
            console.log('mouse leaves a sphere');
        }
        currentIntersect = null
    }

    // Test model intersect
    if (model) {
        const modelIntersects = raycaster.intersectObject(model)
        console.log(modelIntersects)

        if (modelIntersects.length) {
            console.log('mouse enter a model');
            model.scale.set(1.2, 1.2, 1.2)
        } else {
            console.log('mouse leaves a model');
            model.scale.set(1, 1, 1)
        }
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()