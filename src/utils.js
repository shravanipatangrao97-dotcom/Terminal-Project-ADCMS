/**
 * Utility functions for Terminal Music Player
 * Contains helper functions for formatting strings, time, and terminal helpers.
 */

/**
 * Format duration from seconds into mm:ss format.
 * @param {number} seconds - Duration in seconds.
 * @returns {string} Formatted duration (e.g., "03:45").
 */
function formatDuration(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Clean up and format song filenames for readable display.
 * @param {string} filename - The raw audio file name.
 * @returns {string} Cleaned song title without extension.
 */
function formatSongTitle(filename) {
  if (!filename) return '';
  return filename.replace(/\.[^/.]+$/, '');
}

/**
 * Clear the terminal screen.
 */
function clearScreen() {
  process.stdout.write('\x1Bc');
}

module.exports = {
  formatDuration,
  formatSongTitle,
  clearScreen,
};
