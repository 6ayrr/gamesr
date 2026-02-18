/**
 * Terms of Service Page
 * 
 * Comprehensive terms of service for GameSR platform
 * Fully responsive and SEO optimized
 */

import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initializeUserProfile } from '@/lib/gameState';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/gameState';

export default function Terms() {
  const [, navigate] = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const profile = initializeUserProfile();
    setUserProfile(profile);
  }, []);

  if (!userProfile) return null;

  return (
    <>
      <Header
        userProfile={userProfile}
        onProfileClick={() => navigate('/profile')}
        onLeaderboardClick={() => navigate('/leaderboard')}
      />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-8 text-gray-300"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the GameSR website and application, you accept and agree
                to be bound by the terms and provision of this agreement. If you do not agree to
                abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials
                (information or software) on GameSR for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of title, and under
                this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on GameSR</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
              <p>
                The materials on GameSR are provided on an 'as is' basis. GameSR makes no
                warranties, expressed or implied, and hereby disclaims and negates all other
                warranties including, without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
              <p>
                In no event shall GameSR or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business
                interruption) arising out of the use or inability to use the materials on
                GameSR, even if GameSR or an authorized representative has been notified orally
                or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on GameSR could include technical, typographical, or
                photographic errors. GameSR does not warrant that any of the materials on its
                website are accurate, complete, or current. GameSR may make changes to the
                materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Materials and Content</h2>
              <p>
                GameSR has not reviewed all of the sites linked to its website and is not
                responsible for the contents of any such linked site. The inclusion of any link
                does not imply endorsement by GameSR of the site. Use of any such linked website
                is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Modifications</h2>
              <p>
                GameSR may revise these terms of service for its website at any time without
                notice. By using this website, you are agreeing to be bound by the then current
                version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the
                laws of the jurisdiction in which GameSR operates, and you irrevocably submit to
                the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. User Conduct</h2>
              <p>
                You agree not to use the Service in any way that violates any applicable law or
                regulation, or that infringes upon the rights of others, or that is illegal or
                fraudulent. Prohibited behavior includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Harassing or causing distress or inconvenience to any person</li>
                <li>Obscene or offensive language or content</li>
                <li>Disrupting the normal flow of dialogue within our website</li>
                <li>Attempting to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>By visiting this page on our website: gamesr.example.com</li>
                <li>By sending us an email: support@gamesr.example.com</li>
              </ul>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
