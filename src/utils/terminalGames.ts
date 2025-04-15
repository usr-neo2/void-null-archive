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

// 6. Pong Game (Visual ASCII Game)
export const pongGame = () => {
  const width = 30;
  const height = 15;
  let playerPaddle = Math.floor(height / 2);
  let computerPaddle = Math.floor(height / 2);
  let ballX = Math.floor(width / 2);
  let ballY = Math.floor(height / 2);
  let ballDirX = 1;
  let ballDirY = 0;
  let playerScore = 0;
  let computerScore = 0;
  let gameOver = false;
  let gameLoopId: number | null = null;
  let waitingForInput = false;
  
  const paddleSize = 3;
  
  const renderGame = () => {
    let board = Array(height).fill(0).map(() => Array(width).fill(" "));
    
    // Draw paddles
    for (let i = 0; i < paddleSize; i++) {
      const playerY = playerPaddle - Math.floor(paddleSize / 2) + i;
      const computerY = computerPaddle - Math.floor(paddleSize / 2) + i;
      
      if (playerY >= 0 && playerY < height) {
        board[playerY][0] = "│";
      }
      
      if (computerY >= 0 && computerY < height) {
        board[computerY][width - 1] = "│";
      }
    }
    
    // Draw ball
    if (ballX >= 0 && ballX < width && ballY >= 0 && ballY < height) {
      board[ballY][ballX] = "●";
    }
    
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
PONG GAME - Player ${playerScore} | ${computerScore} Computer

${boardString}
Use 'w' to move paddle up, 's' to move paddle down
Type "quit" to exit the game
`;
  };
  
  const movePlayerPaddle = (direction: string) => {
    if (gameOver) return;
    waitingForInput = false;
    
    switch (direction.toLowerCase()) {
      case "w": // Up
        if (playerPaddle > 0) {
          playerPaddle--;
        }
        break;
      case "s": // Down
        if (playerPaddle < height - 1) {
          playerPaddle++;
        }
        break;
    }
  };
  
  const update = () => {
    if (gameOver || waitingForInput) return renderGame();
    
    // Move the ball
    ballX += ballDirX;
    ballY += ballDirY;
    
    // Basic AI for computer paddle - follows the ball with slight delay
    if (computerPaddle < ballY && Math.random() > 0.3) {
      computerPaddle = Math.min(computerPaddle + 1, height - 1);
    } else if (computerPaddle > ballY && Math.random() > 0.3) {
      computerPaddle = Math.max(computerPaddle - 1, 0);
    }
    
    // Ball collision with top/bottom walls
    if (ballY <= 0 || ballY >= height - 1) {
      ballDirY *= -1;
    }
    
    // Ball collision with player paddle
    if (ballX === 1) {
      const paddleTop = playerPaddle - Math.floor(paddleSize / 2);
      const paddleBottom = paddleTop + paddleSize - 1;
      
      if (ballY >= paddleTop && ballY <= paddleBottom) {
        ballDirX = 1;
        // Adjust vertical direction based on where ball hits paddle
        const hitPosition = ballY - paddleTop;
        if (hitPosition === 0) ballDirY = -1;
        else if (hitPosition === paddleSize - 1) ballDirY = 1;
        else ballDirY = 0;
      }
    }
    
    // Ball collision with computer paddle
    if (ballX === width - 2) {
      const paddleTop = computerPaddle - Math.floor(paddleSize / 2);
      const paddleBottom = paddleTop + paddleSize - 1;
      
      if (ballY >= paddleTop && ballY <= paddleBottom) {
        ballDirX = -1;
        // Adjust vertical direction based on where ball hits paddle
        const hitPosition = ballY - paddleTop;
        if (hitPosition === 0) ballDirY = -1;
        else if (hitPosition === paddleSize - 1) ballDirY = 1;
        else ballDirY = 0;
      }
    }
    
    // Ball out of bounds - player's side
    if (ballX < 0) {
      computerScore++;
      ballX = Math.floor(width / 2);
      ballY = Math.floor(height / 2);
      ballDirX = 1;
      ballDirY = 0;
      waitingForInput = true;
      
      if (computerScore >= 5) {
        gameOver = true;
        if (gameLoopId) clearInterval(gameLoopId);
        return `
GAME OVER! Computer wins ${computerScore}-${playerScore}!

Type "pong" to play again, or "quit" to exit.
`;
      }
    }
    
    // Ball out of bounds - computer's side
    if (ballX >= width) {
      playerScore++;
      ballX = Math.floor(width / 2);
      ballY = Math.floor(height / 2);
      ballDirX = -1;
      ballDirY = 0;
      waitingForInput = true;
      
      if (playerScore >= 5) {
        gameOver = true;
        if (gameLoopId) clearInterval(gameLoopId);
        return `
GAME OVER! You win ${playerScore}-${computerScore}!

Type "pong" to play again, or "quit" to exit.
`;
      }
    }
    
    return renderGame();
  };
  
  return {
    start: () => {
      playerScore = 0;
      computerScore = 0;
      gameOver = false;
      ballX = Math.floor(width / 2);
      ballY = Math.floor(height / 2);
      ballDirX = 1;
      ballDirY = 0;
      waitingForInput = true; // Start with waiting for user to be ready
      return renderGame();
    },
    movePlayerPaddle,
    update,
    isOver: () => gameOver,
    quit: () => {
      if (gameLoopId) clearInterval(gameLoopId);
      return "Pong game exited.";
    },
    setGameLoopId: (id: number) => {
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
      Type "quit" to exit this simulation
      `,
      options: {
        follow: "follow"
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
      *    To be continued...                                 *
      *                                                       *
      *********************************************************
      
      Type "restart" to start over
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start"
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
export const handleGameKeyInput = (key: string, gameState: any) => {
  // Don't echo the key to the terminal output - handled by the game update
  if (gameState && typeof gameState.movePlayerPaddle === 'function' && ['w', 's'].includes(key.toLowerCase())) {
    gameState.movePlayerPaddle(key);
    return { suppressEcho: true };
  }
  
  if (gameState && typeof gameState.move === 'function' && ['w', 'a', 's', 'd'].includes(key.toLowerCase())) {
    gameState.move(key);
    return { suppressEcho: true };
  }
  
  return { suppressEcho: false };
};
