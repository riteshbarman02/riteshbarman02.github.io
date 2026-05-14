import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const ThreeScene = ({ onLoaded, darkMode }) => {
  const containerRef = useRef(null);
  const cameraRef = useRef(null);
  const snowflakesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScrollPosition = () => {
      const viewportHeight = window.innerHeight || 1;
      const startScroll = 100;
      const scrollRange = Math.max(viewportHeight - startScroll, 1);
      const progress = Math.min(
        Math.max((window.scrollY - startScroll) / scrollRange, 0),
        1
      );
      setScrollProgress((prev) => (Math.abs(prev - progress) < 0.001 ? prev : progress));
    };

    handleScrollPosition();
    window.addEventListener("scroll", handleScrollPosition, { passive: true });
    window.addEventListener("resize", handleScrollPosition);

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
      window.removeEventListener("resize", handleScrollPosition);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      if (onLoaded) onLoaded();
      return;
    }
    const { width, height } = container.getBoundingClientRect();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 8, 0);
    camera.lookAt(0,0,0)
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

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
    controls.enableZoom = false

    // Snowfall
    const snowflakes = [];
    const snowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 1000; i++) {
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
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

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
    setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 300);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const topSectionPosition = { x: 0, y: -8, z: 0 };
    const scrolledPastPosition = { x: 5, y: 0, z: 2 };

    const lerp = (start , end, t) => start + (end - start) * t;
    const endPosition = {
      x: lerp(topSectionPosition.x, scrolledPastPosition.x, scrollProgress),
      y: lerp(topSectionPosition.y, scrolledPastPosition.y, scrollProgress),
      z: lerp(topSectionPosition.z, scrolledPastPosition.z, scrollProgress),
    };

    gsap.to(camera.position, {
      duration: 0,
      ...endPosition,
      ease: "back.in",
      overwrite: "auto",
    });
  }, [darkMode, scrollProgress]);

  return <div ref={containerRef} className="w-full h-full absolute" />;
};

export default ThreeScene;
