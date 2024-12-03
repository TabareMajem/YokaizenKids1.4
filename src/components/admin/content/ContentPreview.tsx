import React from 'react';
import { motion } from 'framer-motion';
import { X, Monitor, Smartphone, Tablet, Calendar, Globe } from 'lucide-react';
import type { Content } from '../../../types/content';

type Props = {
  content: Content;
  isOpen: boolean;
  onClose: () => void;
};

type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function ContentPreview({ content, isOpen, onClose }: Props) {
  const [deviceView, setDeviceView] = React.useState<DeviceView>('desktop');

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'max-w-[1200px]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
        ${isOpen ? 'flex' : 'hidden'} items-center justify-center p-4`}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden 
          flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Device Switcher */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceView === 'desktop' 
                      ? 'bg-white shadow text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeviceView('tablet')}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceView === 'tablet' 
                      ? 'bg-white shadow text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Tablet className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-2 rounded-lg transition-colors ${
                    deviceView === 'mobile' 
                      ? 'bg-white shadow text-purple-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </div>

              {/* Content Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {content.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {content.publishedAt 
                        ? new Date(content.publishedAt).toLocaleDateString()
                        : 'Not published'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{content.metadata.language || 'en'}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className={`mx-auto bg-white rounded-lg shadow-sm ${getDeviceClass()}`}>
            <div className="p-6 prose max-w-none" 
              dangerouslySetInnerHTML={{ __html: content.content }} 
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}