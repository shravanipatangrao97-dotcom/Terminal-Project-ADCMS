/**
 * Music Library Management Module
 * Terminal Music Player
 * 
 * Responsible for scanning local folders, validating audio file extensions,
 * managing the audio collection, and displaying the music library.
 */

const fs = require('fs');
const path = require('path');

// Default directory where audio files are placed
const MUSIC_DIR = path.join(__dirname, '..', 'music');

// Supported audio formats (case-insensitive)
const SUPPORTED_EXTENSIONS = [
  '.mp3',
  '.wav',
  '.ogg',
  '.flac',
  '.m4a',
  '.aac',
  '.wma',
];

/**
 * Get the path to the music directory.
 * @returns {string} Absolute path to music directory.
 */
function getMusicDirectory() {
  return MUSIC_DIR;
}

/**
 * Get list of supported audio file extensions.
 * @returns {string[]} List of supported extensions.
 */
function getSupportedFormats() {
  return [...SUPPORTED_EXTENSIONS];
}

/**
 * Scan the specified music directory and return an array of detected audio files.
 * Ignores directories, unsupported files, and handles missing folders gracefully.
 * 
 * @param {string} [dirPath=MUSIC_DIR] - Path of directory to scan.
 * @returns {Array<{ name: string, path: string, extension: string }>} Array of song objects.
 */
function scanMusicDirectory(dirPath = MUSIC_DIR) {
  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    console.error(`\nNotice: Music directory does not exist at "${dirPath}".`);
    return [];
  }

  try {
    // Read directory entries including file type information
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const songs = [];

    for (const entry of entries) {
      // Ensure we only process files (ignore subdirectories, sockets, etc.)
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();

        // Check if the file extension is supported (case-insensitive)
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          songs.push({
            name: entry.name,
            path: path.resolve(dirPath, entry.name),
            extension: ext,
          });
        }
      }
    }

    return songs;
  } catch (error) {
    // Report genuine filesystem errors without crashing the application
    console.error(`\nError: Failed to read directory at "${dirPath}": ${error.message}`);
    return [];
  }
}

/**
 * Display the music library in a clean, human-readable terminal format.
 * 
 * @param {Array<{ name: string, path: string, extension: string }>|null} [songs=null] - Optional pre-scanned songs list.
 * @param {string} [dirPath=MUSIC_DIR] - Directory path to scan if songs array is not provided.
 * @returns {Array<{ name: string, path: string, extension: string }>} The list of songs found.
 */
function displayMusicLibrary(songs = null, dirPath = MUSIC_DIR) {
  const songList = songs !== null ? songs : scanMusicDirectory(dirPath);

  if (songList.length === 0) {
    console.log('\nNo songs found in your music folder.');
    console.log('Please add some audio files to continue.');
    return songList;
  }

  console.log('\n========== YOUR MUSIC LIBRARY ==========\n');
  songList.forEach((song, index) => {
    console.log(`${index + 1}. ${song.name}`);
  });
  console.log(`\nTotal Songs: ${songList.length}`);

  return songList;
}

/**
 * Convenience helper to list all songs currently in library.
 * @returns {Array<{ name: string, path: string, extension: string }>}
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
  displayMusicLibrary,
  listSongs,
};
