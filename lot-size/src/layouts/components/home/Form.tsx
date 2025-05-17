'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '@/libs/hooks/useLocalStorage';
import DropDown from '@/layouts/UI/DropDown';
import { charts, trend } from '@/libs/data/dropDown';
import Button from '@/layouts/UI/Button';
import { TradeCalculation, CalculatorFormData } from '@/libs/types/chart';
import Modal from '../modal/Modal';

const LotSizeCalculator = () => {
  const [calculations, setCalculations] = useLocalStorage<TradeCalculation[]>('tradeCalculations', []);
  console.log(calculations)
  const [formData, setFormData] = useState<CalculatorFormData>({
    chart: '10 index',
    direction: 'buy',
    accountBalance: '',
    riskPercentage: '',
    entryPrice: '',
    exitPrice: '',
    stopLossPrice: ''
  });
  const [result, setResult] = useState<Omit<TradeCalculation, 'id' | 'date' | 'inputs'> | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<TradeCalculation | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateLotSize = () => {
    const accountBalance = parseFloat(formData.accountBalance);
    const riskPercentage = parseFloat(formData.riskPercentage) / 100;
    const entryPrice = parseFloat(formData.entryPrice);
    const stopLossPrice = parseFloat(formData.stopLossPrice);
    const exitPrice = parseFloat(formData.exitPrice);

    if (!accountBalance || !riskPercentage || !entryPrice || !stopLossPrice || !exitPrice) {
      alert('Please fill all fields with valid numbers');
      return;
    }

    // Calculate risk amount
    const riskAmount = accountBalance * riskPercentage;

    // Calculate pip distances
    const pipDistance = Math.abs(entryPrice - stopLossPrice);
    const tpDistance = Math.abs(entryPrice - exitPrice);

    // Determine pip value based on chart type
    let pipValue = 0;
    if (formData.chart.includes('10')) pipValue = 1;
    else if (formData.chart.includes('25')) pipValue = 2.5;
    else if (formData.chart.includes('50')) pipValue = 5;
    else if (formData.chart.includes('75')) pipValue = 7.5;
    else if (formData.chart.includes('100')) pipValue = 10;
    else if (formData.chart.includes('150')) pipValue = 15;
    else if (formData.chart.includes('250')) pipValue = 25;

    // Calculate lot size (simplified calculation)
    const calculatedLotSize = riskAmount / (pipDistance * pipValue);

    // Calculate potential profit and risk/reward ratio
    const potentialProfit = calculatedLotSize * tpDistance * pipValue;
    const riskRewardRatio = potentialProfit / riskAmount;

    const calculationResult = {
      chart: formData.chart,
      direction: formData.direction,
      accountBalance,
      riskPercentage: riskPercentage * 100,
      entryPrice,
      exitPrice,
      stopLossPrice,
      calculatedLotSize,
      riskAmount,
      pipValue,
      pipDistance,
      tpDistance,
      potentialProfit,
      riskRewardRatio,
      inputs: {
        accountBalance: formData.accountBalance,
        riskPercentage: formData.riskPercentage,
        entryPrice: formData.entryPrice,
        exitPrice: formData.exitPrice,
        stopLossPrice: formData.stopLossPrice
      }
    };

    setResult(calculationResult);

    // Save to history
    const newCalculation = {
      ...calculationResult,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setCalculations(prev => [newCalculation, ...prev]);
  };

  const resetForm = () => {
    setFormData({
      chart: '10 index',
      direction: 'buy',
      accountBalance: '',
      riskPercentage: '',
      entryPrice: '',
      exitPrice: '',
      stopLossPrice: ''
    });
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-bold mb-6 text-center">Lot Size Calculator</h2>
      
      <div className="space-y-4">
        <DropDown
          value="Chart"
          arrayOfData={charts}
          logic={(e) => handleInputChange(e)}
          selectedValue={formData.chart}
          name="chart"
        />

        <DropDown
          value="Direction"
          arrayOfData={trend}
          logic={(e) => handleInputChange(e)}
          selectedValue={formData.direction}
          name="direction"
        />

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Account Balance ($)
          </label>
          <input
            type="number"
            name="accountBalance"
            value={formData.accountBalance}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. 1000"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Risk Percentage (%)
          </label>
          <input
            type="number"
            name="riskPercentage"
            value={formData.riskPercentage}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. 2"
            step="0.1"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Entry Price
          </label>
          <input
            type="number"
            name="entryPrice"
            value={formData.entryPrice}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. 1.2345"
            step="0.0001"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Take Profit Price
          </label>
          <input
            type="number"
            name="exitPrice"
            value={formData.exitPrice}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. 1.2400"
            step="0.0001"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Stop Loss Price
          </label>
          <input
            type="number"
            name="stopLossPrice"
            value={formData.stopLossPrice}
            onChange={handleInputChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. 1.2300"
            step="0.0001"
            min="0"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            label="Calculate"
            onClick={calculateLotSize}
            type="primary"
            disabled={!formData.accountBalance || !formData.riskPercentage || !formData.entryPrice || !formData.stopLossPrice || !formData.exitPrice}
          />
          <Button
            label="Reset"
            onClick={resetForm}
            type="secondary"
          />
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Calculation Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-black">Risk Amount:</span>
                <span className="font-medium">${result.riskAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Potential Profit:</span>
                <span className="font-medium">${result.potentialProfit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Risk/Reward Ratio:</span>
                <span className="font-medium">{result.riskRewardRatio.toFixed(2)}:1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">SL Distance (pips):</span>
                <span className="font-medium">{result.pipDistance.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">TP Distance (pips):</span>
                <span className="font-medium">{result.tpDistance.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Pip Value:</span>
                <span className="font-medium">${result.pipValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Recommended Lot Size:</span>
                <span className="font-medium">{result.calculatedLotSize.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

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
                <p className="text-sm text-gray-500">Take Profit Price</p>
                <p className="font-medium">{selectedHistory.inputs.exitPrice}</p>
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
                  <p className="text-sm text-gray-500">Potential Profit</p>
                  <p className="font-medium">${selectedHistory.potentialProfit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk/Reward Ratio</p>
                  <p className="font-medium">{selectedHistory.riskRewardRatio.toFixed(2)}:1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">SL Distance (pips)</p>
                  <p className="font-medium">{selectedHistory.pipDistance.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TP Distance (pips)</p>
                  <p className="font-medium">{selectedHistory.tpDistance.toFixed(4)}</p>
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

export default LotSizeCalculator;