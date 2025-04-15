
// Simple terminal games

// 1. Tic Tac Toe game
export const ticTacToe = () => {
  let board = [
    ["·", "·", "·"],
    ["·", "·", "·"],
    ["·", "·", "·"]
  ];
  let currentPlayer = "X";
  let gameOver = false;
  let winner = null;
  let turns = 0;
  
  const renderBoard = () => {
    return `
  0 1 2
0 ${board[0][0]} ${board[0][1]} ${board[0][2]}
1 ${board[1][0]} ${board[1][1]} ${board[1][2]}
2 ${board[2][0]} ${board[2][1]} ${board[2][2]}

Current player: ${currentPlayer}
Type: "play row col" to make a move (e.g., "play 0 1")
Type: "quit" to exit the game
`;
  };
  
  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "·" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0];
      }
    }
    
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] !== "·" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return board[0][i];
      }
    }
    
    // Check diagonals
    if (board[0][0] !== "·" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] !== "·" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2];
    }
    
    return null;
  };
  
  const makeMove = (row: number, col: number) => {
    if (gameOver) return "Game is over. Type 'tic-tac-toe' to play again.";
    
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return "Invalid position. Row and column must be between 0 and 2.";
    }
    
    if (board[row][col] !== "·") {
      return "That position is already taken.";
    }
    
    board[row][col] = currentPlayer;
    turns++;
    
    const win = checkWinner();
    if (win) {
      gameOver = true;
      winner = win;
      return `${renderBoard()}\nPlayer ${winner} wins! Type 'tic-tac-toe' to play again.`;
    } else if (turns === 9) {
      gameOver = true;
      return `${renderBoard()}\nIt's a draw! Type 'tic-tac-toe' to play again.`;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      return renderBoard();
    }
  };
  
  return {
    start: () => renderBoard(),
    makeMove,
    isOver: () => gameOver,
    quit: () => "Tic Tac Toe game exited."
  };
};

// 2. Hangman game
export const hangman = () => {
  const words = [
    "javascript", "python", "typescript", "react", "angular", "vue", "svelte", 
    "node", "express", "mongodb", "mysql", "postgres", "docker", "kubernetes",
    "algorithm", "function", "variable", "component", "promise", "async"
  ];
  
  const randomWord = words[Math.floor(Math.random() * words.length)];
  let guessedLetters: string[] = [];
  let wrongGuesses = 0;
  const maxWrongGuesses = 6;
  let gameOver = false;
  
  const hangmanStages = [
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
  
  const getMaskedWord = () => {
    return randomWord
      .split("")
      .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };
  
  const renderGame = () => {
    return `
${hangmanStages[wrongGuesses]}

Word: ${getMaskedWord()}

Guessed letters: ${guessedLetters.join(", ") || "None"}
Wrong guesses: ${wrongGuesses} of ${maxWrongGuesses}

Type a letter to guess, or "quit" to exit the game
`;
  };
  
  const guessLetter = (letter: string) => {
    if (gameOver) return "Game is over. Type 'hangman' to play again.";
    
    letter = letter.toLowerCase();
    
    if (!/^[a-z]$/.test(letter)) {
      return "Please enter a single letter (a-z).";
    }
    
    if (guessedLetters.includes(letter)) {
      return `You already guessed the letter "${letter}". Try another letter.`;
    }
    
    guessedLetters.push(letter);
    
    if (!randomWord.includes(letter)) {
      wrongGuesses++;
    }
    
    // Check if player won
    const maskedWord = getMaskedWord();
    if (!maskedWord.includes("_")) {
      gameOver = true;
      return `
${hangmanStages[wrongGuesses]}

Word: ${randomWord}

Congratulations! You won!
Type 'hangman' to play again.`;
    }
    
    // Check if player lost
    if (wrongGuesses >= maxWrongGuesses) {
      gameOver = true;
      return `
${hangmanStages[wrongGuesses]}

Word: ${randomWord}

Game over! The word was "${randomWord}".
Type 'hangman' to play again.`;
    }
    
    return renderGame();
  };
  
  return {
    start: () => renderGame(),
    guessLetter,
    isOver: () => gameOver,
    quit: () => "Hangman game exited."
  };
};

// 3. Rock Paper Scissors
export const rockPaperScissors = () => {
  let playerScore = 0;
  let computerScore = 0;
  let gameOver = false;
  
  const choices = ["rock", "paper", "scissors"];
  
  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };
  
  const determineWinner = (playerChoice: string, computerChoice: string) => {
    if (playerChoice === computerChoice) {
      return "It's a tie!";
    }
    
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
      return "You win!";
    } else {
      computerScore++;
      return "Computer wins!";
    }
  };
  
  const renderGame = () => {
    return `
ROCK, PAPER, SCISSORS

Score: You ${playerScore} - ${computerScore} Computer

Type "rock", "paper", or "scissors" to play
Type "quit" to exit the game
`;
  };
  
  const play = (playerChoice: string) => {
    if (gameOver) return "Game is over. Type 'rps' to play again.";
    
    playerChoice = playerChoice.toLowerCase();
    
    if (!choices.includes(playerChoice)) {
      return `Invalid choice. Choose "rock", "paper", or "scissors".`;
    }
    
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    return `
Your choice: ${playerChoice}
Computer's choice: ${computerChoice}

${result}

Score: You ${playerScore} - ${computerScore} Computer

Type "rock", "paper", or "scissors" to play again
Type "quit" to exit the game
`;
  };
  
  return {
    start: () => renderGame(),
    play,
    isOver: () => gameOver,
    quit: () => "Rock Paper Scissors game exited."
  };
};

