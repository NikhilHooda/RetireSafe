import React from 'react';
import { useSelector } from 'react-redux';
import { CalculatedState, GlobalState, RetirementPlan } from '../../types';

const IncomeProjectionsDataTable: React.FC = () => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const calculatedState = currentPlan ? currentPlan.calculatedState : {} as CalculatedState;

    // const calculatedState: CalculatedState = useSelector((state: GlobalState) => state.calculatedState);
    const retirementYears = Object.keys(calculatedState.desiredIncomeValues || {});

    return (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Desired Income</th>
                        <th>CPP</th>
                        <th>OAS</th>
                        <th>Other Income</th>
                        <th>Shortfall</th>
                        <th>RRSP Withdrawals</th>
                        <th>TFSA Withdrawals</th>
                        <th>Non-registered Withdrawals</th>
                    </tr>
                </thead>
                <tbody>
                    {retirementYears.map(year => (
                        <tr key={year}>
                            <td>{year}</td>
                            <td>{calculatedState.desiredIncomeValues[year as unknown as keyof typeof calculatedState.desiredIncomeValues]}</td>
                            <td>{calculatedState.cppValues[year as unknown as keyof typeof calculatedState.cppValues]}</td>
                            <td>{calculatedState.oasValues[year as unknown as keyof typeof calculatedState.oasValues]}</td>
                            <td>{calculatedState.otherIncomeValues[year as unknown as keyof typeof calculatedState.otherIncomeValues]}</td>
                            <td>{calculatedState.shortfallAmounts[year as unknown as keyof typeof calculatedState.shortfallAmounts]}</td>
                            <td>{calculatedState.rrspWithdrawals[year as unknown as keyof typeof calculatedState.rrspWithdrawals]}</td>
                            <td>{calculatedState.tfsaWithdrawals[year as unknown as keyof typeof calculatedState.tfsaWithdrawals]}</td>
                            <td>{calculatedState.nonRegisteredInvestmentWithdrawals[year as unknown as keyof typeof calculatedState.nonRegisteredInvestmentWithdrawals]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IncomeProjectionsDataTable;
