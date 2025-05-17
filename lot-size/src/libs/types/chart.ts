// types.ts
export type TradeDirection = 'buy' | 'sell';
export type ChartType = 
  | "10 index" | "10s" 
  | "25 index" | "25s" 
  | "50 index" | "50s" 
  | "75 index" | "75s" 
  | "100 index" | "100s" 
  | "150s" | "250s";

// types.ts
export interface TradeCalculation {
  id: string;
  date: string;
  chart: ChartType;
  direction: TradeDirection;
  accountBalance: number;
  riskPercentage: number;
  entryPrice: number;
  stopLossPrice: number;
  calculatedLotSize: number;
  riskAmount: number;
  pipValue: number;
  pipDistance: number;
  // Add these new fields to store user inputs
  inputs: {
    accountBalance: string;
    riskPercentage: string;
    entryPrice: string;
    stopLossPrice: string;
  };
}

export interface CalculatorFormData {
  chart: ChartType;
  direction: TradeDirection;
  accountBalance: string;
  riskPercentage: string;
  entryPrice: string;
  stopLossPrice: string;
}