import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff } from 'lucide-react';

export default function HeroCanvas3D() {
  const mountRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 10.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(0, -0.6, 0);
    scene.add(mainGroup);

    // --- 2. Materials ---
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xF3795A, // Coral Peach Gold Accent
      metalness: 0.85,
      roughness: 0.2,
    });
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xB45309,
      metalness: 0.75,
      roughness: 0.3,
    });
    const brassBowlMat = new THREE.MeshStandardMaterial({
      color: 0xD97706,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF7,
      roughness: 0.2,
    });
    const clocheMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF7,
      metalness: 0.9,
      roughness: 0.1,
    });

    // --- 3. ROYAL COPPER BIRYANI PLATTER BASE ---
    const trayGeo = new THREE.CylinderGeometry(2.6, 2.7, 0.14, 64);
    const trayMesh = new THREE.Mesh(trayGeo, copperMat);
    trayMesh.position.y = -0.5;
    trayMesh.receiveShadow = true;
    trayMesh.castShadow = true;
    mainGroup.add(trayMesh);

    // Outer Gold Rim
    const rimGeo = new THREE.TorusGeometry(2.65, 0.09, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -0.43;
    mainGroup.add(rimMesh);

    // Handles
    for (let side of [-1, 1]) {
      const hGeo = new THREE.TorusGeometry(0.3, 0.05, 12, 24, Math.PI);
      const hMesh = new THREE.Mesh(hGeo, goldMat);
      hMesh.position.set(side * 2.9, -0.46, 0);
      hMesh.rotation.z = side * (Math.PI / 2);
      mainGroup.add(hMesh);
    }

    // --- 4. REALISTIC ROYAL BIRYANI FEAST ---
    const biryaniGroup = new THREE.Group();
    biryaniGroup.position.y = -0.42;
    mainGroup.add(biryaniGroup);

    // Center Traditional Copper Biryani Handi Pot
    const handiBaseGeo = new THREE.CylinderGeometry(1.15, 0.85, 0.75, 32);
    const handiBase = new THREE.Mesh(handiBaseGeo, copperMat);
    handiBase.position.set(0, 0.38, 0);
    handiBase.castShadow = true;
    biryaniGroup.add(handiBase);

    // Handi Handles
    for (let side of [-1, 1]) {
      const hGeo = new THREE.TorusGeometry(0.18, 0.04, 12, 24, Math.PI);
      const hMesh = new THREE.Mesh(hGeo, goldMat);
      hMesh.position.set(side * 1.2, 0.55, 0);
      hMesh.rotation.z = side * (Math.PI / 2);
      biryaniGroup.add(hMesh);
    }

    // Realistic Multi-Toned Saffron & White Basmati Rice Mound
    const riceMoundGeo = new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.44);
    const riceMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24, roughness: 0.85 });
    const riceMound = new THREE.Mesh(riceMoundGeo, riceMat);
    riceMound.position.set(0, 0.7, 0);
    biryaniGroup.add(riceMound);

    // Basmati Rice Grains & Saffron Flecks
    const whiteRiceMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF7, roughness: 0.9 });
    for (let i = 0; i < 45; i++) {
      const grainGeo = new THREE.BoxGeometry(0.08, 0.03, 0.04);
      const grain = new THREE.Mesh(grainGeo, (i % 2 === 0) ? whiteRiceMat : riceMat);
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.9;
      grain.position.set(Math.cos(angle) * r, 0.75 + Math.random() * 0.22, Math.sin(angle) * r);
      grain.rotation.set(Math.random(), Math.random(), Math.random());
      biryaniGroup.add(grain);
    }

    // Caramelized Fried Onions & Mint Leaves
    const onionMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.6 });
    const mintMat = new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.5 });
    for (let i = 0; i < 14; i++) {
      const oGeo = new THREE.TorusGeometry(0.07, 0.02, 8, 16, Math.PI);
      const onion = new THREE.Mesh(oGeo, onionMat);
      onion.position.set((Math.random() - 0.5) * 1.1, 0.92 + Math.random() * 0.08, (Math.random() - 0.5) * 1.1);
      onion.rotation.set(Math.random(), Math.random(), Math.random());
      biryaniGroup.add(onion);

      const mGeo = new THREE.DodecahedronGeometry(0.05, 1);
      const mint = new THREE.Mesh(mGeo, mintMat);
      mint.position.set((Math.random() - 0.5) * 1.1, 0.95 + Math.random() * 0.08, (Math.random() - 0.5) * 1.1);
      biryaniGroup.add(mint);
    }

    // Roasted Chicken Leg Piece / Tikka Chunks
    const meatMat = new THREE.MeshStandardMaterial({ color: 0xE31B23, roughness: 0.4, metalness: 0.1 });
    const meatPiece1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 1), meatMat);
    meatPiece1.position.set(-0.25, 1.02, 0.2);
    const meatPiece2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 1), meatMat);
    meatPiece2.position.set(0.3, 0.98, -0.15);
    biryaniGroup.add(meatPiece1, meatPiece2);

    // --- 5. SIDE DISHES ---

    // Side 1: Mirchi Ka Salan Bowl (Left)
    const salanBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.3, 24), brassBowlMat);
    salanBowl.position.set(-1.65, 0.15, 0.5);
    const salanGravy = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.05, 24), new THREE.MeshStandardMaterial({ color: 0xE31B23, roughness: 0.3 }));
    salanGravy.position.set(-1.65, 0.29, 0.5);
    const chili1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.015, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0x7A8160, roughness: 0.3 }));
    chili1.position.set(-1.65, 0.33, 0.5);
    chili1.rotation.z = Math.PI / 3;
    biryaniGroup.add(salanBowl, salanGravy, chili1);

    // Side 2: Creamy Onion Raita Bowl (Right)
    const raitaBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.3, 24), ceramicMat);
    raitaBowl.position.set(1.65, 0.15, 0.5);
    const raitaCurd = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.05, 24), new THREE.MeshStandardMaterial({ color: 0xFFFDF7, roughness: 0.3 }));
    raitaCurd.position.set(1.65, 0.29, 0.5);
    const purpMat = new THREE.MeshStandardMaterial({ color: 0xE5737D });
    for (let i = 0; i < 4; i++) {
      const speck = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.05), purpMat);
      speck.position.set(1.65 + (Math.random() - 0.5) * 0.25, 0.33, 0.5 + (Math.random() - 0.5) * 0.25);
      biryaniGroup.add(speck);
    }
    biryaniGroup.add(raitaBowl, raitaCurd);

    // Side 3: Chettinad Pepper Kebabs (Front Right)
    for (let i = 0; i < 3; i++) {
      const kebabMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 1), meatMat);
      kebabMesh.position.set(1.1 + (i % 2) * 0.3, 0.12 + i * 0.1, 1.2 - i * 0.18);
      biryaniGroup.add(kebabMesh);
    }

    // Side 4: Biryani Boiled Egg Halves (Front Left)
    const eggWhiteMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF7, roughness: 0.2 });
    const eggYolkMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 });
    const eggWhite1 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), eggWhiteMat);
    eggWhite1.position.set(-1.2, 0.12, 1.25);
    eggWhite1.rotation.x = Math.PI;
    const eggYolk1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), eggYolkMat);
    eggYolk1.position.set(-1.2, 0.13, 1.25);
    biryaniGroup.add(eggWhite1, eggYolk1);

    // Lemon Wedges (Front Center)
    const lemonWedge = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.07, 12, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.3 }));
    lemonWedge.position.set(0, 0.1, 1.6);
    lemonWedge.rotation.x = Math.PI / 2;
    biryaniGroup.add(lemonWedge);

    // --- 6. REALISTIC HOT RISING STEAM & SMOKE EFFECT ---
    const smokeCount = 40;
    const smokeGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const smokeMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF7,
      emissive: 0xF3795A,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.4,
      roughness: 1.0,
    });
    const smokeParticles = [];

    for (let i = 0; i < smokeCount; i++) {
      const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 2.2,
        0.5 + Math.random() * 2.0,
        (Math.random() - 0.5) * 2.2
      );
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.setScalar(scale);
      mainGroup.add(mesh);
      smokeParticles.push({
        mesh,
        speedY: 0.01 + Math.random() * 0.014,
        speedX: (Math.random() - 0.5) * 0.005,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // --- 7. ANIMATED CLOCHE DOME COVER ---
    const clocheGroup = new THREE.Group();
    const domeGeo = new THREE.SphereGeometry(2.35, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const domeMesh = new THREE.Mesh(domeGeo, clocheMat);
    domeMesh.castShadow = true;
    clocheGroup.add(domeMesh);

    // Cloche Rim Band
    const clocheRimMesh = new THREE.Mesh(new THREE.TorusGeometry(2.33, 0.06, 16, 48), goldMat);
    clocheRimMesh.rotation.x = Math.PI / 2;
    clocheRimMesh.position.y = 0.07;
    clocheGroup.add(clocheRimMesh);

    // Cloche Handle
    const handleStem = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.4, 16), goldMat);
    handleStem.position.y = 2.35;
    clocheGroup.add(handleStem);

    const handleKnob = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), goldMat);
    handleKnob.position.y = 2.65;
    clocheGroup.add(handleKnob);

    clocheGroup.position.y = -0.42;
    mainGroup.add(clocheGroup);

    // --- 8. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xFFFDF7, 3.0);
    mainLight.position.set(6, 10, 6);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const peachPointLight = new THREE.PointLight(0xF3795A, 3.5, 12);
    peachPointLight.position.set(-3, 3, 3);
    scene.add(peachPointLight);

    const redPointLight = new THREE.PointLight(0xE31B23, 2.5, 12);
    redPointLight.position.set(3, 1, 3);
    scene.add(redPointLight);

    // --- 9. Mouse Interaction & Animation Loop ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let currentClocheHeight = 2.4;
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.35 + targetX * 0.5;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.04 - targetY * 0.2;

      const targetClocheY = isOpenRef.current ? 2.4 : -0.42;
      currentClocheHeight += (targetClocheY - currentClocheHeight) * 0.06;
      clocheGroup.position.y = currentClocheHeight;

      if (currentClocheHeight > 0) {
        clocheGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.06 + 0.12;
      } else {
        clocheGroup.rotation.z = 0;
      }

      smokeParticles.forEach((p) => {
        p.mesh.position.y += p.speedY;
        p.mesh.position.x += p.speedX + Math.sin(elapsedTime * 2 + p.offset) * 0.005;
        
        if (p.mesh.material.opacity > 0) {
          p.mesh.material.opacity = Math.max(0, 0.4 - (p.mesh.position.y - 0.4) * 0.16);
        }

        if (p.mesh.position.y > 2.8) {
          p.mesh.position.y = 0.4;
          p.mesh.position.x = (Math.random() - 0.5) * 2.0;
          p.mesh.material.opacity = 0.4;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[540px] flex flex-col items-center justify-between overflow-hidden">
      {/* Top Control Bar */}
      <div className="absolute top-2 right-4 z-20 flex items-center gap-3 bg-pastel-bgCard/90 backdrop-blur-xl px-4 py-2 rounded-full border border-pastel-creamBorder shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-pastel-peach hover:bg-pastel-red text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
        >
          {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{isOpen ? 'Close Cloche' : 'Reveal Steaming Biryani 👑'}</span>
        </button>
        <span className="text-[11px] text-pastel-dark/70 hidden sm:inline border-l border-pastel-creamBorder pl-3">
          Move mouse to rotate 3D Biryani Platter
        </span>
      </div>

      {/* Soft Pastel Background Glows */}
      <div className="absolute inset-0 bg-pastel-card-glow pointer-events-none rounded-full blur-3xl opacity-80" />
      <div className="absolute inset-0 bg-pastel-rose-glow pointer-events-none rounded-full blur-3xl opacity-60" />
      
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
