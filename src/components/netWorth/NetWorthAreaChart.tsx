import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { retirementYearsArray } from "../../utils/calculations";
import { CalculatedState, GlobalState, RetirementGoals, RetirementPlan } from "../../types";

const NetWorthAreaChart: React.FC<{}> = () => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const retirementGoals = currentPlan ? currentPlan.retirementGoals : {} as RetirementGoals;
  const calculatedState = currentPlan ? currentPlan.calculatedState : {} as CalculatedState;

  // const retirementGoals = useSelector((state: GlobalState) => state.retirementGoals);
  // const calculatedState = useSelector((state: GlobalState) => state.calculatedState);

  const retirementYears = retirementYearsArray(
    retirementGoals.retirementStartingAge,
    retirementGoals.retirementEndingAge
  );

  const netWorthOptions = {
    chart: {
      type: "area",
      // backgroundColor: 'transparent', // Set background to transparent
    },
    title: {
      text: "Net Worth Over Time",
    },
    xAxis: {
      categories: retirementYears,
      // gridLineWidth: 1, // Show vertical grid line
      crosshair: true, // Show vertical hairline on hover
    },
    yAxis: {
      title: {
        text: "Amount ($)",
      },
      gridLineWidth: 1, // Show horizontal grid line
      gridLineDashStyle: 'Dash', // Make horizontal lines dotted
      // crosshair: true, // Show horizontal hairline on hover
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const points = (this.points as unknown as Highcharts.Point[]) || [];
        const total = points.reduce((sum: any, point: Highcharts.Point) => sum + point.y, 0);
        let tooltip: any = `<b>Age ${this.x}</b><br/>`;
        points.forEach((point: Highcharts.Point) => {
          tooltip += `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: ${point.y}<br/>`;
        });
        tooltip += `<b>Total: ${total}</b>`;
        return tooltip;
      },
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineWidth: 2, // Increase line thickness
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "TFSA Balances",
        data: Object.values(calculatedState.tfsaBalances || {}),
        color: "#90ed7d", // light green
      },
      {
        name: "Non-registered Investment Balances",
        data: Object.values(calculatedState.nonRegisteredInvestmentBalances || {}),
        color: "#7cb5ec", // light blue
      },
      {
        name: "RRSP Balances",
        data: Object.values(calculatedState.rrspBalances || {}),
        color: "#f7a35c", // light orange
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={netWorthOptions}
    />
  );
};

export default NetWorthAreaChart;
