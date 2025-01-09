export interface PersonalInfo {
  name: string;
  currentAge: number;
  spouseName: string;
  spouseCurrentAge: number;
}

export interface Assumptions {
  inflationRate: number; // annual
  investmentGrowthRate: number; // annual
  standardDeviation: number;
  // simulationData: string; // options: Use S&P 500 Historical data, Use custom data
}

export interface CurrentInvestments {
  rrsp: number; // current value
  tfsa: number; // current value
  nonRegisteredInvestments: number; // current value
  spouseRrsp: number; // current value
  spouseTfsa: number; // current value
  spouseNonRegisteredInvestments: number; //
}

export interface FutureInvestments {
  futureAnnualRrsp: number; // annual contribution
  futureAnnualTfsa: number; // annual contribution
  futureAnnualNonRegisteredInvestments: number; // annual contribution
  spouseFutureAnnualRrsp: number; // annual contribution
  spouseFutureAnnualTfsa: number; // annual contribution
  spouseFutureAnnualNonRegisteredInvestments: number; // annual contribution
}

export interface RetirementIncome {
  cpp: number; // at age 65 per month
  oas: number; // at age 65 per month
  pension: number; // at retirement per month
  spousePension: number; // at retirement per month
  spouseCpp: number; // at age 65 per month
  spouseOas: number; // at age 65 per month
  otherRetirementIncome: number; // per month
}

export interface RetirementGoals {
  retirementStartingAge: number;
  retirementEndingAge: number;
  desiredRetirementIncome: number; // annual
  cppStartAge: number;
  oasStartAge: number;
  withdrawalOrder: string; // options: RRSP/Investment in equal proportion and then TFSA, All three in equal proportion, TFSA first and then RRSP/Investment in equal proportion Logic for application
}

export interface CalculatedState {
  cppValues: { [year: number]: number };
  oasValues: { [year: number]: number };
  otherIncomeValues: { [year: number]: number };
  desiredIncomeValues: { [year: number]: number };
  investmentAmountNeeded: { [year: number]: number };
  openingBalanceRRSP: number;
  openingBalanceTFSA: number;
  openingBalanceNonRegisteredInvestments: number;
  rrspWithdrawals: { [year: number]: number };
  rrspBalances: { [year: number]: number };
  tfsaWithdrawals: { [year: number]: number };
  tfsaBalances: { [year: number]: number };
  nonRegisteredInvestmentWithdrawals: { [year: number]: number };
  nonRegisteredInvestmentBalances: { [year: number]: number };
  shortfallAmounts: { [year: number]: number };
  shortfallYears: number;
  netEstateValue: number;
  netWorths: { [year: number]: number };
}

export interface SimulationResults {
  meanReturn: number;
  standardDeviation: number;
  successCount: number;
  successRate: number;
  simulatedEndingPortfolio: number;
  growthRates: number[];
}

export interface RetirementPlan {
  planName: string;
  planId: string;
  planDescription: string;
  simulationMethod: string;
  retirementGoals: RetirementGoals;
  calculatedState: CalculatedState;
  simulationResults: SimulationResults;
}


export interface UIState {
  selectedSection: string;
  selectedPlan: string;
  isLeftMenuOpen: boolean;
  overlayClickHandler: (e: React.MouseEvent<HTMLDivElement>, callBack: () => void) => void;
}

export interface GlobalState {
  personalInfo: PersonalInfo;
  assumptions: Assumptions;
  currentInvestments: CurrentInvestments;
  retirementIncome: RetirementIncome;
  // retirementGoals: RetirementGoals;
  futureInvestments: FutureInvestments;
  // calculatedState: CalculatedState;
  ui: UIState;
  // simulationResults: SimulationResults;
  retirementPlans: RetirementPlan[];
}
