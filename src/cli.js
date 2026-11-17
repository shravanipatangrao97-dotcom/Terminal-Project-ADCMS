/**
 * Command-Line Interface (CLI) Module
 * Terminal Music Player
 * 
 * Handles terminal menus, user prompts, input validation, and continuous loop interaction.
 */

const readline = require('readline');
const library = require('./library');

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
 * Process the user's menu choice, validate input, and display the appropriate response.
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
      console.log('\nSong playback functionality will be implemented soon!');
      promptUser(rl);
      break;

    case '3':
      console.log('\nPause and resume functionality will be implemented soon!');
      promptUser(rl);
      break;

    case '4':
      console.log('\nStop playback functionality will be implemented soon!');
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
  processChoice,
  promptUser,
  startCli,
};
