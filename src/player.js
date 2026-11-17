/**
 * Audio Player Controller Module
 * Terminal Music Player
 * 
 * Handles process management and audio playback using Node.js child_process and macOS afplay.
 */

const { spawn } = require('child_process');
const fs = require('fs');

// Playback state definition
const PlayerState = {
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED',
};

// Internal player state tracking
let currentProcess = null;
let currentSong = null;
let currentState = PlayerState.IDLE;
let currentSessionId = 0;
let isManuallyStopped = false;
let completionCallback = null;

/**
 * Get current player state and song info.
 * @returns {object} Status object.
 */
function getStatus() {
  return {
    state: currentState,
    currentSong: currentSong,
    isPlaying: currentState === PlayerState.PLAYING,
    isPaused: currentState === PlayerState.PAUSED,
  };
}

/**
 * Get the currently playing or paused song.
 * @returns {object|null} Current song object.
 */
function getCurrentSong() {
  return currentSong;
}

/**
 * Get the current playback state string.
 * @returns {string} PlayerState string.
 */
function getCurrentState() {
  return currentState;
}

/**
 * Safely stop the active playback process without printing messages.
 * Used internally before starting a new song or during application shutdown.
 */
function stopSilently() {
  if (currentProcess) {
    isManuallyStopped = true;
    try {
      currentProcess.kill('SIGTERM');
      // If paused, unfreeze with SIGCONT so SIGTERM terminates it cleanly
      if (currentState === PlayerState.PAUSED) {
        currentProcess.kill('SIGCONT');
      }
    } catch (_) {
      // Ignore if process already exited
    }
    currentProcess = null;
    currentSong = null;
    currentState = PlayerState.STOPPED;
  }
}

/**
 * Play a selected audio file using macOS afplay.
 * 
 * @param {object} song - Song object with name and path properties.
 * @param {function} [onComplete] - Optional callback invoked when song completes naturally.
 * @returns {boolean} True if playback started successfully, false otherwise.
 */
function play(song, onComplete = null) {
  if (!song || !song.path) {
    console.log('\nError: Invalid song provided for playback.');
    return false;
  }

  // Verify that the file exists on the filesystem
  if (!fs.existsSync(song.path)) {
    console.log(`\nError: Audio file not found at "${song.path}".`);
    return false;
  }

  // If another song is already playing or paused, stop it cleanly
  if (currentProcess) {
    stopSilently();
  }

  // Increment session counter to invalidate handlers from previous processes
  currentSessionId++;
  const thisSessionId = currentSessionId;
  isManuallyStopped = false;
  completionCallback = onComplete;

  try {
    // Spawn afplay with arguments array to safely handle spaces and special characters
    const child = spawn('afplay', [song.path], {
      stdio: 'ignore',
    });

    currentProcess = child;
    currentSong = song;
    currentState = PlayerState.PLAYING;

    console.log(`\nNow Playing: ${song.name}`);

    // Handle spawn or runtime process errors
    child.on('error', (err) => {
      if (thisSessionId !== currentSessionId) return;

      console.log(`\nPlayback Error: Unable to play audio (${err.message}).`);
      currentProcess = null;
      currentSong = null;
      currentState = PlayerState.IDLE;
    });

    // Handle process termination/close
    child.on('close', (code, signal) => {
      // Ignore events belonging to previous playback sessions
      if (thisSessionId !== currentSessionId) {
        return;
      }

      // Check whether process was terminated intentionally
      const wasManual = isManuallyStopped || signal === 'SIGTERM';

      currentProcess = null;

      if (!wasManual && code === 0) {
        // Natural completion
        currentState = PlayerState.IDLE;
        console.log(`\n[Playback Completed: ${song.name}]`);
        if (typeof completionCallback === 'function') {
          completionCallback(song);
        }
      } else {
        // Stopped or terminated
        currentState = PlayerState.STOPPED;
      }

      currentSong = null;
    });

    return true;
  } catch (error) {
    console.log(`\nFailed to start playback: ${error.message}`);
    currentProcess = null;
    currentSong = null;
    currentState = PlayerState.IDLE;
    return false;
  }
}

/**
 * Pause the currently playing song using SIGSTOP.
 * @returns {boolean} True if paused successfully.
 */
function pause() {
  if (!currentProcess || currentState === PlayerState.IDLE || currentState === PlayerState.STOPPED) {
    console.log('\nNo song is currently playing.');
    return false;
  }

  if (currentState === PlayerState.PAUSED) {
    console.log('\nPlayback is already paused.');
    return false;
  }

  try {
    currentProcess.kill('SIGSTOP');
    currentState = PlayerState.PAUSED;
    console.log('\nPlayback paused.');
    return true;
  } catch (error) {
    console.log(`\nError pausing playback: ${error.message}`);
    return false;
  }
}

/**
 * Resume paused playback using SIGCONT.
 * @returns {boolean} True if resumed successfully.
 */
function resume() {
  if (!currentProcess || currentState !== PlayerState.PAUSED) {
    if (currentState === PlayerState.PLAYING) {
      console.log('\nPlayback is already active.');
    } else {
      console.log('\nNo paused song is available to resume.');
    }
    return false;
  }

  try {
    currentProcess.kill('SIGCONT');
    currentState = PlayerState.PLAYING;
    console.log('\nPlayback resumed.');
    return true;
  } catch (error) {
    console.log(`\nError resuming playback: ${error.message}`);
    return false;
  }
}

/**
 * Toggle pause and resume depending on the current playback state.
 * @returns {boolean}
 */
function togglePauseResume() {
  if (!currentProcess || currentState === PlayerState.IDLE || currentState === PlayerState.STOPPED) {
    console.log('\nNo song is currently playing.');
    return false;
  }

  if (currentState === PlayerState.PLAYING) {
    return pause();
  } else if (currentState === PlayerState.PAUSED) {
    return resume();
  }

  console.log('\nNo song is currently playing.');
  return false;
}

/**
 * Stop active playback using SIGTERM and update state.
 * @returns {boolean} True if stopped successfully.
 */
function stop() {
  if (!currentProcess || currentState === PlayerState.IDLE || currentState === PlayerState.STOPPED) {
    console.log('\nNo song is currently playing.');
    return false;
  }

  stopSilently();
  currentState = PlayerState.STOPPED;
  console.log('\nPlayback stopped.');
  return true;
}

/**
 * Skip to the next song (Placeholder for Day 5).
 */
function next() {
  console.log('\nNext song functionality will be implemented soon!');
}

/**
 * Go back to the previous song (Placeholder for Day 5).
 */
function previous() {
  console.log('\nPrevious song functionality will be implemented soon!');
}

// Clean up any remaining child processes when Node process exits
process.on('exit', () => {
  stopSilently();
});

module.exports = {
  PlayerState,
  play,
  pause,
  resume,
  togglePauseResume,
  stop,
  stopSilently,
  next,
  previous,
  getStatus,
  getCurrentSong,
  getCurrentState,
};
