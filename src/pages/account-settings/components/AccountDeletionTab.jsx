import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AccountDeletionTab = () => {
  const [confirmText, setConfirmText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    if (confirmText === 'DELETE') {
      alert('Account deletion process would be initiated here');
      setShowConfirmation(false);
      setConfirmText('');
    } else {
      alert('Please type DELETE to confirm');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Delete Account</h3>
        <p className="text-gray-300">Permanently delete your account and all associated data</p>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="AlertTriangle" size={24} className="text-red-400 mt-1" />
          <div>
            <h4 className="text-red-400 font-semibold mb-2">Warning: This action cannot be undone</h4>
            <div className="text-gray-300 space-y-2">
              <p>Deleting your account will permanently remove:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>All your events and event data</li>
                <li>Analytics and reporting history</li>
                <li>Social media integrations</li>
                <li>Team collaborations and shared data</li>
                <li>Billing history and subscription</li>
              </ul>
            </div>
          </div>
        </div>

        {!showConfirmation ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfirmation(true)}
            className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Delete My Account
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type "DELETE" to confirm account deletion:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full bg-black/60 border border-red-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-400"
              />
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowConfirmation(false);
                  setConfirmText('');
                }}
                className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteAccount}
                disabled={confirmText !== 'DELETE'}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDeletionTab;