import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * HairDynamics
 *
 * Simulates gentle secondary motion of loose hair strands and fringe
 * in response to a faint indoor air current using damped spring physics.
 */
export class HairDynamics {
  constructor(config = CharacterMotionConfig.hair) {
    this.config = config;
    this.displacementLeft = 0;
    this.displacementRight = 0;
    this.velocityLeft = 0;
    this.velocityRight = 0;
    this.lastTime = 0;
  }

  /**
   * Updates hair dynamics at time t.
   * @param {number} t - Current wall-clock time in seconds.
   * @returns {{
   *   hairAngleLeft: number,
   *   hairAngleRight: number,
   *   hairDisplaceX: number
   * }}
   */
  update(t) {
    const dt = this.lastTime > 0 ? Math.min(0.05, t - this.lastTime) : 0.016;
    this.lastTime = t;

    // Faint natural indoor draft driving force (sum of low-frequency sine waves)
    const draftLeft =
      Math.sin(t * 2 * Math.PI * this.config.draftFrequency) * 0.7 +
      Math.sin(t * 2 * Math.PI * (this.config.draftFrequency * 1.63)) * 0.3;

    const draftRight =
      Math.sin(t * 2 * Math.PI * this.config.draftFrequency + this.config.asymmetryFactor) * 0.7 +
      Math.sin(t * 2 * Math.PI * (this.config.draftFrequency * 1.45)) * 0.3;

    // Target displacement
    const targetLeft = draftLeft * this.config.maxDisplacementDeg;
    const targetRight = draftRight * this.config.maxDisplacementDeg;

    // Spring-damper integration
    const forceLeft = (targetLeft - this.displacementLeft) * this.config.springStiffness - this.velocityLeft * this.config.springDamping;
    this.velocityLeft += forceLeft * dt;
    this.displacementLeft += this.velocityLeft * dt;

    const forceRight = (targetRight - this.displacementRight) * this.config.springStiffness - this.velocityRight * this.config.springDamping;
    this.velocityRight += forceRight * dt;
    this.displacementRight += this.velocityRight * dt;

    const hairDisplaceX = (this.displacementLeft + this.displacementRight) * 0.5 * (this.config.maxDisplacementPx / this.config.maxDisplacementDeg);

    return {
      hairAngleLeft: this.displacementLeft,
      hairAngleRight: this.displacementRight,
      hairDisplaceX
    };
  }
}
