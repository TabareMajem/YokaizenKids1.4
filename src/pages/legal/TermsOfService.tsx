import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainNavbar from '../../components/layout/MainNavbar';
import MainFooter from '../../components/layout/MainFooter';

export default function TermsOfService() {
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
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>

          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: March 15, 2024
            </p>

            <section className="mb-8">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Kokoro Quest, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2>2. User Accounts</h2>
              <p>
                You are responsible for:
              </p>
              <ul>
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>3. Subscription and Payments</h2>
              <p>
                Subscription terms:
              </p>
              <ul>
                <li>Automatic renewal unless cancelled</li>
                <li>Pricing may be subject to change with notice</li>
                <li>Refunds are subject to our refund policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>4. Content and Conduct</h2>
              <p>
                Users agree to:
              </p>
              <ul>
                <li>Use the service for its intended educational purpose</li>
                <li>Not share inappropriate or harmful content</li>
                <li>Respect intellectual property rights</li>
                <li>Follow community guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>5. Data Privacy</h2>
              <p>
                We handle your data in accordance with our Privacy Policy. By using our service, you consent to our data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2>6. Termination</h2>
              <p>
                We reserve the right to:
              </p>
              <ul>
                <li>Suspend or terminate accounts</li>
                <li>Modify or discontinue services</li>
                <li>Change terms with notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>7. Contact Information</h2>
              <p>
                For questions about these Terms:
              </p>
              <p>
                Email: legal@kokoroquest.com<br />
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