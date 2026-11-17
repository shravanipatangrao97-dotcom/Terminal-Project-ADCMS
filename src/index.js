/**
 * Application Entry Point
 * Terminal Music Player
 */

const { startCli } = require('./cli');

function main() {
  startCli();
}

if (require.main === module) {
  main();
}

module.exports = { main };
