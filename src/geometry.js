import * as THREE from "three";

export const LENGTH = 0.15;
export const RADIUS = 0.015;

export function cylinder() {
  const geometry = new THREE.CylinderGeometry(RADIUS, RADIUS, LENGTH, 8);
  const material = new THREE.MeshNormalMaterial();
  geometry.rotateZ(Math.PI * 0.5);

  return new THREE.Mesh(geometry, material);
}

export function sphere() {
  const geometry = new THREE.SphereBufferGeometry(LENGTH / 2);
  const material = new THREE.MeshNormalMaterial();
  geometry.rotateZ(Math.PI * 0.5);

  return new THREE.Mesh(geometry, material);
}

export function leaf() {
  const x = 0;
  const y = 0;

  const shape = new THREE.Shape();

  shape.bezierCurveTo(x + 0.15, y + 0.15, x + 0.14, y, x, y);
  shape.bezierCurveTo(x - 0.16, y, x - 0.16, y + 0.17, x - 0.16, y + 0.17);
  shape.bezierCurveTo(
    x - 0.16,
    y + 0.111,
    x - 0.13,
    y + 0.1154,
    x + 0.15,
    y + 0.119
  );
  shape.bezierCurveTo(
    x + 0.112,
    y + 0.1154,
    x + 0.116,
    y + 0.111,
    x + 0.116,
    y + 0.17
  );
  shape.bezierCurveTo(x + 0.116, y + 0.17, x + 0.116, y, x + 0.11, y);
  shape.bezierCurveTo(x + 0.17, y, x + 0.15, y + 0.15, x + 0.15, y + 0.15);

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshNormalMaterial();

  geometry.rotateZ(Math.PI * 0.5);

  return new THREE.Mesh(geometry, material);
}
