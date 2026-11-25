import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * HairDynamics
 *
 * Simulates visible, physical secondary motion of loose hair tips and fringe
 * in response to ambient air currents and head movement.
 *
 * Physics Principles:
 * - Roots strictly anchored at (50% 0%) with zero translation.
 * - Loose ends sway with damped harmonic restitution.
 * - Movement responds naturally to periodic drafts and settles smoothly to rest.
 */
export class HairDynamics {
  constructor(config = CharacterMotionConfig.hair) {
    this.config = config;
    this.angle = 0;
    this.angularVelocity = 0;
    this.lastTime = 0;

    // Periodic draft state
    this.nextDraftTime = 2.5; // First subtle draft at 2.5s
    this.draftStartTime = -1;
    this.isDraftActive = false;
    this.draftStrength = 0;
    this.draftFrequency = 1.0;
  }

  /**
   * Updates hair dynamics at time t.
   * @param {number} t - Current wall-clock time in seconds.
   * @param {number} [headDeltaYaw=0] - Inertial coupling from head rotation.
   * @returns {{
   *   tipAngle: number,
   *   tipSkew: number
   * }}
   */
  update(t, headDeltaYaw = 0) {
    const dt = this.lastTime > 0 ? Math.min(0.04, t - this.lastTime) : 0.016;
    this.lastTime = t;

    // Trigger ambient breeze impulse
    if (!this.isDraftActive && t >= this.nextDraftTime) {
      this.isDraftActive = true;
      this.draftStartTime = t;
      const sign = Math.random() > 0.45 ? 1 : -1;
      this.draftStrength = sign * (0.75 + Math.random() * 0.35) * this.config.maxAngleDeg;
      this.draftFrequency = 0.9 + Math.random() * 0.4;
    }

    let drivingForce = 0;
    if (this.isDraftActive) {
      const elapsed = t - this.draftStartTime;
      const duration = this.config.draftDuration;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const envelope = Math.sin(Math.PI * progress);
        const wave = Math.sin(progress * Math.PI * 2 * this.draftFrequency);
        drivingForce = this.draftStrength * envelope * wave;
      } else {
        this.isDraftActive = false;
        const nextInterval =
          this.config.minDraftInterval +
          Math.random() * (this.config.maxDraftInterval - this.config.minDraftInterval);
        this.nextDraftTime = t + nextInterval;
      }
    }

    // Add secondary inertia from head rotation
    drivingForce -= headDeltaYaw * 0.6;

    // Damped harmonic oscillator integration:
    const springForce = (drivingForce - this.angle) * this.config.springStiffness;
    const dampingForce = -this.angularVelocity * this.config.springDamping;
    const totalAcceleration = springForce + dampingForce;

    this.angularVelocity += totalAcceleration * dt;
    this.angle += this.angularVelocity * dt;

    // Numerical clamp to preserve silhouette integrity
    this.angle = Math.max(-this.config.maxAngleDeg, Math.min(this.config.maxAngleDeg, this.angle));

    return {
      tipAngle: this.angle,
      tipSkew: this.angle * (this.config.maxSkewDeg / this.config.maxAngleDeg)
    };
  }
}
