import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const ThreeScene = ({ onLoaded, darkMode }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const snowflakesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(3.5, 0, -10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 10, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Snowfall
    const snowflakes = [];
    const snowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 300; i++) {
      const flake = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 6, 6),
        snowMaterial.clone()
      );
      flake.position.set(
        THREE.MathUtils.randFloatSpread(50),
        Math.random() * 20 + 10,
        THREE.MathUtils.randFloatSpread(50)
      );
      scene.add(flake);
      snowflakes.push(flake);
    }
    snowflakesRef.current = snowflakes;

    // Resize
    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animate loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.3;
        modelRef.current.position.y = -Math.sin(clock.elapsedTime) * 0.1;
      }

      snowflakesRef.current.forEach((flake) => {
        flake.position.y -= 0.05;
        if (flake.position.y < -5) {
          flake.position.y = Math.random() * 20 + 10;
          flake.position.x = THREE.MathUtils.randFloatSpread(50);
          flake.position.z = THREE.MathUtils.randFloatSpread(50);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Reload model when darkMode changes
  useEffect(() => {
    const scene = sceneRef.current;
    const loader = new GLTFLoader();
    const modelPath = "/3d_assets/purple_planet/scene.gltf";

    // Remove and dispose old model
    if (modelRef.current) {
      const oldModel = modelRef.current;
      scene.remove(oldModel);
      oldModel.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      modelRef.current = null;
    }

    // Load new model
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        model.position.set(3.5, 0, 0);
        scene.add(model);

        if (onLoaded) {
          setTimeout(() => onLoaded(), 1000);
        }
      },
      undefined,
      (err) => console.error("Error loading model", err)
    );
  }, [darkMode]);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const endPosition = darkMode
      ? { x: 0, y: -0.5, z: 2 }
      : { x: 5, y: 0, z: 2.5 };

    gsap.to(camera.position, {
      duration: 2,
      ...endPosition,
      ease: "power3.inOut",
    });
  }, [darkMode]);

  return <div ref={containerRef} className="w-full h-full absolute" />;
};

export default ThreeScene;
