/**
 * Leaderboard Page
 * 
 * Global elite table showing top players with ranks, wins, and levels
 * Design: Glassmorphic table with animated rankings
 */

import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  getLeaderboard,
  initializeUserProfile,
  type LeaderboardEntry,
  type UserProfile,
} from '@/lib/gameState';

export default function Leaderboard() {
  const [, navigate] = useLocation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const profile = initializeUserProfile();
    setUserProfile(profile);

    const entries = getLeaderboard();
    setLeaderboard(entries);
  }, []);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <>
      <Header
        userProfile={userProfile}
        onProfileClick={() => navigate('/profile')}
      />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy size={32} className="text-indigo-400" />
              <h1 className="text-4xl font-bold text-white">Global Leaderboard</h1>
            </div>
            <p className="text-gray-400">
              Top players ranked by wins and level
            </p>
          </motion.div>

          {/* Leaderboard Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-gray-500 font-semibold text-sm">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-gray-500 font-semibold text-sm">
                      Player
                    </th>
                    <th className="px-6 py-4 text-center text-gray-500 font-semibold text-sm">
                      Level
                    </th>
                    <th className="px-6 py-4 text-center text-gray-500 font-semibold text-sm">
                      Wins
                    </th>
                    <th className="px-6 py-4 text-right text-gray-500 font-semibold text-sm">
                      XP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const medal = getRankMedal(entry.rank);
                    const isCurrentUser = entry.userId === userProfile.id;

                    return (
                      <motion.tr
                        key={entry.userId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                          isCurrentUser ? 'bg-indigo-600/10' : ''
                        }`}
                      >
                        {/* Rank */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {medal && <span className="text-lg">{medal}</span>}
                            <span className="text-white font-semibold">#{entry.rank}</span>
                          </div>
                        </td>

                        {/* Player */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={entry.avatar}
                              alt={entry.username}
                              className="w-8 h-8 rounded-full border border-white/10"
                            />
                            <div>
                              <p className="text-white font-medium">
                                {entry.username}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs text-indigo-400">(You)</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Level */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-indigo-400 font-semibold">
                            Lvl {entry.level}
                          </span>
                        </td>

                        {/* Wins */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-white font-semibold">{entry.wins}</span>
                        </td>

                        {/* XP */}
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-400 font-medium">{entry.xp} XP</span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Your Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 mt-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Medal size={24} className="text-indigo-400" />
              Your Position
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-2">Rank</p>
                <p className="text-3xl font-bold text-indigo-400">#{userProfile.rank}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2">Level</p>
                <p className="text-3xl font-bold text-white">{userProfile.level}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2">Wins</p>
                <p className="text-3xl font-bold text-white">{userProfile.wins}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-2">Total XP</p>
                <p className="text-3xl font-bold text-white">{userProfile.xp}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">
                <span className="text-indigo-400 font-semibold">
                  {Math.max(0, 100 - userProfile.xp % 100)}
                </span>{' '}
                XP until next level
              </p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(userProfile.xp % 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="bg-indigo-500 h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
