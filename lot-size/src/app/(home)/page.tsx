'use client';

import React, { useState } from 'react';
import LotSizeCalculator from '@/layouts/components/home/Form';
import HistoryPage from '@/layouts/components/history/HistoryPage';

const TradingApp = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'calculator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {activeTab === 'calculator' ? <LotSizeCalculator /> : <HistoryPage />}
      </div>
    </div>
  );
};

export default TradingApp;