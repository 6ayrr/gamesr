/**
 * Header Component
 * 
 * Sticky header with glassmorphic blur effect, navigation, and user profile summary
 * Design: Ultra-minimalist with subtle white borders and indigo accents
 */

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { UserProfile } from '@/lib/gameState';

interface HeaderProps {
  userProfile: UserProfile;
  onProfileClick?: () => void;
  onLeaderboardClick?: () => void;
}

export default function Header({
  userProfile,
  onProfileClick,
  onLeaderboardClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-[16px] border-b border-white/5">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          <span className="text-white font-bold tracking-tighter text-lg">GameSR</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onLeaderboardClick}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Leaderboard
          </button>
          <button
            onClick={onProfileClick}
            className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            Profile
          </button>
        </nav>

        {/* User Profile Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.username}
            className="w-8 h-8 rounded-full border border-white/10"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-white text-sm font-medium">
              {userProfile.username}
            </span>
            <span className="text-gray-500 text-xs">
              Level {userProfile.level} • {userProfile.wins}W
            </span>
          </div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-indigo-400 transition-colors duration-200"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-white/5 bg-black/60 backdrop-blur-[16px]"
        >
          <div className="container py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                onLeaderboardClick?.();
                setIsMenuOpen(false);
              }}
              className="text-left text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
            >
              Leaderboard
            </button>
            <button
              onClick={() => {
                onProfileClick?.();
                setIsMenuOpen(false);
              }}
              className="text-left text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
            >
              Profile
            </button>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <img
                src={userProfile.avatar}
                alt={userProfile.username}
                className="w-8 h-8 rounded-full border border-white/10"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-sm font-medium">
                  {userProfile.username}
                </span>
                <span className="text-gray-500 text-xs">
                  Level {userProfile.level} • {userProfile.wins}W
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
