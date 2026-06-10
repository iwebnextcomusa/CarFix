import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Move3d, Sparkles } from "lucide-react";

export default function Model3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [accentColor, setAccentColor] = useState<string>("#F39C12");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Create scene with off-black background matching the premium theme
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#04121a", 0.08);

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 7);

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic grid floor
    const gridHelper = new THREE.GridHelper(20, 40, "#F39C12", "#0c2b42");
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Build the "Car Chassis" geometric wireframe
    const carGroup = new THREE.Group();

    // Body (angular sports proportions)
    const bodyGeom = new THREE.BoxGeometry(3.2, 0.4, 1.4);
    const bodyEdges = new THREE.EdgesGeometry(bodyGeom);
    const bodyMat = new THREE.LineBasicMaterial({ color: 0xf39c12, linewidth: 2 });
    const bodyLine = new THREE.LineSegments(bodyEdges, bodyMat);
    bodyLine.position.y = 0.2;
    carGroup.add(bodyLine);

    // Cabin/Roof (sleek fastback design)
    const cabinGeom = new THREE.BoxGeometry(1.6, 0.45, 1.12);
    const cabinEdges = new THREE.EdgesGeometry(cabinGeom);
    const cabinMat = new THREE.LineBasicMaterial({ color: 0x0a3d62, linewidth: 2 });
    const cabinLine = new THREE.LineSegments(cabinEdges, cabinMat);
    cabinLine.position.set(-0.2, 0.62, 0);
    carGroup.add(cabinLine);

    // Spoiler / Rear Active wing
    const wingGeom = new THREE.BoxGeometry(0.2, 0.05, 1.3);
    const wingEdges = new THREE.EdgesGeometry(wingGeom);
    const wingLine = new THREE.LineSegments(wingEdges, new THREE.LineBasicMaterial({ color: 0xf39c12 }));
    wingLine.position.set(-1.5, 0.44, 0);
    carGroup.add(wingLine);

    // Wheels (4 cylinders/toruses)
    const wheels: THREE.LineSegments[] = [];
    const wheelGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.32, 16);
    const wheelEdges = new THREE.EdgesGeometry(wheelGeom);
    const wheelMat = new THREE.LineBasicMaterial({ color: 0xffffff });

    const wheelPositions = [
      [1.0, -0.3, 0.75],  // Front Right
      [1.0, -0.3, -0.75], // Front Left
      [-1.1, -0.3, 0.75], // Rear Right
      [-1.1, -0.3, -0.75], // Rear Left
    ];

    wheelPositions.forEach((pos) => {
      const wLine = new THREE.LineSegments(wheelEdges, wheelMat);
      wLine.rotation.x = Math.PI / 2;
      wLine.position.set(pos[0], pos[1], pos[2]);
      carGroup.add(wLine);
      wheels.push(wLine);
    });

    // High Headlights glowing
    const lightGeom = new THREE.SphereGeometry(0.12, 8, 8);
    const lightMat1 = new THREE.MeshBasicMaterial({ color: 0xf39c12 });
    const leftLight = new THREE.Mesh(lightGeom, lightMat1);
    leftLight.position.set(1.62, 0.25, 0.4);
    const rightLight = new THREE.Mesh(lightGeom, lightMat1);
    rightLight.position.set(1.62, 0.25, -0.4);
    carGroup.add(leftLight);
    carGroup.add(rightLight);

    carGroup.position.set(0, 0, 0);
    scene.add(carGroup);

    // Ambient light
    const ambientLight = new THREE.AmbientLight("#0a3d62", 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#ff0000", 2.0, 10);
    pointLight.position.set(-2, 1, 1);
    scene.add(pointLight);

    // Track mouse coordinates for interactive camera lag
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Track scroll events for interactive 3D rotation acceleration
    let scrollYOffset = 0;
    const handleScroll = () => {
      scrollYOffset = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Animation Loop
    let animationFrameId: number;
    let previousTime = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = (time - previousTime) / 1000;
      previousTime = time;

      // Spin car chassis gently
      const baseRotationSpeed = 0.25;
      const scrollSpeedFactor = scrollYOffset * 0.005; // speed up rotation during active page scroll
      carGroup.rotation.y += (baseRotationSpeed + scrollSpeedFactor) * delta;

      // Soft vertical float
      carGroup.position.y = Math.sin(time * 0.0015) * 0.12 + 0.1;

      // Rotate wheels to simulate driving forwards
      wheels.forEach((w) => {
        w.rotation.z -= (0.8 + scrollSpeedFactor) * delta;
      });

      // Smooth camera interpolation based on pointer movement
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 1.8;
      camera.position.y = 2 + targetY * 1.2;
      camera.lookAt(carGroup.position);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // dispose geometries/materials
      bodyGeom.dispose();
      bodyEdges.dispose();
      cabinGeom.dispose();
      cabinEdges.dispose();
      wingGeom.dispose();
      wingEdges.dispose();
      wheelGeom.dispose();
      wheelEdges.dispose();
      lightGeom.dispose();
      bodyMat.dispose();
      cabinMat.dispose();
      wingLine.material.dispose();
      wheelMat.dispose();
      lightMat1.dispose();
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  // Handler to alter 3D materials in render scope
  const handleInteraction = () => {
    setIsHovered(!isHovered);
    setAccentColor(isHovered ? "#F39C12" : "#38bdf8"); // dynamic glowing shift on hovered click
  };

  return (
    <div 
      id="three-3d-stage"
      className="relative w-full h-[450px] rounded-2xl glass-panel overflow-hidden flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
    >
      {/* Background neon dust overlay */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(10,61,98,0.2)_0%,transparent_70%] pointer-events-none" />

      {/* 3D Canvas Mounting Point */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-10" />

      {/* Interactive Micro UI Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/60 transition-transform group-hover:scale-105">
        <Move3d className="w-4 h-4 text-accent animate-spin-slow" />
        <span className="font-mono text-2xs uppercase tracking-wider text-white">Interactive 3D Stage</span>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/60">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span className="font-mono text-2xs uppercase text-slate-300">Scroll triggered rotation</span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-slate-400 font-mono text-[10px] pointer-events-none">
        <span>CHASSIS_WIRE_ID: CF-P911</span>
        <span>HOVER OR DRAG THE CANVAS</span>
      </div>
    </div>
  );
}
