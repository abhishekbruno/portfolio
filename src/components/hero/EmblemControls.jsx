import * as THREE from 'three';

/**
 * High-performance 3D Trackball & Inertia Controller for the AB Medallion.
 *
 * Capabilities:
 * - Full 3-Axis (XYZ) Free Rotation using Quaternions (Gimbal-lock free):
 *   • Horizontal drag -> Yaw (Y-axis) revealing coin edge & reverse face.
 *   • Vertical drag -> Pitch (X-axis) revealing top/bottom bevels & curved text.
 *   • Shift + Drag (or 2-finger twist on touch) -> Roll (Z-axis) spinning in-plane.
 * - Fluid Physics Inertia: Damped angular momentum with velocity clamping.
 * - Autonomous Neo-Noir Idle Drift: Breathing tilt + slow orbital rotation.
 * - Smooth Reset: Double-click / double-tap smoothly tweens back to canonical front-facing orientation.
 */
export function createEmblemControls(emblemGroup, domElement) {
  // State
  let isDragging = false;
  let isShiftActive = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastTouchAngle = 0;
  let isTwoFingerTouch = false;
  let lastInteractionTime = performance.now();

  // Angular velocity vector (rad/frame)
  const angularVelocity = new THREE.Vector3(0, 0, 0);
  const maxAngularSpeed = 0.22;
  const dampingFactor = 0.94;

  // Reusable Quaternion math instances
  const qDelta = new THREE.Quaternion();
  const axisX = new THREE.Vector3(1, 0, 0);
  const axisY = new THREE.Vector3(0, 1, 0);
  const axisZ = new THREE.Vector3(0, 0, 1);

  // Smooth Reset Tweening State
  let isResetting = false;
  let resetProgress = 1.0;
  const qResetStart = new THREE.Quaternion();
  const qResetTarget = new THREE.Quaternion(); // Identity (front-facing)

  // Canonical base orientation
  const baseQuaternion = new THREE.Quaternion();

  // Sensitivities
  const ROTATE_SPEED = 0.0055;
  const INERTIA_FACTOR = 0.65;

  // ─── Pointer Event Handlers ───
  const onPointerDown = (e) => {
    // Only respond to primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;

    isDragging = true;
    isResetting = false;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    isShiftActive = e.shiftKey;
    lastInteractionTime = performance.now();
    angularVelocity.set(0, 0, 0);

    domElement.style.cursor = 'grabbing';
  };

  const onPointerMove = (e) => {
    isShiftActive = e.shiftKey;
    if (!isDragging) return;

    const deltaX = e.clientX - lastPointerX;
    const deltaY = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    lastInteractionTime = performance.now();

    // Check if Shift is held -> rotate Z (Roll)
    if (isShiftActive) {
      const angleZ = deltaX * ROTATE_SPEED * 1.2;
      qDelta.setFromAxisAngle(axisZ, -angleZ);
      emblemGroup.quaternion.premultiply(qDelta);
      angularVelocity.z = -angleZ * INERTIA_FACTOR;
    } else {
      // Free X & Y Rotation (Trackball style)
      const angleY = deltaX * ROTATE_SPEED;
      const angleX = deltaY * ROTATE_SPEED;

      // Rotate around world Y then X
      const qY = new THREE.Quaternion().setFromAxisAngle(axisY, angleY);
      const qX = new THREE.Quaternion().setFromAxisAngle(axisX, angleX);
      qDelta.multiplyQuaternions(qY, qX);

      emblemGroup.quaternion.premultiply(qDelta);

      angularVelocity.x = angleX * INERTIA_FACTOR;
      angularVelocity.y = angleY * INERTIA_FACTOR;
      angularVelocity.z = 0;
    }

    // Clamp angular velocity
    if (angularVelocity.length() > maxAngularSpeed) {
      angularVelocity.setLength(maxAngularSpeed);
    }
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    domElement.style.cursor = 'grab';
    lastInteractionTime = performance.now();
  };

  // ─── Touch Multi-finger Gestures (Z-Roll & Drag) ───
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      isTwoFingerTouch = true;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      lastTouchAngle = Math.atan2(dy, dx);
    } else if (e.touches.length === 1) {
      isTwoFingerTouch = false;
      onPointerDown(e.touches[0]);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && isTwoFingerTouch) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      const currentAngle = Math.atan2(dy, dx);
      let angleDiff = currentAngle - lastTouchAngle;
      lastTouchAngle = currentAngle;

      // Handle angle wrap-around
      if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      qDelta.setFromAxisAngle(axisZ, angleDiff);
      emblemGroup.quaternion.premultiply(qDelta);
      angularVelocity.z = angleDiff * INERTIA_FACTOR;
      lastInteractionTime = performance.now();
    } else if (e.touches.length === 1) {
      onPointerMove(e.touches[0]);
    }
  };

  const onTouchEnd = (e) => {
    if (e.touches.length < 2) {
      isTwoFingerTouch = false;
    }
    if (e.touches.length === 0) {
      onPointerUp();
    }
  };

  // ─── Double Click / Double Tap Reset ───
  const resetToCanonical = () => {
    isResetting = true;
    resetProgress = 0;
    qResetStart.copy(emblemGroup.quaternion);
    qResetTarget.copy(baseQuaternion);
    angularVelocity.set(0, 0, 0);
  };

  const onDoubleClick = (e) => {
    e.preventDefault();
    resetToCanonical();
  };

  // Attach event listeners to DOM element
  domElement.style.cursor = 'grab';
  domElement.style.touchAction = 'none';

  domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });

  domElement.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  domElement.addEventListener('dblclick', onDoubleClick);

  // ─── Per-Frame Update (Inertia & Idle Drift) ───
  const update = (time) => {
    const now = performance.now();
    const timeSinceInteraction = (now - lastInteractionTime) / 1000;

    // 1. Smooth Reset Animation
    if (isResetting) {
      resetProgress += 0.045;
      if (resetProgress >= 1.0) {
        resetProgress = 1.0;
        isResetting = false;
      }
      // Ease out cubic
      const t = 1 - Math.pow(1 - resetProgress, 3);
      emblemGroup.quaternion.slerpQuaternions(qResetStart, qResetTarget, t);
      return;
    }

    // 2. Inertia Phase (when released)
    if (!isDragging && angularVelocity.lengthSq() > 0.000002) {
      const speed = angularVelocity.length();
      const axis = angularVelocity.clone().normalize();
      qDelta.setFromAxisAngle(axis, speed);
      emblemGroup.quaternion.premultiply(qDelta);
      angularVelocity.multiplyScalar(dampingFactor);
    }

    // 3. Autonomous Idle Motion (after user releases & inertia settles)
    if (!isDragging && timeSinceInteraction > 2.0 && angularVelocity.lengthSq() <= 0.000002) {
      // Slow, mechanically precise orbital Y rotation
      const idleYaw = 0.0022;
      // Gentle breathing vertical tilt
      const idlePitch = Math.sin(time * 0.7) * 0.0012;

      const qIdleY = new THREE.Quaternion().setFromAxisAngle(axisY, idleYaw);
      const qIdleX = new THREE.Quaternion().setFromAxisAngle(axisX, idlePitch);
      qDelta.multiplyQuaternions(qIdleY, qIdleX);

      emblemGroup.quaternion.premultiply(qDelta);
    }
  };

  // ─── Cleanup Function ───
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
    setShiftActive: (active) => { isShiftActive = active; }
  };
}
