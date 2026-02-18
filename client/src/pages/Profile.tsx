/**
 * Profile Page
 * 
 * User profile with stats, inline username editing, and game history
 * Design: Glassmorphic cards with stat breakdowns
 */

import { motion } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  initializeUserProfile,
  updateUserProfile,
  getGameHistory,
  type UserProfile,
  type GameSession,
} from '@/lib/gameState';

export default function Profile() {
  const [, navigate] = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const profile = initializeUserProfile();
    setUserProfile(profile);
    setNewUsername(profile.username);

    const history = getGameHistory();
    setGameHistory(history.reverse()); // Most recent first
  }, []);

  const handleSaveUsername = () => {
    if (newUsername.trim() && newUsername !== userProfile?.username) {
      const updated = updateUserProfile({ username: newUsername });
      setUserProfile(updated);
    }
    setIsEditingUsername(false);
  };

  const handleCancelEdit = () => {
    setNewUsername(userProfile?.username || '');
    setIsEditingUsername(false);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const totalGames = userProfile.wins + userProfile.losses + userProfile.draws;
  const winRate =
    totalGames > 0 ? ((userProfile.wins / totalGames) * 100).toFixed(1) : '0';

  return (
    <>
      <Header
        userProfile={userProfile}
        onLeaderboardClick={() => navigate('/leaderboard')}
      />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <motion.img
                src={userProfile.avatar}
                alt={userProfile.username}
                className="w-24 h-24 rounded-full border-2 border-indigo-500"
                whileHover={{ scale: 1.05 }}
              />

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {isEditingUsername ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-indigo-500"
                        maxLength={20}
                      />
                      <button
                        onClick={handleSaveUsername}
                        className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-white">{userProfile.username}</h1>
                      <button
                        onClick={() => setIsEditingUsername(true)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Level</p>
                    <p className="text-2xl font-bold text-indigo-400">{userProfile.level}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rank</p>
                    <p className="text-2xl font-bold text-white">#{userProfile.rank}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">XP</p>
                    <p className="text-2xl font-bold text-white">{userProfile.xp}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Wins', value: userProfile.wins, color: 'indigo' },
              { label: 'Losses', value: userProfile.losses, color: 'red' },
              { label: 'Draws', value: userProfile.draws, color: 'gray' },
              { label: 'Win Rate', value: `${winRate}%`, color: 'emerald' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="glass-card p-6 text-center"
              >
                <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                <p
                  className={`text-3xl font-bold ${
                    stat.color === 'indigo'
                      ? 'text-indigo-400'
                      : stat.color === 'red'
                        ? 'text-red-400'
                        : stat.color === 'emerald'
                          ? 'text-emerald-400'
                          : 'text-gray-400'
                  }`}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Game History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Games</h2>

            {gameHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No games played yet. Start playing to build your history!</p>
            ) : (
              <div className="space-y-3">
                {gameHistory.slice(0, 10).map((game, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          game.winner === 'X'
                            ? 'bg-indigo-500'
                            : game.winner === 'O'
                              ? 'bg-red-500'
                              : 'bg-gray-500'
                        }`}
                      />
                      <div>
                        <p className="text-white font-medium">
                          {game.mode === 'ai' ? 'vs AI' : 'vs Player 2'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {game.mode === 'ai'
                            ? game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)
                            : 'Local'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {game.winner === 'X'
                          ? 'Won'
                          : game.winner === 'O'
                            ? 'Lost'
                            : 'Draw'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(game.startedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
