/**
 * Privacy Policy Page
 * 
 * Comprehensive privacy policy for GameSR platform
 * Fully responsive and SEO optimized
 */

import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initializeUserProfile } from '@/lib/gameState';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/lib/gameState';

export default function Privacy() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                GameSR ("we," "us," "our," or "Company") operates the GameSR website and
                application. This page informs you of our policies regarding the collection,
                use, and disclosure of personal data when you use our Service and the choices
                you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information Collection and Use
              </h2>
              <p>We collect several different types of information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Personal Data:</strong> While using our Service, we may ask you to
                  provide us with certain personally identifiable information that can be used
                  to contact or identify you ("Personal Data"). This may include, but is not
                  limited to:
                  <ul className="list-circle pl-6 mt-2 space-y-1">
                    <li>Username</li>
                    <li>Email address (if provided)</li>
                    <li>Game statistics and history</li>
                    <li>Browser and device information</li>
                  </ul>
                </li>
                <li>
                  <strong>Usage Data:</strong> We may also collect information on how the
                  Service is accessed and used ("Usage Data"). This may include information
                  such as your computer's Internet Protocol address, browser type, browser
                  version, the pages you visit, the time and date of your visit, and other
                  diagnostic data.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Use of Data</h2>
              <p>GameSR uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of
                transmission over the Internet or method of electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your Personal
                Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the
                "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>By visiting this page on our website: gamesr.example.com</li>
                <li>By sending us an email: privacy@gamesr.example.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Local Storage</h2>
              <p>
                GameSR uses browser LocalStorage to save your game progress, statistics, and
                preferences locally on your device. This data is not transmitted to our servers
                unless you explicitly choose to sync your account. You can clear this data at
                any time through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Services</h2>
              <p>
                Our Service may contain links to other sites that are not operated by us. This
                Privacy Policy does not apply to third-party websites, and we are not
                responsible for their privacy practices. We encourage you to review the privacy
                policies of any third-party service before providing your personal information.
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
