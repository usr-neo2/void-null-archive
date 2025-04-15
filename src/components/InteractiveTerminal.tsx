import React, { useState, useEffect, useRef, useCallback } from "react";
import { Terminal } from "@/components/Terminal";
import { asciiArt } from "@/utils/terminalAsciiArt";
import { terminalFortunes } from "@/utils/terminalFortunes";
import { 
  snakeGame, 
  mathGame, 
  ticTacToe, 
  rabbitHoleGame, 
  handleGameKeyInput 
} from "@/utils/terminalGames";
import { cn } from "@/lib/utils";

// Add a helper function for formatting help text
const formatHelpText = () => {
  return `
Available commands:

System:
  help               - Display this help message
  clear              - Clear the terminal
  date               - Display current date and time
  whoami             - Display user information
  ls                 - List files in the current directory
  cat [filename]     - Display file contents
  echo [text]        - Display text

Fun:
  fortune [category] - Get a fortune (categories: developer, finance, hr, general)
  ascii [name]       - Display ASCII art (try: rabbit, ghost, matrix, rocket, etc.)
  matrix             - Matrix animation
  sl                 - Steam locomotive animation
  rabbit             - Red pill / blue pill game

Games:
  snake              - Play Snake game (use WASD keys to move)
  math               - Math practice game
  game               - Number guessing game
  tictactoe          - Play tic-tac-toe

Use 'quit' to exit games and 'clear' to clear the screen.
`;
};

