/**
 * Audio Player Controller Module
 * Handles process management and playback controls using Node.js child_process.
 * 
 * NOTE: Playback functionality will be implemented in future phases.
 */

const { spawn } = require('child_process');

// Playback state definition
const PlayerState = {
  STOPPED: 'STOPPED',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
};

// Current playback status tracking
let currentProcess = null;
let currentSong = null;
let currentState = PlayerState.STOPPED;

/**
 * Play a selected audio file.
 * (Placeholder - to be implemented in playback phase)
 * @param {string} songPath - Path to the audio file.
 */
function play(songPath) {
  // TODO: Spawn audio player process (e.g., afplay on macOS, mpg123/ffplay on Linux/Windows)
  console.log(`[Placeholder] Request to play: ${songPath}`);
}

/**
 * Pause the currently playing song.
 * (Placeholder - to be implemented in playback phase)
 */
function pause() {
  // TODO: Send pause signal (e.g. SIGSTOP or player command)
  console.log('[Placeholder] Request to pause playback.');
}

/**
 * Resume paused playback.
 * (Placeholder - to be implemented in playback phase)
 */
function resume() {
  // TODO: Send resume signal (e.g. SIGCONT or player command)
  console.log('[Placeholder] Request to resume playback.');
}

/**
 * Stop audio playback and terminate player process.
 * (Placeholder - to be implemented in playback phase)
 */
function stop() {
  // TODO: Kill child process cleanly
  console.log('[Placeholder] Request to stop playback.');
}

/**
 * Skip to the next song.
 * (Placeholder - to be implemented in playback phase)
 */
function next() {
  // TODO: Navigate to next track
  console.log('[Placeholder] Request next track.');
}

/**
 * Go back to the previous song.
 * (Placeholder - to be implemented in playback phase)
 */
function previous() {
  // TODO: Navigate to previous track
  console.log('[Placeholder] Request previous track.');
}

/**
 * Get current player state and song info.
 * @returns {object} Status object.
 */
function getStatus() {
  return {
    state: currentState,
    currentSong: currentSong,
  };
}

module.exports = {
  PlayerState,
  play,
  pause,
  resume,
  stop,
  next,
  previous,
  getStatus,
};
