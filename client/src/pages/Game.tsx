/**
 * Game Page
 * 
 * Main game interface with board, player stats, and game controls
 * Handles PvC (Minimax AI) and PvP (Local) modes
 */

import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import XOBoard from '@/components/XOBoard';
import {
  checkWinner,
  findBestMove,
  getWinningLine,
  isBoardFull,
} from '@/lib/minimax';
import {
  createGameSession,
  getGameSession,
  recordGameResult,
  type GameMode,
  type GameSession,
  type Difficulty,
  updateGameSession,
  addToGameHistory,
} from '@/lib/gameState';

export default function Game() {
  const [, navigate] = useLocation();
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'loss' | 'draw' | null>(null);

  // Initialize game from session or navigate back
  useEffect(() => {
    const session = getGameSession();
    if (!session) {
      navigate('/');
      return;
    }

    const initializedSession = {
      ...session,
      status: 'playing' as const,
      startedAt: Date.now(),
    };

    setGameSession(initializedSession);
    updateGameSession(initializedSession);
  }, [navigate]);

  // AI move logic
  useEffect(() => {
    if (!gameSession || gameSession.status !== 'playing') return;

    const { board, currentPlayer, playerSymbol, mode } = gameSession;

    // Check if game is over
    const winner = checkWinner(board);
    if (winner || isBoardFull(board)) {
      handleGameEnd(winner, board);
      return;
    }

    // If AI's turn and mode is 'ai'
    if (mode === 'ai' && currentPlayer !== playerSymbol) {
      setIsAIThinking(true);

      const timer = setTimeout(() => {
        const bestMove = findBestMove(board);
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = 'O';

          const updatedSession = updateGameSession({
            board: newBoard,
            currentPlayer: 'X',
          });

          setGameSession(updatedSession);
        }

        setIsAIThinking(false);
      }, 1000); // 1 second delay for better UX

      return () => clearTimeout(timer);
    }
  }, [gameSession]);

  const handleCellClick = (index: number) => {
    if (!gameSession || gameSession.status !== 'playing' || isAIThinking) return;

    const { board, currentPlayer, playerSymbol } = gameSession;

    // Only allow player to click on their turn
    if (currentPlayer !== playerSymbol) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;

    const updatedSession = updateGameSession({
      board: newBoard,
      currentPlayer: playerSymbol === 'X' ? 'O' : 'X',
    });

    setGameSession(updatedSession);

    // Check for game end
    const winner = checkWinner(newBoard);
    if (winner || isBoardFull(newBoard)) {
      handleGameEnd(winner, newBoard);
    }
  };

  const handleGameEnd = (winner: 'X' | 'O' | null, finalBoard: (string | null)[]) => {
    let result: 'win' | 'loss' | 'draw';

    if (!winner && isBoardFull(finalBoard)) {
      result = 'draw';
    } else if (winner === gameSession?.playerSymbol) {
      result = 'win';
    } else {
      result = 'loss';
    }

    setGameResult(result);

    const winningLine = getWinningLine(finalBoard);
    const finalSession = updateGameSession({
      status: 'finished',
      finishedAt: Date.now(),
      winner: winner || 'draw',
      winningLine: winningLine || undefined,
    });

    // Record result and update stats
    recordGameResult(result, result === 'win' ? 50 : result === 'draw' ? 20 : 10);

    // Add to history
    addToGameHistory(finalSession);
  };

  const handlePlayAgain = () => {
    const newSession = createGameSession(
      gameSession?.mode || 'ai',
      gameSession?.difficulty || 'insane'
    );
    setGameSession(newSession);
    updateGameSession(newSession);
    setGameResult(null);
  };

  const handleBackToLobby = () => {
    setGameSession(null);
    navigate('/');
  };

  if (!gameSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading game...</div>
      </div>
    );
  }

  const winner = checkWinner(gameSession.board);
  const winningLine = getWinningLine(gameSession.board);
  const isFull = isBoardFull(gameSession.board);
  const isGameOver = winner !== null || isFull;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {gameSession.mode === 'ai' ? 'vs AI Opponent' : 'Local Multiplayer'}
          </h1>
          <p className="text-gray-400 text-sm">
            {gameSession.difficulty === 'insane' ? 'Insane Difficulty' : 'Local Mode'}
          </p>
        </motion.div>

        {/* Game Result */}
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 glass-card p-6 text-center max-w-md w-full"
          >
            {gameResult === 'win' && (
              <>
                <h2 className="text-2xl font-bold text-indigo-400 mb-2">You Won! 🎉</h2>
                <p className="text-gray-400 text-sm">+50 XP earned</p>
              </>
            )}
            {gameResult === 'loss' && (
              <>
                <h2 className="text-2xl font-bold text-red-400 mb-2">You Lost</h2>
                <p className="text-gray-400 text-sm">+10 XP earned</p>
              </>
            )}
            {gameResult === 'draw' && (
              <>
                <h2 className="text-2xl font-bold text-gray-400 mb-2">It's a Draw</h2>
                <p className="text-gray-400 text-sm">+20 XP earned</p>
              </>
            )}
          </motion.div>
        )}

        {/* Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <XOBoard
            board={gameSession.board}
            onCellClick={handleCellClick}
            disabled={isGameOver || isAIThinking || gameSession.currentPlayer !== gameSession.playerSymbol}
            winningLine={winningLine || undefined}
            isAIThinking={isAIThinking}
            currentPlayer={gameSession.currentPlayer}
          />
        </motion.div>

        {/* Player Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 max-w-md w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={gameSession.opponent.avatar}
                alt={gameSession.opponent.username}
                className="w-10 h-10 rounded-full border border-white/10"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {gameSession.opponent.username}
                </p>
                <p className="text-gray-500 text-xs">
                  {gameSession.mode === 'ai' ? 'AI' : 'Player 2'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-lg font-bold">
                {gameSession.playerSymbol === 'X' ? 'X' : 'O'}
              </p>
            </div>
          </div>

          {/* Game Controls */}
          {isGameOver && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePlayAgain}
                className="flex-1 glass-button flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Play Again
              </button>
              <button
                onClick={handleBackToLobby}
                className="flex-1 px-6 py-3 rounded-lg font-medium text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Back to Lobby
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
