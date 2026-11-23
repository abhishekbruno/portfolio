import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * PostureController
 *
 * Coordinates occasional resting posture settling, subtle resting-finger flexion
 * on the wooden armrests, and crossed-leg micro-adjustments.
 */
export class PostureController {
  constructor(config = CharacterMotionConfig.posture) {
    this.config = config;
    this.nextSettleTime = 8.0;
    this.settleStartTime = -1;
    this.isSettling = false;
  }

  /**
   * Updates resting posture state at time t.
   * @param {number} t - Current wall-clock time in seconds.
   * @returns {{
   *   fingerFlexion: number,
   *   legSettleY: number,
   *   torsoShiftX: number
   * }}
   */
  update(t) {
    if (!this.isSettling && t >= this.nextSettleTime) {
      this.isSettling = true;
      this.settleStartTime = t;
    }

    let progress = 0;

    if (this.isSettling) {
      const elapsed = t - this.settleStartTime;
      const duration = this.config.settleDuration;

      if (elapsed < duration) {
        // Bell-shaped smooth pulse for posture settling
        const norm = elapsed / duration;
        progress = Math.sin(Math.PI * norm);
      } else {
        this.isSettling = false;
        // Schedule next subtle settle 12–18s later
        const nextInterval = this.config.settleInterval + (Math.random() - 0.5) * 5.0;
        this.nextSettleTime = t + nextInterval;
      }
    }

    return {
      fingerFlexion: progress * this.config.fingerFlexionPx,
      legSettleY: progress * this.config.legMicroAdjustPx,
      torsoShiftX: progress * 0.4
    };
  }
}
