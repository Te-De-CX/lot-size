// types.ts
export type TradeDirection = 'buy' | 'sell';
export type ChartType = 
  | "10 index" | "10s" 
  | "25 index" | "25s" 
  | "50 index" | "50s" 
  | "75 index" | "75s" 
  | "100 index" | "100s" 
  | "150s" | "250s";

export interface TradeCalculation {
  id: string;
  date: string;
  chart: ChartType;
  direction: TradeDirection;
  accountBalance: number;
  riskPercentage: number;
  entryPrice: number;
  exitPrice: number;
  stopLossPrice: number;
  calculatedLotSize: number;
  riskAmount: number;
  pipValue: number;
  pipDistance: number;
  tpDistance: number;
  potentialProfit: number;
  riskRewardRatio: number;
  inputs: {
    accountBalance: string;
    riskPercentage: string;
    entryPrice: string;
    exitPrice: string;
    stopLossPrice: string;
  };
}

export interface CalculatorFormData {
  chart: ChartType;
  direction: TradeDirection;
  accountBalance: string;
  riskPercentage: string;
  entryPrice: string;
  exitPrice: string;
  stopLossPrice: string;
}