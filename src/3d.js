import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LENGTH } from "./geometry";

let renderer;
let scene;
let camera;
let mesh;
let currentPosition;
let currentRotation;
let stack = [];

const axes = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

export function init(canvas) {
  const width = 590;
  const height = 590;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(153, 153, 153);

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(4, 2, 4);
  camera.rotation.set(-0.5, 0.7, 0.5);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  canvas.appendChild(renderer.domElement);

  reset();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render);
  controls.update();

  render();
}

export function render() {
  renderer.render(scene, camera);
}

export function reset() {
  if (!scene || !renderer) {
    return;
  }
  if (mesh) {
    scene.remove(mesh);
  }
  mesh = new THREE.Group();
  stack = [];
  currentPosition = new THREE.Vector3(0, 0, 0);
  currentRotation = new THREE.Quaternion();

  scene.add(mesh);
  render();
}

export function forward(meshGenerator) {
  return () => {
    const transform = new THREE.Quaternion();
    transform.multiply(currentRotation);

    const position = new THREE.Vector3(LENGTH / 2, 0, 0);
    position.applyQuaternion(currentRotation);
    currentPosition.add(position);

    if (meshGenerator) {
      const newMesh = meshGenerator();
      newMesh.quaternion.copy(currentRotation);
      newMesh.position.copy(currentPosition);

      currentPosition.add(position);

      mesh.add(newMesh);
    }
  };
}

export function rotate(axis, angle) {
  const rotation = new THREE.Quaternion().setFromAxisAngle(
    axes[axis],
    (Math.PI / 180) * angle
  );
  return () => {
    currentRotation.multiply(rotation);
  };
}

export function createBranch() {
  stack.push({
    position: new THREE.Vector3().copy(currentPosition),
    rotation: new THREE.Quaternion().copy(currentRotation),
  });
}

export function closeBranch() {
  const { position, rotation } = stack.pop();
  currentPosition = new THREE.Vector3().copy(position);
  currentRotation = new THREE.Quaternion().copy(rotation);
}
