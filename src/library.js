/**
 * Music Library Management Module
 * Responsible for scanning local folders and listing available audio files using Node.js fs and path.
 */

const fs = require('fs');
const path = require('path');

// Default directory where audio files are placed
const MUSIC_DIR = path.join(__dirname, '..', 'music');

// Supported audio formats
const SUPPORTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac'];

/**
 * Get the path to the music folder.
 * @returns {string} Absolute path to music directory.
 */
function getMusicDirectory() {
  return MUSIC_DIR;
}

/**
 * Get list of supported file extensions.
 * @returns {string[]} List of supported extensions.
 */
function getSupportedFormats() {
  return SUPPORTED_EXTENSIONS;
}

/**
 * Scan the music directory and return a list of audio files.
 * (Placeholder - to be implemented with full file reading)
 * @param {string} [dirPath=MUSIC_DIR] - Path to scan.
 * @returns {Array<{ name: string, path: string }>} List of detected song objects.
 */
function scanMusicDirectory(dirPath = MUSIC_DIR) {
  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .map((file) => ({
        name: file,
        path: path.join(dirPath, file),
      }));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Retrieve all songs currently in library.
 * @returns {Array<{ name: string, path: string }>}
 */
function listSongs() {
  return scanMusicDirectory();
}

module.exports = {
  MUSIC_DIR,
  SUPPORTED_EXTENSIONS,
  getMusicDirectory,
  getSupportedFormats,
  scanMusicDirectory,
  listSongs,
};
