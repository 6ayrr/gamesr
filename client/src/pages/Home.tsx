/**
 * Home Page
 * 
 * Minimalist hero section with scrolling Arabic marquee and game mode selection
 * Design: Ultra-minimalist glassmorphism with asymmetric layout
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lobby from '@/components/Lobby';
import {
  createGameSession,
  initializeUserProfile,
  type GameMode,
  type Difficulty,
  type UserProfile,
} from '@/lib/gameState';

export default function Home() {
  const [, navigate] = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showLobby, setShowLobby] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user profile on mount
  useEffect(() => {
    const profile = initializeUserProfile();
    setUserProfile(profile);
  }, []);

  const handleStartGame = (mode: GameMode, difficulty: Difficulty) => {
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const session = createGameSession(mode, difficulty);
      navigate('/game');
    }, 500);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (showLobby) {
    return (
      <>
        <Header
          userProfile={userProfile}
          onProfileClick={handleProfileClick}
          onLeaderboardClick={handleLeaderboardClick}
        />
        <Lobby
          userProfile={userProfile}
          onStartGame={handleStartGame}
          isLoading={isLoading}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header
        userProfile={userProfile}
        onProfileClick={handleProfileClick}
        onLeaderboardClick={handleLeaderboardClick}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Marquee and Branding */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tighter">
                  GameSR
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Premium Tic-Tac-Toe platform with AI opponent, multiplayer modes, and global
                  leaderboard.
                </p>
              </div>

              {/* Arabic Marquee */}
              <div className="glass-card p-6 overflow-hidden">
                <div className="flex gap-8">
                  <motion.div
                    animate={{ x: '-100%' }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="marquee whitespace-nowrap text-2xl font-semibold text-indigo-400"
                    style={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}
                  >
                    العاب خفيفة وجماعية • العاب خفيفة وجماعية • العاب خفيفة وجماعية
                  </motion.div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => setShowLobby(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-button w-full lg:w-auto text-lg py-4 px-8"
              >
                Play Now
              </motion.button>
            </motion.div>

            {/* Right: Game Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 flex flex-col items-center"
            >
              <div className="mb-6">
                <h3 className="text-white font-semibold text-center mb-4">Game Preview</h3>

                {/* 3x3 Grid Preview */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                    const preview = ['X', null, 'O', null, 'X', null, 'O', null, null];
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold"
                      >
                        {preview[index] && (
                          <span
                            className={preview[index] === 'X' ? 'text-white' : 'text-indigo-400'}
                          >
                            {preview[index]}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Unbeatable AI with Minimax algorithm</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Local multiplayer support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Global leaderboard & rankings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Offline progress tracking</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Why GameSR?</h2>
              <p className="text-gray-400">Experience premium gaming with cutting-edge technology</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Insane Difficulty',
                  description: 'Challenge an unbeatable AI opponent powered by the Minimax algorithm',
                },
                {
                  title: 'Minimalist Design',
                  description: 'Beautiful glassmorphic interface optimized for all devices',
                },
                {
                  title: 'Offline Ready',
                  description: 'Play anytime, anywhere. Your progress is saved locally',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
