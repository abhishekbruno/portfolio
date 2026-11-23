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
  const ambientLight = new THREE.AmbientLight(0x202833, 0.72);
  lightsGroup.add(ambientLight);

  // 2. Primary Key Light (Neutral-White from Top-Left)
  // Reveals the raised AB lettering, beveled chamfers, and engraved metal structure
  const keyLight = new THREE.DirectionalLight(0xf2f6ff, 3.15);
  keyLight.position.set(-4.5, 5.5, 5.5);
  lightsGroup.add(keyLight);

  // 3. Cool-Neutral Fill Light (Front-Right)
  const fillLight = new THREE.DirectionalLight(0xbacbe3, 1.45);
  fillLight.position.set(3.5, 3.5, 4.0);
  lightsGroup.add(fillLight);

  // 4. Primary Crimson Rim Light (Right-Rear Grazing Edge)
  const primaryCrimsonRim = new THREE.PointLight(0x9aaecb, 5.8, 22, 1.4);
  primaryCrimsonRim.position.set(4.5, -2.5, 3.2);
  lightsGroup.add(primaryCrimsonRim);

  // 5. Secondary Crimson Accent Point Light (Bottom-Left)
  const secondaryCrimsonRim = new THREE.PointLight(0xC1121F, 2.0, 18, 1.5);
  secondaryCrimsonRim.position.set(-3.8, -3.2, 2.0);
  lightsGroup.add(secondaryCrimsonRim);

  // 6. Reverse Face Fill Light (Back-Top-Center)
  const reverseKeyLight = new THREE.DirectionalLight(0xcbd9ed, 2.15);
  reverseKeyLight.position.set(0, 4.0, -6.5);
  lightsGroup.add(reverseKeyLight);

  // 7. Atmospheric Crimson Back Halo
  const backHaloLight = new THREE.PointLight(0x1c2637, 3.8, 20, 1.8);
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

    primaryCrimsonRim.intensity = 5.8 + pulse * 0.9 + hoverLerp * 1.6;
    keyLight.intensity = 3.15 + hoverLerp * 0.45;
    fillLight.intensity = 1.45 + hoverLerp * 0.15;
  };

  const dispose = () => {
    scene.remove(lightsGroup);
    lightsGroup.traverse((child) => {
      if (child.dispose) child.dispose();
    });
  };

  return { lightsGroup, update, setHover, dispose };
}
