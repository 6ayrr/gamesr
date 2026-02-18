/**
 * Lobby Component
 * 
 * Simulated matchmaking interface with three states:
 * - Idle: Select game mode (Online, AI, Local)
 * - Searching: Animated spinner and timer
 * - Match Found: Display user avatar vs. opponent avatar
 * 
 * Design: Glassmorphic cards with smooth transitions
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { GameMode, Difficulty, UserProfile } from '@/lib/gameState';

interface LobbyProps {
  userProfile: UserProfile;
  onStartGame: (mode: GameMode, difficulty: Difficulty) => void;
  isLoading?: boolean;
}

type LobbyState = 'idle' | 'searching' | 'found';

export default function Lobby({ userProfile, onStartGame, isLoading = false }: LobbyProps) {
  const [state, setState] = useState<LobbyState>('idle');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [searchTime, setSearchTime] = useState(0);

  // Simulate search timer
  useEffect(() => {
    if (state !== 'searching') return;

    const interval = setInterval(() => {
      setSearchTime((t) => {
        if (t >= 3) {
          // Auto-transition to found after 3 seconds
          setState('found');
          return t;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setState('searching');
    setSearchTime(0);
  };

  const handleStartGame = () => {
    if (selectedMode) {
      const difficulty =
        selectedMode === 'ai' ? 'insane' : ('local' as Difficulty);
      onStartGame(selectedMode, difficulty);
    }
  };

  const handleReset = () => {
    setState('idle');
    setSelectedMode(null);
    setSearchTime(0);
  };

  const modes = [
    {
      id: 'ai',
      label: 'Play vs AI',
      description: 'Challenge the unbeatable AI opponent',
      icon: Cpu,
      color: 'indigo',
    },
    {
      id: 'local',
      label: 'Local Multiplayer',
      description: 'Play with a friend on the same device',
      icon: Users,
      color: 'emerald',
    },
    {
      id: 'online',
      label: 'Online Multiplayer',
      description: 'Play with players worldwide (Coming Soon)',
      icon: Zap,
      color: 'amber',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Select Game Mode</h1>
              <p className="text-gray-400">Choose how you want to play</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <motion.button
                    key={mode.id}
                    onClick={() => !mode.disabled && handleModeSelect(mode.id as GameMode)}
                    whileHover={!mode.disabled ? { scale: 1.02 } : {}}
                    whileTap={!mode.disabled ? { scale: 0.98 } : {}}
                    disabled={mode.disabled}
                    className={`
                      p-6 glass-card text-left flex flex-col gap-4
                      ${
                        mode.disabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-white/10 hover:border-white/20 cursor-pointer'
                      }
                    `}
                  >
                    <div
                      className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      ${
                        mode.color === 'indigo'
                          ? 'bg-indigo-600/20 text-indigo-400'
                          : mode.color === 'emerald'
                            ? 'bg-emerald-600/20 text-emerald-400'
                            : 'bg-amber-600/20 text-amber-400'
                      }
                    `}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{mode.label}</h3>
                      <p className="text-gray-400 text-sm">{mode.description}</p>
                    </div>
                    {mode.disabled && (
                      <div className="text-xs text-gray-500 mt-auto">Coming soon</div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {state === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md text-center"
          >
            <div className="glass-card p-8">
              <div className="mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-white/10 border-t-indigo-500"
                />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Finding Match</h2>
              <p className="text-gray-400 mb-6">
                Searching for {selectedMode === 'ai' ? 'AI opponent' : 'opponent'}...
              </p>

              <div className="text-3xl font-bold text-indigo-400 mb-6">{searchTime}s</div>

              <button
                onClick={handleReset}
                className="w-full px-6 py-3 rounded-lg font-medium text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {state === 'found' && (
          <motion.div
            key="found"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Match Found!</h2>

              {/* Player vs Opponent */}
              <div className="flex items-center justify-between mb-8">
                {/* Player */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.username}
                    className="w-16 h-16 rounded-full border-2 border-indigo-500"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {userProfile.username}
                    </p>
                    <p className="text-gray-500 text-xs">Level {userProfile.level}</p>
                  </div>
                </motion.div>

                {/* VS */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-indigo-400 font-bold text-lg"
                >
                  VS
                </motion.div>

                {/* Opponent */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <img
                    src={
                      selectedMode === 'ai'
                        ? 'https://ui-avatars.com/api/?name=AI&background=6366F1&color=fff&rounded=true'
                        : 'https://ui-avatars.com/api/?name=P2&background=EC4899&color=fff&rounded=true'
                    }
                    alt="Opponent"
                    className="w-16 h-16 rounded-full border-2 border-indigo-500"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {selectedMode === 'ai' ? 'AI Opponent' : 'Player 2'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {selectedMode === 'ai' ? 'Insane' : 'Local'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartGame}
                disabled={isLoading}
                className="w-full glass-button"
              >
                {isLoading ? 'Starting...' : 'Start Game'}
              </button>

              <button
                onClick={handleReset}
                disabled={isLoading}
                className="w-full mt-3 px-6 py-3 rounded-lg font-medium text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
