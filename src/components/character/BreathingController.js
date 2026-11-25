import { CharacterMotionConfig } from './CharacterMotionConfig';

/**
 * BreathingController
 *
 * Implements perceptible, calm resting respiration (12–16 breaths/min)
 * for a seated person on a throne.
 *
 * Microscopic Kinematics:
 * - Sternum lift: ~3.2px during inhalation
 * - Ribcage & lapel lateral expansion: ~2.0%
 * - Anteroposterior volume expansion: ~1.2%
 * - Shoulders & neck follow with realistic phase lag
 */
export class BreathingController {
  constructor(config = CharacterMotionConfig.respiration) {
    this.config = config;
    this.currentCycleDuration = config.cycleDuration;
    this.cycleStartTime = 0;
    this.breathCount = 0;
  }

  /**
   * Evaluates the respiratory state at time t (in seconds).
   * @param {number} t - Current wall-clock time in seconds.
   * @returns {{
   *   chestLift: number,
   *   chestScaleX: number,
   *   chestScaleY: number,
   *   shoulderLift: number,
   *   headLift: number,
   *   tieLagLift: number,
   *   phase: 'inhale' | 'exhale',
   *   progress: number
   * }}
   */
  update(t) {
    const elapsed = t - this.cycleStartTime;

    // Advance to next breath cycle with natural biological jitter
    if (elapsed >= this.currentCycleDuration) {
      this.cycleStartTime = t;
      this.breathCount++;
      const jitter = (Math.random() - 0.5) * 2 * this.config.jitterRange;
      this.currentCycleDuration = Math.max(3.8, Math.min(5.2, this.config.cycleDuration + jitter));
    }

    const cycleElapsed = t - this.cycleStartTime;
    const inhaleDuration = this.currentCycleDuration * this.config.inhalationFraction;
    const exhaleDuration = this.currentCycleDuration * (1 - this.config.inhalationFraction);

    let progress = 0;
    let phase = 'inhale';

    if (cycleElapsed < inhaleDuration) {
      // Inhalation Phase: smooth sigmoidal expansion
      phase = 'inhale';
      const norm = cycleElapsed / inhaleDuration;
      progress = 0.5 * (1 - Math.cos(Math.PI * norm));
    } else {
      // Exhalation Phase: longer, gentle relaxation
      phase = 'exhale';
      const norm = (cycleElapsed - inhaleDuration) / exhaleDuration;
      progress = 0.5 * (1 + Math.cos(Math.PI * norm));
    }

    // Delayed shoulder response (~160ms phase lag)
    const shoulderElapsed = Math.max(0, cycleElapsed - this.config.shoulderPhaseLag);
    let shoulderProgress = 0;
    if (shoulderElapsed < inhaleDuration) {
      shoulderProgress = 0.5 * (1 - Math.cos(Math.PI * (shoulderElapsed / inhaleDuration)));
    } else {
      const norm = (shoulderElapsed - inhaleDuration) / exhaleDuration;
      shoulderProgress = 0.5 * (1 + Math.cos(Math.PI * Math.min(1, Math.max(0, norm))));
    }

    // Delayed tie and lapel secondary inertia (~220ms lag)
    const tieElapsed = Math.max(0, cycleElapsed - this.config.tieInertiaLag);
    let tieProgress = 0;
    if (tieElapsed < inhaleDuration) {
      tieProgress = 0.5 * (1 - Math.cos(Math.PI * (tieElapsed / inhaleDuration)));
    } else {
      const norm = (tieElapsed - inhaleDuration) / exhaleDuration;
      tieProgress = 0.5 * (1 + Math.cos(Math.PI * Math.min(1, Math.max(0, norm))));
    }

    const chestLift = progress * this.config.chestLiftPx;
    const chestScaleX = 1.0 + progress * (this.config.chestScaleX - 1.0);
    const chestScaleY = 1.0 + progress * (this.config.chestScaleY - 1.0);
    const shoulderLift = shoulderProgress * this.config.chestLiftPx * this.config.shoulderCoupling;
    const headLift = shoulderProgress * this.config.chestLiftPx * this.config.headCoupling;
    const tieLagLift = tieProgress * this.config.chestLiftPx * 0.70;

    return {
      chestLift,
      chestScaleX,
      chestScaleY,
      shoulderLift,
      headLift,
      tieLagLift,
      phase,
      progress
    };
  }
}
