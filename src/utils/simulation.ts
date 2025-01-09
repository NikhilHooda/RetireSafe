import axios from 'axios';
// import { random } from 'mathjs';

import { SimulationResults } from '../types';

interface HistoricalReturn {
    year: number;
    return: number;
}

const fetchSP500ReturnsFromYahoo = async (): Promise<HistoricalReturn[]> => {
    const yahooFinanceUrl = 'https://query2.finance.yahoo.com/v8/finance/chart/%5EGSPC';
    const params = {
        range: 'max',
        interval: '1d',
        events: 'history',
    };

    try {
        const response = await axios.get(yahooFinanceUrl, { params });
        const { timestamp, indicators } = response.data.chart.result[0];
        const closingPrices = indicators.adjclose[0].adjclose;

        // Map timestamps to yearly data
        const data: { year: number; close: number }[] = timestamp.map(
            (timestamp: number, index: number) => {
                const date = new Date(timestamp * 1000);
                return {
                    year: date.getFullYear(),
                    close: closingPrices[index],
                };
            }
        );

        // Group by year and calculate returns
        const groupedData = data.reduce((acc: any, { year, close }) => {
            if (!acc[year]) acc[year] = { start: close, end: close };
            else acc[year].end = close;
            return acc;
        }, {});

        return Object.entries(groupedData).map(([year, { start, end }]: any) => ({
            year: parseInt(year, 10),
            return: ((end - start) / start) * 100,
        }));
    } catch (error) {
        console.error('Error fetching S&P 500 data:', error);
        return [];
    }
};

/**
 * Generates a random number following a normal (Gaussian) distribution.
 *
 * @param mean - The mean (μ) of the normal distribution.
 * @param stdDev - The standard deviation (σ) of the normal distribution.
 * @returns A random number following the specified normal distribution.
 *
 * @remarks
 * This function uses the Box-Muller transform to generate a normally distributed random number
 * from two uniformly distributed random numbers.
 */
const randomNormal = (mean: number, stdDev: number): number => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export interface SimulationInputs {
    startingInvestments: number;
    futureAnnualContribution: number;
    requiredRetirementIncome: number;
    workingYears: number;
    retirementYears: number;
    inflationRate: number;
    investmentGrowthRate: number;
    simulations: number;
    simulationMethod: string;
    standardDeviation: number;
}

export const runRetirementSimulation = async (
    inputs: SimulationInputs
): Promise<SimulationResults> => {
    // for testing - Dummy Data
    // inputs = {
    //     startingInvestments: 600000, // Starting savings
    //     futureAnnualContribution: 30000, // Contribution during working years
    //     requiredInvestmentIncome: 70000, // Expenses during retirement
    //     workingYears: 10, // Years until retirement
    //     retirementYears: 25, // Retirement duration
    //     inflationRate: 0.03, // Annual inflation rate
    //     simulations: 1000, // Number of Monte Carlo simulations
    // };

    // for testing
    // inputs.simulations = 200;

    const {
        startingInvestments,
        futureAnnualContribution,
        requiredRetirementIncome,
        workingYears,
        retirementYears,
        inflationRate,
        investmentGrowthRate = 0,
        simulations = 1000,
        simulationMethod = 'sp500HistoricalData',
        standardDeviation = 15,
    } = inputs;
    // console.log('inputs', inputs);
    let historicalReturns: HistoricalReturn[] = [];
    let meanReturn = 0;
    let stdDevReturn = 0;
    if (simulationMethod === 'sp500HistoricalData') {
        // console.log('Fetching S&P 500 data...');
        historicalReturns = await fetchSP500ReturnsFromYahoo();
        if (historicalReturns.length === 0) {
            throw new Error('No historical returns data available.');
        }
        meanReturn = historicalReturns.reduce((sum, r) => sum + r.return, 0) / historicalReturns.length;
        stdDevReturn = Math.sqrt(historicalReturns.reduce((sum, r) => sum + Math.pow(r.return - meanReturn, 2), 0) / historicalReturns.length);
    } else {
        console.log('Using custom data...');
        meanReturn = investmentGrowthRate;
        stdDevReturn = standardDeviation;
    }
    // console.log('Historical Returns:', historicalReturns);
    // console.log('Mean Return:', meanReturn);
    // console.log('Standard Deviation:', stdDevReturn);

    let successCount = 0;
    let totalEndingPortfolio = 0;
    let growthRates: number[] = [];

    for (let i = 0; i < simulations; i++) {
        // console.log("**************SIMULATION**************", i);
        let portfolio = startingInvestments;
        // console.log('portfolio', portfolio);

        // Accumulation phase (savings years)
        for (let year = 0; year < workingYears; year++) {
            // const randomReturn =
            //     historicalReturns[
            //         Math.floor(Math.random() * historicalReturns.length)
            //     ].return / 100;
            // const randomReturn = random(meanReturn - stdDevReturn, meanReturn + stdDevReturn) / 100;
            const randomReturn = stdDevReturn === 0 ? meanReturn / 100 : randomNormal(meanReturn, stdDevReturn) / 100;
            growthRates.push(Number((randomReturn * 100).toFixed(2)));
            portfolio = portfolio * (1 + randomReturn) + futureAnnualContribution;
        }

        // Retirement phase (withdrawal years)
        for (let year = 0; year < retirementYears; year++) {
            // const randomReturn =
            //     historicalReturns[
            //         Math.floor(Math.random() * historicalReturns.length)
            //     ].return / 100;
            // const randomReturn = random(meanReturn - stdDevReturn, meanReturn + stdDevReturn) / 100;
            const randomReturn = stdDevReturn === 0 ? meanReturn / 100 : randomNormal(meanReturn, stdDevReturn) / 100;
            growthRates.push(Number((randomReturn * 100).toFixed(2)));
            portfolio =
                (portfolio * (1 + randomReturn)) -
                (requiredRetirementIncome * Math.pow(1 + inflationRate, year));
            // console.log('randomReturn', randomReturn);
            // console.log('portfolio', portfolio);
            if (portfolio < 0) break; // Portfolio ran out of money
        }

        // console.log('portfolio', portfolio);

        if (portfolio > 0) {
            successCount++;
            // console.log('successCount', successCount);
            totalEndingPortfolio += portfolio;
        }
    }
    // console.log('growthRates', growthRates);

    return {
        meanReturn: Number(meanReturn.toFixed(2)),
        standardDeviation: Number(stdDevReturn.toFixed(2)),
        successCount,
        successRate: Math.round((successCount / simulations) * 100),
        simulatedEndingPortfolio: successCount > 0 ? Math.round(totalEndingPortfolio / successCount) : 0,
        growthRates,
    };
    // return Math.round((successCount / simulations) * 100);
};

// const simulationInputs: SimulationInputs = {
//     initialSavings: 1300000, // Starting savings
//     annualContribution: 30000, // Contribution during working years
//     annualExpenses: 70000, // Expenses during retirement
//     workingYears: 10, // Years until retirement
//     retirementYears: 25, // Retirement duration
//     inflationRate: 0.03, // Annual inflation rate
//     simulations: 1000, // Number of Monte Carlo simulations
// };

// export const calculateRetirementSuccessRate = async (simulationInputs: SimulationInputs) => {
//     try {
//         const successCount = await runSimulationWithYahooData(simulationInputs);
//         console.log(`Success Rate: ${successCount}`);
//         return Math.round(successCount);
//     } catch (error) {
//         console.error('Error running simulation:', error);
//         return 0;
//     }
// };
