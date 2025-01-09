import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState, CalculatedState, RetirementPlan } from '../../types';

const NetWorthDataTable: React.FC = () => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const calculatedState = currentPlan ? currentPlan.calculatedState : {} as CalculatedState;

    // const calculatedState: CalculatedState = useSelector((state: GlobalState) => state.calculatedState);
    const retirementYears: string[] = Object.keys(calculatedState.desiredIncomeValues || {});

    return (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>RRSP Net Worth</th>
                        <th>TFSA Net Worth</th>
                        <th>Non-registered Investment Net Worth</th>
                        <th>RTotal Net Worth</th>
                    </tr>
                </thead>
                <tbody>
                    {retirementYears.map(year => (
                        <tr key={year}>
                            <td>{year}</td>
                            <td>{calculatedState.rrspBalances[year as unknown as keyof typeof calculatedState.rrspBalances]}</td>
                            <td>{calculatedState.tfsaBalances[year as unknown as keyof typeof calculatedState.tfsaBalances]}</td>
                            <td>{calculatedState.nonRegisteredInvestmentBalances[year as unknown as keyof typeof calculatedState.nonRegisteredInvestmentBalances]}</td>
                            <td>{calculatedState.netWorths[year as unknown as keyof typeof calculatedState.netWorths]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NetWorthDataTable;