// 4. Number Guessing Game
export const numberGuessingGame = () => {
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let gameOver = false;
  
  const renderGame = () => {
    return `
NUMBER GUESSING GAME

I'm thinking of a number between 1 and 100.
Can you guess what it is?

Type a number to guess, or "quit" to exit the game
`;
  };
  
  const makeGuess = (guess: number) => {
    if (gameOver) return "Game is over. Type 'game' to play again.";
    
    if (isNaN(guess)) {
      return "Please enter a valid number.";
    }
    
    attempts++;
    
    if (guess === secretNumber) {
      gameOver = true;
      return `You got it in ${attempts} attempts! The number was ${secretNumber}.
Type 'game' to play again.`;
    } else if (guess < secretNumber) {
      return `Higher than ${guess}! Try again.`;
    } else {
      return `Lower than ${guess}! Try again.`;
    }
  };
  
  return {
    start: () => renderGame(),
    makeGuess,
    isOver: () => gameOver,
    quit: () => "Number guessing game exited."
  };
};

// 5. Snake game (Visual ASCII Game)
export const snakeGame = () => {
  const width = 20;
  const height = 10;
  let snake = [{ x: 5, y: 5 }];
  let food = { x: 10, y: 5 };
  let direction = "right";
  let gameOver = false;
  let score = 0;
  let gameLoopId: number | null = null;
  
  const randomPos = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  };
  
  const renderBoard = () => {
    let board = Array(height).fill(0).map(() => Array(width).fill(" "));
    
    // Place food
    board[food.y][food.x] = "●";
    
    // Place snake
    snake.forEach((segment, index) => {
      if (segment.x >= 0 && segment.x < width && segment.y >= 0 && segment.y < height) {
        board[segment.y][segment.x] = index === 0 ? "█" : "■";
      }
    });
    
    // Build the board string
    let boardString = "+" + "─".repeat(width) + "+\n";
    
    for (let y = 0; y < height; y++) {
      boardString += "|";
      for (let x = 0; x < width; x++) {
        boardString += board[y][x];
      }
      boardString += "|\n";
    }
    
    boardString += "+" + "─".repeat(width) + "+\n";
    
    return `
SNAKE GAME - Score: ${score}

${boardString}
Use WASD to move the snake (w=up, a=left, s=down, d=right)
Type "quit" to exit the game
`;
  };
  
  const move = (dir: string) => {
    if (gameOver) return;
    
    switch (dir.toLowerCase()) {
      case "w":
        if (direction !== "down") direction = "up";
        break;
      case "a":
        if (direction !== "right") direction = "left";
        break;
      case "s":
        if (direction !== "up") direction = "down";
        break;
      case "d":
        if (direction !== "left") direction = "right";
        break;
    }
  };
  
  const update = () => {
    const head = { ...snake[0] };
    
    // Move the head based on direction
    switch (direction) {
      case "up": head.y--; break;
      case "down": head.y++; break;
      case "left": head.x--; break;
      case "right": head.x++; break;
    }
    
    // Check for collisions
    if (
      head.x < 0 || head.x >= width ||
      head.y < 0 || head.y >= height ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      gameOver = true;
      if (gameLoopId) clearInterval(gameLoopId);
      return `
GAME OVER!
Final Score: ${score}

Type "snake" to play again, or "quit" to exit.
`;
    }
    
    // Add the new head
    snake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      food = randomPos();
      // Don't remove the tail so the snake grows
    } else {
      // Remove the tail
      snake.pop();
    }
    
    return renderBoard();
  };
  
  const start = () => {
    return renderBoard();
  };
  
  return {
    start,
    move,
    update,
    isOver: () => gameOver,
    quit: () => {
      if (gameLoopId) clearInterval(gameLoopId);
      return "Snake game exited.";
    },
    setGameLoopId: (id: number) => {
      gameLoopId = id;
    }
  };
};

