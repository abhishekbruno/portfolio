/**
 * CharacterMotionConfig
 *
 * Centralized biomechanical and kinematic parameters for the Living Throne Character.
 * Governs perceptible resting respiration, natural contemplative head movement,
 * spring-damped hair breeze dynamics, and armrest-grounded posture.
 */
export const CharacterMotionConfig = {
  // ─── 1. RESTING RESPIRATION (Perceptible, Natural Thoracic Motion) ───
  respiration: {
    targetBpm: 14,               // Natural adult resting respiration (12–16 BPM)
    cycleDuration: 4.3,          // Mean cycle duration (~4.3s = 14 BPM)
    inhalationFraction: 0.38,    // Inhalation is slightly shorter (~38%) than exhalation (~62%)
    chestLiftPx: 3.2,            // Clearly visible vertical sternum lift (~3.2px)
    chestScaleX: 1.020,          // 2.0% lateral ribcage & lapel expansion
    chestScaleY: 1.012,          // 1.2% vertical depth expansion
    shoulderCoupling: 0.38,      // Shoulders & neck follow ~38% of chest lift (~1.2px)
    shoulderPhaseLag: 0.16,      // Natural physiological phase lag (160ms)
    headCoupling: 0.25,          // Head elevates subtly with thoracic lift (~0.8px)
    tieInertiaLag: 0.22,         // Secondary tie inertia
    jitterRange: 0.30            // Natural breath-to-breath variation
  },

  // ─── 2. HEAD & NECK KINEMATICS (Calm Seated Person) ───
  head: {
    maxYawDeg: 1.6,              // Subtle horizontal contemplative rotation (1.6°)
    maxPitchDeg: 0.9,            // Subtle forward/backward nod/tilt (0.9°)
    minPoseInterval: 5.5,        // Resting pose duration (seconds)
    maxPoseInterval: 10.5,
    transitionDuration: 2.8,     // Smooth transition between contemplative micro-poses
    springDamping: 0.85
  },

  // ─── 3. SECONDARY HAIR WIND SIMULATION (Visible Ambient Indoor Draft) ───
  hair: {
    draftFrequency: 0.75,        // Faint indoor air current frequency (Hz)
    minDraftInterval: 4.5,       // Draft occurs every 4.5 to 8.5 seconds
    maxDraftInterval: 8.5,
    draftDuration: 2.4,          // Duration of gentle air impulse
    maxAngleDeg: 2.6,            // Clearly visible angular deflection of loose hair tips (~2.6°)
    maxSkewDeg: 1.2,             // Micro-skew for soft compliant strand deformation
    springStiffness: 18.0,       // Damped harmonic restitution
    springDamping: 5.4           // Damping so hair settles smoothly without jitter
  },

  // ─── 4. CINEMATIC MOUSE PARALLAX ───
  parallax: {
    maxShiftX: 1.8,              // Subtle unified pointer tracking (px)
    maxShiftY: 1.2,
    smoothing: 0.05
  }
};
