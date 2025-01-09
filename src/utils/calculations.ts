interface CalculateCPPParams {
    cppStartAge: number;
    cppAmount: number;
    retirementStartingAge: number;
    retirementEndingAge: number;
    inflationRate: number;
    spouseCPP: number;
}

/**
 * Calculates the Canada Pension Plan (CPP) values for each year from the retirement starting age to the retirement ending age.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.cppStartAge - The age at which CPP starts. Must be between 60 and 70.
 * @param {number} params.cppAmount - The initial CPP amount.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @param {number} params.retirementEndingAge - The age at which retirement ends.
 * @param {number} params.inflationRate - The annual inflation rate as a percentage.
 * @param {number} params.spouseCPP - The initial CPP amount for the spouse.
 * @returns {Object} An object where the keys are the years and the values are the CPP amounts for those years.
 * @throws {Error} If cppStartAge is not between 60 and 70.
 *
 * The function calculates the CPP amount for each year from the retirement starting age to the retirement ending age.
 * If the cppStartAge is less than 65, the CPP amount is reduced by 0.6% for each month before 65.
 * If the cppStartAge is greater than 65, the CPP amount is increased by 0.7% for each month after 65.
 * The spouse's CPP amount is adjusted similarly.
 * The CPP amount is then adjusted for inflation each year.
 */
export const calculateCPP = ({
    cppStartAge,
    cppAmount,
    retirementStartingAge,
    retirementEndingAge,
    inflationRate,
    spouseCPP
}: CalculateCPPParams): { [year: number]: number } => {
    if (cppStartAge < 60 || cppStartAge > 70) {
        throw new Error('cppStartAge should be between 60 and 70');
    }

    const cppValues: { [year: number]: number } = {};
    let adjustedCppAmount = cppAmount;
    let adjustedSpouseCppAmount = spouseCPP;

    for (let age = retirementStartingAge; age <= retirementEndingAge; age++) {
        if (age < cppStartAge) {
            cppValues[age] = 0;
        } else if (age === cppStartAge) {
            const monthsEarly = (65 - cppStartAge) * 12;
            const monthsLate = (cppStartAge - 65) * 12;
            if (cppStartAge < 65) {
                adjustedCppAmount -= (cppAmount * 0.006 * monthsEarly);
                adjustedSpouseCppAmount -= (spouseCPP * 0.006 * monthsEarly);
            } else if (cppStartAge > 65) {
                adjustedCppAmount += (cppAmount * 0.007 * monthsLate);
                adjustedSpouseCppAmount += (spouseCPP * 0.007 * monthsLate);
            }
            cppValues[age] = Math.round((adjustedCppAmount + adjustedSpouseCppAmount) * 12);
        } else {
            adjustedCppAmount *= (1 + inflationRate / 100);
            adjustedSpouseCppAmount *= (1 + inflationRate / 100);
            cppValues[age] = Math.round((adjustedCppAmount + adjustedSpouseCppAmount) * 12);
        }
    }

    return cppValues;
};

interface CalculateOASParams {
    oasStartAge: number;
    oasAmount: number;
    retirementStartingAge: number;
    retirementEndingAge: number;
    inflationRate: number;
    spouseOAS: number;
}

/**
 * Calculates the Old Age Security (OAS) values for each year from the retirement starting age to the retirement ending age.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.oasStartAge - The age at which OAS starts. Must be between 65 and 70.
 * @param {number} params.oasAmount - The initial OAS amount.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @param {number} params.retirementEndingAge - The age at which retirement ends.
 * @param {number} params.inflationRate - The annual inflation rate as a percentage.
 * @param {number} params.spouseOAS - The initial OAS amount for the spouse.
 * @returns {Object} An object where the keys are the years and the values are the OAS amounts for those years.
 * @throws {Error} If oasStartAge is not between 65 and 70.
 *
 * The function calculates the OAS amount for each year from the retirement starting age to the retirement ending age.
 * If the oasStartAge is greater than 65, the OAS amount is increased by 0.6% for each month after 65.
 * The spouse's OAS amount is adjusted similarly.
 * The OAS amount is then adjusted for inflation each year.
 */
