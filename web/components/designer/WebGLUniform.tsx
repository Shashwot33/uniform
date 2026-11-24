"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { kind: string; colour: string; logo: string };

const navy = "#182c4d";
const white = "#f7f3ea";
const skin = "#b98269";
const hair = "#2a201d";

function finish(colour: string, roughness = 0.72) {
  return new THREE.MeshStandardMaterial({ color: colour, roughness, metalness: 0.02 });
}

function shape(
  group: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  colour: string,
  position: [number, number, number],
  rotation: [number, number, number] = [0, 0, 0],
) {
  const mesh = new THREE.Mesh(geometry, finish(colour));
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function cylinder(group: THREE.Group, radiusTop: number, radiusBottom: number, height: number, colour: string, position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]) {
  return shape(group, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 10), colour, position, rotation);
}

function addStudentBody(group: THREE.Group) {
  // Clean, stylised student proportions: all skin is covered except head, hands and lower legs for skirt view.
  cylinder(group, 0.16, 0.19, 0.34, skin, [0, 1.46, 0]);
  shape(group, new THREE.SphereGeometry(0.48, 28, 22), skin, [0, 1.94, 0]);
  shape(group, new THREE.SphereGeometry(0.5, 28, 16, 0, Math.PI * 2, 0, 1.65), hair, [0, 2.13, -0.02]);
  // Ears and a modest nose create a readable face without photorealism.
  shape(group, new THREE.SphereGeometry(0.065, 12, 10), skin, [-0.47, 1.95, 0]);
  shape(group, new THREE.SphereGeometry(0.065, 12, 10), skin, [0.47, 1.95, 0]);
  shape(group, new THREE.SphereGeometry(0.055, 12, 10), skin, [0, 1.94, 0.47]);
}

function addLegs(group: THREE.Group, kind: string, colour: string) {
  const trouserColour = kind === "Trousers" ? colour : navy;
  if (kind === "Skirt") {
    cylinder(group, 0.18, 0.16, 1.28, skin, [-0.25, -0.94, 0]);
    cylinder(group, 0.18, 0.16, 1.28, skin, [0.25, -0.94, 0]);
  } else {
    cylinder(group, 0.32, 0.36, 1.58, trouserColour, [-0.29, -0.92, 0]);
    cylinder(group, 0.32, 0.36, 1.58, trouserColour, [0.29, -0.92, 0]);
  }
  shape(group, new THREE.SphereGeometry(0.3, 16, 12), "#171b24", [-0.3, -1.77, 0.13]);
  shape(group, new THREE.SphereGeometry(0.3, 16, 12), "#171b24", [0.3, -1.77, 0.13]);
}

function addTop(group: THREE.Group, kind: string, colour: string, logo: string) {
  if (kind === "Trousers" || kind === "Skirt") return;
  const topColour = kind === "Shirt" ? white : colour;
  const body = cylinder(group, 0.73, 0.84, 1.42, topColour, [0, 0.7, 0]);
  body.scale.z = 0.64;
  // Sleeves end above the hand; the sleeve treatment changes with the garment type.
  const sleeveLength = kind === "Sports top" ? 0.56 : 1.03;
  cylinder(group, 0.22, 0.25, sleeveLength, topColour, [-0.87, 0.8, 0], [0, 0, 0.42]);
  cylinder(group, 0.22, 0.25, sleeveLength, topColour, [0.87, 0.8, 0], [0, 0, -0.42]);
  shape(group, new THREE.SphereGeometry(0.17, 16, 12), skin, [-1.1, kind === "Sports top" ? 0.45 : 0.19, 0]);
  shape(group, new THREE.SphereGeometry(0.17, 16, 12), skin, [1.1, kind === "Sports top" ? 0.45 : 0.19, 0]);

  // Collar and tie retain a recognisable school-uniform identity.
  if (kind !== "Sports top") {
    cylinder(group, 0.24, 0.28, 0.16, white, [0, 1.36, 0.08]);
    shape(group, new THREE.ConeGeometry(0.12, 0.56, 4), navy, [0, 0.95, 0.48], [0, 0, Math.PI / 4]);
  }
  if (kind === "Blazer") {
    shape(group, new THREE.BoxGeometry(0.06, 1.35, 0.1), "#101b31", [0, 0.69, 0.55]);
    shape(group, new THREE.BoxGeometry(0.32, 0.68, 0.09), white, [-0.22, 0.97, 0.49], [0, 0, -0.33]);
    shape(group, new THREE.BoxGeometry(0.32, 0.68, 0.09), white, [0.22, 0.97, 0.49], [0, 0, 0.33]);
  }
  if (kind === "Sweater") {
    shape(group, new THREE.TorusGeometry(0.26, 0.06, 12, 20), white, [0, 1.38, 0.12], [Math.PI / 2, 0, 0]);
  }
  const badge = shape(group, new THREE.CircleGeometry(0.14, 24), logo, [-0.35, 0.88, 0.55]);
  (badge.material as THREE.MeshStandardMaterial).emissive.set(logo);
  (badge.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.08;
}

function buildUniform(kind: string, colour: string, logo: string) {
  const figure = new THREE.Group();
  addStudentBody(figure);
  addLegs(figure, kind, colour);
  if (kind === "Skirt") {
    const skirt = shape(figure, new THREE.CylinderGeometry(0.66, 0.98, 0.8, 10), colour, [0, -0.14, 0]);
    skirt.scale.z = 0.72;
  }
  addTop(figure, kind, colour, logo);
  return figure;
}

export function WebGLUniform({ kind, colour, logo }: Props) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mount.current;
    if (!root) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eaf1f5");
    const camera = new THREE.PerspectiveCamera(35, root.clientWidth / root.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.6);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(root.clientWidth, root.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight("#ffffff", "#6f8293", 2.4));
    const key = new THREE.DirectionalLight("#ffffff", 2.6);
    key.position.set(4, 6, 6);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight("#d7e7f0", 1.1);
    fill.position.set(-4, 2, 3);
    scene.add(fill);
    const floor = shape(scene, new THREE.CircleGeometry(2.5, 64), "#d4e1e8", [0, -2.2, 0], [-Math.PI / 2, 0, 0]);
    floor.receiveShadow = true;
    const figure = buildUniform(kind, colour, logo);
    figure.position.y = -0.3;
    scene.add(figure);

    let pointerX: number | null = null;
    let targetRotation = 0;
    const down = (event: PointerEvent) => { pointerX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => {
      if (pointerX === null) return;
      targetRotation += (event.clientX - pointerX) * 0.012;
      pointerX = event.clientX;
    };
    const up = () => { pointerX = null; };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      figure.rotation.y += (targetRotation - figure.rotation.y) * 0.08;
      renderer.render(scene, camera);
    };
    animate();
    const resize = () => {
      camera.aspect = root.clientWidth / root.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(root.clientWidth, root.clientHeight);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      scene.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) return;
        node.geometry.dispose();
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((entry) => entry.dispose());
      });
      renderer.dispose();
      root.replaceChildren();
    };
  }, [kind, colour, logo]);

  return <div ref={mount} className="webgl-uniform" aria-label="Interactive stylised student uniform preview. Drag to rotate." />;
}
