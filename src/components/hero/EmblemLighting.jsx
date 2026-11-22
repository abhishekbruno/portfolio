import * as THREE from 'three';

/**
 * Creates and configures the dramatic neo-noir cinematic lighting system
 * tailored specifically for the metallic AB Medallion.
 *
 * Lights:
 * 1. Key Directional Light (top-front-right) for sharp specular highlights on beveled edges.
 * 2. Subtle Cool Ambient Fill to prevent pitch-black crushing while maintaining deep contrast.
 * 3. Primary Crimson Grazing Rim Light for the signature John Wick red edge sheen.
 * 4. Secondary Crimson Accent Point Light for dynamic edge reflection.
 * 5. Reverse Face Fill Light so the back side remains clearly visible when rotated 180°.
 * 6. Atmospheric Backlight Halo producing a subtle red silhouette into the dark void.
 */
export function setupEmblemLighting(scene) {
  const lightsGroup = new THREE.Group();

  // 1. Cool Ambient Fill
  const ambientLight = new THREE.AmbientLight(0x10121a, 1.6);
  lightsGroup.add(ambientLight);

  // 2. Key Directional Light (Front-Top-Right)
  const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.4);
  keyLight.position.set(5.5, 6.0, 5.5);
  lightsGroup.add(keyLight);

  // 3. Cool Metallic Fill Light (Front-Bottom-Left)
  const fillLight = new THREE.DirectionalLight(0x8fa4c4, 1.2);
  fillLight.position.set(-5.0, -3.5, 3.0);
  lightsGroup.add(fillLight);

  // 4. Primary Crimson Rim Light (Sharp Grazing Highlight)
  const primaryCrimsonRim = new THREE.PointLight(0xC1121F, 8.5, 20, 1.5);
  primaryCrimsonRim.position.set(-3.8, -2.6, 2.8);
  lightsGroup.add(primaryCrimsonRim);

  // 5. Secondary Crimson Rim Light (Top Edge)
  const secondaryCrimsonRim = new THREE.PointLight(0xC1121F, 5.0, 16, 1.6);
  secondaryCrimsonRim.position.set(3.6, 3.2, 2.0);
  lightsGroup.add(secondaryCrimsonRim);

  // 6. Reverse Face Fill Light (Back-Top-Center)
  // Ensures high-fidelity readability when user spins the coin 180 degrees
  const reverseFillLight = new THREE.DirectionalLight(0xd4d8e8, 2.8);
  reverseFillLight.position.set(0, 4.0, -6.5);
  lightsGroup.add(reverseFillLight);

  // 7. Atmospheric Crimson Back Halo
  const backHaloLight = new THREE.PointLight(0x780000, 6.5, 18, 1.8);
  backHaloLight.position.set(0, 0, -4.0);
  lightsGroup.add(backHaloLight);

  scene.add(lightsGroup);

  // Animation hook to subtly pulse the crimson rim light during idle
  const update = (time) => {
    const pulse = Math.sin(time * 1.5) * 0.15;
    primaryCrimsonRim.intensity = 8.5 + pulse * 2.0;
  };

  const dispose = () => {
    scene.remove(lightsGroup);
    lightsGroup.traverse((child) => {
      if (child.dispose) child.dispose();
    });
  };

  return { lightsGroup, update, dispose };
}
