import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.min.js';
import { PLYLoader } from 'https://cdn.jsdelivr.net/npm/three@0.134/examples/jsm/loaders/PLYLoader.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);


// Load the PLY file
const loader = new PLYLoader();
loader.load('/assets/segmented_005.ply', function (geometry) {
  console.log('PLY file loaded successfully', geometry);
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
},
function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
function (error) {
  console.error('An error occurred while loading the PLY file:', error);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Adjust the scene when the window is resized
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
