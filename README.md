# Terminal Music Player (ADCMS)

A lightweight, modular, terminal-based music player application built with Node.js.

## 🎵 Project Overview

The Terminal Music Player allows users to browse local music collections and control audio playback directly from their command-line interface. Built with native Node.js capabilities (`fs`, `path`, `child_process`, and `readline`), it provides an efficient and dependency-free audio experience in the terminal.

---

## 🚀 Planned Features

- **Local Song Listing**: Automatically detects and lists audio files in the `music/` directory.
- **Audio Playback**: Start playing chosen audio tracks directly in the terminal.
- **Playback Controls**: Pause, resume, and stop playback with responsive terminal commands.
- **Track Navigation**: Easily navigate to next and previous tracks in your playlist.
- **Process Management**: Clean child process lifecycle handling for external audio engines.
- **Modular Architecture**: Separate modules for CLI presentation, library management, player engine, and utility functions.

---

## 📁 Project Structure

```text
Terminal-Project-ADCMS/
├── music/               # Local folder to store audio files (.mp3, .wav, etc.)
├── src/
│   ├── index.js         # Main application entry point
│   ├── cli.js           # Interactive terminal interface & menu renderer
│   ├── library.js       # File system scanner & music library manager
│   ├── player.js        # Audio playback & child process management controller
│   └── utils.js         # Helper functions for string/time formatting & console helpers
├── .gitignore           # Excludes node_modules and local audio tracks from Git
├── package.json         # Node.js project manifest & npm scripts
└── README.md            # Project overview & documentation
```

---

## 🛠️ Prerequisites

- **Node.js**: v16.x or higher (tested with Node.js v24+)
- **npm**: v8.x or higher

---

## 💻 Getting Started

### 1. Place Songs in the Music Folder
Place any supported audio files (e.g. `.mp3`, `.wav`, `.ogg`, `.flac`, `.m4a`) inside the `music/` directory:
```bash
# Example
cp /path/to/song.mp3 music/
```

### 2. Run the Application
Start the application using npm:
```bash
npm start
```
or run Node directly:
```bash
node src/index.js
```

---

## 🧩 Module Breakdown

- **`src/index.js`**: Bootstraps the application and initializes the CLI.
- **`src/cli.js`**: Handles user prompts, menus, keyboard input, and terminal screens.
- **`src/library.js`**: Scans the `music/` folder using Node's `fs` and `path` modules and returns cataloged tracks.
- **`src/player.js`**: Manages audio playback state and spawns child processes for playback control.
- **`src/utils.js`**: Shared helpers like duration formatting (`mm:ss`), title cleaning, and terminal utilities.

---

## 📄 License

ISC License.
