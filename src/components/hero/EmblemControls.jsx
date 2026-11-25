import * as THREE from 'three';

/**
 * Pure X/Y Bidirectional Trackball & Idle Showcase Controller for the AB Amulet.
 *
 * Design guarantees:
 * - Zero revolution / zero orbital translation: rotates strictly around medallion's (0, 0, 0) center.
 * - Full 360° gimbal-lock-free bidirectional X and Y rotation via normalized quaternions:
 *     • Horizontal drag -> World Y (+Y / -Y), inspecting front, edge sidewalls & reverse.
 *     • Vertical drag -> World X (+X / -X), operating simultaneously with Y drag.
 * - Frame-rate-independent delta-time inertia damping (rad/sec).
 * - Smooth orientation-preserving idle motion:
 *     • Slowly reveals front & reverse engraved faces while gliding past edge-on angles.
 *     • Gentle breathing pitch around the medallion's horizontal equatorial axis (zero Z-pinwheel roll).
 *     • Blends smoothly back from any user-left orientation without resetting.
 */
export function createEmblemControls(emblemGroup, domElement) {
  let isEnabled = false;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastMoveTime = performance.now();
  let lastInteractionTime = performance.now();

  // Angular velocities in radians/second
  let velX = 0;
  let velY = 0;
  const MAX_ANGULAR_VEL = 9.0; // rad/s cap
  const ROTATE_SPEED = 0.0058; // rad/px
  const DAMPING_RATE = 4.2;    // exponential decay/s

  // Smooth Reset Tweening State (explicit user double-click or RESET button only)
  let isResetting = false;
  let resetProgress = 1.0;
  const RESET_DURATION = 0.65; // seconds
  const qResetStart = new THREE.Quaternion();
  const qResetTarget = new THREE.Quaternion();
  const baseQuaternion = new THREE.Quaternion();

  // Idle blend & phase clock
  let idleBlend = 0;
  let idleClock = 0;

  // Pre-allocated math objects (0 per-frame GC allocations)
  const qDelta = new THREE.Quaternion();
  const qY = new THREE.Quaternion();
  const qX = new THREE.Quaternion();
  const qIdleY = new THREE.Quaternion();
  const qIdleP = new THREE.Quaternion();
  const axisX = new THREE.Vector3(1, 0, 0);
  const axisY = new THREE.Vector3(0, 1, 0);
  const faceZ = new THREE.Vector3(0, 0, 1);
  const pitchAxis = new THREE.Vector3();

  // ─── Pointer & Touch Handlers ───
  const startDrag = (clientX, clientY) => {
    if (!isEnabled) return;
    isDragging = true;
    isResetting = false;
    lastPointerX = clientX;
    lastPointerY = clientY;
    lastMoveTime = performance.now();
    lastInteractionTime = lastMoveTime;
    velX = 0;
    velY = 0;
    idleBlend = 0;
    domElement.style.cursor = 'grabbing';
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDragging || !isEnabled) return;

    const now = performance.now();
    const dtMove = Math.max((now - lastMoveTime) / 1000, 0.006);
    const deltaX = clientX - lastPointerX;
    const deltaY = clientY - lastPointerY;

    lastPointerX = clientX;
    lastPointerY = clientY;
    lastMoveTime = now;
    lastInteractionTime = now;

    // Simultaneous bidirectional World X & Y rotation
    const angleY = deltaX * ROTATE_SPEED;
    const angleX = deltaY * ROTATE_SPEED;

    qY.setFromAxisAngle(axisY, angleY);
    qX.setFromAxisAngle(axisX, angleX);
    qDelta.multiplyQuaternions(qY, qX);

    emblemGroup.quaternion.premultiply(qDelta).normalize();

    // Instantaneous angular velocity smoothed cleanly for inertia
    const instVelY = THREE.MathUtils.clamp(angleY / dtMove, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
    const instVelX = THREE.MathUtils.clamp(angleX / dtMove, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
    velY = velY * 0.35 + instVelY * 0.65;
    velX = velX * 0.35 + instVelX * 0.65;
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    const now = performance.now();
    // If pointer paused stationary for >85ms before release, drop residual inertia cleanly
    if (now - lastMoveTime > 85) {
      velX = 0;
      velY = 0;
    }
    lastInteractionTime = now;
    domElement.style.cursor = isEnabled ? 'grab' : 'default';
  };

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    startDrag(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    moveDrag(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    endDrag();
  };

  const onTouchStart = (e) => {
    if (!isEnabled || e.touches.length === 0) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e) => {
    if (!isEnabled || e.touches.length === 0) return;
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchEnd = (e) => {
    if (e.touches.length === 0) endDrag();
  };

  const resetToCanonical = () => {
    if (!isEnabled) return;
    isResetting = true;
    resetProgress = 0;
    qResetStart.copy(emblemGroup.quaternion);
    qResetTarget.copy(baseQuaternion);
    velX = 0;
    velY = 0;
    idleBlend = 0;
    lastInteractionTime = performance.now();
  };

  const onDoubleClick = (e) => {
    e.preventDefault();
    resetToCanonical();
  };

  domElement.style.cursor = 'default';
  domElement.style.touchAction = 'none';

  domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });

  domElement.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  domElement.addEventListener('dblclick', onDoubleClick);

  // ─── Frame-Rate-Independent Delta-Time Update ───
  const update = (delta) => {
    if (!isEnabled || delta <= 0) return;

    const now = performance.now();
    const timeSinceInteraction = (now - lastInteractionTime) / 1000;

    // 1. Explicit Smooth Reset Tween
    if (isResetting) {
      resetProgress += delta / RESET_DURATION;
      if (resetProgress >= 1.0) {
        resetProgress = 1.0;
        isResetting = false;
        lastInteractionTime = now;
      }
      const ease = 1 - Math.pow(1 - resetProgress, 3);
      emblemGroup.quaternion.slerpQuaternions(qResetStart, qResetTarget, ease);
      return;
    }

    // 2. Angular Inertia Phase (smooth X & Y decay using delta seconds)
    const speedSq = velX * velX + velY * velY;
    if (!isDragging && speedSq > 0.0001) {
      qY.setFromAxisAngle(axisY, velY * delta);
      qX.setFromAxisAngle(axisX, velX * delta);
      qDelta.multiplyQuaternions(qY, qX);
      emblemGroup.quaternion.premultiply(qDelta).normalize();

      const decay = Math.exp(-DAMPING_RATE * delta);
      velX *= decay;
      velY *= decay;
      idleBlend = 0;
      return;
    }

    if (!isDragging && speedSq <= 0.0001) {
      velX = 0;
      velY = 0;
    }

    // 3. Autonomous Idle X/Y Showcase (preserves user orientation, zero edge stalling)
    if (!isDragging && timeSinceInteraction > 1.35) {
      idleBlend = Math.min(1.0, idleBlend + delta / 1.4);
      idleClock += delta * idleBlend;

      // Sense medallion face normal to slow on front/back faces and glide smoothly past edge-on
      faceZ.set(0, 0, 1).applyQuaternion(emblemGroup.quaternion);
      const absFaceCos = Math.abs(faceZ.z);
      const edgeFactor = Math.pow(1 - absFaceCos, 2.0);
      const yawRate = (0.14 + edgeFactor * 0.58) * idleBlend;

      // Rotate pitch around medallion's horizontal equatorial axis (prevents Z-pinwheel roll drift)
      pitchAxis.crossVectors(axisY, faceZ);
      if (pitchAxis.lengthSq() < 0.0001) {
        pitchAxis.copy(axisX);
      } else {
        pitchAxis.normalize();
      }
      const pitchRate = Math.sin(idleClock * 0.65) * 0.11 * idleBlend;

      qIdleY.setFromAxisAngle(axisY, yawRate * delta);
      qIdleP.setFromAxisAngle(pitchAxis, pitchRate * delta);
      qDelta.multiplyQuaternions(qIdleY, qIdleP);
      emblemGroup.quaternion.premultiply(qDelta).normalize();
    }
  };

  const dispose = () => {
    domElement.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    domElement.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);

    domElement.removeEventListener('dblclick', onDoubleClick);
  };

  return {
    update,
    resetToCanonical,
    dispose,
    setBaseQuaternion: (q) => {
      baseQuaternion.copy(q);
    },
    syncAfterHandoff: () => {
      velX = 0;
      velY = 0;
      idleBlend = 0;
      idleClock = 0;
      isResetting = false;
      lastInteractionTime = performance.now();
    },
    setEnabled: (val) => {
      isEnabled = Boolean(val);
      domElement.style.cursor = isEnabled ? 'grab' : 'default';
    }
  };
}