export const calculateOAS = ({
    oasStartAge,
    oasAmount,
    retirementStartingAge,
    retirementEndingAge,
    inflationRate,
    spouseOAS
}: CalculateOASParams): { [year: number]: number } => {
    if (oasStartAge < 65 || oasStartAge > 70) {
        throw new Error('oasStartAge should be between 65 and 70');
    }

    const oasValues: { [year: number]: number } = {};
    let adjustedOasAmount = oasAmount;
    let adjustedSpouseOasAmount = spouseOAS;

    for (let age = retirementStartingAge; age <= retirementEndingAge; age++) {
        if (age < oasStartAge) {
            oasValues[age] = 0;
        } else if (age === oasStartAge) {
            const monthsLate = (oasStartAge - 65) * 12;
            adjustedOasAmount += (oasAmount * 0.006 * monthsLate);
            adjustedSpouseOasAmount += (spouseOAS * 0.006 * monthsLate);
            oasValues[age] = Math.round((adjustedOasAmount + adjustedSpouseOasAmount) * 12);
        } else {
            adjustedOasAmount *= (1 + inflationRate / 100);
            adjustedSpouseOasAmount *= (1 + inflationRate / 100);
            oasValues[age] = Math.round((adjustedOasAmount + adjustedSpouseOasAmount) * 12);
        }
    }

    return oasValues;
};

interface CalculateOtherIncomesParams {
    pension: number;
    spousePension: number;
    otherRetirementIncome: number;
    retirementStartingAge: number;
    retirementEndingAge: number;
}

/**
 * Calculates other retirement incomes for each year from the retirement starting age to the retirement ending age.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.pension - The pension amount.
 * @param {number} params.spousePension - The spouse's pension amount.
 * @param {number} params.otherRetirementIncome - Any other retirement income.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @param {number} params.retirementEndingAge - The age at which retirement ends.
 * @returns {Object} An object where the keys are the years and the values are the total other incomes for those years.
 */
export const calculateOtherIncomes = ({
    pension,
    spousePension,
    otherRetirementIncome,
    retirementStartingAge,
    retirementEndingAge
}: CalculateOtherIncomesParams): { [year: number]: number } => {
    const otherIncomeValues: { [year: number]: number } = {};
    const totalOtherIncome = Math.round((pension + spousePension + otherRetirementIncome) * 12);

    for (let age = retirementStartingAge; age <= retirementEndingAge; age++) {
        otherIncomeValues[age] = totalOtherIncome;
    }

    return otherIncomeValues;
};

export const calculateRetirementIncome = (incomeSources: number[]): number => {
    return incomeSources.reduce((total, income) => total + income, 0);
};

// export const calculateRetirementProjections = (state: any) => {
//     // Implement the logic for retirement projections based on the state
//     // This function should return the data required for the charts

//     // Example data structure
//     return {
//         years: ['2025', '2026', '2027', '2028', '2029'],
//         incomeRequired: [50000, 52000, 54000, 56000, 58000],
//         incomeUsed: [45000, 47000, 49000, 51000, 53000],
//         shortfall: [5000, 5000, 5000, 5000, 5000],
//         netWorth: [200000, 210000, 220000, 230000, 240000],
//         cashFlow: [10000, 11000, 12000, 13000, 14000]
//     };
// };

interface CalculateDesiredIncomeParams {
    desiredRetirementIncome: number;
    retirementStartingAge: number;
    retirementEndingAge: number;
    inflationRate: number;
}

/**
 * Calculates the desired retirement income for each year from the retirement starting age to the retirement ending age.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.desiredRetirementIncome - The desired retirement income inputted by the end user.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @param {number} params.retirementEndingAge - The age at which retirement ends.
 * @param {number} params.inflationRate - The annual inflation rate as a percentage.
 * @returns {Object} An object where the keys are the years and the values are the desired incomes for those years.
 */
export const calculateDesiredIncomes = ({
    desiredRetirementIncome,
    retirementStartingAge,
    retirementEndingAge,
    inflationRate
}: CalculateDesiredIncomeParams): { [year: number]: number } => {
    const desiredIncomeValues: { [year: number]: number } = {};
    let adjustedDesiredIncome = desiredRetirementIncome;

    for (let age = retirementStartingAge; age <= retirementEndingAge; age++) {
        desiredIncomeValues[age] = Math.round(adjustedDesiredIncome);
        adjustedDesiredIncome *= (1 + inflationRate / 100);
    }

    return desiredIncomeValues;
};

interface CalculateInvestmentAmountNeededParams {
    cppValues: { [year: number]: number };
    oasValues: { [year: number]: number };
    otherIncomeValues: { [year: number]: number };
    desiredIncomeValues: { [year: number]: number };
}

