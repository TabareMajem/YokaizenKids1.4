import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Save, AlertCircle } from 'lucide-react';

type Props = {
  settings: {
    openai?: {
      apiKey?: string;
      model?: string;
    };
    stripe?: {
      publicKey?: string;
      secretKey?: string;
      webhookSecret?: string;
    };
    stability?: {
      apiKey?: string;
    };
    aws?: {
      accessKeyId?: string;
      secretAccessKey?: string;
      region?: string;
      bucketName?: string;
    };
  };
  onSave: (settings: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export default function APISettings({ settings, onSave, isLoading, error }: Props) {
  const [formData, setFormData] = useState({
    openai: {
      apiKey: settings.openai?.apiKey || '',
      model: settings.openai?.model || 'gpt-4-turbo-preview'
    },
    stripe: {
      publicKey: settings.stripe?.publicKey || '',
      secretKey: settings.stripe?.secretKey || '',
      webhookSecret: settings.stripe?.webhookSecret || ''
    },
    stability: {
      apiKey: settings.stability?.apiKey || ''
    },
    aws: {
      accessKeyId: settings.aws?.accessKeyId || '',
      secretAccessKey: settings.aws?.secretAccessKey || '',
      region: settings.aws?.region || 'ap-northeast-1',
      bucketName: settings.aws?.bucketName || ''
    }
  });

  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

      {/* OpenAI Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">OpenAI Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="relative">
              <input
                type={showSecrets.openaiKey ? 'text' : 'password'}
                value={formData.openai.apiKey}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  openai: { ...prev.openai, apiKey: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('openaiKey')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.openaiKey ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Stripe Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Public Key
            </label>
            <div className="relative">
              <input
                type={showSecrets.stripePublic ? 'text' : 'password'}
                value={formData.stripe.publicKey}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, publicKey: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('stripePublic')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.stripePublic ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secret Key
            </label>
            <div className="relative">
              <input
                type={showSecrets.stripeSecret ? 'text' : 'password'}
                value={formData.stripe.secretKey}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, secretKey: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('stripeSecret')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.stripeSecret ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webhook Secret
            </label>
            <div className="relative">
              <input
                type={showSecrets.stripeWebhook ? 'text' : 'password'}
                value={formData.stripe.webhookSecret}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, webhookSecret: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('stripeWebhook')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.stripeWebhook ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stability AI Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Stability AI Configuration</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <div className="relative">
            <input
              type={showSecrets.stabilityKey ? 'text' : 'password'}
              value={formData.stability.apiKey}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                stability: { ...prev.stability, apiKey: e.target.value }
              }))}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
            <button
              type="button"
              onClick={() => toggleSecret('stabilityKey')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showSecrets.stabilityKey ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AWS Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">AWS Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Key ID
            </label>
            <div className="relative">
              <input
                type={showSecrets.awsAccessKey ? 'text' : 'password'}
                value={formData.aws.accessKeyId}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  aws: { ...prev.aws, accessKeyId: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('awsAccessKey')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.awsAccessKey ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secret Access Key
            </label>
            <div className="relative">
              <input
                type={showSecrets.awsSecretKey ? 'text' : 'password'}
                value={formData.aws.secretAccessKey}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  aws: { ...prev.aws, secretAccessKey: e.target.value }
                }))}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => toggleSecret('awsSecretKey')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showSecrets.awsSecretKey ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              value={formData.aws.region}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                aws: { ...prev.aws, region: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            >
              <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
              <option value="us-east-1">US East (N. Virginia)</option>
              <option value="us-west-2">US West (Oregon)</option>
              <option value="eu-west-1">Europe (Ireland)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              S3 Bucket Name
            </label>
            <input
              type="text"
              value={formData.aws.bucketName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                aws: { ...prev.aws, bucketName: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
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