'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
import { TradeCalculation } from '@/libs/types/chart'
import Button from '@/layouts/UI/Button';
import Modal from '../modal/Modal';

const HistoryPage = () => {
  const [calculations, setCalculations] = useLocalStorage<TradeCalculation[]>('tradeCalculations', []);
  const [selectedHistory, setSelectedHistory] = useState<TradeCalculation | null>(null);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setCalculations([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Calculation History</h2>
        {calculations.length > 0 && (
          <Button
            label="Clear History"
            onClick={clearHistory}
            type="secondary"
          />
        )}
      </div>

      {calculations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No calculation history yet. Start calculating to see your history here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Chart</th>
                <th className="py-3 px-4 text-left">Direction</th>
                <th className="py-3 px-4 text-left">Balance</th>
                <th className="py-3 px-4 text-left">Risk %</th>
                <th className="py-3 px-4 text-left">Lot Size</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {calculations.map((calc) => (
                <tr key={calc.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{new Date(calc.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{calc.chart}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      calc.direction === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {calc.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">${calc.inputs.accountBalance}</td>
                  <td className="py-3 px-4">{calc.inputs.riskPercentage}%</td>
                  <td className="py-3 px-4 font-medium">{calc.calculatedLotSize.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedHistory(calc)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* History Details Modal */}
      <Modal
        isOpen={!!selectedHistory}
        onClose={() => setSelectedHistory(null)}
        title="Trade Calculation Details"
      >
        {selectedHistory && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(selectedHistory.date).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Chart</p>
                <p className="font-medium">{selectedHistory.chart}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Direction</p>
                <p className={`font-medium ${selectedHistory.direction === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedHistory.direction.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Balance</p>
                <p className="font-medium">${selectedHistory.inputs.accountBalance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Risk Percentage</p>
                <p className="font-medium">{selectedHistory.inputs.riskPercentage}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Price</p>
                <p className="font-medium">{selectedHistory.inputs.entryPrice}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stop Loss Price</p>
                <p className="font-medium">{selectedHistory.inputs.stopLossPrice}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h4 className="font-medium text-lg mb-2">Calculation Results</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Risk Amount</p>
                  <p className="font-medium">${selectedHistory.riskAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pip Distance</p>
                  <p className="font-medium">{selectedHistory.pipDistance.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pip Value</p>
                  <p className="font-medium">${selectedHistory.pipValue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lot Size</p>
                  <p className="font-medium">{selectedHistory.calculatedLotSize.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                label="Close"
                onClick={() => setSelectedHistory(null)}
                type="primary"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryPage;