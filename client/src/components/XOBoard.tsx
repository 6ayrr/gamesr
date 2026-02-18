/**
 * XOBoard Component
 * 
 * Renders a 3x3 Tic-Tac-Toe grid with glassmorphic design
 * Supports click interactions, winning line animations, and AI thinking state
 * 
 * Design: Ultra-minimalist glassmorphism with indigo accents
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XOBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[];
  isAIThinking?: boolean;
  currentPlayer?: 'X' | 'O';
}

export default function XOBoard({
  board,
  onCellClick,
  disabled = false,
  winningLine,
  isAIThinking = false,
  currentPlayer,
}: XOBoardProps) {
  const [animatingCells, setAnimatingCells] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Track newly filled cells for animation
    const newAnimatingCells = new Set<number>();
    board.forEach((cell, index) => {
      if (cell && !animatingCells.has(index)) {
        newAnimatingCells.add(index);
      }
    });
    setAnimatingCells(newAnimatingCells);
  }, [board]);

  const handleCellClick = (index: number) => {
    if (!disabled && board[index] === null) {
      onCellClick(index);
    }
  };

  const isWinningCell = winningLine?.includes;
  const cellVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Board Grid */}
      <div className="grid grid-cols-3 gap-3 p-6 glass-card">
        {board.map((cell, index) => {
          const isWinning = winningLine?.includes(index);
          const isThinkingCell = isAIThinking && index === 4; // Center cell

          return (
            <motion.button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={disabled || cell !== null}
              variants={cellVariants}
              initial="initial"
              animate="animate"
              className={`
                w-20 h-20 rounded-lg font-bold text-3xl
                transition-all duration-200 ease-out
                ${
                  isWinning
                    ? 'bg-indigo-600/30 border-2 border-indigo-500 winning-glow'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
                ${cell === null && !disabled ? 'cursor-pointer' : 'cursor-default'}
                ${isThinkingCell ? 'pulse-soft' : ''}
                ${disabled && cell === null ? 'opacity-50' : ''}
              `}
            >
              {cell && (
                <span
                  className={`
                    ${cell === 'X' ? 'text-white' : 'text-indigo-400'}
                    ${isWinning ? 'drop-shadow-lg' : ''}
                  `}
                >
                  {cell}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* AI Thinking Indicator */}
      {isAIThinking && (
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-gray-400 font-medium"
        >
          AI is thinking...
        </motion.div>
      )}

      {/* Current Player Indicator */}
      {currentPlayer && !isAIThinking && (
        <div className="text-sm text-gray-400">
          Current: <span className="text-white font-medium">{currentPlayer}</span>
        </div>
      )}
    </div>
  );
}
