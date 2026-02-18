/**
 * Minimax Algorithm for Tic-Tac-Toe AI
 * 
 * This utility implements the Minimax algorithm with alpha-beta pruning
 * to create an unbeatable AI opponent for the "Insane" difficulty level.
 * 
 * Scoring:
 * - Win (AI): +100
 * - Loss (Player): -100
 * - Draw: 0
 * 
 * Strategy:
 * - Prioritize center (index 4) and corners (indices 0, 2, 6, 8)
 * - Block opponent winning moves
 * - Create winning opportunities
 */

export type Board = (string | null)[];
export type Player = 'X' | 'O';

const EMPTY = null;
const AI = 'O';
const HUMAN = 'X';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Check if there's a winner on the board
 */
export function checkWinner(board: Board): Player | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
}

/**
 * Check if the board is full (draw condition)
 */
export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== EMPTY);
}

/**
 * Get all available moves (empty cells)
 */
export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === EMPTY ? index : null))
    .filter((index) => index !== null) as number[];
}

/**
 * Evaluate the board state
 * Returns: 100 (AI win), -100 (Human win), 0 (draw/ongoing)
 */
function evaluateBoard(board: Board): number {
  const winner = checkWinner(board);
  if (winner === AI) return 100;
  if (winner === HUMAN) return -100;
  if (isBoardFull(board)) return 0;
  return 0; // Game still ongoing
}

/**
 * Minimax algorithm with alpha-beta pruning
 * Recursively evaluates all possible moves to find the best one
 */
function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const score = evaluateBoard(board);

  // Terminal states: AI won, Human won, or draw
  if (score === 100) return score - depth; // Prefer faster wins
  if (score === -100) return score + depth; // Prefer slower losses
  if (isBoardFull(board)) return 0;

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    // AI's turn: maximize score
    let maxScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = AI;
      const moveScore = minimax(newBoard, depth + 1, false, alpha, beta);
      maxScore = Math.max(maxScore, moveScore);
      alpha = Math.max(alpha, moveScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return maxScore;
  } else {
    // Human's turn: minimize score
    let minScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = HUMAN;
      const moveScore = minimax(newBoard, depth + 1, true, alpha, beta);
      minScore = Math.min(minScore, moveScore);
      beta = Math.min(beta, moveScore);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return minScore;
  }
}

/**
 * Find the best move for the AI using Minimax
 * Returns the index of the best move
 */
export function findBestMove(board: Board): number {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    return -1; // No moves available
  }

  // Prioritize center and corners for strategic advantage
  const priorityMoves = availableMoves.filter((move) => [0, 2, 4, 6, 8].includes(move));
  const candidateMoves = priorityMoves.length > 0 ? priorityMoves : availableMoves;

  let bestScore = -Infinity;
  let bestMove = candidateMoves[0];

  for (const move of candidateMoves) {
    const newBoard = [...board];
    newBoard[move] = AI;
    const score = minimax(newBoard, 0, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Get the winning line (if any)
 * Returns array of indices [a, b, c] or null
 */
export function getWinningLine(board: Board): number[] | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return [a, b, c];
    }
  }
  return null;
}

/**
 * Check if a specific player has won
 */
export function hasPlayerWon(board: Board, player: Player): boolean {
  return checkWinner(board) === player;
}

/**
 * Check if the game is over (win or draw)
 */
export function isGameOver(board: Board): boolean {
  return checkWinner(board) !== null || isBoardFull(board);
}
