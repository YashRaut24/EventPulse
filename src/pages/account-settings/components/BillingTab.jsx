import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BillingTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Billing & Subscription</h3>
        <p className="text-gray-300">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-semibold text-white">Pro Plan</h4>
            <p className="text-gray-300">$49/month • Billed monthly</p>
          </div>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Events</div>
            <div className="text-white font-medium">Unlimited</div>
          </div>
          <div>
            <div className="text-gray-400">Team Members</div>
            <div className="text-white font-medium">10</div>
          </div>
          <div>
            <div className="text-gray-400">Analytics</div>
            <div className="text-white font-medium">Advanced</div>
          </div>
          <div>
            <div className="text-gray-400">Support</div>
            <div className="text-white font-medium">Priority</div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-6">
        <h4 className="text-lg font-medium text-white mb-4">Billing History</h4>
        <div className="space-y-3">
          {[
            { date: 'Oct 1, 2025', amount: '$49.00', status: 'Paid' },
            { date: 'Sep 1, 2025', amount: '$49.00', status: 'Paid' },
            { date: 'Aug 1, 2025', amount: '$49.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white">{invoice.date}</div>
                <div className="text-gray-400 text-sm">Pro Plan</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{invoice.amount}</div>
                <div className="text-green-400 text-sm">{invoice.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingTab;