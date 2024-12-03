import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@kokoroquest.jp',
    link: 'mailto:support@kokoroquest.jp'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+81-XXX-XXXX-XXXX',
    link: 'tel:+81XXXXXXXXXX'
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Kokoro Street, Tokyo, Japan',
    link: 'https://maps.google.com'
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday to Friday: 9 AM – 6 PM JST'
  }
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Contact Information
      </h2>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <detail.icon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{detail.label}</h3>
              {detail.link ? (
                <a
                  href={detail.link}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-gray-600">{detail.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Preview */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              q: 'How can I schedule a demo?',
              a: 'Fill out the contact form and mention you\'d like a demo in your message.'
            },
            {
              q: 'What support options are available?',
              a: 'We offer email support, phone support, and live chat during business hours.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <h4 className="font-medium text-gray-900">{faq.q}</h4>
              <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}