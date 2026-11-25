import * as THREE from 'three';

/**
 * Neo-Noir Museum Lighting System for the Engraved Ceremonial AB Amulet:
 *
 * - Off-axis directional key lights carve dramatic N·L shadowing inside the
 *   physically recessed AB cavities while igniting polished 45° silver letter bevels.
 * - Balanced cool silver rim light traces the 180-fluted edge thickness.
 * - Restrained rear-side crimson environmental rim reflects softly off grazing chamfers
 *   without painting recessed cuts in bright neon red.
 */
export function setupEmblemLighting(scene) {
  const lightsGroup = new THREE.Group();

  // 1. Subdued Velvet-Room Cool Ambient (kept low so carved cavity shadows stay rich)
  const ambientLight = new THREE.AmbientLight(0x181e28, 0.46);
  lightsGroup.add(ambientLight);

  // 2. Primary Overhead-Left Key Light (angled off-axis for crisp inner wall shadowing & silver bevel highlights)
  const keyLight = new THREE.DirectionalLight(0xf6f8fc, 3.45);
  keyLight.position.set(-4.2, 5.2, 4.6);
  lightsGroup.add(keyLight);

  // 3. Soft Overhead-Front Silver Sheen Light (reveals brushed surface grain & top horizontal bevels)
  const frontSheenLight = new THREE.DirectionalLight(0xeef3fb, 1.35);
  frontSheenLight.position.set(0.4, 3.6, 5.4);
  lightsGroup.add(frontSheenLight);

  // 4. Cool Metallic Edge Rim Light (defines machined reeds and outer 45° silver edge bevels)
  const edgeRimLight = new THREE.PointLight(0xd6e0ee, 5.4, 24, 1.4);
  edgeRimLight.position.set(4.6, -2.0, 2.2);
  lightsGroup.add(edgeRimLight);

  // 5. Restrained Crimson Environmental Bounce (strictly edge/rear-side grazing reflection)
  const crimsonEnvRim = new THREE.PointLight(0x9e0b1f, 2.1, 20, 1.5);
  crimsonEnvRim.position.set(-4.4, -3.4, -1.6);
  lightsGroup.add(crimsonEnvRim);

  // 6. Reverse Face Raking Key Light (illuminates back AB crest, laurel wreath & bevel depth)
  const reverseKeyLight = new THREE.DirectionalLight(0xf0f4fb, 3.0);
  reverseKeyLight.position.set(3.4, 4.6, -5.0);
  lightsGroup.add(reverseKeyLight);

  // 7. Reverse Soft Front Fill (lifts wreath pewter sheen cleanly)
  const reverseFillLight = new THREE.DirectionalLight(0xa3b3c9, 1.25);
  reverseFillLight.position.set(-2.6, 1.6, -5.0);
  lightsGroup.add(reverseFillLight);

  scene.add(lightsGroup);

  let isHovered = false;
  let hoverLerp = 0;

  const setHover = (hovering) => {
    isHovered = hovering;
  };

  const update = (time) => {
    const targetHover = isHovered ? 1.0 : 0.0;
    hoverLerp += (targetHover - hoverLerp) * 0.08;

    const pulse = Math.sin(time * 1.1) * 0.08;

    edgeRimLight.intensity = 5.4 + pulse + hoverLerp * 1.4;
    keyLight.intensity = 3.45 + hoverLerp * 0.45;
    crimsonEnvRim.intensity = 2.1 + hoverLerp * 0.35;
  };

  const dispose = () => {
    scene.remove(lightsGroup);
    lightsGroup.traverse((child) => {
      if (child.dispose) child.dispose();
    });
  };

  return { lightsGroup, update, setHover, dispose };
}
