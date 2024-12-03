import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainNavbar from '../../components/layout/MainNavbar';
import MainFooter from '../../components/layout/MainFooter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <MainNavbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: March 15, 2024
            </p>

            <section className="mb-8">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Student data and progress information</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing and improving our services</li>
                <li>Personalizing learning experiences</li>
                <li>Processing payments</li>
                <li>Communicating with users</li>
                <li>Analyzing and optimizing our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>3. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>4. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2>5. Your Rights</h2>
              <p>
                You have certain rights regarding your personal information:
              </p>
              <ul>
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@kokoroquest.com<br />
                Address: 123 Kokoro Street, Tokyo, Japan
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <MainFooter />
    </div>
  );
}