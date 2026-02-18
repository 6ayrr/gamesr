/**
 * Footer Component
 * 
 * Minimalist footer with branding, legal links, and ad container placeholder
 * Design: Ultra-dark with subtle borders and links
 */

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Footer() {
  const [, navigate] = useLocation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-[16px] mt-16">
      <div className="container py-12">
        {/* Ad Container Placeholder */}
        <div className="mb-12 p-4 glass-card flex items-center justify-center min-h-[100px] bg-white/2">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Google AdSense Integration Placeholder
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Responsive ad container for monetization
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">GS</span>
              </div>
              <span className="text-white font-bold tracking-tighter">GameSR</span>
            </div>
            <p className="text-gray-500 text-sm">
              Premium Tic-Tac-Toe platform with AI opponent and global leaderboard.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Profile
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Privacy Policy
                  <ExternalLink size={12} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Terms of Service
                  <ExternalLink size={12} />
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-xs"
        >
          <p>
            © {currentYear} GameSR. Made with precision by the GameSR Team. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
