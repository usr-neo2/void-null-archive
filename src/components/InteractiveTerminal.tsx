
import { useState, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
import { X, Zap, Rocket, CircleX, X as XIcon } from "lucide-react";

interface Command {
  input: string;
  output: string | React.ReactNode;
}

interface TerminalProps {
  className?: string;
  initialCommands?: Command[];
  welcomeMessage?: string;
  glowEffect?: boolean;
}

export function InteractiveTerminal({ 
  className,
  initialCommands = [],
  welcomeMessage = "Welcome to the terminal. Type 'help' to see available commands.",
  glowEffect = true
}: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>(initialCommands);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [matrixRunning, setMatrixRunning] = useState<boolean>(false);
  const [trainRunning, setTrainRunning] = useState<boolean>(false);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [gameState, setGameState] = useState<string>("");
  const [rabbitMode, setRabbitMode] = useState<boolean>(false);
  const [asciiArtRunning, setAsciiArtRunning] = useState<boolean>(false);
  const [matrixTimeLeft, setMatrixTimeLeft] = useState<number>(10);
  const [trainTimeLeft, setTrainTimeLeft] = useState<number>(15);
  const [hangmanGame, setHangmanGame] = useState<boolean>(false);
  const [rockPaperScissorsGame, setRockPaperScissorsGame] = useState<boolean>(false);
  const [ticTacToeGame, setTicTacToeGame] = useState<boolean>(false);
  const [wordScrambleGame, setWordScrambleGame] = useState<boolean>(false);
  const [mathGame, setMathGame] = useState<boolean>(false);
  const [memoryGame, setMemoryGame] = useState<boolean>(false);
  const [colorMatchGame, setColorMatchGame] = useState<boolean>(false);
  const [snakeGame, setSnakeGame] = useState<boolean>(false);
  const [redPillBluePillGame, setRedPillBluePillGame] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const matrixIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const matrixTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const matrixCountdownRef = useRef<NodeJS.Timeout | null>(null);
  const trainIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const trainCountdownRef = useRef<NodeJS.Timeout | null>(null);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Auto-scroll whenever commands change
  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  // Setup keyboard listeners for games and animations
  useEffect(() => {
    // Global escape/interrupt for all games and animations
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
        clearAllAnimations();
        setMatrixRunning(false);
        setTrainRunning(false);
        setGameRunning(false);
        setAsciiArtRunning(false);
        setHangmanGame(false);
        setRockPaperScissorsGame(false);
        setTicTacToeGame(false);
        setWordScrambleGame(false);
        setMathGame(false);
        setMemoryGame(false);
        setColorMatchGame(false);
        setSnakeGame(false);
        setRedPillBluePillGame(false);
        
        setCommands(prev => [
          ...prev,
          { 
            input: "Interrupted", 
            output: "Process interrupted."
          }
        ]);
        
        scrollToBottom();
        e.preventDefault();
      }
    };
    
    // Add the event listener to window
    window.addEventListener('keydown', handleKeyPress);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Only add listener once

  const clearAllAnimations = () => {
    if (matrixIntervalRef.current) clearInterval(matrixIntervalRef.current);
    if (matrixTimeoutRef.current) clearTimeout(matrixTimeoutRef.current);
    if (matrixCountdownRef.current) clearInterval(matrixCountdownRef.current);
    if (trainIntervalRef.current) clearInterval(trainIntervalRef.current);
    if (trainCountdownRef.current) clearInterval(trainCountdownRef.current);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    
    matrixIntervalRef.current = null;
    matrixTimeoutRef.current = null;
    matrixCountdownRef.current = null;
    trainIntervalRef.current = null;
    trainCountdownRef.current = null;
    gameIntervalRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearAllAnimations();
    };
  }, []);

  // Matrix animation with enhanced characters
  const runMatrixAnimation = () => {
    clearAllAnimations();
    
    setTrainRunning(false);
    setMatrixRunning(true);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);
    setMatrixTimeLeft(10);
    
    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン金森川口木本田中村町年日月火水木金土山下犬猫鳥花竹林空天海地風雨雪光音影生死男女子人心手足耳目口刀剣弓矢銃砲爆発銀鉄金宝石龍神鬼仏魔王城壁道路橋川山谷洞窟海空abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()+~｜=[]{}:;/><,.▓▒░█▄▀■□●○▪▫♠♣♥♦♤♧♡♢♩♪♫♬☼☀☁☂★☆☄☕☯☮☢☣☠☸☹☺☻✓✔✕✖✗✘✦✧✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼⌘⌛⌚⏰⏱⏲⏳⚡⚠⚓⚔⚕⚖⚗⚙⚛⚜⚝⚞⚟⚠⚡⚢⚣⚤⚥⚦⚧⚨⚩⚪⚫⚬⚭⚮⚯⚰⚱⚲⚳⚴⚵⚶⚷⚸⚹⚺⚻⚼⚽⚾⚿⛀⛁⛂⛃⛄⛅⛆⛇⛈⛉⛊⛋⛌⛍⛎⛏⛐⛑⛒⛓⛔⛕⛖⛗⛘⛙⛚⛛⛜⛝⛞⛟⛠⛡⛢⛣⛤⛥⛦⛧⛨⛩⛪⛫⛬⛭⛮⛯⛰⛱⛲⛳⛴⛵⛶⛷⛸⛹⛺⛻⛼⛽⛾⛿✁✂✃✄✅✆✇✈✉✊✋✌✍✎✏✐✑✒✓✔✕✖✗✘✙✚✛✜✝✞✟✠✡✢✣✤✥✦✧✨✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋❌❍❎❏❐❑❒❓❔❕❖❗❘❙❚❛❜❝❞❟";
    
    const columns = 30;
    const lines: string[] = [];
    const brightness: number[][] = [];
    
    for (let i = 0; i < 10; i++) {
      lines.push(" ".repeat(columns));
      brightness.push(Array(columns).fill(0));
    }
    
    const raindrops = Array(Math.ceil(columns * 0.3)).fill(0).map(() => ({
      x: Math.floor(Math.random() * columns),
      y: -Math.floor(Math.random() * 5),
      length: 5 + Math.floor(Math.random() * 15),
      speed: 1 + Math.random() * 0.5,
    }));
    
    const updateMatrix = () => {
      const newLines = Array(10).fill(0).map(() => " ".repeat(columns).split(''));
      const newBrightness = Array(10).fill(0).map(() => Array(columns).fill(0));
      
      for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];
        drop.y += drop.speed;
        
        if (drop.y - drop.length > 10) {
          drop.x = Math.floor(Math.random() * columns);
          drop.y = -Math.floor(Math.random() * 5);
          drop.length = 5 + Math.floor(Math.random() * 15);
          drop.speed = 1 + Math.random() * 0.5;
          continue;
        }
        
        for (let j = 0; j < drop.length; j++) {
          const y = Math.floor(drop.y) - j;
          if (y >= 0 && y < 10 && drop.x >= 0 && drop.x < columns) {
            const brightness = Math.max(0, 10 - j);
            newBrightness[y][drop.x] = brightness;
            
            if (j === 0 || Math.random() < 0.1) {
              newLines[y][drop.x] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            } else if (newLines[y][drop.x] === ' ') {
              newLines[y][drop.x] = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            }
          }
        }
      }
      
      const finalLines = newLines.map(line => line.join(''));
      
      setCommands(prev => {
        const newCommands = [...prev];
        newCommands[newCommands.length - 1].output = (
          <div className="font-mono whitespace-pre">
            {finalLines.map((line, lineIndex) => (
              <div key={lineIndex}>
                {line.split('').map((char, charIndex) => {
                  const bright = newBrightness[lineIndex][charIndex];
                  let colorClass = "text-green-900";
                  
                  if (bright > 8) colorClass = "text-green-400";
                  else if (bright > 6) colorClass = "text-green-500";
                  else if (bright > 4) colorClass = "text-green-600";
                  else if (bright > 2) colorClass = "text-green-700";
                  else if (bright > 0) colorClass = "text-green-800";
                  
                  return <span key={charIndex} className={colorClass}>{char}</span>;
                })}
              </div>
            ))}
            <div className="flex justify-between mt-2">
              <p className="text-muted-foreground text-xs">
                Matrix will terminate in {matrixTimeLeft} seconds.
              </p>
              <button 
                onClick={() => {
                  clearAllAnimations();
                  setMatrixRunning(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Matrix animation terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit
              </button>
            </div>
          </div>
        );
        return newCommands;
      });
      
      scrollToBottom();
    };
    
    const intervalId = setInterval(updateMatrix, 100);
    matrixIntervalRef.current = intervalId;

    const countdownId = setInterval(() => {
      setMatrixTimeLeft(prev => {
        if (prev <= 1) {
          clearAllAnimations();
          setMatrixRunning(false);
          
          setCommands(prev => [
            ...prev,
            { 
              input: "Matrix terminated", 
              output: "Matrix code sequence completed."
            }
          ]);
          
          scrollToBottom();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    matrixCountdownRef.current = countdownId;

    setCommands(prev => [
      ...prev,
      { 
        input: "matrix", 
        output: <div className="font-mono text-terminal-green whitespace-pre shadow-terminal">Initializing Matrix code... (will auto-terminate after 10 seconds)</div>
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Train animation 
  const runTrainAnimation = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(true);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);
    setTrainTimeLeft(15);
    
    const screenWidth = 80;
    let position = screenWidth;
    
    const trainArt = [
      "      ====        ________                ",
      "  _D _|  |_______/        \\____          ",
      "   |(_)---  |   H\\________/ |   |        ",
      "   /     |  |   H  |  |     |   |        ",
      "  |      |  |   H  |__|     |   |        ",
      "  | ________|___H__/__|_____/|___|___    ",
      "  |/ |   |       H   |               \\   ",
      "_/ @-@-@  |_______________@-@-@-@-@-@-\\_ "
    ];
    
    const getTrainFrame = (pos: number) => {
      const trainLength = trainArt[0].length;
      let frame = "";
      
      for (let i = 0; i < trainArt.length; i++) {
        const startPos = Math.floor(pos);
        let line = "";
        if (startPos > 0) {
          line = " ".repeat(startPos);
        }
        line += trainArt[i];
        frame += line + "\n";
      }
      
      const smokeX = pos + trainArt[0].length - 10;
      if (smokeX < screenWidth && smokeX > 0) {
        const smokeChars = "oO@*°";
        const smokeChar = smokeChars[Math.floor(Math.random() * smokeChars.length)];
        const smokeLine = " ".repeat(Math.floor(smokeX)) + smokeChar;
        frame = smokeLine + "\n" + frame;
      }
      
      return frame;
    };
    
    const updateTrain = () => {
      position -= 1.5;
      
      setCommands(prev => {
        const newCommands = [...prev];
        if (position <= -trainArt[0].length) {
          clearAllAnimations();
          setTrainRunning(false);
          
          setCommands(prev => [
            ...prev,
            { 
              input: "Train completed", 
              output: "The train has reached its destination!"
            }
          ]);
          
          return newCommands;
        }
        
        newCommands[newCommands.length - 1].output = (
          <div className="font-mono text-terminal-green whitespace-pre shadow-terminal">
            {getTrainFrame(position)}
            <div className="flex justify-between mt-2">
              <p className="text-muted-foreground text-xs">
                Train will auto-terminate in {trainTimeLeft} seconds or when off-screen.
              </p>
              <button 
                onClick={() => {
                  clearAllAnimations();
                  setTrainRunning(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Train animation terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit
              </button>
            </div>
          </div>
        );
        return newCommands;
      });
      
      scrollToBottom();
    };
    
    const countdownId = setInterval(() => {
      setTrainTimeLeft(prev => {
        if (prev <= 1) {
          clearAllAnimations();
          setTrainRunning(false);
          
          setCommands(prev => [
            ...prev,
            { 
              input: "Train terminated", 
              output: "Train animation timed out."
            }
          ]);
          
          scrollToBottom();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    trainCountdownRef.current = countdownId;
    
    const intervalId = setInterval(updateTrain, 150);
    trainIntervalRef.current = intervalId;

    setCommands(prev => [
      ...prev,
      { 
        input: "sl", 
        output: <div className="font-mono text-terminal-green whitespace-pre shadow-terminal">
          Steam locomotive approaching from the right...
        </div>
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Number guessing game
  const startNumberGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(true);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setGameState(JSON.stringify({
      number: randomNumber,
      attempts: 0,
      guess: null,
      message: "I'm thinking of a number between 1 and 100. Type your guess as a number between 1-100."
    }));

    setCommands(prev => [
      ...prev,
      { 
        input: "numguess", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Number Guessing Game</div>
            <div>I'm thinking of a number between 1 and 100. Type your guess as a number.</div>
            <div className="text-muted-foreground">Type a number and press Enter to make a guess.</div>
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setGameRunning(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Number guessing game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Hangman game
  const startHangmanGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(true);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    const words = [
      "javascript", "python", "function", "variable", "terminal", 
      "algorithm", "database", "component", "framework", "compiler", 
      "debugging", "interface", "iteration", "recursion", "prototype"
    ];
    
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setGameState(JSON.stringify({
      word: randomWord,
      guessed: [],
      wrong: 0,
      status: "playing",
      message: "Welcome to Hangman! Guess a letter by typing it."
    }));

    const drawHangman = (wrong: number) => {
      const stages = [
        `
  +---+
  |   |
      |
      |
      |
      |
=========`,
        `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
        `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
        `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
        `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
        `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
        `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
      ];
      
      return stages[wrong] || stages[0];
    };

    setCommands(prev => [
      ...prev,
      { 
        input: "hangman", 
        output: (
          <div className="font-mono whitespace-pre">
            <div className="font-bold text-terminal-green mb-2">Hangman Game</div>
            {drawHangman(0)}
            <div className="mt-2">
              Word: {randomWord.split('').map(() => "_ ").join('')}
            </div>
            <div className="mt-1 text-muted-foreground">
              Guess a letter by typing it and pressing Enter.
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setHangmanGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Hangman game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Rock Paper Scissors game
  const startRockPaperScissors = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(true);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    setGameState(JSON.stringify({
      playerScore: 0,
      computerScore: 0,
      rounds: 0,
      status: "playing",
      message: "Rock, Paper, Scissors! Type 'rock', 'paper', or 'scissors' to play."
    }));

    setCommands(prev => [
      ...prev,
      { 
        input: "rps", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Rock, Paper, Scissors</div>
            <div>Type 'rock', 'paper', or 'scissors' to play.</div>
            <div className="text-muted-foreground">First to 3 points wins!</div>
            <div className="flex justify-between mt-2">
              <div>You: 0</div>
              <div>Computer: 0</div>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setRockPaperScissorsGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Rock Paper Scissors game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Tic Tac Toe game
  const startTicTacToe = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(true);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    setGameState(JSON.stringify({
      board: Array(9).fill(null),
      isXNext: true,
      status: "playing",
      message: "Tic Tac Toe! Type a number (1-9) to place your X."
    }));

    const renderBoard = (board: (string | null)[]) => {
      return `
   ${board[0] || '1'} | ${board[1] || '2'} | ${board[2] || '3'} 
  ---+---+---
   ${board[3] || '4'} | ${board[4] || '5'} | ${board[5] || '6'} 
  ---+---+---
   ${board[6] || '7'} | ${board[7] || '8'} | ${board[8] || '9'} 
      `;
    };

    setCommands(prev => [
      ...prev,
      { 
        input: "tictactoe", 
        output: (
          <div className="font-mono whitespace-pre">
            <div className="font-bold text-terminal-green mb-2">Tic Tac Toe</div>
            {renderBoard(Array(9).fill(null))}
            <div className="mt-2">
              You are X. Type a number (1-9) to place your mark.
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setTicTacToeGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Tic Tac Toe game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Word Scramble game
  const startWordScramble = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(true);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    const words = [
      "code", "debug", "array", "class", "event", 
      "fetch", "input", "logic", "model", "proxy", 
      "query", "route", "stack", "value", "yield"
    ];
    
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    // Scramble the word
    const scrambled = randomWord
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
    
    setGameState(JSON.stringify({
      word: randomWord,
      scrambled: scrambled,
      attempts: 0,
      status: "playing",
      message: `Unscramble this word: ${scrambled}`
    }));

    setCommands(prev => [
      ...prev,
      { 
        input: "scramble", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Word Scramble</div>
            <div>Unscramble this word: <span className="font-mono text-terminal-green">{scrambled}</span></div>
            <div className="text-muted-foreground">Type your guess and press Enter.</div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setWordScrambleGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Word Scramble game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Math Challenge game
  const startMathGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(true);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1: number, num2: number;
    
    if (operator === '+') {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
    } else if (operator === '-') {
      num1 = Math.floor(Math.random() * 50) + 26;
      num2 = Math.floor(Math.random() * 25) + 1;
    } else { // multiplication
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
    }
    
    let answer: number;
    if (operator === '+') answer = num1 + num2;
    else if (operator === '-') answer = num1 - num2;
    else answer = num1 * num2;
    
    setGameState(JSON.stringify({
      num1: num1,
      num2: num2,
      operator: operator,
      answer: answer,
      attempts: 0,
      status: "playing",
      message: `What is ${num1} ${operator} ${num2}?`
    }));

    setCommands(prev => [
      ...prev,
      { 
        input: "math", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Math Challenge</div>
            <div className="text-xl font-mono">What is {num1} {operator} {num2}?</div>
            <div className="text-muted-foreground">Type your answer and press Enter.</div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setMathGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Math Challenge game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Memory Game
  const startMemoryGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(true);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    // Generate a random sequence
    const levels = 5;
    const symbols = ['*', '&', '%', '$', '#', '@', '!', '+', '=', '?'];
    
    const sequence = Array(levels).fill(0).map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    
    setGameState(JSON.stringify({
      sequence: sequence,
      currentLevel: 0,
      showSequence: true,
      playerInput: [],
      gameOver: false,
      timeLeft: 5,
      message: "Memorize this sequence!"
    }));

    const startMemorySequence = () => {
      const intervalId = setInterval(() => {
        setGameState(prevState => {
          const gameStateObj = JSON.parse(prevState);
          
          if (gameStateObj.timeLeft <= 1) {
            clearInterval(intervalId);
            return JSON.stringify({
              ...gameStateObj,
              showSequence: false,
              timeLeft: 0,
              message: "Now type the sequence you saw!"
            });
          }
          
          return JSON.stringify({
            ...gameStateObj,
            timeLeft: gameStateObj.timeLeft - 1
          });
        });
        
        setCommands(prev => {
          const gameStateObj = JSON.parse(gameState);
          const newCommands = [...prev];
          
          newCommands[newCommands.length - 1].output = (
            <div className="space-y-2">
              <div className="font-bold text-terminal-green">Memory Game</div>
              <div className="text-terminal-yellow font-mono text-xl tracking-wider">
                {gameStateObj.sequence.join(" ")}
              </div>
              <div className="text-muted-foreground">
                Memorize this sequence! Time left: {gameStateObj.timeLeft}s
              </div>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => {
                    clearInterval(intervalId);
                    setMemoryGame(false);
                    setCommands(prev => [
                      ...prev,
                      { 
                        input: "quit", 
                        output: "Memory Game terminated." 
                      }
                    ]);
                  }}
                  className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <XIcon className="h-3 w-3" /> Quit Game
                </button>
              </div>
            </div>
          );
          
          return newCommands;
        });
      }, 1000);
      
      gameIntervalRef.current = intervalId;
    };

    setCommands(prev => [
      ...prev,
      { 
        input: "memory", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Memory Game</div>
            <div className="text-terminal-yellow font-mono text-xl tracking-wider">
              {sequence.join(" ")}
            </div>
            <div className="text-muted-foreground">
              Memorize this sequence! Time left: 5s
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  clearAllAnimations();
                  setMemoryGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Memory Game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    startMemorySequence();
    setTimeout(scrollToBottom, 10);
  };

  // Color Match Game
  const startColorMatchGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(true);
    setSnakeGame(false);
    setRedPillBluePillGame(false);

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    const colorWords = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
    
    // Choose random color and word
    const colorIndex = Math.floor(Math.random() * colors.length);
    const wordIndex = Math.floor(Math.random() * colorWords.length);
    
    const displayedColor = colors[colorIndex];
    const displayedWord = colorWords[wordIndex];
    
    // The "match" is true if the color name matches the color of the text
    const isMatch = colorIndex === wordIndex;
    
    setGameState(JSON.stringify({
      colorIndex,
      wordIndex,
      displayedColor,
      displayedWord,
      isMatch,
      score: 0,
      round: 1,
      maxRounds: 10,
      timeLeft: 5,
      gameOver: false,
      message: "Does the COLOR of the word match its MEANING? (y/n)"
    }));

    // Start countdown
    const intervalId = setInterval(() => {
      setGameState(prevState => {
        const gameStateObj = JSON.parse(prevState);
        
        if (gameStateObj.timeLeft <= 1) {
          clearInterval(intervalId);
          
          const newGameState = {
            ...gameStateObj,
            gameOver: true,
            timeLeft: 0,
            message: "Time's up! Game over."
          };
          
          setCommands(prev => {
            const newCommands = [...prev];
            
            newCommands[newCommands.length - 1].output = (
              <div className="space-y-2">
                <div className="font-bold text-terminal-green">Color Match</div>
                <div className={`text-${gameStateObj.displayedColor}-500 font-bold text-2xl text-center`}>
                  {gameStateObj.displayedWord}
                </div>
                <div className="text-terminal-red">Time's up! Game over.</div>
                <div className="text-terminal-yellow">Final score: {gameStateObj.score}/{gameStateObj.maxRounds}</div>
                <div className="text-muted-foreground">Type "colormatch" to play again.</div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      clearInterval(intervalId);
                      setColorMatchGame(false);
                      setCommands(prev => [
                        ...prev,
                        { 
                          input: "quit", 
                          output: "Color Match game terminated." 
                        }
                      ]);
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <XIcon className="h-3 w-3" /> Quit Game
                  </button>
                </div>
              </div>
            );
            
            return newCommands;
          });
          
          return JSON.stringify(newGameState);
        }
        
        return JSON.stringify({
          ...gameStateObj,
          timeLeft: gameStateObj.timeLeft - 1
        });
      });
      
      setCommands(prev => {
        const gameStateObj = JSON.parse(gameState);
        const newCommands = [...prev];
        
        newCommands[newCommands.length - 1].output = (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Color Match</div>
            <div className={`text-${gameStateObj.displayedColor}-500 font-bold text-2xl text-center`}>
              {gameStateObj.displayedWord}
            </div>
            <div className="flex justify-between">
              <div>Round: {gameStateObj.round}/{gameStateObj.maxRounds}</div>
              <div>Score: {gameStateObj.score}</div>
              <div>Time: {gameStateObj.timeLeft}s</div>
            </div>
            <div className="text-muted-foreground">
              Does the COLOR of the word match its MEANING? (y/n)
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  clearInterval(intervalId);
                  setColorMatchGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Color Match game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        );
        
        return newCommands;
      });
    }, 1000);
    
    gameIntervalRef.current = intervalId;

    setCommands(prev => [
      ...prev,
      { 
        input: "colormatch", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Color Match</div>
            <div className={`text-${displayedColor}-500 font-bold text-2xl text-center`}>
              {displayedWord}
            </div>
            <div className="flex justify-between">
              <div>Round: 1/10</div>
              <div>Score: 0</div>
              <div>Time: 5s</div>
            </div>
            <div className="text-muted-foreground">
              Does the COLOR of the word match its MEANING? (y/n)
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  clearInterval(intervalId);
                  setColorMatchGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Color Match game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };

  // Snake Game
  const startSnakeGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(true);
    setRedPillBluePillGame(false);
    
    const gridSize = 10;
    
    // Initialize snake in the center
    const initialSnake = [
      {x: Math.floor(gridSize/2), y: Math.floor(gridSize/2)}
    ];
    
    // Place food randomly
    const getRandomFood = (snake: {x: number, y: number}[]) => {
      let foodX, foodY;
      let validPosition = false;
      
      while (!validPosition) {
        foodX = Math.floor(Math.random() * gridSize);
        foodY = Math.floor(Math.random() * gridSize);
        
        // Check if food is not on the snake
        validPosition = !snake.some(segment => segment.x === foodX && segment.y === foodY);
      }
      
      return {x: foodX, y: foodY};
    };
    
    const initialFood = getRandomFood(initialSnake);
    
    setGameState(JSON.stringify({
      snake: initialSnake,
      food: initialFood,
      direction: 'right',
      score: 0,
      gameOver: false,
      gridSize: gridSize,
      message: "Use WASD keys to move the snake!"
    }));
    
    const renderGrid = (snake: {x: number, y: number}[], food: {x: number, y: number}, gridSize: number) => {
      let grid = '';
      
      // Top border
      grid += '+' + '-'.repeat(gridSize * 2 - 1) + '+\n';
      
      // Grid rows
      for (let y = 0; y < gridSize; y++) {
        grid += '|';
        
        for (let x = 0; x < gridSize; x++) {
          const isSnakeHead = snake[0].x === x && snake[0].y === y;
          const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          
          if (isSnakeHead) {
            grid += 'O ';
          } else if (isSnakeBody) {
            grid += '■ ';
          } else if (isFood) {
            grid += '● ';
          } else {
            grid += '· ';
          }
        }
        
        grid += '|\n';
      }
      
      // Bottom border
      grid += '+' + '-'.repeat(gridSize * 2 - 1) + '+';
      
      return grid;
    };
    
    const updateSnake = () => {
      setGameState(prevState => {
        const gameStateObj = JSON.parse(prevState);
        
        if (gameStateObj.gameOver) {
          clearInterval(gameIntervalRef.current as NodeJS.Timeout);
          return prevState;
        }
        
        const {snake, food, direction, score, gridSize} = gameStateObj;
        
        // Calculate new head position based on direction
        const head = {...snake[0]};
        
        switch (direction) {
          case 'up': head.y--; break;
          case 'down': head.y++; break;
          case 'left': head.x--; break;
          case 'right': head.x++; break;
        }
        
        // Check if game over (wall collision or self collision)
        const hitWall = head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
        const hitSelf = snake.some(segment => segment.x === head.x && segment.y === head.y);
        
        if (hitWall || hitSelf) {
          clearInterval(gameIntervalRef.current as NodeJS.Timeout);
          
          setCommands(prev => {
            const newCommands = [...prev];
            
            newCommands[newCommands.length - 1].output = (
              <div className="space-y-2">
                <div className="font-bold text-terminal-green">Snake Game</div>
                <div className="font-mono whitespace-pre text-terminal-yellow">
                  {renderGrid(snake, food, gridSize)}
                </div>
                <div className="text-terminal-red">Game Over!</div>
                <div className="text-terminal-yellow">Final score: {score}</div>
                <div className="text-muted-foreground">Type "snake" to play again.</div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      clearInterval(gameIntervalRef.current as NodeJS.Timeout);
                      setSnakeGame(false);
                      setCommands(prev => [
                        ...prev,
                        { 
                          input: "quit", 
                          output: "Snake game terminated." 
                        }
                      ]);
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <XIcon className="h-3 w-3" /> Quit Game
                  </button>
                </div>
              </div>
            );
            
            return newCommands;
          });
          
          return JSON.stringify({
            ...gameStateObj,
            gameOver: true,
            message: "Game Over! Type 'snake' to play again."
          });
        }
        
        // Check if snake ate food
        const ateFood = head.x === food.x && head.y === food.y;
        
        let newSnake = [head, ...snake];
        let newFood = food;
        let newScore = score;
        
        if (ateFood) {
          // Increase score and generate new food
          newScore++;
          newFood = getRandomFood(newSnake);
        } else {
          // Remove tail (last segment)
          newSnake.pop();
        }
        
        setCommands(prev => {
          const newCommands = [...prev];
          
          newCommands[newCommands.length - 1].output = (
            <div className="space-y-2">
              <div className="font-bold text-terminal-green">Snake Game</div>
              <div className="font-mono whitespace-pre text-terminal-yellow">
                {renderGrid(newSnake, newFood, gridSize)}
              </div>
              <div className="flex justify-between">
                <div>Score: {newScore}</div>
                <div>Use WASD to move</div>
              </div>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => {
                    clearInterval(gameIntervalRef.current as NodeJS.Timeout);
                    setSnakeGame(false);
                    setCommands(prev => [
                      ...prev,
                      { 
                        input: "quit", 
                        output: "Snake game terminated." 
                      }
                    ]);
                  }}
                  className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                >
                  <XIcon className="h-3 w-3" /> Quit Game
                </button>
              </div>
            </div>
          );
          
          return newCommands;
        });
        
        return JSON.stringify({
          ...gameStateObj,
          snake: newSnake,
          food: newFood,
          score: newScore
        });
      });
    };
    
    // Start game loop
    const intervalId = setInterval(updateSnake, 500);
    gameIntervalRef.current = intervalId;
    
    setCommands(prev => [
      ...prev,
      { 
        input: "snake", 
        output: (
          <div className="space-y-2">
            <div className="font-bold text-terminal-green">Snake Game</div>
            <div className="font-mono whitespace-pre text-terminal-yellow">
              {renderGrid(initialSnake, initialFood, gridSize)}
            </div>
            <div className="flex justify-between">
              <div>Score: 0</div>
              <div>Use WASD to move</div>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  clearInterval(intervalId);
                  setSnakeGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "Snake game terminated." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit Game
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
    
    // Add key listener for WASD controls
    const handleKeyDown = (e: KeyboardEvent) => {
      setGameState(prevState => {
        const gameStateObj = JSON.parse(prevState);
        
        if (gameStateObj.gameOver) return prevState;
        
        let newDirection = gameStateObj.direction;
        
        switch (e.key.toLowerCase()) {
          case 'w': newDirection = 'up'; break;
          case 'a': newDirection = 'left'; break;
          case 's': newDirection = 'down'; break;
          case 'd': newDirection = 'right'; break;
        }
        
        // Prevent 180° turns
        const {direction} = gameStateObj;
        if (
          (direction === 'up' && newDirection === 'down') ||
          (direction === 'down' && newDirection === 'up') ||
          (direction === 'left' && newDirection === 'right') ||
          (direction === 'right' && newDirection === 'left')
        ) {
          return prevState;
        }
        
        return JSON.stringify({
          ...gameStateObj,
          direction: newDirection
        });
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
  };

  // Red Pill Blue Pill Game
  const startRedPillBluePillGame = () => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(false);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(true);

    setCommands(prev => [
      ...prev,
      { 
        input: "rabbit", 
        output: (
          <div className="space-y-4">
            <div className="font-mono whitespace-pre text-terminal-green">
              {`  (\\(\\
  (-.-)
  o_(")(")

Follow the white rabbit...`}
            </div>
            <div className="text-terminal-green mt-4">
              Morpheus: "This is your last chance. After this, there is no turning back."
            </div>
            <div className="flex justify-center mt-8 gap-8">
              <button 
                onClick={() => {
                  setRedPillBluePillGame(false);
                  runMatrixAnimation();
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "take red pill", 
                      output: "You take the red pill... welcome to the real world. The Matrix has you..."
                    }
                  ]);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-bold transition-all"
              >
                Take the Red Pill
              </button>
              <button 
                onClick={() => {
                  setRedPillBluePillGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "take blue pill", 
                      output: "You take the blue pill. The story ends, you wake up in your bed and believe whatever you want to believe..."
                    }
                  ]);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-bold transition-all"
              >
                Take the Blue Pill
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => {
                  setRedPillBluePillGame(false);
                  setCommands(prev => [
                    ...prev,
                    { 
                      input: "quit", 
                      output: "You decided not to choose any pill. Smart move." 
                    }
                  ]);
                }}
                className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <XIcon className="h-3 w-3" /> Quit
              </button>
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };
  
  // Simple ASCII art generator
  const showAsciiArt = (artName: string) => {
    clearAllAnimations();
    
    setMatrixRunning(false);
    setTrainRunning(false);
    setGameRunning(false);
    setAsciiArtRunning(true);
    setHangmanGame(false);
    setRockPaperScissorsGame(false);
    setTicTacToeGame(false);
    setWordScrambleGame(false);
    setMathGame(false);
    setMemoryGame(false);
    setColorMatchGame(false);
    setSnakeGame(false);
    setRedPillBluePillGame(false);
    
    const artLibrary: Record<string, string[]> = {
      "bunny": [
        "  (\\(\\ ",
        "  (-.-)  ",
        "  o_(\")(\")",
        "",
        "Hop hop!"
      ],
      "kitty": [
        " /\\_/\\ ",
        "( o.o )",
        " > ^ < ",
        "",
        "Meow!"
      ],
      "doggy": [
        "  __      _",
        "o'')}____//",
        " `_/      )",
        " (_(_/-(_/ ",
        "",
        "Woof!"
      ],
      "cow": [
        "       (__)        ",
        "       (oo)        ",
        "  /------\\/       ",
        " / |    ||         ",
        "*  /\\---/\\        ",
        "   ~~   ~~         ",
        "....\"Have you mooed today?\"..."
      ],
      "tux": [
        "   \\\\             ",
        "    \\\\            ",
        "     \\\\           ",
        "     (o o)         ",
        "     ( > )         ",
        "    /`---'\\       ",
        "   /       \\      ",
        "  /|  L    |\\     ",
        " / |  I    | \\    ",
        " \\ |  N    | /    ",
        "  \\|  U    |/     ",
        "   \\  X   /       ",
        "    `-----'        ",
      ],
      "computer": [
        "  .-------------------.",
        "  | .--------------. |",
        "  | |  _________   | |",
        "  | | |  _   _  |  | |",
        "  | | |_/ | | \\_|  | |",
        "  | |     | |      | |",
        "  | |    _| |_     | |",
        "  | |   |_____|    | |",
        "  | |              | |",
        "  | '--------------' |",
        "  '------------------'",
      ],
      "bug": [
        "      \\ | /         ",
        "      - * -         ",
        "      / | \\         ",
        "       /^\\          ",
        "      //|\\\\        ",
        "     ///|\\\\\\      ",
        "    ////|\\\\\\\\    ",
        "   /////|\\\\\\\\\\  ",
        "  //////|\\\\\\\\\\\\",
        "      |||||          ",
        "      |||||          ",
        "",
        "Found a bug in your code!",
      ]
    };
    
    // Default to rabbit if art isn't found
    const art = artLibrary[artName] || artLibrary["bunny"];
    
    setCommands(prev => [
      ...prev,
      { 
        input: artName, 
        output: (
          <div className="font-mono whitespace-pre text-terminal-green shadow-terminal">
            {art.join('\n')}
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };
  
  // Fortune cookie command with developer-specific fortunes
  const showFortune = () => {
    const fortunes = [
      // Generic humorous fortunes
      "You will find a hidden treasure where you least expect it... probably in your couch cushions.",
      "A dream you have will come true when you least expect it... like your nightmare about showing up to work naked.",
      "Your hard work is about to pay off. And by 'pay off,' we mean you'll finally get those 3 more Twitter followers.",
      "The greatest risk is not taking one. Also, skydiving without a parachute.",
      "Your creativity will lead you to unexpected success, like realizing you can use a fork to scratch your back.",
      "A lifetime friend shall soon be made. Probably a dog, because humans are complicated.",
      "Your talents will be recognized and suitably rewarded. By 'suitably,' we mean a $5 Starbucks gift card.",
      "Good things come to those who wait, but better things come to those who order express shipping.",
      "Happiness isn't an outside job, it's an inside job. Just like that questionable burrito was an inside job on your digestive system.",
      "You will soon embark on a journey of self-discovery. Spoiler alert: you're still you at the end of it.",

      // Developer-specific humorous fortunes
      "The best code is written with the heart, the mind, and at least three energy drinks.",
      "A bug fixed today prevents a weekend emergency tomorrow. A bug fixed tomorrow prevents your weekend entirely.",
      "Your next pull request will be approved without changes... in a parallel universe.",
      "Code that's hard to write is usually hard to read, just like doctors' prescriptions.",
      "The most valuable line of code is the one you deleted because it was unnecessary. Remember: real coders ship less code.",
      "That feature you've been avoiding will be easier than you think. That's what we told the last developer too.",
      "You will encounter a bug that teaches you something profound, like how much you hate computers.",
      "Today is a good day to refactor that messy function. Tomorrow is an even better day. Next week? Perfect!",
      "A well-placed comment will save your future self hours of confusion. 'What the hell was I thinking here?' is not a good comment.",
      "Your automated tests will catch a critical bug before it reaches production. Just kidding, your tests are all passing on a failing system.",
      "The senior developer you admire was once a beginner too. They've just had more time to perfect hiding their Google searches.",
      "Today's impossible problem is tomorrow's obvious solution. And next week's 'who wrote this garbage?'",
      "There's a Stack Overflow answer for the exact issue you're facing. It was marked as duplicate and closed 8 years ago.",
      "Your midnight coding session will yield unexpected breakthroughs. Also, weird syntax errors at 3 AM.",
      "Simplicity is the ultimate sophistication in your code. That's why you have 17 design patterns in your ToDo app.",
      "The documentation you write today will save someone's job tomorrow. Too bad no one will read it.",
      "The time spent planning your code will pay off tenfold in implementation. So naturally, you'll skip that part entirely.",
      "You will find elegance in recursion when you least expect it. You will find elegance in recursion when you least expect it. You will find...",
      "Your variable names will be praised in code review. 'tmp', 'temp', and 'tmp2' are particularly impressive.",
      "The legacy codebase you inherited has hidden wisdom. It's saying 'please rewrite me completely'.",
      "Your clever hack will become an essential part of the architecture. They'll engrave 'it worked in dev' on your tombstone.",
      "That third-party library you're afraid to use will solve everything. And create 17 new problems you've never imagined.",
      "Your code will run correctly on the first try. No, wait, that's not a fortune, that's fiction.",
      "The solution isn't adding more code, but removing some. Try deleting everything and starting over.",
      "You will achieve flow state in your next coding session. It will be interrupted by a meeting about planning the next planning meeting.",
      "That open source contribution you're hesitating to submit will be warmly received. By 'warmly' we mean they'll completely refactor it.",
      "Your next deployment will go smoothly, without any surprises. We're tracking your location so we know when to laugh.",
      "The perfect algorithm for your problem already exists in your subconscious. Unfortunately, it's between your PIN number and that embarrassing memory from high school.",
      "Your team will adopt that coding standard you've been advocating for. Right after you leave the company.",
      "A mysterious performance issue will reveal itself to you in a dream. Sadly, you'll forget it upon waking up.",
      
      // Finance/business humor
      "Synergize your core competencies to leverage dynamic paradigm shifts in the moving-forward space.",
      "Your next investment will show incredible ROI. Remember: Ramen, Oatmeal, and Instant coffee are all great investments when you're broke.",
      "The market is bullish on your future. The bear market is also eyeing your lunch.",
      "You will soon pivot to a more agile framework for ideating innovative disruptions in the blockchain metaverse.",
      "Your startup will achieve unicorn status after your VC funding round. Unfortunately, it's the kind of unicorn that doesn't exist.",
      "Let's circle back on that action item after we've touched base with key stakeholders to move the needle on our north star metrics.",
      "Your burn rate is sustainable if you consider 'going out of business next month' as your business model.",
      "We need to blue-sky some outside-the-box thinking to right-size our deliverables after the paradigm shift.",
      "Your value proposition needs to be realigned with your competitive differentiation in the marketplace ecosystem.",
      "The ROI on your deep dive into the low-hanging fruit will maximize stakeholder engagement in the digital transformation space.",
      "Please revert back to me with your thoughts on how we can incentivize our human capital to optimize their bandwidth.",
      "Your KPIs suggest you should drill down into the actionable insights before the quarterly all-hands town hall meeting.",
      "Let's not boil the ocean here, just streamline our mission-critical objectives for the next fiscal quarter.",
      "I'll ping you to touch base offline about the bleeding-edge solutions for our pain points in the B2B space.",
      "The data suggests that pivoting our core competencies will create a win-win scenario for all stakeholders in the value chain.",
      "Your next pitch deck needs more hockey-stick growth projections and fewer actual financial forecasts.",
      "Due diligence suggests that your granular ideation requires further cross-functional synergy before going to market.",
      "The C-suite consensus is that we need to circle back to our north star metric before we can move the needle on user acquisition.",
      "Your disruptive innovation might gain traction if you leverage blockchain technology in your elevator pitch to Series A investors.",
      "The SWOT analysis indicates that your strategic roadmap should pivot toward more sustainable growth hacking methodologies.",
     
      // Adult humor (kept PG-13)
      "You will find true love with the next person who makes eye contact with you. Don't stare at strangers too long testing this.",
      "Your significant other has been googling 'how to hide a body'. Could be for a surprise party... or not.",
      "That thing you're embarrassed about? Everyone already knows. They just don't care as much as you think.",
      "The key to happiness is lowering your expectations. Way lower. No, even lower than that.",
      "You're not paranoid if they're really out to get you. By the way, someone's watching you read this right now.",
      "Your browser history would make a more interesting novel than anything currently on the bestseller list.",
      "The next time you go to a public restroom, check for toilet paper BEFORE sitting down. You'll thank us later.",
      "That one wild night in college? Someone still has the pictures. Sweet dreams!",
      "You will receive unexpected money soon. Not because of good luck, but because you forgot you lent it to someone.",
      "Your dating prospects would improve significantly if you stopped talking about your action figure collection on first dates.",
      "The next time someone says 'We need to talk,' it's probably about your search history or your snoring. Or both.",
      "Your weekend plans will be ruined by a sudden case of 'adulting.' Symptoms include paying bills and going to bed at a reasonable hour.",
      "That inappropriate joke you're thinking about telling at the next work meeting? Don't. Just... don't.",
      "Your love life will improve dramatically when you realize that 'Netflix and chill' is not a personality trait.",
      "The person to your right knows what you did last summer. Act normal.",
      "Before criticizing someone, walk a mile in their shoes. That way, when you criticize them, you're a mile away and you have their shoes.",
      "Your password is not as secure as you think. Try adding your pet's embarrassing nickname for better security.",
      "The diet you're planning to start 'next Monday' will be postponed again. The ice cream in your freezer says 'hi'.",
      "Your fashion choices are being quietly judged by at least three people in your immediate vicinity right now.",
      "That 'shortcut' you keep telling people about actually adds 10 minutes to the journey. They're too polite to tell you."
    ];
    
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    setCommands(prev => [
      ...prev,
      { 
        input: "fortune", 
        output: (
          <div className="space-y-2">
            <div className="text-terminal-yellow">
              .-----------------------.<br />
              | Your fortune cookie: |<br />
              '-----------------------'<br />
            </div>
            <div className="text-terminal-green font-medium italic">
              "{randomFortune}"
            </div>
          </div>
        )
      }
    ]);
    
    setTimeout(scrollToBottom, 10);
  };
  
  // Process commands for games
  const processGameInput = (command: string) => {
    // Number guessing game
    if (gameRunning) {
      if (command.toLowerCase() === "quit") {
        setGameRunning(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Number guessing game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        const guess = parseInt(command);
        
        if (isNaN(guess)) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Please enter a valid number between 1 and 100."
            }
          ]);
          return;
        }
        
        const attempts = gameStateObj.attempts + 1;
        let message = "";
        
        if (guess < gameStateObj.number) {
          message = `Too low! Try a higher number. (Attempt ${attempts})`;
        } else if (guess > gameStateObj.number) {
          message = `Too high! Try a lower number. (Attempt ${attempts})`;
        } else {
          message = `Congratulations! You guessed the number ${gameStateObj.number} in ${attempts} attempts!`;
          setGameRunning(false);
        }
        
        setGameState(JSON.stringify({
          ...gameStateObj,
          attempts,
          guess,
          message
        }));
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: message
          }
        ]);
      } catch (error) {
        console.error("Error processing game command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your guess. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Hangman game
    if (hangmanGame) {
      if (command.toLowerCase() === "quit") {
        setHangmanGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Hangman game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.status !== "playing") {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: `Game over! The word was "${gameStateObj.word}". Type "hangman" to play again.`
            }
          ]);
          setHangmanGame(false);
          return;
        }
        
        const guess = command.toLowerCase().trim();
        
        if (guess.length !== 1 || !guess.match(/[a-z]/)) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Please enter a single letter (a-z)."
            }
          ]);
          return;
        }
        
        if (gameStateObj.guessed.includes(guess)) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: `You already guessed "${guess}". Try another letter.`
            }
          ]);
          return;
        }
        
        const newGuessed = [...gameStateObj.guessed, guess];
        let wrong = gameStateObj.wrong;
        let message = "";
        let status = gameStateObj.status;
        
        if (!gameStateObj.word.includes(guess)) {
          wrong += 1;
          message = `Letter "${guess}" is not in the word.`;
          
          if (wrong >= 6) {
            message = `Game over! You were hanged. The word was "${gameStateObj.word}".`;
            status = "lost";
          }
        } else {
          message = `Good guess! Letter "${guess}" is in the word.`;
        }
        
        // Check if player has won
        const revealed = gameStateObj.word.split('').map((letter: string) => 
          newGuessed.includes(letter) ? letter : "_"
        ).join('');
        
        if (!revealed.includes("_")) {
          message = `Congratulations! You guessed the word "${gameStateObj.word}"!`;
          status = "won";
        }
        
        const drawHangman = (wrong: number) => {
          const stages = [
            `
  +---+
  |   |
      |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
          ];
          
          return stages[wrong] || stages[0];
        };
        
        setGameState(JSON.stringify({
          ...gameStateObj,
          guessed: newGuessed,
          wrong,
          status,
          message
        }));
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="font-mono whitespace-pre">
                {drawHangman(wrong)}
                <div className="mt-2">
                  Word: {gameStateObj.word.split('').map((letter: string) => 
                    newGuessed.includes(letter) ? letter + " " : "_ "
                  ).join('')}
                </div>
                <div className="mt-2">
                  Guessed letters: {newGuessed.join(', ')}
                </div>
                <div className="mt-1">
                  {message}
                </div>
                {status !== "playing" && (
                  <div className="mt-2 text-terminal-green">
                    Type "hangman" to play again.
                  </div>
                )}
                {status === "playing" && (
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setHangmanGame(false);
                        setCommands(prev => [
                          ...prev,
                          { 
                            input: "quit", 
                            output: "Hangman game terminated." 
                          }
                        ]);
                      }}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <XIcon className="h-3 w-3" /> Quit Game
                    </button>
                  </div>
                )}
              </div>
            )
          }
        ]);
        
        if (status !== "playing") {
          setHangmanGame(false);
        }
        
      } catch (error) {
        console.error("Error processing hangman command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your guess. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Rock Paper Scissors game
    if (rockPaperScissorsGame) {
      if (command.toLowerCase() === "quit") {
        setRockPaperScissorsGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Rock Paper Scissors game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.status !== "playing") {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Game over! Type 'rps' to play again."
            }
          ]);
          setRockPaperScissorsGame(false);
          return;
        }
        
        const playerChoice = command.toLowerCase().trim();
        
        if (!["rock", "paper", "scissors"].includes(playerChoice)) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Invalid choice. Please type 'rock', 'paper', or 'scissors'."
            }
          ]);
          return;
        }
        
        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        let result = "";
        let playerScore = gameStateObj.playerScore;
        let computerScore = gameStateObj.computerScore;
        
        if (playerChoice === computerChoice) {
          result = "It's a tie!";
        } else if (
          (playerChoice === "rock" && computerChoice === "scissors") ||
          (playerChoice === "paper" && computerChoice === "rock") ||
          (playerChoice === "scissors" && computerChoice === "paper")
        ) {
          result = "You win this round!";
          playerScore++;
        } else {
          result = "Computer wins this round!";
          computerScore++;
        }
        
        const rounds = gameStateObj.rounds + 1;
        let status = "playing";
        let message = result;
        
        if (playerScore >= 3 || computerScore >= 3) {
          status = "finished";
          message = playerScore > computerScore 
            ? `You win the game ${playerScore}-${computerScore}!` 
            : `Computer wins the game ${computerScore}-${playerScore}!`;
        }
        
        setGameState(JSON.stringify({
          ...gameStateObj,
          playerScore,
          computerScore,
          rounds,
          status,
          message
        }));
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="space-y-2">
                <div>You chose: <span className="font-semibold">{playerChoice}</span></div>
                <div>Computer chose: <span className="font-semibold">{computerChoice}</span></div>
                <div className="text-terminal-green font-bold">{result}</div>
                <div className="flex justify-between mt-2">
                  <div>You: {playerScore}</div>
                  <div>Computer: {computerScore}</div>
                </div>
                {status === "finished" ? (
                  <div className="mt-2 text-terminal-yellow font-bold">
                    {message}
                    <div className="mt-1 text-muted-foreground">
                      Type "rps" to play again.
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setRockPaperScissorsGame(false);
                        setCommands(prev => [
                          ...prev,
                          { 
                            input: "quit", 
                            output: "Rock Paper Scissors game terminated." 
                          }
                        ]);
                      }}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <XIcon className="h-3 w-3" /> Quit Game
                    </button>
                  </div>
                )}
              </div>
            )
          }
        ]);
        
        if (status === "finished") {
          setRockPaperScissorsGame(false);
        }
        
      } catch (error) {
        console.error("Error processing RPS command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your choice. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Tic Tac Toe game
    if (ticTacToeGame) {
      if (command.toLowerCase() === "quit") {
        setTicTacToeGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Tic Tac Toe game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.status !== "playing") {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Game over! Type 'tictactoe' to play again."
            }
          ]);
          setTicTacToeGame(false);
          return;
        }
        
        const position = parseInt(command);
        
        if (isNaN(position) || position < 1 || position > 9) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Invalid position. Please enter a number between 1-9."
            }
          ]);
          return;
        }
        
        const index = position - 1;
        
        if (gameStateObj.board[index]) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "That position is already taken. Try another one."
            }
          ]);
          return;
        }
        
        const newBoard = [...gameStateObj.board];
        newBoard[index] = "X";
        
        // Check if player won
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
          [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        let winner = null;
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
            winner = newBoard[a];
            break;
          }
        }
        
        let status = gameStateObj.status;
        let message = "Your turn";
        
        if (winner) {
          status = "finished";
          message = `${winner} wins!`;
        } else if (!newBoard.includes(null)) {
          status = "finished";
          message = "It's a draw!";
        } else {
          // Computer's turn
          const emptySpots = newBoard.map((spot, idx) => spot === null ? idx : -1).filter(idx => idx !== -1);
          
          if (emptySpots.length > 0) {
            const computerMove = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            newBoard[computerMove] = "O";
            
            // Check if computer won
            for (const pattern of winPatterns) {
              const [a, b, c] = pattern;
              if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                winner = newBoard[a];
                break;
              }
            }
            
            if (winner) {
              status = "finished";
              message = `${winner} wins!`;
            } else if (!newBoard.includes(null)) {
              status = "finished";
              message = "It's a draw!";
            }
          }
        }
        
        setGameState(JSON.stringify({
          ...gameStateObj,
          board: newBoard,
          isXNext: !gameStateObj.isXNext,
          status,
          message
        }));
        
        const renderBoard = (board: (string | null)[]) => {
          const displayBoard = board.map((cell, idx) => {
            if (cell === "X") return "X";
            if (cell === "O") return "O";
            return (idx + 1).toString();
          });
          
          return `
   ${displayBoard[0]} | ${displayBoard[1]} | ${displayBoard[2]} 
  ---+---+---
   ${displayBoard[3]} | ${displayBoard[4]} | ${displayBoard[5]} 
  ---+---+---
   ${displayBoard[6]} | ${displayBoard[7]} | ${displayBoard[8]} 
          `;
        };
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="font-mono whitespace-pre">
                {renderBoard(newBoard)}
                <div className="mt-2">
                  {message}
                </div>
                {status === "finished" ? (
                  <div className="mt-1 text-muted-foreground">
                    Type "tictactoe" to play again.
                  </div>
                ) : (
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setTicTacToeGame(false);
                        setCommands(prev => [
                          ...prev,
                          { 
                            input: "quit", 
                            output: "Tic Tac Toe game terminated." 
                          }
                        ]);
                      }}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <XIcon className="h-3 w-3" /> Quit Game
                    </button>
                  </div>
                )}
              </div>
            )
          }
        ]);
        
        if (status === "finished") {
          setTicTacToeGame(false);
        }
        
      } catch (error) {
        console.error("Error processing tic-tac-toe command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your move. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Word Scramble game
    if (wordScrambleGame) {
      if (command.toLowerCase() === "quit") {
        setWordScrambleGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Word Scramble game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        const guess = command.toLowerCase().trim();
        const attempts = gameStateObj.attempts + 1;
        
        if (guess === gameStateObj.word) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-green font-bold">Correct! You unscrambled the word!</div>
                  <div>The word was: <span className="font-mono">{gameStateObj.word}</span></div>
                  <div>You solved it in {attempts} attempt{attempts !== 1 ? 's' : ''}.</div>
                  <div className="mt-1 text-muted-foreground">
                    Type "scramble" to play again with a new word.
                  </div>
                </div>
              )
            }
          ]);
          setWordScrambleGame(false);
        } else {
          let hint = "";
          if (attempts >= 3) {
            hint = `Hint: The word starts with "${gameStateObj.word[0]}".`;
          }
          if (attempts >= 5) {
            const firstTwo = gameStateObj.word.substring(0, 2);
            hint = `Hint: The word starts with "${firstTwo}".`;
          }
          
          setGameState(JSON.stringify({
            ...gameStateObj,
            attempts
          }));
          
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-red">Incorrect guess. Try again!</div>
                  <div>Unscramble: <span className="font-mono">{gameStateObj.scrambled}</span></div>
                  {hint && <div className="text-terminal-yellow">{hint}</div>}
                  <div className="text-muted-foreground">Attempt {attempts}</div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setWordScrambleGame(false);
                        setCommands(prev => [
                          ...prev,
                          { 
                            input: "quit", 
                            output: "Word Scramble game terminated." 
                          }
                        ]);
                      }}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <XIcon className="h-3 w-3" /> Quit Game
                    </button>
                  </div>
                </div>
              )
            }
          ]);
        }
      } catch (error) {
        console.error("Error processing word scramble command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your guess. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Math game
    if (mathGame) {
      if (command.toLowerCase() === "quit") {
        setMathGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Math Challenge game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        const answer = parseInt(command);
        
        if (isNaN(answer)) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Please enter a valid number."
            }
          ]);
          return;
        }
        
        const attempts = gameStateObj.attempts + 1;
        
        if (answer === gameStateObj.answer) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-green font-bold">Correct! 🎉</div>
                  <div>{gameStateObj.num1} {gameStateObj.operator} {gameStateObj.num2} = {gameStateObj.answer}</div>
                  <div>You solved it in {attempts} attempt{attempts !== 1 ? 's' : ''}.</div>
                  <div className="mt-1 text-muted-foreground">
                    Type "math" to play again with a new problem.
                  </div>
                </div>
              )
            }
          ]);
          setMathGame(false);
        } else {
          setGameState(JSON.stringify({
            ...gameStateObj,
            attempts
          }));
          
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-red">Incorrect answer. Try again!</div>
                  <div className="text-xl font-mono">What is {gameStateObj.num1} {gameStateObj.operator} {gameStateObj.num2}?</div>
                  <div className="text-muted-foreground">Attempt {attempts}</div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setMathGame(false);
                        setCommands(prev => [
                          ...prev,
                          { 
                            input: "quit", 
                            output: "Math Challenge game terminated." 
                          }
                        ]);
                      }}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <XIcon className="h-3 w-3" /> Quit Game
                    </button>
                  </div>
                </div>
              )
            }
          ]);
        }
      } catch (error) {
        console.error("Error processing math game command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your answer. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Memory Game
    if (memoryGame) {
      if (command.toLowerCase() === "quit") {
        clearAllAnimations();
        setMemoryGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Memory Game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.showSequence) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Please wait until the sequence is fully displayed."
            }
          ]);
          return;
        }
        
        if (gameStateObj.gameOver) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Game over! Type 'memory' to play again."
            }
          ]);
          setMemoryGame(false);
          return;
        }
        
        const userInput = command.trim();
        const correctSequence = gameStateObj.sequence.join("");
        
        if (userInput === correctSequence) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-green font-bold">Correct! You have an excellent memory!</div>
                  <div>The sequence was: <span className="font-mono text-terminal-yellow">{gameStateObj.sequence.join(" ")}</span></div>
                  <div className="mt-1 text-muted-foreground">
                    Type "memory" to play again with a new sequence.
                  </div>
                </div>
              )
            }
          ]);
          setMemoryGame(false);
        } else {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className="text-terminal-red">Incorrect! The correct sequence was:</div>
                  <div className="font-mono text-terminal-yellow">{gameStateObj.sequence.join(" ")}</div>
                  <div className="mt-1 text-muted-foreground">
                    Type "memory" to play again.
                  </div>
                </div>
              )
            }
          ]);
          setMemoryGame(false);
        }
      } catch (error) {
        console.error("Error processing memory game command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your input. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Color Match Game
    if (colorMatchGame) {
      if (command.toLowerCase() === "quit") {
        clearAllAnimations();
        setColorMatchGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Color Match game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.gameOver) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Game over! Type 'colormatch' to play again."
            }
          ]);
          setColorMatchGame(false);
          return;
        }
        
        const answer = command.toLowerCase().trim();
        let isCorrect = false;
        
        if ((answer === 'y' || answer === 'yes') && gameStateObj.isMatch) {
          isCorrect = true;
        } else if ((answer === 'n' || answer === 'no') && !gameStateObj.isMatch) {
          isCorrect = true;
        }
        
        // Update score
        const newScore = isCorrect ? gameStateObj.score + 1 : gameStateObj.score;
        const newRound = gameStateObj.round + 1;
        
        // Check if game should end
        if (newRound > gameStateObj.maxRounds) {
          clearInterval(gameIntervalRef.current as NodeJS.Timeout);
          
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: (
                <div className="space-y-2">
                  <div className={isCorrect ? "text-terminal-green" : "text-terminal-red"}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                  </div>
                  <div className="text-terminal-yellow">Game complete!</div>
                  <div>Final score: {newScore}/{gameStateObj.maxRounds}</div>
                  <div className="text-muted-foreground mt-1">
                    Type "colormatch" to play again.
                  </div>
                </div>
              )
            }
          ]);
          
          setColorMatchGame(false);
          return;
        }
        
        // Set up next round
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const colorWords = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
        
        const colorIndex = Math.floor(Math.random() * colors.length);
        const wordIndex = Math.floor(Math.random() * colorWords.length);
        
        const displayedColor = colors[colorIndex];
        const displayedWord = colorWords[wordIndex];
        const isMatch = colorIndex === wordIndex;
        
        setGameState(JSON.stringify({
          colorIndex,
          wordIndex,
          displayedColor,
          displayedWord,
          isMatch,
          score: newScore,
          round: newRound,
          maxRounds: gameStateObj.maxRounds,
          timeLeft: 5,
          gameOver: false,
          message: "Does the COLOR of the word match its MEANING? (y/n)"
        }));
        
        clearInterval(gameIntervalRef.current as NodeJS.Timeout);
        
        // Start countdown for new round
        const intervalId = setInterval(() => {
          setGameState(prevState => {
            const state = JSON.parse(prevState);
            
            if (state.timeLeft <= 1) {
              clearInterval(intervalId);
              
              setCommands(prev => {
                const newCommands = [...prev];
                
                newCommands[newCommands.length - 1].output = (
                  <div className="space-y-2">
                    <div className="font-bold text-terminal-green">Color Match</div>
                    <div className={`text-${state.displayedColor}-500 font-bold text-2xl text-center`}>
                      {state.displayedWord}
                    </div>
                    <div className="text-terminal-red">Time's up!</div>
                    <div className="text-terminal-yellow">Final score: {state.score}/{state.maxRounds}</div>
                    <div className="text-muted-foreground">Type "colormatch" to play again.</div>
                  </div>
                );
                
                return newCommands;
              });
              
              setColorMatchGame(false);
              
              return JSON.stringify({
                ...state,
                timeLeft: 0,
                gameOver: true
              });
            }
            
            return JSON.stringify({
              ...state,
              timeLeft: state.timeLeft - 1
            });
          });
          
          setCommands(prev => {
            const state = JSON.parse(gameState);
            const newCommands = [...prev];
            
            newCommands[newCommands.length - 1].output = (
              <div className="space-y-2">
                <div className="font-bold text-terminal-green">Color Match</div>
                <div className={`text-${state.displayedColor}-500 font-bold text-2xl text-center`}>
                  {state.displayedWord}
                </div>
                <div className="flex justify-between">
                  <div>Round: {state.round}/{state.maxRounds}</div>
                  <div>Score: {state.score}</div>
                  <div>Time: {state.timeLeft}s</div>
                </div>
                <div className="text-muted-foreground">
                  Does the COLOR of the word match its MEANING? (y/n)
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      clearInterval(intervalId);
                      setColorMatchGame(false);
                      setCommands(prev => [
                        ...prev,
                        { 
                          input: "quit", 
                          output: "Color Match game terminated." 
                        }
                      ]);
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <XIcon className="h-3 w-3" /> Quit Game
                  </button>
                </div>
              </div>
            );
            
            return newCommands;
          });
        }, 1000);
        
        gameIntervalRef.current = intervalId;
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="space-y-2">
                <div className={isCorrect ? "text-terminal-green font-bold" : "text-terminal-red font-bold"}>
                  {isCorrect ? "Correct!" : "Wrong!"}
                </div>
                <div className="mt-2 font-bold text-terminal-green">Next Round</div>
                <div className={`text-${displayedColor}-500 font-bold text-2xl text-center`}>
                  {displayedWord}
                </div>
                <div className="flex justify-between">
                  <div>Round: {newRound}/{gameStateObj.maxRounds}</div>
                  <div>Score: {newScore}</div>
                  <div>Time: 5s</div>
                </div>
                <div className="text-muted-foreground">
                  Does the COLOR of the word match its MEANING? (y/n)
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      clearInterval(intervalId);
                      setColorMatchGame(false);
                      setCommands(prev => [
                        ...prev,
                        { 
                          input: "quit", 
                          output: "Color Match game terminated." 
                        }
                      ]);
                    }}
                    className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <XIcon className="h-3 w-3" /> Quit Game
                  </button>
                </div>
              </div>
            )
          }
        ]);
      } catch (error) {
        console.error("Error processing color match command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your answer. Please try again with 'y' or 'n'."
          }
        ]);
      }
      return;
    }
    
    // Snake Game
    if (snakeGame) {
      if (command.toLowerCase() === "quit") {
        clearAllAnimations();
        setSnakeGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "Snake game terminated." 
          }
        ]);
        return;
      }
      
      try {
        const gameStateObj = JSON.parse(gameState);
        
        if (gameStateObj.gameOver) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "Game over! Type 'snake' to play again."
            }
          ]);
          return;
        }
        
        let newDirection = gameStateObj.direction;
        
        switch (command.toLowerCase()) {
          case 'w': 
          case 'up': 
            newDirection = 'up'; 
            break;
          case 'a': 
          case 'left': 
            newDirection = 'left'; 
            break;
          case 's': 
          case 'down': 
            newDirection = 'down'; 
            break;
          case 'd': 
          case 'right': 
            newDirection = 'right'; 
            break;
          default:
            setCommands(prev => [
              ...prev,
              { 
                input: command, 
                output: "Use WASD keys to control the snake."
              }
            ]);
            return;
        }
        
        // Prevent 180° turns
        const {direction} = gameStateObj;
        if (
          (direction === 'up' && newDirection === 'down') ||
          (direction === 'down' && newDirection === 'up') ||
          (direction === 'left' && newDirection === 'right') ||
          (direction === 'right' && newDirection === 'left')
        ) {
          setCommands(prev => [
            ...prev,
            { 
              input: command, 
              output: "You can't turn 180 degrees!"
            }
          ]);
          return;
        }
        
        setGameState(JSON.stringify({
          ...gameStateObj,
          direction: newDirection
        }));
        
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: `Changed direction to ${newDirection}.`
          }
        ]);
      } catch (error) {
        console.error("Error processing snake game command:", error);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "There was an error processing your input. Please try again."
          }
        ]);
      }
      return;
    }
    
    // Red Pill Blue Pill Game
    if (redPillBluePillGame) {
      const input = command.toLowerCase().trim();
      
      if (input === "quit") {
        setRedPillBluePillGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "You decided not to choose any pill. Smart move."
          }
        ]);
        return;
      }
      
      if (input === "red" || input === "red pill" || input === "take red" || input === "take red pill") {
        setRedPillBluePillGame(false);
        runMatrixAnimation();
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "You take the red pill... welcome to the real world. The Matrix has you..."
          }
        ]);
        return;
      }
      
      if (input === "blue" || input === "blue pill" || input === "take blue" || input === "take blue pill") {
        setRedPillBluePillGame(false);
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: "You take the blue pill. The story ends, you wake up in your bed and believe whatever you want to believe..."
          }
        ]);
        return;
      }
      
      setCommands(prev => [
        ...prev,
        { 
          input: command, 
          output: "Choose 'red pill' or 'blue pill'. Or type 'quit' to leave."
        }
      ]);
      return;
    }
  };

  // Simple file system emulation
  const files = {
    "README.md": "# Terminal Demo\n\nThis is a demo of the interactive terminal component. You can use commands like `ls`, `cat`, `whoami`, etc. to interact with the virtual file system.",
    "hello.txt": "Hello, world! This is a text file in the virtual file system.",
    "about.txt": "This terminal is a React component that simulates a command-line interface.",
    "projects.json": "{\n  \"projects\": [\n    {\n      \"name\": \"Cloud Migration\",\n      \"description\": \"Migrating on-premises infrastructure to AWS\"\n    },\n    {\n      \"name\": \"Kubernetes Platform\",\n      \"description\": \"Building a container orchestration platform\"\n    },\n    {\n      \"name\": \"CI/CD Pipeline\",\n      \"description\": \"Automating software delivery with GitHub Actions\"\n    }\n  ]\n}"
  };

  // Help command output
  const helpOutput = (
    <div className="space-y-2">
      <div className="font-bold text-terminal-green">Available Commands:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        <div><span className="text-terminal-yellow">help</span> - Display this help message</div>
        <div><span className="text-terminal-yellow">clear</span> - Clear the terminal</div>
        <div><span className="text-terminal-yellow">ls</span> - List files</div>
        <div><span className="text-terminal-yellow">cat [filename]</span> - Display file contents</div>
        <div><span className="text-terminal-yellow">whoami</span> - Display user info</div>
        <div><span className="text-terminal-yellow">date</span> - Show current date and time</div>
        <div><span className="text-terminal-yellow">echo [text]</span> - Display text</div>
        <div><span className="text-terminal-yellow">matrix</span> - Run Matrix animation</div>
        <div><span className="text-terminal-yellow">sl</span> - Steam locomotive animation</div>
        <div><span className="text-terminal-yellow">fortune</span> - Random fortune cookie</div>
      </div>
      
      <div className="font-bold text-terminal-green mt-3">Games:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        <div><span className="text-terminal-yellow">numguess</span> - Number guessing game</div>
        <div><span className="text-terminal-yellow">hangman</span> - Hangman word game</div>
        <div><span className="text-terminal-yellow">rps</span> - Rock Paper Scissors</div>
        <div><span className="text-terminal-yellow">tictactoe</span> - Tic Tac Toe game</div>
        <div><span className="text-terminal-yellow">scramble</span> - Word scramble game</div>
        <div><span className="text-terminal-yellow">math</span> - Math challenge</div>
        <div><span className="text-terminal-yellow">memory</span> - Memory sequence game</div>
        <div><span className="text-terminal-yellow">colormatch</span> - Color matching game</div>
        <div><span className="text-terminal-yellow">snake</span> - Snake game (WASD controls)</div>
        <div><span className="text-terminal-yellow">rabbit</span> - Special rabbit game</div>
      </div>
      
      <div className="font-bold text-terminal-green mt-3">ASCII Art:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
        <div><span className="text-terminal-yellow">bunny</span> - Show ASCII bunny</div>
        <div><span className="text-terminal-yellow">kitty</span> - Show ASCII cat</div>
        <div><span className="text-terminal-yellow">doggy</span> - Show ASCII dog</div>
        <div><span className="text-terminal-yellow">cow</span> - Show ASCII cow</div>
        <div><span className="text-terminal-yellow">tux</span> - Show ASCII Tux (Linux)</div>
        <div><span className="text-terminal-yellow">computer</span> - Show ASCII computer</div>
        <div><span className="text-terminal-yellow">bug</span> - Show ASCII bug</div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Press Ctrl+C or type "quit" to interrupt any running animation or game.
      </div>
    </div>
  );

  // Process a command
  const processCommand = (command: string) => {
    // If a game is active, process the input as a game command
    if (gameRunning || hangmanGame || rockPaperScissorsGame || ticTacToeGame || wordScrambleGame || mathGame || 
        memoryGame || colorMatchGame || snakeGame || redPillBluePillGame) {
      processGameInput(command);
      return;
    }
    
    const commandParts = command.split(' ');
    const cmd = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);
    
    switch(cmd) {
      case 'help':
        setCommands(prev => [
          ...prev,
          { input: command, output: helpOutput }
        ]);
        break;
        
      case 'clear':
        setCommands([]);
        break;
        
      case 'ls':
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.keys(files).map(fileName => (
                  <div key={fileName} className="text-terminal-blue">{fileName}</div>
                ))}
              </div>
            )
          }
        ]);
        break;
        
      case 'cat':
        if (args.length === 0) {
          setCommands(prev => [
            ...prev,
            { input: command, output: "Usage: cat [filename]" }
          ]);
        } else {
          const fileName = args[0];
          if (files[fileName]) {
            setCommands(prev => [
              ...prev,
              { 
                input: command, 
                output: (
                  <div className="whitespace-pre-wrap font-mono">
                    {files[fileName]}
                  </div>
                )
              }
            ]);
          } else {
            setCommands(prev => [
              ...prev,
              { input: command, output: `File not found: ${fileName}` }
            ]);
          }
        }
        break;
        
      case 'whoami':
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: (
              <div className="space-y-1">
                <div><span className="font-bold">User:</span> neo</div>
                <div><span className="font-bold">Role:</span> Cloud DevOps Engineer</div>
                <div><span className="font-bold">Location:</span> Matrix</div>
              </div>
            )
          }
        ]);
        break;
        
      case 'date':
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: new Date().toString() 
          }
        ]);
        break;
        
      case 'echo':
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: args.join(' ') || " " 
          }
        ]);
        break;
        
      case 'matrix':
        runMatrixAnimation();
        break;
        
      case 'sl':
        runTrainAnimation();
        break;
        
      case 'numguess':
        startNumberGame();
        break;
        
      case 'hangman':
        startHangmanGame();
        break;
        
      case 'rps':
        startRockPaperScissors();
        break;
        
      case 'tictactoe':
        startTicTacToe();
        break;
        
      case 'scramble':
        startWordScramble();
        break;
        
      case 'math':
        startMathGame();
        break;
        
      case 'memory':
        startMemoryGame();
        break;
        
      case 'colormatch':
        startColorMatchGame();
        break;
        
      case 'snake':
        startSnakeGame();
        break;
        
      case 'rabbit':
        startRedPillBluePillGame();
        break;
        
      case 'fortune':
        showFortune();
        break;
        
      case 'bunny':
      case 'kitty':
      case 'doggy':
      case 'cow':
      case 'tux':
      case 'computer':
      case 'bug':
        showAsciiArt(cmd);
        break;
        
      default:
        setCommands(prev => [
          ...prev,
          { 
            input: command, 
            output: `Command not found: ${command}. Type 'help' for available commands.` 
          }
        ]);
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="h-3 w-3 rounded-full bg-terminal-red"></div>
        <div className="h-3 w-3 rounded-full bg-terminal-yellow"></div>
        <div className="h-3 w-3 rounded-full bg-terminal-green"></div>
        <div className="ml-2 text-xs text-muted-foreground">terminal</div>
      </div>
      <div 
        ref={terminalRef}
        className={cn(
          "terminal-body w-full scrollbar-thin overflow-y-auto font-mono", 
          className,
          glowEffect && "shadow-terminal"
        )}
      >
        {welcomeMessage && (
          <div className="welcome-message text-muted-foreground mb-4 whitespace-pre-wrap">
            {welcomeMessage}
          </div>
        )}
        
        {commands.map((command, index) => (
          <div key={index} className="mb-4">
            <div className="command-line">
              <span className="command-prompt">$</span>
              <span className="command-input ml-2">{command.input}</span>
            </div>
            <div className="command-output mt-1">
              {command.output}
            </div>
          </div>
        ))}
        
        <div className="command-line">
          <span className="command-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                const command = input.trim();
                setInput('');
                setHistory(prev => [...prev, command]);
                setHistoryIndex(-1);
                
                processCommand(command);
              } else if (e.key === 'ArrowUp') {
                if (history.length > 0 && historyIndex < history.length - 1) {
                  const newIndex = historyIndex + 1;
                  setHistoryIndex(newIndex);
                  setInput(history[history.length - 1 - newIndex]);
                }
              } else if (e.key === 'ArrowDown') {
                if (historyIndex > 0) {
                  const newIndex = historyIndex - 1;
                  setHistoryIndex(newIndex);
                  setInput(history[history.length - 1 - newIndex]);
                } else if (historyIndex === 0) {
                  setHistoryIndex(-1);
                  setInput('');
                }
              }
            }}
            className="terminal-input bg-transparent border-none outline-none flex-1 text-inherit ml-2 w-full"
            placeholder=""
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