// 6. Math Game
export const mathGame = () => {
  let score = 0;
  let currentProblem = null;
  let gameOver = false;
  let gameLoopId = null;
  let difficulty = 'easy';
  let maxRounds = 10;
  let currentRound = 0;
  
  const generateProblem = () => {
    let a, b, operator, solution, operatorSymbol;
    
    switch (difficulty) {
      case 'easy':
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        operator = Math.floor(Math.random() * 2); // 0: addition, 1: subtraction
        break;
      case 'medium':
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        operator = Math.floor(Math.random() * 3); // 0: addition, 1: subtraction, 2: multiplication
        break;
      case 'hard':
        a = Math.floor(Math.random() * 50) + 1;
        b = Math.floor(Math.random() * 30) + 1;
        operator = Math.floor(Math.random() * 4); // 0: addition, 1: subtraction, 2: multiplication, 3: division
        // For division, ensure we have clean integers
        if (operator === 3) {
          b = Math.floor(Math.random() * 10) + 1;
          a = b * Math.floor(Math.random() * 10) + 1;
        }
        break;
      default:
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        operator = 0;
    }
    
    // Calculate solution based on operator
    switch (operator) {
      case 0:
        solution = a + b;
        operatorSymbol = '+';
        break;
      case 1:
        // Ensure a ≥ b for subtraction to avoid negative numbers in easy/medium modes
        if (a < b && difficulty !== 'hard') {
          [a, b] = [b, a];
        }
        solution = a - b;
        operatorSymbol = '-';
        break;
      case 2:
        solution = a * b;
        operatorSymbol = '*';
        break;
      case 3:
        solution = a / b;
        operatorSymbol = '/';
        break;
    }
    
    return {
      a,
      b,
      operatorSymbol,
      solution,
      problemText: `${a} ${operatorSymbol} ${b} = ?`
    };
  };
  
  const renderGame = () => {
    currentRound++;
    if (currentRound > maxRounds) {
      gameOver = true;
      return `
MATH GAME COMPLETED!

Final Score: ${score}/${maxRounds}
${score === maxRounds ? "Perfect score! You're a math genius!" : 
  score >= maxRounds * 0.7 ? "Great job!" : 
  score >= maxRounds * 0.5 ? "Good effort!" : 
  "Keep practicing!"}

Type "math" to play again.
      `;
    }
    
    currentProblem = generateProblem();
    
    return `
MATH GAME - Round ${currentRound}/${maxRounds} - Score: ${score}

Solve this problem: ${currentProblem.problemText}

Type your answer and press Enter.
Type "quit" to exit or "difficulty" to change difficulty.
    `;
  };
  
  const checkAnswer = (answer) => {
    if (gameOver) return "Game is over. Type 'math' to play again.";
    
    if (answer.toLowerCase() === "difficulty") {
      return `
Current difficulty: ${difficulty}

Type "easy", "medium", or "hard" to change difficulty:
- easy: Addition and subtraction with numbers 1-10
- medium: Addition, subtraction, and multiplication with numbers 1-20
- hard: All operations including division with numbers 1-50
      `;
    }
    
    if (answer.toLowerCase() === "easy" || answer.toLowerCase() === "medium" || answer.toLowerCase() === "hard") {
      difficulty = answer.toLowerCase();
      return `
Difficulty set to ${difficulty}!

${renderGame()}
      `;
    }
    
    const userAnswer = parseFloat(answer);
    
    if (isNaN(userAnswer)) {
      return "Please enter a valid number as your answer.";
    }
    
    const isCorrect = Math.abs(userAnswer - currentProblem.solution) < 0.001;
    
    if (isCorrect) {
      score++;
      return `
Correct! ${currentProblem.problemText} ${currentProblem.solution}

${renderGame()}
      `;
    } else {
      return `
Incorrect! The answer to ${currentProblem.problemText} is ${currentProblem.solution}

${renderGame()}
      `;
    }
  };
  
  return {
    start: () => {
      score = 0;
      gameOver = false;
      currentRound = 0;
      return `
MATH GAME

Test your math skills with various arithmetic problems!
Difficulty: ${difficulty} (type "difficulty" to change)

${renderGame()}
      `;
    },
    checkAnswer,
    isOver: () => gameOver,
    quit: () => {
      if (gameLoopId) clearInterval(gameLoopId);
      return "Math game exited.";
    },
    setGameLoopId: (id) => {
      gameLoopId = id;
    }
  };
};

