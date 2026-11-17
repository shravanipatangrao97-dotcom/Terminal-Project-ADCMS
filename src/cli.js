/**
 * Command-Line Interface (CLI) Module
 * Terminal Music Player
 * 
 * Handles terminal menus, user prompts, input validation, and interactive playback operations.
 */

const readline = require('readline');
const library = require('./library');
const player = require('./player');

/**
 * Display the main application banner and menu options.
 */
function displayMenu() {
  console.log('\n==========================================');
  console.log('       🎵 TERMINAL MUSIC PLAYER 🎵');
  console.log('==========================================\n');
  console.log('Welcome to your Terminal Music Player!\n');
  console.log('Choose an operation:\n');
  console.log('[1] List Songs');
  console.log('[2] Play Song');
  console.log('[3] Pause / Resume');
  console.log('[4] Stop Playback');
  console.log('[5] Next Song');
  console.log('[6] Previous Song');
  console.log('[0] Exit\n');
  console.log('------------------------------------------');
}

/**
 * Handle song selection workflow for Option 2.
 * Displays available songs, prompts for a selection, and triggers playback.
 * 
 * @param {readline.Interface} rl - The active readline interface.
 */
function handlePlaySong(rl) {
  const songs = library.scanMusicDirectory();

  if (songs.length === 0) {
    console.log('\nNo songs found in your music folder.');
    console.log('Please add some audio files to continue.');
    promptUser(rl);
    return;
  }

  console.log('\n========== SELECT A SONG ==========\n');
  songs.forEach((song, index) => {
    console.log(`${index + 1}. ${song.name}`);
  });

  rl.question('\nEnter song number: ', (input) => {
    // Check for empty or whitespace-only input
    if (!input || input.trim() === '') {
      console.log('\nPlease enter a choice.');
      promptUser(rl);
      return;
    }

    const trimmed = input.trim();
    const songIndex = parseInt(trimmed, 10);

    // Validate that input contains only numeric digits
    if (isNaN(songIndex) || !/^\d+$/.test(trimmed)) {
      console.log('\nInvalid input! Please enter a valid number.');
      promptUser(rl);
      return;
    }

    // Validate bounds
    if (songIndex < 1 || songIndex > songs.length) {
      console.log(`\nInvalid song number! Please enter a number between 1 and ${songs.length}.`);
      promptUser(rl);
      return;
    }

    const selectedSong = songs[songIndex - 1];
    player.play(selectedSong);
    promptUser(rl);
  });
}

/**
 * Process the user's menu choice, validate input, and dispatch to appropriate handlers.
 * @param {string} rawInput - The raw string entered by the user.
 * @param {readline.Interface} rl - The active readline interface.
 */
function processChoice(rawInput, rl) {
  // Check if input is empty or contains only spaces
  if (!rawInput || rawInput.trim() === '') {
    console.log('\nPlease enter a choice.');
    promptUser(rl);
    return;
  }

  const choice = rawInput.trim();

  switch (choice) {
    case '1':
      library.displayMusicLibrary();
      promptUser(rl);
      break;

    case '2':
      handlePlaySong(rl);
      break;

    case '3':
      player.togglePauseResume();
      promptUser(rl);
      break;

    case '4':
      player.stop();
      promptUser(rl);
      break;

    case '5':
      console.log('\nNext song functionality will be implemented soon!');
      promptUser(rl);
      break;

    case '6':
      console.log('\nPrevious song functionality will be implemented soon!');
      promptUser(rl);
      break;

    case '0':
      player.stopSilently();
      console.log('\nThank you for using Terminal Music Player. Goodbye!\n');
      rl.close();
      break;

    default:
      console.log('\nInvalid choice! Please enter a number between 0 and 6.');
      promptUser(rl);
      break;
  }
}

/**
 * Display the menu and prompt the user for input.
 * @param {readline.Interface} rl - The active readline interface.
 */
function promptUser(rl) {
  displayMenu();
  rl.question('Enter your choice: ', (input) => {
    processChoice(input, rl);
  });
}

/**
 * Initialize and start the CLI session.
 */
function startCli() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Handle Ctrl+C (SIGINT) gracefully
  const handleExit = () => {
    player.stopSilently();
    console.log('\n\nThank you for using Terminal Music Player. Goodbye!\n');
    rl.close();
    process.exit(0);
  };

  rl.on('SIGINT', handleExit);
  process.on('SIGINT', handleExit);

  promptUser(rl);
}

module.exports = {
  displayMenu,
  handlePlaySong,
  processChoice,
  promptUser,
  startCli,
};