export function InteractiveTerminal({
  className = "",
  welcomeMessage = "Welcome to the terminal! Type 'help' for available commands.",
  initialCommands = [],
  glowEffect = true
}: {
  className?: string;
  welcomeMessage?: string;
  initialCommands?: { input: string; output: string | React.ReactNode }[];
  glowEffect?: boolean;
}) {
  const [commands, setCommands] = useState<
    { input: string; output: string | React.ReactNode }[]
  >(initialCommands);
  const [currentInput, setCurrentInput] = useState("");
  const [activeGame, setActiveGame] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suppressEcho, setSuppressEcho] = useState(false);

  // Function to scroll terminal to bottom
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Focus the input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    scrollToBottom();
  }, [scrollToBottom]);

  // Handle global key presses for game controls
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (activeGame && typeof activeGame.move === 'function') {
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd', 'q'].includes(key)) {
          event.preventDefault(); // Prevent default action
          const { suppressEcho: shouldSuppressEcho } = handleGameKeyInput(key, activeGame);
          setSuppressEcho(shouldSuppressEcho);
          
          if (!shouldSuppressEcho) {
            // Only echo if the game doesn't suppress it
            setCurrentInput(key);
          }
          
          const gameOutput = activeGame.move(key);
          if (gameOutput) {
            appendCommand({ input: key, output: gameOutput });
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [activeGame]);

  const appendCommand = (command: { input: string; output: string | React.ReactNode }) => {
    setCommands((prevCommands) => [...prevCommands, command]);
    setCurrentInput("");
    scrollToBottom();
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      
      if (suppressEcho) {
        setSuppressEcho(false);
        return;
      }

      const input = currentInput;
      setCurrentInput("");
      setLoading(true);

      try {
        const output = await handleCommand(input);

        if (output !== null) {
          appendCommand({ input, output });
        }
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    }
  };

  const handleCommand = (input: string) => {
    return new Promise<string | null>((resolve) => {
      // Normalize input
      const normalizedInput = input.trim().toLowerCase();
      const args = normalizedInput.split(/\s+/);
      const command = args[0];

      // If a game is active, handle game-specific commands
      if (activeGame) {
        if (command === "quit") {
          const quitMessage = activeGame.quit();
          setActiveGame(null);
          resolve(quitMessage);
          return;
        } else if (typeof activeGame.makeGuess === 'function') {
          const guess = parseInt(normalizedInput);
          const gameOutput = activeGame.makeGuess(guess);
          resolve(gameOutput);
          return;
        } else if (typeof activeGame.guessLetter === 'function') {
          const gameOutput = activeGame.guessLetter(normalizedInput);
          resolve(gameOutput);
          return;
        } else if (typeof activeGame.play === 'function') {
          const gameOutput = activeGame.play(normalizedInput);
          resolve(gameOutput);
          return;
        } else {
          resolve(`Unknown command during game: ${command}. Type 'quit' to exit the game.`);
          return;
        }
      }

      // Process commands
      switch (command) {
        case "help":
          resolve(formatHelpText());
          break;

        case "clear":
          setCommands([]);
          resolve(null); // Don't add "clear" command to history
          break;

        case "date":
          resolve(new Date().toLocaleString());
          break;

        case "whoami":
          resolve("usr_neo");
          break;

        case "ls":
          resolve("about.txt\nexperience.txt\nskills.txt\nprojects.txt\ncontact.txt");
          break;

        case "cat":
          {
            const filename = args[1];
            if (!filename) {
              resolve("Please specify a filename.");
              break;
            }

            switch (filename) {
              case "about.txt":
                resolve("A Cloud DevOps Engineer passionate about digital transformation.");
                break;
              case "experience.txt":
                resolve("5+ years of experience in cloud infrastructure and automation.");
                break;
              case "skills.txt":
                resolve("AWS, Azure, GCP, Kubernetes, Docker, Terraform, Ansible, Python, JavaScript");
                break;
              case "projects.txt":
                resolve("Check out my projects on the projects page.");
                break;
              case "contact.txt":
                resolve("Contact me through the contact form on the contact page.");
                break;
              default:
                resolve(`File not found: ${filename}`);
            }
            break;
          }

        case "echo":
          {
            const text = args.slice(1).join(" ");
            resolve(text);
            break;
          }

        case "fortune":
          try {
            const category = args[1] || ""; // Get the category if provided
            if (!category) {
              resolve(`Please specify a category: developer, finance, hr, general
Example: fortune developer`);
              break;
            }
            
            if (!['developer', 'finance', 'hr', 'general'].includes(category)) {
              resolve(`Unknown category: ${category}
Available categories: developer, finance, hr, general`);
              break;
            }
            
            // Get fortunes for the selected category
            const fortunes = terminalFortunes[category] || terminalFortunes.general;
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            
            resolve(`Fortune (${category}):\n${randomFortune}`);
          } catch (e) {
            resolve("Error generating fortune.");
          }
          break;

        case "matrix":
          {
            let matrixOutput = "";
            for (let i = 0; i < 15; i++) {
              matrixOutput += asciiArt.matrixFrame();
            }
            resolve(matrixOutput);
            break;
          }

        case "sl":
          appendCommand({
            input: "sl",
            output: `Running the steam locomotive...

${asciiArt.steamLocomotive}`
          });
          
          // Set up animation for the locomotive if desired
          setTimeout(() => {
            scrollToBottom();
          }, 100);
          
          resolve(null); // Already appended output
          break;

        case "rabbit":
          {
            const rabbitGame = rabbitHoleGame();
            setActiveGame(rabbitGame);
            resolve(rabbitGame.start());
            break;
          }

        case "game":
          {
            const newGame = numberGuessingGame();
            setActiveGame(newGame);
            resolve(newGame.start());
            break;
          }

        case "snake":
          {
            const newSnakeGame = snakeGame();
            setActiveGame(newSnakeGame);
            const initialRender = newSnakeGame.start();
            
            // Set the game loop ID to the state
            const gameLoopId = window.setInterval(() => {
              if (newSnakeGame.isOver()) {
                clearInterval(gameLoopId);
                return;
              }
              const updatedBoard = newSnakeGame.update();
              if (updatedBoard) {
                appendCommand({ input: '', output: updatedBoard });
              }
            }, 200);
            
            newSnakeGame.setGameLoopId(gameLoopId);
            
            resolve(initialRender);
            break;
          }

        case "tictactoe":
          {
            const newTicTacToe = ticTacToe();
            setActiveGame(newTicTacToe);
            resolve(newTicTacToe.start());
            break;
          }

        case "math":
          {
            const newMathGame = mathGame();
            setActiveGame(newMathGame);
            resolve(newMathGame.start());
            break;
          }

        case "ascii":
          {
            const artName = args[1];
            if (!artName) {
              resolve(`Available ASCII art:
${Object.keys(asciiArt)
  .filter(key => typeof asciiArt[key] === "string" && key !== "matrixFrame" && key !== "codeRain")
  .sort()
  .join(", ")}

Usage: ascii [art-name]`);
              break;
            }
            
            const art = asciiArt[artName];
            if (typeof art === "string") {
              resolve(art);
            } else {
              resolve(`ASCII art "${artName}" not found. Type "ascii" to see available options.`);
            }
            break;
          }

        default:
          resolve(`Unknown command: ${command}. Type 'help' for available commands.`);
      }
    });
  };

  return (
    <div
      className={cn(
        "retro-terminal w-full rounded-md border bg-card",
        className,
        {
          "shadow-terminal": glowEffect
        }
      )}
    >
      <div className="px-4 py-2 border-b flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <div className="flex-1 flex justify-center">
          <p className="text-xs text-muted-foreground">terminal</p>
        </div>
      </div>

      {/* Terminal output area */}
      <div
        ref={terminalRef}
        className="terminal-output p-4 h-72 overflow-y-auto font-mono text-sm"
        onClick={focusInput}
      >
        {/* Welcome message */}
        {welcomeMessage && <div className="mb-2">{welcomeMessage}</div>}

        {/* Command history */}
        {commands.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex">
              <span className="text-primary font-bold">$ </span> 
              <span className="ml-1">{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap">{cmd.output}</div>
          </div>
        ))}

        {/* Current input line */}
        <div className="flex">
          <span className="text-primary font-bold">$ </span> 
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-1 bg-transparent outline-none flex-1 text-foreground"
            aria-label="Terminal input"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
