import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * FacialAnimationController
 *
 * Coordinates irregular biological blinking (3–7s intervals, occasional double blinks,
 * 160ms total eyelid transit) and micro-saccade gaze adjustments (subtle ±1.6px shifts).
 */
export class FacialAnimationController {
  constructor(config = CharacterMotionConfig.eyes) {
    this.config = config;

    // Blinking state
    this.nextBlinkTime = 2.0; // Initial first blink at 2s
    this.blinkStartTime = -1;
    this.isBlinking = false;
    this.isDoubleBlink = false;
    this.doubleBlinkPending = false;

    // Gaze / Saccade state
    this.nextSaccadeTime = 4.0;
    this.saccadeStartTime = -1;
    this.currentGazeX = 0;
    this.currentGazeY = 0;
    this.targetGazeX = 0;
    this.targetGazeY = 0;
    this.previousGazeX = 0;
    this.previousGazeY = 0;
  }

  /**
   * Updates facial animation state at time t (seconds).
   * @param {number} t - Current wall-clock time in seconds.
   * @returns {{
   *   blinkProgress: number, // 0 = fully open, 1 = fully closed
   *   isClosed: boolean,
   *   gazeOffsetX: number,
   *   gazeOffsetY: number
   * }}
   */
  update(t) {
    // ─── 1. BLINK LIFECYCLE ───
    if (!this.isBlinking && t >= this.nextBlinkTime) {
      this.isBlinking = true;
      this.blinkStartTime = t;
    }

    let blinkProgress = 0;
    let isClosed = false;

    if (this.isBlinking) {
      const elapsed = t - this.blinkStartTime;
      const duration = this.config.blinkDuration;

      if (elapsed < duration) {
        const closeTime = duration * this.config.closureFraction; // ~64ms
        const holdTime = duration * this.config.holdFraction;     // ~29ms

        if (elapsed < closeTime) {
          // Rapid eyelid closure
          const norm = elapsed / closeTime;
          blinkProgress = 0.5 * (1 - Math.cos(Math.PI * norm));
        } else if (elapsed < closeTime + holdTime) {
          // Complete closure hold
          blinkProgress = 1.0;
          isClosed = true;
        } else {
          // Smooth reopening
          const reopenTime = duration - (closeTime + holdTime);
          const norm = (elapsed - (closeTime + holdTime)) / reopenTime;
          blinkProgress = 0.5 * (1 + Math.cos(Math.PI * norm));
        }
      } else {
        // Blink finished
        this.isBlinking = false;
        blinkProgress = 0;

        if (this.doubleBlinkPending) {
          // Fire second blink of double blink
          this.doubleBlinkPending = false;
          this.nextBlinkTime = t + this.config.doubleBlinkDelay;
        } else {
          // Determine next regular interval
          const isDouble = Math.random() < this.config.doubleBlinkProbability;
          if (isDouble) {
            this.doubleBlinkPending = true;
            this.nextBlinkTime = t + this.config.doubleBlinkDelay;
          } else {
            const nextInterval =
              this.config.minBlinkInterval +
              Math.random() * (this.config.maxBlinkInterval - this.config.minBlinkInterval);
            this.nextBlinkTime = t + nextInterval;
          }
        }
      }
    }

    // ─── 2. MICRO-SACCADE GAZE SHIFTS ───
    if (t >= this.nextSaccadeTime) {
      this.previousGazeX = this.currentGazeX;
      this.previousGazeY = this.currentGazeY;
      this.saccadeStartTime = t;

      // 50% return to neutral, 50% subtle eccentric target
      if (Math.abs(this.currentGazeX) > 0.5 || Math.abs(this.currentGazeY) > 0.3) {
        this.targetGazeX = 0;
        this.targetGazeY = 0;
      } else {
        this.targetGazeX = (Math.random() - 0.5) * 2 * this.config.maxGazeOffsetX;
        this.targetGazeY = (Math.random() - 0.5) * 2 * this.config.maxGazeOffsetY;
      }

      const nextInterval =
        this.config.minSaccadeInterval +
        Math.random() * (this.config.maxSaccadeInterval - this.config.minSaccadeInterval);
      this.nextSaccadeTime = t + nextInterval;
    }

    if (this.saccadeStartTime > 0) {
      const saccadeElapsed = t - this.saccadeStartTime;
      const norm = Math.min(1.0, saccadeElapsed / this.config.saccadeDuration);
      const ease = 0.5 * (1 - Math.cos(Math.PI * norm));
      this.currentGazeX = this.previousGazeX + (this.targetGazeX - this.previousGazeX) * ease;
      this.currentGazeY = this.previousGazeY + (this.targetGazeY - this.previousGazeY) * ease;
    }

    return {
      blinkProgress,
      isClosed,
      gazeOffsetX: this.currentGazeX,
      gazeOffsetY: this.currentGazeY
    };
  }
}