/**
 * Calculates the extra amount needed to meet the target for each year.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {Object} params.cppValues - The CPP values for each year.
 * @param {Object} params.oasValues - The OAS values for each year.
 * @param {Object} params.otherIncomeValues - The other income values for each year.
 * @param {Object} params.desiredIncomeValues - The desired income values for each year.
 * @returns {Object} An object where the keys are the years and the values are the extra amounts needed for those years.
 */
export const calculateInvestmentAmountNeeded = ({
    cppValues,
    oasValues,
    otherIncomeValues,
    desiredIncomeValues
}: CalculateInvestmentAmountNeededParams): { [year: number]: number } => {
    const investmentAmountNeeded: { [year: number]: number } = {};

    for (const year in desiredIncomeValues) {
        investmentAmountNeeded[year] = Math.round(desiredIncomeValues[year] - (cppValues[year] || 0) - (oasValues[year] || 0) - (otherIncomeValues[year] || 0));
    }

    return investmentAmountNeeded;
};

interface CalculateOpeningBalanceParams {
    currentAmount: number;
    spouseAmount: number;
    futureAmount: number;
    spouseFutureAmount: number;
    investmentGrowthRate: number;
    currentAge: number;
    retirementStartingAge: number;
}

/**
 * Calculates the opening balance of investments (RRSP, TFSA and Non-registered Investments) when retirement starts.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.currentAmount - The current amount in the investment.
 * @param {number} params.spouseAmount - The current amount in the spouse's investment.
 * @param {number} params.futureAmount - The future amount which is invested each year till retirement age.
 * @param {number} params.spouseFutureAmount - The spouse future amount which is invested each year till retirement age.
 * @param {number} params.investmentGrowthRate - The expected growth rate for the investment.
 * @param {number} params.currentAge - The current age of the individual.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @returns {number} The opening balance of the investment when retirement starts.
 */
export const calculateOpeningBalance = ({
    currentAmount,
    spouseAmount,
    futureAmount,
    spouseFutureAmount,
    investmentGrowthRate,
    currentAge,
    retirementStartingAge
}: CalculateOpeningBalanceParams): number => {
    const totalAmount = currentAmount + spouseAmount;
    const yearsToRetirement = retirementStartingAge - currentAge;
    const currentAmountAtRetirement = Math.round(calculateInvestmentGrowth(totalAmount, investmentGrowthRate, yearsToRetirement));
    const totalFutureAmount = futureAmount + spouseFutureAmount;
    // futureAmount is annual contribution made each year starting from current year, so we need to calculate the future value of this amount at retirement
    // we need to loop through each year from current year to retirement year and calculate the future value of each contribution
    let futureAmountAtRetirement = 0;
    for (let i = 0; i < yearsToRetirement; i++) {
        futureAmountAtRetirement += Math.round(calculateInvestmentGrowth(totalFutureAmount, investmentGrowthRate, i));
    }
    // console.log("futureAmountAtRetirement: ", futureAmountAtRetirement);
    return currentAmountAtRetirement + futureAmountAtRetirement;
};

// Similar functions for TFSA and Non-registered Investments
export const calculateOpeningBalanceRRSP = calculateOpeningBalance;
export const calculateOpeningBalanceTFSA = calculateOpeningBalance;
export const calculateOpeningBalanceNonRegisteredInvestments = calculateOpeningBalance;

export const calculateInvestmentGrowth = (initialAmount: number, annualRate: number, years: number): number => {
    return initialAmount * Math.pow((1 + annualRate / 100), years);
};

// When we start taking out of RRSP, there is a minimum amount needs to be taken 
// out of RRSP each year based on the age of the individual.
export const minimumWithdrawalRIIFRates = {
    65: 4.00,
    66: 4.17,
    67: 4.35,
    68: 4.55,
    69: 4.76,
    70: 5.00,
    71: 5.28,
    72: 5.40,
    73: 5.53,
    74: 5.67,
    75: 5.82,
    76: 5.98,
    77: 6.17,
    78: 6.36,
    79: 6.58,
    80: 6.82,
    81: 7.08,
    82: 7.38,
    83: 7.71,
    84: 8.08,
    85: 8.51,
    86: 8.99,
    87: 9.55,
    88: 10.21,
    89: 10.99,
    90: 11.92,
    91: 13.06,
    92: 14.49,
    93: 16.34,
    94: 18.79,
    95: 20.00
};

