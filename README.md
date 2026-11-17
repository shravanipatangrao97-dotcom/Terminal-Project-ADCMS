# Terminal Music Player (ADCMS)

A modular, dependency-free terminal music player built with Node.js, utilizing native command-line interfaces and operating system audio processes.

---

## 🎵 Project Overview

The Terminal Music Player allows users to catalog local audio files and control playback directly from their command-line terminal. It leverages native Node.js core modules (`readline`, `fs`, `path`, and `child_process`) to provide an interactive, lightweight audio playback experience without external third-party dependencies.

---

## 🚀 Features Completed So Far

- **Interactive CLI (Day 1)**: Asynchronous menu loop powered by Node.js `readline`, robust input validation, and graceful `SIGINT` (Ctrl+C) handling.
- **Local Music Library (Day 2)**: File system scanning using `fs` and `path` to detect supported audio formats in the `music/` directory, ignoring non-audio files and subdirectories.
- **Real Audio Playback (Day 3)**: Spawns native macOS audio player (`afplay`) via `child_process.spawn()` with arguments array for shell-safe execution, file existence checks, and process state tracking (`IDLE`, `PLAYING`, `PAUSED`, `STOPPED`).
- **Playback Controls (Day 4)**: Real-time pause (`SIGSTOP`) and resume (`SIGCONT`) toggle, playback termination (`SIGTERM`), prevention of simultaneous audio processes, and automated cleanup on application exit.

---

## 🛠️ Prerequisites

- **Operating System**: macOS (requires built-in `/usr/bin/afplay`)
- **Node.js**: v16.x or higher (tested with Node.js v24+)
- **npm**: v8.x or higher

---

## 💻 Getting Started

### 1. Installation & Setup
Clone the repository and enter the directory:
```bash
git clone https://github.com/shravanipatangrao97-dotcom/Terminal-Project-ADCMS.git
cd Terminal-Project-ADCMS
```
No external npm packages are needed as the project relies exclusively on Node.js core modules.

### 2. Add Audio Files
Place supported audio tracks into the `music/` folder:
```bash
cp ~/Music/track.mp3 music/
cp ~/Music/sample.wav music/
```

### 3. Run the Application
Start the application using npm:
```bash
npm start
```
or launch Node directly:
```bash
node src/index.js
```

---

## 🎮 How to Use

When the application starts, you are presented with the main control menu:

```text
==========================================
       🎵 TERMINAL MUSIC PLAYER 🎵
==========================================

Welcome to your Terminal Music Player!

Choose an operation:

[1] List Songs
[2] Play Song
[3] Pause / Resume
[4] Stop Playback
[5] Next Song
[6] Previous Song
[0] Exit

------------------------------------------
Enter your choice:
```

### 1. List Songs (Option 1)
Select `1` to scan the `music/` directory and display all cataloged tracks with their serial numbers:
```text
========== YOUR MUSIC LIBRARY ==========

1. Song One.mp3
2. Song Two.wav

Total Songs: 2
```

### 2. Play a Song (Option 2)
Select `2` to view the song selection menu:
```text
========== SELECT A SONG ==========

1. Song One.mp3
2. Song Two.wav

Enter song number: 1

Now Playing: Song One.mp3
```
If a song is already playing, starting a new song automatically terminates previous playback cleanly before starting the new track.

### 3. Pause / Resume Playback (Option 3)
Select `3` while a song is playing to pause:
```text
Playback paused.
```
Select `3` again while paused to resume:
```text
Playback resumed.
```
If no song is currently active, a helpful message is displayed (`No song is currently playing.`).

### 4. Stop Playback (Option 4)
Select `4` to stop the active audio process:
```text
Playback stopped.
```

### 5. Exit (Option 0 or Ctrl+C)
Select `0` or press `Ctrl+C`. Any active or paused playback process is safely terminated, resources are released, and the terminal exits cleanly:
```text
Thank you for using Terminal Music Player. Goodbye!
```

---

## 🎧 Supported Audio Extensions & Playback Notes

The music library scanner detects files matching the following extensions (case-insensitively):
- `.mp3`
- `.wav`
- `.ogg`
- `.flac`
- `.m4a`
- `.aac`
- `.wma`

### macOS `afplay` Compatibility Note
Playback is executed using macOS's built-in `afplay` binary. 
- **Natively playable formats**: `.mp3`, `.wav`, `.m4a`, `.aac`, and standard CoreAudio formats (such as `.aiff`, `.caf`). Newer macOS versions also support `.flac`.
- **Codec limitations**: Formats such as `.ogg` and `.wma` are cataloged by the file scanner, but macOS `afplay` cannot decode them without third-party system audio components. For best playback reliability, use `.mp3`, `.wav`, `.m4a`, or `.aac`.

---

## 📁 Project Structure

```text
Terminal-Project-ADCMS/
├── music/               # Directory for local audio files (audio excluded from Git)
│   └── .gitkeep
├── src/
│   ├── index.js         # Main application entry point
│   ├── cli.js           # Interactive terminal interface & menu dispatcher
│   ├── library.js       # File system scanner & music collection manager
│   ├── player.js        # Audio playback & child process management controller
│   └── utils.js         # Shared helpers (duration formatting, title cleaning)
├── .gitignore           # Excludes node_modules and local audio tracks
├── package.json         # Node.js project manifest & npm scripts
└── README.md            # Comprehensive project documentation
```

---

## 🧩 Module Breakdown

- **`src/index.js`**: Application entry point. Bootstraps the environment and initializes `startCli()`.
- **`src/cli.js`**: Manages readline input/output, interactive prompts, input validation, and user action routing.
- **`src/library.js`**: Scans the `music/` folder using `fs.readdirSync` with `{ withFileTypes: true }`, filters valid audio extensions, and formats the library display.
- **`src/player.js`**: Controls audio playback via `child_process.spawn('afplay')`. Handles POSIX signals (`SIGSTOP`, `SIGCONT`, `SIGTERM`), session ID tracking, natural track completion, and process lifecycle cleanup.
- **`src/utils.js`**: Common utilities including duration formatting (`mm:ss`) and title formatting.

---

## 📄 License

ISC License.
