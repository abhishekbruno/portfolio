/**
 * CharacterMotionConfig
 *
 * Centralized biomechanical and kinematic parameters for the Living Throne Character.
 * Governs resting respiration, irregular blinking, micro-saccade ocular shifts,
 * hair wind dynamics, and resting posture settling.
 */
export const CharacterMotionConfig = {
  // ─── 1. RESTING RESPIRATION (Thoracic Biomechanics) ───
  respiration: {
    targetBpm: 14,               // Normal adult resting respiration (12–18 BPM)
    cycleDuration: 4.3,          // Mean cycle duration in seconds (~4.3s = 14 BPM)
    inhalationFraction: 0.38,    // Inhalation is shorter (~38% of cycle) than exhalation (~62%)
    chestLiftPx: 2.2,            // Subtly elevates sternum by ~2.2px at full tidal volume
    chestScaleX: 1.016,          // Lateral ribcage expansion (1.6% width increase)
    chestScaleY: 1.010,          // Anteroposterior chest volume increase
    shoulderCoupling: 0.32,      // Shoulders follow ~32% of chest movement
    shoulderPhaseLag: 0.15,      // Clavicular movement lags behind sternum by ~150ms
    tieInertiaLag: 0.22,         // Necktie and lapel response lags behind chest expansion
    jitterRange: 0.35            // Subtle random variation between breath durations (seconds)
  },

  // ─── 2. FACIAL & OCULAR ANIMATION (Blinks & Saccades) ───
  eyes: {
    // Eyelid Blinking
    minBlinkInterval: 3.2,       // Minimum time between blinks (seconds)
    maxBlinkInterval: 7.0,       // Maximum time between blinks (seconds)
    doubleBlinkProbability: 0.15,// 15% chance of an authentic double blink
    doubleBlinkDelay: 0.18,      // Interval between twin blinks (seconds)
    blinkDuration: 0.16,         // Total blink transit duration (160ms)
    closureFraction: 0.40,       // Closing is fast (~40% of duration = 64ms)
    holdFraction: 0.18,          // Brief complete closure (~18% of duration = 29ms)

    // Micro-Saccade Gaze Shifts
    minSaccadeInterval: 4.5,     // Fixation duration before micro-shift (seconds)
    maxSaccadeInterval: 8.5,
    maxGazeOffsetX: 1.6,         // Maximum physiological horizontal eye movement (px)
    maxGazeOffsetY: 0.9,         // Maximum physiological vertical eye movement (px)
    saccadeDuration: 0.12        // Rapid saccadic transition time (120ms)
  },

  // ─── 3. SECONDARY HAIR WIND SIMULATION ───
  hair: {
    draftFrequency: 0.65,        // Faint indoor air current frequency (Hz)
    maxDisplacementDeg: 0.85,    // Angular displacement of loose hair tips (degrees)
    maxDisplacementPx: 1.2,      // Translation displacement of fringe strands (px)
    springStiffness: 22.0,       // Damped harmonic restitution
    springDamping: 4.8,          // Smooth energy dissipation
    asymmetryFactor: 0.25        // Left vs Right hair group phase difference
  },

  // ─── 4. RESTING POSTURE & HANDS ON ARMRESTS ───
  posture: {
    settleInterval: 14.5,        // Interval between microscopic posture adjustments (seconds)
    settleDuration: 1.4,         // Duration of posture settle
    fingerFlexionPx: 0.7,        // Minimal resting-finger flexion on the armrests
    legMicroAdjustPx: 0.6        // Subtly settles the crossed-leg trouser folds
  },

  // ─── 5. CINEMATIC PARALLAX & CAMERA INTEGRATION ───
  parallax: {
    maxShiftX: 3.0,              // Subtle pointer tracking range on desktop (px)
    maxShiftY: 2.0,              // Subtle vertical tilt (px)
    smoothing: 0.08              // Exponential ease for cursor tracking
  }
};