interface CalculateWithdrawalsAndGrowthParams {
    investmentAmountNeeded: { [year: number]: number };
    openingBalanceRRSP: number;
    openingBalanceTFSA: number;
    openingBalanceNonRegisteredInvestments: number;
    investmentGrowthRate: number;
    withdrawalOrder: string;
    retirementStartingAge: number;
    retirementEndingAge: number;
    inflationRate: number;
  }
  
/**
 * Calculates RRSP, TFSA, and Non-registered income withdrawal and growth during retirement years.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {Object} params.investmentAmountNeeded - The extra amount needed for each year.
 * @param {number} params.openingBalanceRRSP - The opening balance of RRSP.
 * @param {number} params.openingBalanceTFSA - The opening balance of TFSA.
 * @param {number} params.openingBalanceNonRegisteredInvestments - The opening balance of Non-registered Investments.
 * @param {number} params.investmentGrowthRate - The investment growth rate.
 * @param {number} params.withdrawalOrder - The order in which to take money out.
 * @param {number} params.retirementStartingAge - The age at which retirement starts.
 * @param {number} params.retirementEndingAge - The age at which retirement ends.
 * @returns {Object} An object containing the withdrawal and balance objects for RRSP, TFSA, and Non-registered Investments.
 */
export const calculateWithdrawalsAndGrowth = ({
    investmentAmountNeeded,
    openingBalanceRRSP,
    openingBalanceTFSA,
    openingBalanceNonRegisteredInvestments,
    investmentGrowthRate,
    withdrawalOrder,
    retirementStartingAge,
    retirementEndingAge,
    inflationRate,
}: CalculateWithdrawalsAndGrowthParams) => {
    // console.log("investmentAmountNeeded: ", investmentAmountNeeded);
    // console.log("openingBalanceRRSP: ", openingBalanceRRSP);
    // console.log("openingBalanceTFSA: ", openingBalanceTFSA);
    // console.log("openingBalanceNonRegisteredInvestments: ", openingBalanceNonRegisteredInvestments);
    // console.log("investmentGrowthRate: ", investmentGrowthRate);
    // console.log("withdrawalOrder: ", withdrawalOrder);
    // console.log("retirementStartingAge: ", retirementStartingAge);
    // console.log("retirementEndingAge: ", retirementEndingAge);
    const rrspWithdrawals: { [year: number]: number } = {};
    const rrspBalances: { [year: number]: number } = {};
    const tfsaWithdrawals: { [year: number]: number } = {};
    const tfsaBalances: { [year: number]: number } = {};
    const nonRegisteredInvestmentWithdrawals: { [year: number]: number } = {};
    const nonRegisteredInvestmentBalances: { [year: number]: number } = {};
    const shortfallAmounts: { [year: number]: number } = {};
    const netWorths: { [year: number]: number } = {};
    /**
     * Represents the number of years in which there is a shortfall in retirement savings.
     */
    let shortfallYears: number = 0;

    let currentRRSPBalance = openingBalanceRRSP;
    let currentTFSABalance = openingBalanceTFSA;
    let currentNonRegisteredInvestmentBalance = openingBalanceNonRegisteredInvestments;

    for (let age = retirementStartingAge; age <= retirementEndingAge; age++) {
        const year = age;
        let amountNeeded = investmentAmountNeeded[year] || 0;
        // console.log("***********************************");
        // console.log("YEAR: ", year);
        // console.log("Amount Needed: ", amountNeeded);
        // console.log("Current RRSP Balance O/B: ", currentRRSPBalance);
        // console.log("Current Non-registered Income Balance O/B: ", currentNonRegisteredInvestmentBalance);
        // console.log("Current TFSA Balance O/B: ", currentTFSABalance);

        // initialize withdrawal amounts to 0
        rrspWithdrawals[year] = 0;
        tfsaWithdrawals[year] = 0;
        nonRegisteredInvestmentWithdrawals[year] = 0;

        if (withdrawalOrder === "RRSP/Investment in equal proportion and then TFSA") {
            // Option 1: 50% from RRSP, then Non-registered Income
            const halfAmountneeded = Math.round(amountNeeded / 2);
            if (currentRRSPBalance > 0) {
                rrspWithdrawals[year] = Math.round(Math.min(halfAmountneeded, currentRRSPBalance));
                currentRRSPBalance -= rrspWithdrawals[year];
                amountNeeded -= rrspWithdrawals[year];
            }

            if (currentNonRegisteredInvestmentBalance > 0) {
                nonRegisteredInvestmentWithdrawals[year] = Math.round(Math.min(halfAmountneeded, currentNonRegisteredInvestmentBalance));
                currentNonRegisteredInvestmentBalance -= nonRegisteredInvestmentWithdrawals[year];
                amountNeeded -= nonRegisteredInvestmentWithdrawals[year];
            }
        } else if (withdrawalOrder === "All three in equal proportion") {
            // Option 2: 1/3 from each account
            const oneThirdAmountneeded = Math.round(amountNeeded / 3);
            if (currentRRSPBalance > 0) {
                rrspWithdrawals[year] = Math.round(Math.min(oneThirdAmountneeded, currentRRSPBalance));
                currentRRSPBalance -= rrspWithdrawals[year];
                amountNeeded -= rrspWithdrawals[year];
            }

            if (currentNonRegisteredInvestmentBalance > 0) {
                nonRegisteredInvestmentWithdrawals[year] = Math.round(Math.min(oneThirdAmountneeded, currentNonRegisteredInvestmentBalance));
                currentNonRegisteredInvestmentBalance -= nonRegisteredInvestmentWithdrawals[year];
                amountNeeded -= nonRegisteredInvestmentWithdrawals[year];
            }

            if (currentTFSABalance > 0) {
                tfsaWithdrawals[year] = Math.round(Math.min(oneThirdAmountneeded, currentTFSABalance));
                currentTFSABalance -= tfsaWithdrawals[year];
                amountNeeded -= tfsaWithdrawals[year];
            }
        } else if (withdrawalOrder === "TFSA first and then RRSP/Investment in equal proportion") {
            // Option 3: All from TFSA, then 50% each from RRSP & Non-registered Income
            if (currentTFSABalance > 0) {
                tfsaWithdrawals[year] = Math.round(Math.min(amountNeeded, currentTFSABalance));
                currentTFSABalance -= tfsaWithdrawals[year];
                amountNeeded -= tfsaWithdrawals[year];
            }
            // If amountNeeded is still left then take 50% from RRSP and 50% from Non-registered Income
            if (amountNeeded > 0) {
                const halfAmountneeded = Math.round(amountNeeded / 2);
                if (currentRRSPBalance > 0) {
                    rrspWithdrawals[year] = Math.round(Math.min(halfAmountneeded, currentRRSPBalance));
                    currentRRSPBalance -= rrspWithdrawals[year];
                    amountNeeded -= rrspWithdrawals[year];
                }

                if (currentNonRegisteredInvestmentBalance > 0) {
                    nonRegisteredInvestmentWithdrawals[year] = Math.round(Math.min(halfAmountneeded, currentNonRegisteredInvestmentBalance));
                    currentNonRegisteredInvestmentBalance -= nonRegisteredInvestmentWithdrawals[year];
                    amountNeeded -= nonRegisteredInvestmentWithdrawals[year];
                }
            }

        }

        // If amountNeeded is still left and we have balance left in either of RRSP or Non-registered balance, then take it from there in the same order.
        // Otherwise check if we have balance in TFSA, then take it from there.
        if (amountNeeded > 0) {
            if (currentRRSPBalance > 0) {
                const rrspAdditionalWithdrawalAmount = Math.round(Math.min(amountNeeded, currentRRSPBalance));
                rrspWithdrawals[year] += rrspAdditionalWithdrawalAmount;
                currentRRSPBalance -= rrspAdditionalWithdrawalAmount;
                amountNeeded -= rrspAdditionalWithdrawalAmount;
            }
            if (amountNeeded > 0 && currentNonRegisteredInvestmentBalance > 0) {
                const nonRegisteredInvestmentAdditionalWithdrawalAmount = Math.round(Math.min(amountNeeded, currentNonRegisteredInvestmentBalance));
                nonRegisteredInvestmentWithdrawals[year] += nonRegisteredInvestmentAdditionalWithdrawalAmount;
                currentNonRegisteredInvestmentBalance -= nonRegisteredInvestmentAdditionalWithdrawalAmount;
                amountNeeded -= nonRegisteredInvestmentAdditionalWithdrawalAmount;
            }
            if (amountNeeded > 0 && currentTFSABalance > 0) {
                const tfsaAdditionalWithdrawalAmount = Math.round(Math.min(amountNeeded, currentTFSABalance));
                tfsaWithdrawals[year] += tfsaAdditionalWithdrawalAmount;
                currentTFSABalance -= tfsaAdditionalWithdrawalAmount;
                amountNeeded -= tfsaAdditionalWithdrawalAmount;
            }
        }

        // if amountNeeded is still left, then put it in shortfall amount object
        if (amountNeeded > 0) {
            shortfallAmounts[year] = Math.round(amountNeeded);
            shortfallYears++;
        } else {
            shortfallAmounts[year] = 0;
        }

        if (currentRRSPBalance <= 0) {
            rrspBalances[year] = 0;
        } else {
            rrspBalances[year] = Math.round(currentRRSPBalance * (1 + investmentGrowthRate / 100));
        }

        if (currentNonRegisteredInvestmentBalance <= 0) {
            nonRegisteredInvestmentBalances[year] = 0;
        } else {
            nonRegisteredInvestmentBalances[year] = Math.round(currentNonRegisteredInvestmentBalance * (1 + investmentGrowthRate / 100));
        }   

        if (currentTFSABalance <= 0) {
            tfsaBalances[year] = 0;
        } else {
            tfsaBalances[year] = Math.round(currentTFSABalance * (1 + investmentGrowthRate / 100));
        }
        // console.log("Current RRSP Balance: ", rrspBalance[year]);
        // console.log("Current Non-registered Income Balance: ", nonRegisteredInvestmentBalance[year]);
        // console.log("Current TFSA Balance: ", tfsaBalance[year]);
        // console.log("RRSP Withdrawal: ", rrspWithdrawal[year]);
        // console.log("Non-registered Income Withdrawal: ", nonRegisteredInvestmentWithdrawal[year]);
        // console.log("TFSA Withdrawal: ", tfsaWithdrawal[year]);
        // console.log("Negative Amount Withdrawal: ", shortfallAmount[year]);
        // console.log("Total Withdrawal: ", rrspWithdrawal[year] + tfsaWithdrawal[year] + nonRegisteredInvestmentWithdrawal[year] + shortfallAmount[year]);
        // console.log("***********************************");


        // initialize the current balance for next year
        currentRRSPBalance = rrspBalances[year];
        currentTFSABalance = tfsaBalances[year];
        currentNonRegisteredInvestmentBalance = nonRegisteredInvestmentBalances[year];

        // calculate net worth for the year
        netWorths[year] = Math.round(currentRRSPBalance + currentTFSABalance + currentNonRegisteredInvestmentBalance);

    }

    return {
        rrspWithdrawals,
        rrspBalances,
        tfsaWithdrawals,
        tfsaBalances,
        nonRegisteredInvestmentWithdrawals,
        nonRegisteredInvestmentBalances,
        shortfallAmounts,
        shortfallYears,
        netWorths,
    };
};

