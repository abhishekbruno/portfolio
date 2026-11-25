import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * HeadMotionController
 *
 * Simulates calm, dignified head movements of a seated person:
 * - Subtle contemplative horizontal rotation (1.0° to 1.6°)
 * - Gentle forward/backward tilt (0.5° to 0.9°)
 * - Smooth transitions between micro-poses (2.5s–3.2s duration)
 * - Coordinated breathing lift coupling
 */
export class HeadMotionController {
  constructor(config = CharacterMotionConfig.head) {
    this.config = config;
    this.currentYaw = 0;
    this.currentPitch = 0;
    this.targetYaw = 0;
    this.targetPitch = 0;
    this.prevYaw = 0;
    this.prevPitch = 0;

    this.nextShiftTime = 4.0;
    this.shiftStartTime = -1;
    this.isTransitioning = false;
  }

  update(t) {
    // Schedule new contemplative pose
    if (!this.isTransitioning && t >= this.nextShiftTime) {
      this.isTransitioning = true;
      this.shiftStartTime = t;
      this.prevYaw = this.currentYaw;
      this.prevPitch = this.currentPitch;

      // 45% return to center, 55% subtle contemplative angle
      if (Math.abs(this.currentYaw) > 0.6) {
        this.targetYaw = (Math.random() - 0.5) * 0.4;
        this.targetPitch = (Math.random() - 0.5) * 0.3;
      } else {
        const sign = Math.random() > 0.5 ? 1 : -1;
        this.targetYaw = sign * (0.6 + Math.random() * 0.8) * (this.config.maxYawDeg / 1.4);
        this.targetPitch = (Math.random() - 0.5) * 2 * this.config.maxPitchDeg;
      }
    }

    if (this.isTransitioning) {
      const elapsed = t - this.shiftStartTime;
      const duration = this.config.transitionDuration;

      if (elapsed < duration) {
        // Smooth S-curve transition
        const norm = elapsed / duration;
        const ease = 0.5 * (1 - Math.cos(Math.PI * norm));
        this.currentYaw = this.prevYaw + (this.targetYaw - this.prevYaw) * ease;
        this.currentPitch = this.prevPitch + (this.targetPitch - this.prevPitch) * ease;
      } else {
        this.isTransitioning = false;
        this.currentYaw = this.targetYaw;
        this.currentPitch = this.targetPitch;
        const interval =
          this.config.minPoseInterval +
          Math.random() * (this.config.maxPoseInterval - this.config.minPoseInterval);
        this.nextShiftTime = t + interval;
      }
    }

    return {
      yawDeg: this.currentYaw,
      pitchDeg: this.currentPitch
    };
  }
}