// 7. Red Pill Blue Pill Rabbit Hole Game
export const rabbitHoleGame = () => {
  let currentState = "start";
  let gameOver = false;
  
  const states = {
    start: {
      text: `
      *********************************************************
      *                                                       *
      *    "Let me tell you why you're here. You're here      *
      *     because you know something. What you know you     *
      *     can't explain, but you feel it. You've felt it    *
      *     your entire life, that there's something wrong    *
      *     with the world. You don't know what it is, but    *
      *     it's there, like a splinter in your mind,         *
      *     driving you mad."                                 *
      *                                                       *
      *********************************************************
      
      The choice is yours:
      
      Type "red" for the red pill - see how deep the rabbit hole goes
      Type "blue" for the blue pill - return to a life of blissful ignorance
      Type "quit" to exit this simulation
      `,
      options: {
        red: "matrix",
        blue: "blue"
      }
    },
    matrix: {
      text: `
      *********************************************************
      *                                                       *
      *    "Remember... all I'm offering is the truth.        *
      *     Nothing more."                                    *
      *                                                       *
      *    The red pill dissolves on your tongue.             *
      *    Your surroundings begin to warp and dissolve...    *
      *                                                       *
      *********************************************************
      
      Type "wake" to wake up
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup"
      }
    },
    wakeup: {
      text: `
      *********************************************************
      *                                                       *
      *    You wake up disoriented in a pod of red liquid.    *
      *    Tubes and wires extend from your body.             *
      *    Thousands of pods surround you, each containing    *
      *    a sleeping human...                                *
      *                                                       *
      *    "Welcome to the real world."                       *
      *                                                       *
      *********************************************************
      
      Type "follow" to follow the white rabbit
      Type "nebuchadnezzar" to board the ship
      Type "quit" to exit this simulation
      `,
      options: {
        follow: "follow",
        nebuchadnezzar: "ship"
      }
    },
    ship: {
      text: `
      *********************************************************
      *                                                       *
      *    You're brought aboard the Nebuchadnezzar.          *
      *    Your muscles are atrophied. You've never used      *
      *    them before.                                       *
      *                                                       *
      *    "We've freed your mind, but your body still        *
      *     requires time to adjust to the real world."       *
      *                                                       *
      *********************************************************
      
      Type "training" to begin combat training
      Type "operator" to speak with the operator
      Type "quit" to exit this simulation
      `,
      options: {
        training: "training",
        operator: "operator"
      }
    },
    operator: {
      text: `
      *********************************************************
      *                                                       *
      *    "Operator speaking. What do you need?"             *
      *                                                       *
      *    "I can help with training programs, or I can       *
      *     establish an exit for when you're in the Matrix." *
      *                                                       *
      *    "Just let me know what you need..."                *
      *                                                       *
      *********************************************************
      
      Type "program" to load a training program
      Type "exit" to find the nearest exit
      Type "quit" to exit this simulation
      `,
      options: {
        program: "kunfu",
        exit: "phonebooth"
      }
    },
    phonebooth: {
      text: `
      *********************************************************
      *                                                       *
      *    "I've got a phone booth three blocks away at       *
      *     the corner of Wabash and Lake. Get there."        *
      *                                                       *
      *    You can see agents approaching in the distance.    *
      *    The phone starts ringing...                        *
      *                                                       *
      *********************************************************
      
      Type "answer" to pick up the phone
      Type "fight" to stand your ground against the agents
      Type "quit" to exit this simulation
      `,
      options: {
        answer: "escape",
        fight: "agents"
      }
    },
    agents: {
      text: `
      *********************************************************
      *                                                       *
      *    "What are you doing? Run!"                         *
      *                                                       *
      *    The agents approach. One adjusts his earpiece.     *
      *                                                       *
      *    "Mr. Anderson..."                                  *
      *                                                       *
      *    You're not ready for this fight.                   *
      *                                                       *
      *********************************************************
      
      Type "run" to flee to the phone booth
      Type "fight" to attempt the impossible
      Type "quit" to exit this simulation
      `,
      options: {
        run: "escape",
        fight: "death"
      }
    },
    death: {
      text: `
      *********************************************************
      *                                                       *
      *    You fight valiantly, but the agents are too        *
      *    powerful. You're not The One. Not yet.             *
      *                                                       *
      *    "Do you hear that, Mr. Anderson? That's the        *
      *     sound of inevitability. It's the sound of         *
      *     your death."                                      *
      *                                                       *
      *********************************************************
      
      Type "restart" to start over
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start"
      }
    },
    escape: {
      text: `
      *********************************************************
      *                                                       *
      *    You answer the ringing phone and feel a sudden     *
      *    rush as your consciousness is pulled back to       *
      *    your body on the Nebuchadnezzar.                   *
      *                                                       *
      *    "Nicely done. Unplugging before the agents         *
      *     could get to you. You're learning."               *
      *                                                       *
      *********************************************************
      
      Type "oracle" to visit the Oracle
      Type "training" to continue training
      Type "quit" to exit this simulation
      `,
      options: {
        oracle: "oracle",
        training: "training"
      }
    },
    training: {
      text: `
      *********************************************************
      *                                                       *
      *    "I know kung fu."                                  *
      *                                                       *
      *    "Show me."                                         *
      *                                                       *
      *    You spar with Morpheus in the construct.           *
      *    His movements are incredibly fast, but you         *
      *    begin to see patterns, possibilities...            *
      *                                                       *
      *********************************************************
      
      Type "faster" to move faster
      Type "jump" to attempt the jump program
      Type "quit" to exit this simulation
      `,
      options: {
        faster: "believe",
        jump: "jump"
      }
    },
    jump: {
      text: `
      *********************************************************
      *                                                       *
      *    You stand at the edge of one skyscraper,           *
      *    looking across the vast gap to another.            *
      *                                                       *
      *    "Nobody makes their first jump."                   *
      *                                                       *
      *    You prepare, run, leap... and fall.                *
      *                                                       *
      *********************************************************
      
      Type "again" to try the jump again
      Type "continue" to move on to other training
      Type "quit" to exit this simulation
      `,
      options: {
        again: "jump",
        continue: "training" 
      }
    },
    kunfu: {
      text: `
      *********************************************************
      *                                                       *
      *    Your eyes flutter as gigabytes of martial arts     *
      *    knowledge is uploaded directly to your brain.      *
      *                                                       *
      *    "I know kung fu."                                  *
      *                                                       *
      *    "Show me."                                         *
      *                                                       *
      *********************************************************
      
      Type "spar" to spar with Morpheus
      Type "more" to load more programs
      Type "quit" to exit this simulation
      `,
      options: {
        spar: "training",
        more: "programs"
      }
    },
    programs: {
      text: `
      *********************************************************
      *                                                       *
      *    "How about some more?"                             *
      *                                                       *
      *    You see a menu of training programs:               *
      *    - Combat Training                                  *
      *    - Jump Program                                     *
      *    - Weapons Training                                 *
      *                                                       *
      *********************************************************
      
      Type "combat" for combat training
      Type "jump" for the jump program
      Type "weapons" for weapons training
      Type "quit" to exit this simulation
      `,
      options: {
        combat: "training",
        jump: "jump",
        weapons: "weapons"
      }
    },
    weapons: {
      text: `
      *********************************************************
      *                                                       *
      *    "Guns. Lots of guns."                              *
      *                                                       *
      *    Racks of weapons appear all around you,            *
      *    stretching endlessly in a white void.              *
      *                                                       *
      *    You select your loadout of choice.                 *
      *                                                       *
      *********************************************************
      
      Type "ready" to enter the Matrix
      Type "more" for more training
      Type "quit" to exit this simulation
      `,
      options: {
        ready: "mission",
        more: "programs"
      }
    },
    believe: {
      text: `
      *********************************************************
      *                                                       *
      *    "Do you believe that my being stronger or faster   *
      *     has anything to do with my muscles in this place? *
      *     You think that's air you're breathing now?"       *
      *                                                       *
      *    You begin to understand. The Matrix is a system.   *
      *    There are rules. But some can be bent.             *
      *    Others can be broken.                              *
      *                                                       *
      *********************************************************
      
      Type "free" to free your mind
      Type "doubt" to question your abilities
      Type "quit" to exit this simulation
      `,
      options: {
        free: "believe2",
        doubt: "training"
      }
    },
    believe2: {
      text: `
      *********************************************************
      *                                                       *
      *    Your movements accelerate. The world slows down.   *
      *    You see Morpheus' attacks before they happen.      *
      *                                                       *
      *    "He's beginning to believe."                       *
      *                                                       *
      *********************************************************
      
      Type "oracle" to visit the Oracle
      Type "mission" to begin your first mission
      Type "quit" to exit this simulation
      `,
      options: {
        oracle: "oracle",
        mission: "mission"
      }
    },
    oracle: {
      text: `
      *********************************************************
      *                                                       *
      *    You meet a kind-looking woman in an apartment.     *
      *    She's baking cookies.                              *
      *                                                       *
      *    "I'd ask you to sit down, but you're not going     *
      *     to anyway. And don't worry about the vase."       *
      *                                                       *
      *    "What vase?"                                       *
      *                                                       *
      *    You turn and knock over a vase. It shatters.       *
      *                                                       *
      *********************************************************
      
      Type "sorry" to apologize
      Type "how" to ask how she knew
      Type "quit" to exit this simulation
      `,
      options: {
        sorry: "cookies",
        how: "cookies"
      }
    },
    cookies: {
      text: `
      *********************************************************
      *                                                       *
      *    "I'm going to let you in on a little secret.       *
      *     Being The One is just like being in love.         *
      *     No one can tell you you're in love,               *
      *     you just know it, through and through."           *
      *                                                       *
      *    She hands you a cookie.                            *
      *                                                       *
      *    "Here, take a cookie. I promise, by the time       *
      *     you're done eating it, you'll feel right as rain."*
      *                                                       *
      *********************************************************
      
      Type "eat" to eat the cookie
      Type "refuse" to refuse the cookie
      Type "quit" to exit this simulation
      `,
      options: {
        eat: "mission",
        refuse: "mission"
      }
    },
    mission: {
      text: `
      *********************************************************
      *                                                       *
      *    "Morpheus is being held in a government building.  *
      *     The agents are trying to break him to get the     *
      *     access codes to Zion's mainframe."                *
      *                                                       *
      *    "We're going in. I need guns. Lots of guns."       *
      *                                                       *
      *********************************************************
      
      Type "rescue" to rescue Morpheus
      Type "chopper" to get a helicopter
      Type "quit" to exit this simulation
      `,
      options: {
        rescue: "rescue",
        chopper: "chopper"
      }
    },
    chopper: {
      text: `
      *********************************************************
      *                                                       *
      *    "Can you fly that thing?"                          *
      *                                                       *
      *    "Not yet."                                         *
      *                                                       *
      *    "Tank, I need a pilot program for a B-212          *
      *     helicopter. Hurry!"                               *
      *                                                       *
      *    Your eyes flutter as the program loads...          *
      *                                                       *
      *********************************************************
      
      Type "fly" to fly the helicopter
      Type "quit" to exit this simulation
      `,
      options: {
        fly: "rescue"
      }
    },
    rescue: {
      text: `
      *********************************************************
      *                                                       *
      *    Through a storm of gunfire and impossible feats,   *
      *    you manage to rescue Morpheus.                     *
      *                                                       *
      *    "Do you believe it now, Trinity?"                  *
      *                                                       *
      *    "Morpheus, the Oracle told me that..."             *
      *                                                       *
      *    "She told you what you needed to hear.             *
      *     That's all. Neo is The One!"                      *
      *                                                       *
      *********************************************************
      
      Type "smith" to confront Agent Smith
      Type "exit" to find an exit
      Type "quit" to exit this simulation
      `,
      options: {
        smith: "smith",
        exit: "phonebooth"
      }
    },
    smith: {
      text: `
      *********************************************************
      *                                                       *
      *    "Mr. Anderson... We meet again."                   *
      *                                                       *
      *    Agent Smith removes his earpiece and sunglasses.   *
      *                                                       *
      *    "You hear that, Mr. Anderson? That is the sound    *
      *     of inevitability. It is the sound of your death." *
      *                                                       *
      *********************************************************
      
      Type "fight" to fight Agent Smith
      Type "run" to try to escape
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "fight",
        run: "run"
      }
    },
    run: {
      text: `
      *********************************************************
      *                                                       *
      *    You run through corridors, agents in pursuit.      *
      *    You need to find an exit.                          *
      *                                                       *
      *    "Mr. Anderson!"                                    *
      *                                                       *
      *    They're gaining on you...                          *
      *                                                       *
      *********************************************************
      
      Type "door" to try the door ahead
      Type "stand" to stand and fight
      Type "quit" to exit this simulation
      `,
      options: {
        door: "phonebooth",
        stand: "fight" 
      }
    },
    fight: {
      text: `
      *********************************************************
      *                                                       *
      *    You exchange a furious series of blows.            *
      *    For the first time, you can match an agent's speed.*
      *                                                       *
      *    "I'm going to enjoy watching you die, Mr. Anderson"*
      *                                                       *
      *    But he's still stronger. You're losing...          *
      *                                                       *
      *********************************************************
      
      Type "believe" to believe in yourself
      Type "dodge" to dodge his attacks
      Type "quit" to exit this simulation
      `,
      options: {
        believe: "theone",
        dodge: "dodge"
      }
    },
    dodge: {
      text: `
      *********************************************************
      *                                                       *
      *    You dodge with impossible speed.                   *
      *    But Agent Smith is relentless...                   *
      *                                                       *
      *    A lucky blow sends you flying against the wall.    *
      *                                                       *
      *    "Why, Mr. Anderson? Why, why? Why keep fighting?"  *
      *                                                       *
      *********************************************************
      
      Type "because" to explain why you continue fighting
      Type "rise" to get back up
      Type "quit" to exit this simulation
      `,
      options: {
        because: "speech",
        rise: "theone"
      }
    },
    speech: {
      text: `
      *********************************************************
      *                                                       *
      *    "Because I choose to."                             *
      *                                                       *
      *    You stand up, seeing the Matrix for what it truly  *
      *    is. The green code cascades all around you.        *
      *                                                       *
      *    You are beginning to truly believe...              *
      *                                                       *
      *********************************************************
      
      Type "fight" to continue the fight
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "theone"
      }
    },
    theone: {
      text: `
      *********************************************************
      *                                                       *
      *    Everything slows down. The world becomes clear.    *
      *    You see the Matrix for what it truly is.           *
      *                                                       *
      *    Agent Smith throws a punch. You block it with one  *
      *    hand, effortlessly.                                *
      *                                                       *
      *    "Impossible..."                                    *
      *                                                       *
      *********************************************************
      
      Type "end" to finish this fight
      Type "quit" to exit this simulation
      `,
      options: {
        end: "victory"
      }
    },
    victory: {
      text: `
      *********************************************************
      *                                                       *
      *    You dive into Agent Smith, breaking the rules      *
      *    of the Matrix itself. He expands, glowing with     *
      *    light from within, and shatters.                   *
      *                                                       *
      *    The other agents flee.                             *
      *                                                       *
      *    "He is The One."                                   *
      *                                                       *
      *********************************************************
      
      Type "call" to make a phone call
      Type "quit" to exit this simulation
      `,
      options: {
        call: "call"
      }
    },
    call: {
      text: `
      *********************************************************
      *                                                       *
      *    "I know you're out there. I can feel you now.      *
      *     I know that you're afraid. You're afraid of us.   *
      *     You're afraid of change. I don't know the future. *
      *     I didn't come here to tell you how this is going  *
      *     to end. I came here to tell you how it's going    *
      *     to begin."                                        *
      *                                                       *
      *    "I'm going to hang up this phone, and then I'm     *
      *     going to show these people what you don't want    *
      *     them to see. I'm going to show them a world       *
      *     without you, a world without rules and controls,  *
      *     without borders or boundaries, a world            *
      *     where anything is possible."                      *
      *                                                       *
      *    "Where we go from there is a choice I leave to you"*
      *                                                       *
      *********************************************************
      
      Type "fly" to fly into the sky
      Type "restart" to start over
      Type "quit" to exit this simulation
      `,
      options: {
        fly: "end",
        restart: "start"
      }
    },
    end: {
      text: `
      *********************************************************
      *                                                       *
      *    You soar into the sky, breaking free from the      *
      *    constraints of the Matrix.                         *
      *                                                       *
      *    You are The One.                                   *
      *                                                       *
      *    "He's beginning to believe."                       *
      *                                                       *
      *********************************************************
      
      Type "restart" to start over
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start"
      }
    },
    follow: {
      text: `
      *********************************************************
      *                                                       *
      *    You've found the entrance to Zion, the last        *
      *    human city.                                        *
      *                                                       *
      *    "We've survived by hiding from them, by running    *
      *     from them. But they are the gatekeepers.          *
      *     They are guarding all the doors, they are         *
      *     holding all the keys."                            *
      *                                                       *
      *    "There's a war out there, and we're losing it."    *
      *                                                       *
      *********************************************************
      
      Type "train" to begin your training
      Type "zion" to explore Zion
      Type "quit" to exit this simulation
      `,
      options: {
        train: "training",
        zion: "zion"
      }
    },
    zion: {
      text: `
      *********************************************************
      *                                                       *
      *    The last human city, buried deep near the Earth's  *
      *    core where it's still warm. Thousands of people    *
      *    live here, many born in the real world, never      *
      *    having seen the surface.                           *
      *                                                       *
      *    "This is Zion. And we are not machines. We are not *
      *     programs. And we are not going to die."           *
      *                                                       *
      *********************************************************
      
      Type "return" to return to the ship
      Type "train" to begin training
      Type "quit" to exit this simulation
      `,
      options: {
        return: "ship",
        train: "training"
      }
    },
    blue: {
      text: `
      *********************************************************
      *                                                       *
      *    "You take the blue pill—the story ends, you wake   *
      *     up in your bed and believe whatever you want to   *
      *     believe."                                         *
      *                                                       *
      *    The blue pill dissolves on your tongue.            *
      *    You feel a sudden wave of drowsiness...            *
      *                                                       *
      *********************************************************
      
      Type "sleep" to go back to sleep
      Type "quit" to exit this simulation
      `,
      options: {
        sleep: "sleep"
      }
    },
    sleep: {
      text: `
      *********************************************************
      *                                                       *
      *    You wake up in your apartment, late for work.      *
      *    Just another Monday.                               *
      *                                                       *
      *    But sometimes, in quiet moments, you feel a        *
      *    strange sensation... like a memory of something    *
      *    that never happened.                               *
      *                                                       *
      *    A splinter in your mind.                           *
      *                                                       *
      *********************************************************
      
      Type "restart" to start over
      Type "ignore" to continue your ordinary life
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start",
        ignore: "ignorance"
      }
    },
    ignorance: {
      text: `
      *********************************************************
      *                                                       *
      *    You go about your daily life. Work. Home. Sleep.   *
      *    Repeat.                                            *
      *                                                       *
      *    But sometimes, when you look in the mirror...      *
      *                                                       *
      *    Did you see something? A glitch? A flicker?        *
      *                                                       *
      *    No. That would be impossible. Just your            *
      *    imagination.                                       *
      *                                                       *
      *    Right?                                             *
      *                                                       *
      *********************************************************
      
      Type "restart" to start over
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start"
      }
    }
  };
  
  const makeChoice = (choice: string) => {
    const currentStateData = states[currentState as keyof typeof states];
    
    if (choice === "quit") {
      gameOver = true;
      return "Exiting the Matrix...";
    }
    
    if (currentStateData.options[choice as keyof typeof currentStateData.options]) {
      currentState = currentStateData.options[choice as keyof typeof currentStateData.options];
      return states[currentState as keyof typeof states].text;
    } else {
      return "Invalid choice. Try again.";
    }
  };
  
  return {
    start: () => states.start.text,
    makeChoice,
    isOver: () => gameOver,
    quit: () => "Matrix simulation terminated."
  };
};

// Helper functions for games with keyboard input
export const handleGameKeyInput = (key, gameState) => {
  // Don't echo the key to the terminal output - handled by the game update
  if (gameState && typeof gameState.move === 'function' && ['w', 'a', 's', 'd'].includes(key.toLowerCase())) {
    gameState.move(key);
    return { suppressEcho: true };
  }
  
  return { suppressEcho: false };
};

