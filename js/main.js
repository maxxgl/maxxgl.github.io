import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
class StarTorus {
  constructor(containerId, config = {}) {
    this.config = {
      numStars: 8000,
      particleSize: 0.3,
      rotationSpeed: 0.3,
      torusRadius: 48,
      tubeRadius: 12,
      transitionSpeed: 3,
      ...config,
    };
    const container = document.getElementById(containerId);
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.setupScene(container);
    this.initParticles();
    this.timeElapsed = 0;
    this.animate = this.animate.bind(this);
    this.animate();
  }

  setupScene(container) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    this.camera.position.z = 100;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  initParticles() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
      size: this.config.particleSize,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    this.particles = [];
    const positions = new Float32Array(this.config.numStars * 3);

    for (let i = 0; i < this.config.numStars; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 40;

      const position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const targetPosition = new THREE.Vector3(
        (this.config.torusRadius + this.config.tubeRadius * Math.cos(v)) *
          Math.cos(u),
        (this.config.torusRadius + this.config.tubeRadius * Math.cos(v)) *
          Math.sin(u),
        this.config.tubeRadius * Math.sin(v)
      );

      this.particles.push({
        position,
        velocity: new THREE.Vector3(0, 0, 0),
        targetPosition,
        phase: 0,
      });

      const i3 = i * 3;
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  updateParticles(delta) {
    const positions = this.particleSystem.geometry.attributes.position.array;

    this.particles.forEach((particle, i) => {
      const i3 = i * 3;

      particle.phase += delta * this.config.transitionSpeed;
      particle.phase = Math.min(particle.phase, 1);

      const radius =
        40 * (1 - particle.phase) +
        Math.sqrt(
          Math.pow(particle.targetPosition.x, 2) +
            Math.pow(particle.targetPosition.y, 2)
        ) *
          particle.phase;

      const angle = this.timeElapsed * this.config.rotationSpeed;

      const currentX = particle.position.x;
      const currentY = particle.position.y;
      const currentZ = particle.position.z;

      const targetX =
        radius * Math.cos(angle + (i / this.config.numStars) * Math.PI * 2);
      const targetY =
        radius * Math.sin(angle + (i / this.config.numStars) * Math.PI * 2);
      const targetZ = particle.targetPosition.z * particle.phase;

      particle.position.x += (targetX - currentX) * 0.04;
      particle.position.y += (targetY - currentY) * 0.04;
      particle.position.z += (targetZ - currentZ) * 0.04;

      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
    });

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  animate() {
    requestAnimationFrame(this.animate);

    const delta = 0.016;
    this.timeElapsed += delta;

    this.updateParticles(delta);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const container = this.renderer.domElement.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setRotationSpeed(speed) {
    this.config.rotationSpeed = speed;
  }

  setTransitionSpeed(speed) {
    this.config.transitionSpeed = speed;
  }
}

// Initialize the visualization
const starTorus = new StarTorus("canvas");