/**
 * Generates an array of years from the retirement start year to the retirement end year.
 *
 * @param {number} retirementStartYear - The year retirement starts.
 * @param {number} retirementEndYear - The year retirement ends.
 * @returns {number[]} An array of years from the retirement start year to the retirement end year.
 */
export const retirementYearsArray = (retirementStartYear: number, retirementEndYear: number): number[] => {
    const years = [];
    for (let year = retirementStartYear; year <= retirementEndYear; year++) {
        years.push(year);
    }
    return years;
};

// export const calculateRetirementSuccessRate = (retirementStartingAge: number, retirementEndingAge: number, shortfallYears: number): number => {
//     if (shortfallYears > 0) {
//         const totalRetirementYears = retirementEndingAge - retirementStartingAge + 1;
//         return Math.round(((totalRetirementYears - shortfallYears) / totalRetirementYears) * 100);
//     }
//     return 100;
// };

export const calculateNetEstateValue = (rrspBalances: { [year: number]: number }, tfsaBalances: { [year: number]: number }, nonRegisteredInvestmentBalances: { [year: number]: number }, retirementEndingAge: number): number => {
    return rrspBalances[retirementEndingAge] + tfsaBalances[retirementEndingAge] + nonRegisteredInvestmentBalances[retirementEndingAge];
};

// export const calculateNetWorthValue = (rrspBalance: number, tfsaBalance: number, nonRegisteredInvestmentBalances: number): number => {
//     return rrspBalance + tfsaBalance + nonRegisteredInvestmentBalances;
// };

