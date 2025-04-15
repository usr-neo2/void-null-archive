
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
      Type "swallow" to swallow the pill
      Type "question" to ask Morpheus more questions
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup",
        swallow: "swallow",
        question: "question"
      }
    },
    question: {
      text: `
      *********************************************************
      *                                                       *
      *    "You take the red pill, you stay in Wonderland,    *
      *     and I show you how deep the rabbit hole goes.     *
      *     Remember, all I'm offering is the truth,          *
      *     nothing more."                                    *
      *                                                       *
      *    Morpheus looks at you intently, his reflective     *
      *    sunglasses hiding his eyes.                        *
      *                                                       *
      *********************************************************
      
      Type "matrix" to ask what the Matrix is
      Type "real" to ask what is real
      Type "wake" to take the pill and wake up
      Type "quit" to exit this simulation
      `,
      options: {
        matrix: "explain",
        real: "reality",
        wake: "wakeup"
      }
    },
    explain: {
      text: `
      *********************************************************
      *                                                       *
      *    "The Matrix is everywhere. It is all around us.    *
      *     Even now, in this very room. You can see it       *
      *     when you look out your window or when you turn    *
      *     on your television. You can feel it when you go   *
      *     to work... when you go to church... when you      *
      *     pay your taxes. It is the world that has been     *
      *     pulled over your eyes to blind you from the       *
      *     truth."                                           *
      *                                                       *
      *********************************************************
      
      Type "truth" to ask what truth
      Type "wake" to take the pill and wake up
      Type "quit" to exit this simulation
      `,
      options: {
        truth: "truth",
        wake: "wakeup"
      }
    },
    truth: {
      text: `
      *********************************************************
      *                                                       *
      *    "That you are a slave, Neo. Like everyone else     *
      *     you were born into bondage. Into a prison that    *
      *     you cannot taste or see or touch. A prison for    *
      *     your mind."                                       *
      *                                                       *
      *    The pill in your hand seems to pulse with an       *
      *    otherworldly energy.                               *
      *                                                       *
      *********************************************************
      
      Type "wake" to swallow the pill and wake up
      Type "why" to ask why Morpheus is helping you
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup",
        why: "chosen"
      }
    },
    chosen: {
      text: `
      *********************************************************
      *                                                       *
      *    "Because we believe the prophecy, Neo. We believe  *
      *     that you are The One. You may be the one we've    *
      *     been waiting for all these years. You could be    *
      *     the one to end the war and free humanity."        *
      *                                                       *
      *    The choice is still yours.                         *
      *                                                       *
      *********************************************************
      
      Type "wake" to swallow the pill and wake up
      Type "doubt" to express doubt about being The One
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup",
        doubt: "doubt"
      }
    },
    doubt: {
      text: `
      *********************************************************
      *                                                       *
      *    "It's happening exactly as before. The Oracle      *
      *     prophesized his return."                          *
      *                                                       *
      *    Trinity steps forward. "I've seen what you can     *
      *    do. I've been watching you, Neo."                  *
      *                                                       *
      *    "Nobody has ever done anything like this..."       *
      *                                                       *
      *********************************************************
      
      Type "wake" to finally swallow the pill
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup"
      }
    },
    reality: {
      text: `
      *********************************************************
      *                                                       *
      *    "What is 'real'? How do you define 'real'?         *
      *     If you're talking about what you can feel,        *
      *     what you can smell, what you can taste and see,   *
      *     then 'real' is simply electrical signals          *
      *     interpreted by your brain."                       *
      *                                                       *
      *********************************************************
      
      Type "wake" to take the pill and wake up
      Type "more" to ask more questions
      Type "quit" to exit this simulation
      `,
      options: {
        wake: "wakeup",
        more: "question"
      }
    },
    swallow: {
      text: `
      *********************************************************
      *                                                       *
      *    As the pill dissolves, you see strange code        *
      *    scrolling in your vision. Green symbols cascade    *
      *    like digital rain.                                 *
      *                                                       *
      *    Your perception shifts.                            *
      *                                                       *
      *    "This is your last chance. After this there is     *
      *     no turning back."                                 *
      *                                                       *
      *********************************************************
      
      Type "continue" to continue this journey
      Type "resist" to try to resist the pill's effects
      Type "quit" to exit this simulation
      `,
      options: {
        continue: "wakeup",
        resist: "noescape"
      }
    },
    noescape: {
      text: `
      *********************************************************
      *                                                       *
      *    You try to resist, but it's too late.              *
      *                                                       *
      *    The digital world around you fragments.            *
      *                                                       *
      *    A mirror nearby begins to liquify...               *
      *    The liquid touches your skin, spreading rapidly.   *
      *                                                       *
      *    "What's happening to me?!"                         *
      *                                                       *
      *********************************************************
      
      Type "accept" to accept the transformation
      Type "quit" to exit this simulation
      `,
      options: {
        accept: "wakeup"
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
      Type "look" to look around you
      Type "nebuchadnezzar" to board the ship
      Type "quit" to exit this simulation
      `,
      options: {
        follow: "follow",
        look: "powerpods",
        nebuchadnezzar: "ship"
      }
    },
    powerpods: {
      text: `
      *********************************************************
      *                                                       *
      *    You look around in horror. Endless fields of       *
      *    human pods stretch in all directions.              *
      *                                                       *
      *    A massive machine approaches, its mechanical       *
      *    arms reaching for you. You're disconnected         *
      *    violently and flushed down a disposal tube.        *
      *                                                       *
      *    "He's going into arrest!"                          *
      *    "He's going to make it."                           *
      *                                                       *
      *********************************************************
      
      Type "gasp" to gasp for air
      Type "quit" to exit this simulation
      `,
      options: {
        gasp: "ship"
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
      Type "tank" to speak with Tank
      Type "rest" to get some rest first
      Type "quit" to exit this simulation
      `,
      options: {
        training: "training",
        operator: "operator",
        tank: "tank",
        rest: "rest"
      }
    },
    tank: {
      text: `
      *********************************************************
      *                                                       *
      *    "Hey there, coppertop. Name's Tank, operator.      *
      *     I'll be your guide to the digital wonderland.     *
      *     Got programs for just about anything you need     *
      *     to know - kung fu, helicopter piloting, you       *
      *     name it. So what's your pleasure?"                *
      *                                                       *
      *********************************************************
      
      Type "kunfu" to learn Kung Fu
      Type "jujitsu" to learn Jiu Jitsu
      Type "guns" to learn weapons training
      Type "quit" to exit this simulation
      `,
      options: {
        kunfu: "kunfu",
        jujitsu: "kunfu",
        guns: "weapons"
      }
    },
    rest: {
      text: `
      *********************************************************
      *                                                       *
      *    You rest in your quarters, contemplating the       *
      *    enormity of what you've learned.                   *
      *                                                       *
      *    Morpheus enters. "I know what you're thinking.     *
      *     Why me? But I've seen you in my dreams. You're    *
      *     The One, Neo. The One who will end this war."     *
      *                                                       *
      *********************************************************
      
      Type "ready" to say you're ready for training
      Type "notme" to say you're not The One
      Type "quit" to exit this simulation
      `,
      options: {
        ready: "training",
        notme: "doubt2"
      }
    },
    doubt2: {
      text: `
      *********************************************************
      *                                                       *
      *    "I know exactly what you mean. I felt the same     *
      *     when Morpheus told me I wasn't The One."          *
      *                                                       *
      *    Trinity sits beside you. "But what if he is        *
      *     right about you? What if you are The One?"        *
      *                                                       *
      *    "You're going to have to make a choice."           *
      *                                                       *
      *********************************************************
      
      Type "believe" to start believing
      Type "training" to begin training anyway
      Type "quit" to exit this simulation
      `,
      options: {
        believe: "believe2",
        training: "training"
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
      Type "construct" to learn about the construct
      Type "quit" to exit this simulation
      `,
      options: {
        program: "kunfu",
        exit: "phonebooth",
        construct: "construct"
      }
    },
    construct: {
      text: `
      *********************************************************
      *                                                       *
      *    "This is the Construct. It's our loading program.  *
      *     We can load anything from clothing, to equipment, *
      *     to weapons, to training simulations."             *
      *                                                       *
      *    You look around the endless white space.           *
      *                                                       *
      *    "Right now, we're inside a computer program?"      *
      *                                                       *
      *********************************************************
      
      Type "digital" to ask about digital self
      Type "loadme" to ask for a training program
      Type "quit" to exit this simulation
      `,
      options: {
        digital: "residual",
        loadme: "kunfu"
      }
    },
    residual: {
      text: `
      *********************************************************
      *                                                       *
      *    "This... is the construct. It's our loading        *
      *     program. We can load anything, from clothing,     *
      *     to equipment, weapons, training simulations,      *
      *     anything we need."                                *
      *                                                       *
      *    "Right now, we're inside a computer program?"      *
      *                                                       *
      *    "Is that so hard to believe? Your clothes are      *
      *     different. The plugs in your arms and head are    *
      *     gone. Your hair has changed. Your appearance      *
      *     now is what we call residual self image. It is    *
      *     the mental projection of your digital self."      *
      *                                                       *
      *********************************************************
      
      Type "real" to ask what is real
      Type "train" to start training
      Type "quit" to exit this simulation
      `,
      options: {
        real: "desert",
        train: "training"
      }
    },
    desert: {
      text: `
      *********************************************************
      *                                                       *
      *    The white space suddenly transforms into a         *
      *    television studio, and then into a desolate        *
      *    desert landscape.                                  *
      *                                                       *
      *    "This is the world as it exists today. Welcome     *
      *     to the desert of the real."                       *
      *                                                       *
      *    The sky is black and scorched. The earth barren.   *
      *                                                       *
      *********************************************************
      
      Type "war" to ask what happened
      Type "back" to return to the ship
      Type "quit" to exit this simulation
      `,
      options: {
        war: "machines",
        back: "ship"
      }
    },
    machines: {
      text: `
      *********************************************************
      *                                                       *
      *    "We don't know who struck first, us or them,       *
      *     but we know that it was us that scorched the sky. *
      *     At the time, they were dependent on solar power   *
      *     and it was believed that they would be unable     *
      *     to survive without an energy source as abundant   *
      *     as the sun."                                      *
      *                                                       *
      *    Morpheus gestures to the barren landscape.         *
      *                                                       *
      *    "Throughout human history, we have been            *
      *     dependent on machines to survive. Fate, it seems, *
      *     is not without a sense of irony."                 *
      *                                                       *
      *********************************************************
      
      Type "human" to ask about humans
      Type "back" to return to the ship
      Type "quit" to exit this simulation
      `,
      options: {
        human: "battery",
        back: "ship"
      }
    },
    battery: {
      text: `
      *********************************************************
      *                                                       *
      *    "The human body generates more bio-electricity     *
      *     than a 120-volt battery and over 25,000 BTUs      *
      *     of body heat. Combined with a form of fusion,     *
      *     the machines had found all the energy they        *
      *     would ever need."                                 *
      *                                                       *
      *    Morpheus holds up a battery. "There are fields,    *
      *     endless fields, where human beings are no longer  *
      *     born... we are grown."                            *
      *                                                       *
      *********************************************************
      
      Type "matrix" to ask about the Matrix
      Type "back" to return to the ship
      Type "quit" to exit this simulation
      `,
      options: {
        matrix: "control",
        back: "ship"
      }
    },
    control: {
      text: `
      *********************************************************
      *                                                       *
      *    "The Matrix is a computer-generated dream world    *
      *     built to keep us under control in order to        *
      *     change a human being into this."                  *
      *                                                       *
      *    Morpheus holds up a battery.                       *
      *                                                       *
      *    "What is the Matrix? Control. The Matrix is a      *
      *     computer-generated dream world built to keep      *
      *     us under control."                                *
      *                                                       *
      *********************************************************
      
      Type "train" to begin training
      Type "back" to return to the ship
      Type "quit" to exit this simulation
      `,
      options: {
        train: "training",
        back: "ship"
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
      Type "wait" to wait and see what happens
      Type "fight" to stand your ground against the agents
      Type "quit" to exit this simulation
      `,
      options: {
        answer: "escape",
        wait: "toolate",
        fight: "agents"
      }
    },
    toolate: {
      text: `
      *********************************************************
      *                                                       *
      *    "What are you waiting for, Neo? GO!"               *
      *                                                       *
      *    The agents are closing in fast. The phone          *
      *    continues to ring, more urgently now.              *
      *                                                       *
      *    Time is running out!                               *
      *                                                       *
      *********************************************************
      
      Type "answer" to pick up the phone now
      Type "fight" to face the agents
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
      Type "dodge" to dodge their bullets
      Type "fight" to attempt the impossible
      Type "quit" to exit this simulation
      `,
      options: {
        run: "escape",
        dodge: "dodge",
        fight: "death"
      }
    },
    dodge: {
      text: `
      *********************************************************
      *                                                       *
      *    You attempt to dodge as bullets fly toward you.    *
      *    You're fast, but not fast enough.                  *
      *                                                       *
      *    A bullet grazes your arm.                          *
      *                                                       *
      *    "Jesus, he's fast!"                                *
      *    "Get to the exit, Neo! Now!"                       *
      *                                                       *
      *********************************************************
      
      Type "run" to sprint to the phone booth
      Type "continue" to continue fighting
      Type "quit" to exit this simulation
      `,
      options: {
        run: "escape",
        continue: "death"
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
      Type "believe" to try again, but believe
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start",
        believe: "believe2"
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
      Type "question" to ask Morpheus a question
      Type "quit" to exit this simulation
      `,
      options: {
        oracle: "oracle",
        training: "training",
        question: "whyme"
      }
    },
    whyme: {
      text: `
      *********************************************************
      *                                                       *
      *    "Why did you choose me?" you ask Morpheus.         *
      *                                                       *
      *    "I didn't choose you, Neo. You chose yourself.     *
      *     Tomorrow, you will meet the Oracle. She's the     *
      *     one who told me I would find you."                *
      *                                                       *
      *    "What will she tell me?"                           *
      *                                                       *
      *    "What you need to hear. That's all."               *
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
      Type "focus" to try to focus your mind
      Type "quit" to exit this simulation
      `,
      options: {
        faster: "believe",
        jump: "jump",
        focus: "focus"
      }
    },
    focus: {
      text: `
      *********************************************************
      *                                                       *
      *    You focus, slowing your breathing.                 *
      *                                                       *
      *    "Don't think you are, know you are."               *
      *                                                       *
      *    For a moment, you move with incredible speed.      *
      *    Your fist comes within inches of Morpheus's face.  *
      *                                                       *
      *    "Good. Again."                                     *
      *                                                       *
      *********************************************************
      
      Type "again" to try again
      Type "more" to try more programs
      Type "quit" to exit this simulation
      `,
      options: {
        again: "training",
        more: "programs"
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
      Type "spoon" to remember the spoon
      Type "continue" to move on to other training
      Type "quit" to exit this simulation
      `,
      options: {
        again: "jump",
        spoon: "spoon",
        continue: "training" 
      }
    },
    spoon: {
      text: `
      *********************************************************
      *                                                       *
      *    "Do not try and bend the spoon. That's impossible. *
      *     Instead... only try to realize the truth."        *
      *                                                       *
      *    "What truth?"                                      *
      *                                                       *
      *    "There is no spoon."                               *
      *                                                       *
      *    With this realization, you attempt the jump again. *
      *    This time, you soar across the impossible gap.     *
      *                                                       *
      *********************************************************
      
      Type "whoa" to express amazement
      Type "more" to try more training
      Type "quit" to exit this simulation
      `,
      options: {
        whoa: "believe2",
        more: "training"
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
      *    - Vehicle Training                                 *
      *                                                       *
      *********************************************************
      
      Type "combat" for combat training
      Type "jump" for the jump program
      Type "weapons" for weapons training
      Type "vehicle" for vehicle training
      Type "quit" to exit this simulation
      `,
      options: {
        combat: "training",
        jump: "jump",
        weapons: "weapons",
        vehicle: "chopper"
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
      Type "shoot" to practice shooting
      Type "more" for more training
      Type "quit" to exit this simulation
      `,
      options: {
        ready: "mission",
        shoot: "practice",
        more: "programs"
      }
    },
    practice: {
      text: `
      *********************************************************
      *                                                       *
      *    You practice with various weapons, your skill      *
      *    growing with each simulation.                      *
      *                                                       *
      *    "Dodge this."                                      *
      *                                                       *
      *    You move with impossible speed, dodging bullets.   *
      *                                                       *
      *********************************************************
      
      Type "ready" to say you're ready for a real mission
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
      Type "temet" to ask about the sign above the door
      Type "quit" to exit this simulation
      `,
      options: {
        sorry: "cookies",
        how: "cookies",
        temet: "nosce"
      }
    },
    nosce: {
      text: `
      *********************************************************
      *                                                       *
      *    You look above the door and see a sign that reads  *
      *    "Temet Nosce."                                     *
      *                                                       *
      *    "It means 'Know Thyself'," the Oracle explains.    *
      *                                                       *
      *    "A good reminder for anyone seeking answers."      *
      *                                                       *
      *********************************************************
      
      Type "one" to ask if you're The One
      Type "cookies" to accept her cookies
      Type "quit" to exit this simulation
      `,
      options: {
        one: "notone",
        cookies: "cookies"
      }
    },
    notone: {
      text: `
      *********************************************************
      *                                                       *
      *    "Sorry, kid. You got the gift, but it looks like   *
      *     you're waiting for something."                    *
      *                                                       *
      *    "What?"                                            *
      *                                                       *
      *    "Your next life, maybe. Who knows?"                *
      *                                                       *
      *    She hands you a cookie. "Here, take a cookie.      *
      *    I promise, by the time you're done eating it,      *
      *    you'll feel right as rain."                        *
      *                                                       *
      *********************************************************
      
      Type "eat" to eat the cookie
      Type "morpheus" to ask about Morpheus
      Type "quit" to exit this simulation
      `,
      options: {
        eat: "mission",
        morpheus: "protect"
      }
    },
    protect: {
      text: `
      *********************************************************
      *                                                       *
      *    "Morpheus believes in you, Neo. And no one, not    *
      *     you, not even me, can convince him otherwise."    *
      *                                                       *
      *    "What does this mean?"                             *
      *                                                       *
      *    "It means that Morpheus sacrificed himself to      *
      *     save you because he believes you are The One.     *
      *     He is going to sacrifice himself to show you      *
      *     that you're not."                                 *
      *                                                       *
      *********************************************************
      
      Type "save" to swear to save Morpheus
      Type "quit" to exit this simulation
      `,
      options: {
        save: "mission"
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
      Type "plan" to ask about the plan
      Type "chopper" to get a helicopter
      Type "quit" to exit this simulation
      `,
      options: {
        rescue: "rescue",
        plan: "plan",
        chopper: "chopper"
      }
    },
    plan: {
      text: `
      *********************************************************
      *                                                       *
      *    "The plan? There is no plan, Neo."                 *
      *                                                       *
      *    Trinity checks her weapons.                        *
      *                                                       *
      *    "We're going to save Morpheus because that's       *
      *     what Morpheus would do. No one has ever done      *
      *     anything like this before."                       *
      *                                                       *
      *    "That's why it's going to work."                   *
      *                                                       *
      *********************************************************
      
      Type "ready" to say you're ready
      Type "lobby" to enter the lobby
      Type "quit" to exit this simulation
      `,
      options: {
        ready: "rescue",
        lobby: "lobby"
      }
    },
    lobby: {
      text: `
      *********************************************************
      *                                                       *
      *    You enter the government building lobby.           *
      *    Security guards approach.                          *
      *                                                       *
      *    "Please remove any metallic items you're carrying: *
      *     keys, loose change..."                            *
      *                                                       *
      *    Metal detectors beep as they scan the arsenal      *
      *    under your coats.                                  *
      *                                                       *
      *********************************************************
      
      Type "fight" to engage the guards
      Type "stealth" to try a stealthy approach
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "lobby_fight",
        stealth: "detected"
      }
    },
    detected: {
      text: `
      *********************************************************
      *                                                       *
      *    "Sir, would you please remove any metallic items?" *
      *                                                       *
      *    The guard becomes suspicious.                      *
      *                                                       *
      *    "Weapons. They have weapons."                      *
      *                                                       *
      *    There's no choice now...                           *
      *                                                       *
      *********************************************************
      
      Type "fight" to engage the guards
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "lobby_fight"
      }
    },
    lobby_fight: {
      text: `
      *********************************************************
      *                                                       *
      *    The lobby erupts in chaos.                         *
      *    You move with impossible speed, dodging bullets,   *
      *    running on walls.                                  *
      *                                                       *
      *    In a hail of gunfire, you and Trinity clear the    *
      *    entire security team.                              *
      *                                                       *
      *    "Get up, they're coming."                          *
      *                                                       *
      *********************************************************
      
      Type "elevator" to head for the elevator
      Type "stairs" to take the stairs
      Type "quit" to exit this simulation
      `,
      options: {
        elevator: "elevator",
        stairs: "elevator"
      }
    },
    elevator: {
      text: `
      *********************************************************
      *                                                       *
      *    "There is no spoon."                               *
      *                                                       *
      *    You ascend in the elevator, preparing for what     *
      *    awaits at the top.                                 *
      *                                                       *
      *    Trinity places a bomb on the emergency hatch.      *
      *    "Neo, no one has ever done anything like this."    *
      *                                                       *
      *********************************************************
      
      Type "rescue" to continue the rescue mission
      Type "quit" to exit this simulation
      `,
      options: {
        rescue: "rescue"
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
      Type "smell" to comment on his smell
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "fight",
        run: "run",
        smell: "smell"
      }
    },
    smell: {
      text: `
      *********************************************************
      *                                                       *
      *    "I can smell it."                                  *
      *                                                       *
      *    "Smell what, Mr. Anderson?"                        *
      *                                                       *
      *    "I can smell your fear. For the first time in      *
      *     your life, you're afraid."                        *
      *                                                       *
      *    Smith's face contorts with rage. He attacks.       *
      *                                                       *
      *********************************************************
      
      Type "fight" to engage in combat
      Type "quit" to exit this simulation
      `,
      options: {
        fight: "fight"
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
        dodge: "dodge2"
      }
    },
    dodge2: {
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
      Type "dance" to attend the Zion gathering
      Type "train" to begin training
      Type "quit" to exit this simulation
      `,
      options: {
        return: "ship",
        dance: "dance",
        train: "training"
      }
    },
    dance: {
      text: `
      *********************************************************
      *                                                       *
      *    Hundreds of people gather in a cave-like chamber.  *
      *    The beat of drums fills the air as people dance,   *
      *    celebrating their humanity.                        *
      *                                                       *
      *    "Zion! Hear me! It is true what many of you have   *
      *     heard. The machines have gathered an army, and    *
      *     at this very moment that army is drawing nearer   *
      *     to our home."                                     *
      *                                                       *
      *    "Tonight, let us shake this cave!"                 *
      *                                                       *
      *********************************************************
      
      Type "return" to return to the ship
      Type "quit" to exit this simulation
      `,
      options: {
        return: "ship"
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
      Type "fight" to try to fight the sedation
      Type "quit" to exit this simulation
      `,
      options: {
        sleep: "sleep",
        fight: "blueresist"
      }
    },
    blueresist: {
      text: `
      *********************************************************
      *                                                       *
      *    You try to resist, but the blue pill is strong.    *
      *                                                       *
      *    "The body cannot live without the mind."           *
      *                                                       *
      *    Your consciousness fades...                        *
      *                                                       *
      *********************************************************
      
      Type "sleep" to surrender to sleep
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
      Type "deja" to follow the feeling of déjà vu
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start",
        ignore: "ignorance",
        deja: "deja"
      }
    },
    deja: {
      text: `
      *********************************************************
      *                                                       *
      *    You notice a black cat walk by, and then another   *
      *    that looks exactly the same.                       *
      *                                                       *
      *    "Déjà vu..."                                       *
      *                                                       *
      *    Something's not right. The world around you seems  *
      *    to flicker for just a moment.                      *
      *                                                       *
      *    You see a white rabbit tattooed on someone's       *
      *    shoulder as they pass by.                          *
      *                                                       *
      *********************************************************
      
      Type "follow" to follow the white rabbit
      Type "ignore" to ignore it and go to work
      Type "quit" to exit this simulation
      `,
      options: {
        follow: "restart",
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
      Type "wake" to try to wake up
      Type "quit" to exit this simulation
      `,
      options: {
        restart: "start",
        wake: "restart"
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
