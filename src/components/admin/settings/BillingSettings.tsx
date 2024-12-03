import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Building2, Save, AlertCircle } from 'lucide-react';

type Props = {
  settings: {
    companyName: string;
    taxId: string;
    billingEmail: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    currency: string;
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function BillingSettings({ settings, onSave, isLoading, error }: Props) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Company Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-500" />
          Company Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                companyName: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID
            </label>
            <input
              type="text"
              value={formData.taxId}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                taxId: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-500" />
          Billing Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Billing Email
            </label>
            <input
              type="email"
              value={formData.billingEmail}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingEmail: e.target.value
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.billingAddress.street}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    street: e.target.value
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.billingAddress.city}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    city: e.target.value
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                value={formData.billingAddress.state}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    state: e.target.value
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.billingAddress.postalCode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  billingAddress: {
                    ...prev.billingAddress,
                    postalCode: e.target.value
                  }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              value={formData.billingAddress.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingAddress: {
                  ...prev.billingAddress,
                  country: e.target.value
                }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="JP">Japan</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Currency Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-500" />
          Currency Settings
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              currency: e.target.value
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="JPY">Japanese Yen (¥)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
          hover:bg-purple-700 transition-colors disabled:opacity-50
          disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent 
              rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>
    </form>
  );
}