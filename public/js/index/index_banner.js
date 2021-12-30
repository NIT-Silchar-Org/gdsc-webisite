import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/DRACOLoader';

// Loaders
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);


const scene = new THREE.Scene();

// camera.position.z = 5;

const canvas = document.querySelector('.banner-canvas')

const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight *0.9
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight * 0.9
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    
})

const camera = new THREE.PerspectiveCamera( 10, sizes.width / sizes.height, 0.1, 1000 );
camera.position.set(0, 1, -70)
scene.add(camera)


// models
let mixer = null;
gltfLoader.load('models/gdsc2.glb', (gltf)=>{
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, -4, 0);
    gltf.scene.rotation.y = Math.PI/2;
    scene.add(gltf.scene);

    mixer = new THREE.AnimationMixer(gltf.scene);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();


    gltf.scene.traverse( ( child )=> { 

        if ( child.isMesh ) {
    
            child.castShadow = true;
            child.receiveShadow = true;
    
        }
    
    } );

    updateAllMaterials();
})


// lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0.25, 3, -2.25);
// directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
scene.add(directionalLight);


const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-4, 1, 2.25);
// directionalLight2.castShadow = true;
directionalLight2.shadow.camera.far = 15;
directionalLight2.shadow.mapSize.set(1024, 1024);
directionalLight2.shadow.normalBias = 0.05;
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight3.position.set(4, 1, 0);
directionalLight3.castShadow = true;
directionalLight3.shadow.camera.far = 15;
directionalLight3.shadow.mapSize.set(1024, 1024);
directionalLight3.shadow.normalBias = 0.05;
scene.add(directionalLight3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer(
    {
    canvas:canvas,
    antialias:true,
    alpha:true
}
);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xffffff, 0)
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false;
controls.enableZoom = false;
controls.minAzimuthAngle = 3.5*Math.PI/4;
controls.maxAzimuthAngle = 4.5*Math.PI/4;
controls.minPolarAngle = 1.2;
controls.maxPolarAngle = Math.PI/1.975;



let previousTime = 0;
const clock = new THREE.Clock();
/**
 * Animate
 */
 const tick = () =>
 {  
     const elapsedTime = clock.getElapsedTime();
     const deltaTime = elapsedTime-previousTime;
     previousTime = elapsedTime;
     // Update controls
     controls.update()
     if(mixer) mixer.update(deltaTime);
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)

 }
 
 tick()