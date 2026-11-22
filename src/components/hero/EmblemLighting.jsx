import * as THREE from 'three';

/**
 * Creates and configures the dramatic neo-noir cinematic lighting system
 * tailored specifically for dark metallic PBR materials:
 *
 * 1. Primary Key Light (Top-Left): Soft neutral-white light revealing raised AB lettering, bevels & relief.
 * 2. Deep Crimson Rim Light (Right-Rear): Signature #B90E24 highlight along the coin edge.
 * 3. Secondary Crimson Grazing Light (Bottom-Left): Enhances metallic sidewall knurling.
 * 4. Cool-Neutral Fill Light: Prevents pitch-black crushing without washing out blacks.
 * 5. Reverse Face Key Light: Illuminates the modeled reverse side when rotated 180°.
 * 6. Atmospheric Crimson Back Halo: Generates the soft red silhouette in the dark void.
 * 7. Hover Response: Dynamically intensifies key light & crimson rim on cursor approach.
 */
export function setupEmblemLighting(scene) {
  const lightsGroup = new THREE.Group();

  // 1. Cool Ambient Base
  const ambientLight = new THREE.AmbientLight(0x161822, 1.8);
  lightsGroup.add(ambientLight);

  // 2. Primary Key Light (Neutral-White from Top-Left)
  // Reveals the raised AB lettering, beveled chamfers, and engraved metal structure
  const keyLight = new THREE.DirectionalLight(0xfff8f0, 4.2);
  keyLight.position.set(-4.5, 5.5, 5.5);
  lightsGroup.add(keyLight);

  // 3. Cool-Neutral Fill Light (Front-Right)
  const fillLight = new THREE.DirectionalLight(0x9cb4d8, 1.8);
  fillLight.position.set(3.5, 3.5, 4.0);
  lightsGroup.add(fillLight);

  // 4. Primary Crimson Rim Light (Right-Rear Grazing Edge)
  const primaryCrimsonRim = new THREE.PointLight(0xB90E24, 9.5, 22, 1.4);
  primaryCrimsonRim.position.set(4.5, -2.5, 3.2);
  lightsGroup.add(primaryCrimsonRim);

  // 5. Secondary Crimson Accent Point Light (Bottom-Left)
  const secondaryCrimsonRim = new THREE.PointLight(0xC1121F, 5.5, 18, 1.5);
  secondaryCrimsonRim.position.set(-3.8, -3.2, 2.0);
  lightsGroup.add(secondaryCrimsonRim);

  // 6. Reverse Face Fill Light (Back-Top-Center)
  const reverseKeyLight = new THREE.DirectionalLight(0xe2e6f4, 3.5);
  reverseKeyLight.position.set(0, 4.0, -6.5);
  lightsGroup.add(reverseKeyLight);

  // 7. Atmospheric Crimson Back Halo
  const backHaloLight = new THREE.PointLight(0x780000, 7.0, 20, 1.8);
  backHaloLight.position.set(0, 0, -4.0);
  lightsGroup.add(backHaloLight);

  scene.add(lightsGroup);

  // Hover response state
  let isHovered = false;
  let hoverLerp = 0;

  const setHover = (hovering) => {
    isHovered = hovering;
  };

  // Animation update hook
  const update = (time) => {
    // Smooth hover transition (lerp)
    const targetHover = isHovered ? 1.0 : 0.0;
    hoverLerp += (targetHover - hoverLerp) * 0.08;

    // Breathing pulse
    const pulse = Math.sin(time * 1.4) * 0.12;

    primaryCrimsonRim.intensity = 9.5 + pulse * 2.0 + hoverLerp * 3.5;
    keyLight.intensity = 4.2 + hoverLerp * 1.2;
    fillLight.intensity = 1.8 + hoverLerp * 0.6;
  };

  const dispose = () => {
    scene.remove(lightsGroup);
    lightsGroup.traverse((child) => {
      if (child.dispose) child.dispose();
    });
  };

  return { lightsGroup, update, setHover, dispose };
}
