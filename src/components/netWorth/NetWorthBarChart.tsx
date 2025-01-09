import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { retirementYearsArray } from "../../utils/calculations";
import { CalculatedState, GlobalState, RetirementGoals, RetirementPlan } from "../../types";

const NetWorthBarChart: React.FC<{}> = () => {
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
      type: "column",
      // backgroundColor: 'transparent', // Set background to transparent
    },
    title: {
      text: "Net Worth Over Time",
    },
    xAxis: {
      categories: retirementYears,
    },
    yAxis: {
      title: {
        text: "Amount ($)",
      },
      gridLineDashStyle: 'Dash', // Make horizontal lines dotted
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: Highcharts.defaultOptions.title?.style?.color || "gray",
        },
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject & { total?: number }): string {
          return this.total?.toString() || '';
        },
      },
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
      column: {
        stacking: "normal",
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

export default NetWorthBarChart;
