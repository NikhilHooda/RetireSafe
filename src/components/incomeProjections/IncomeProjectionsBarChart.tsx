import React from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  retirementYearsArray,
} from "../../utils/calculations";
import { CalculatedState, GlobalState, RetirementGoals, RetirementPlan } from "../../types";

interface IncomeProjectionsBarChartProps {
  planId?: string;
}

const IncomeProjectionsBarChart: React.FC<IncomeProjectionsBarChartProps> = ({ planId }) => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlanId = planId || selectedPlan;
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === currentPlanId);
  const retirementGoals = currentPlan ? currentPlan.retirementGoals : {} as RetirementGoals;
  const calculatedState = currentPlan ? currentPlan.calculatedState : {} as CalculatedState;

  // const retirementGoals = useSelector((state: GlobalState) => state.retirementGoals);
  // const calculatedState = useSelector((state: GlobalState) => state.calculatedState);

  const retirementYears = retirementYearsArray(
    retirementGoals.retirementStartingAge,
    retirementGoals.retirementEndingAge
  );

  const incomeProjectionOptions = {
    chart: {
      type: "column",
      // backgroundColor: 'transparent', // Set background to transparent
    },
    title: {
      // text: undefined,
      text: "",
    },
    xAxis: {
      categories: retirementYears,
    },
    yAxis: {
      min: 0,
      max: Math.max(...Object.values(calculatedState.desiredIncomeValues || {}).map(value => value as number)),
      gridLineDashStyle: 'Dash', // Make horizontal lines dotted
      title: {
        text: "Amount ($)",
      },
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
      // headerFormat: "<b>Age {point.x}</b><br/>",
      // pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
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
        name: "Shortfalls",
        data: Object.values(calculatedState.shortfallAmounts || {}),
        color: "#ff4d4d", // red for shortfalls
      },
      {
        name: "TFSA",
        data: Object.values(calculatedState.tfsaWithdrawals || {}),
        color: "#90ed7d", // light green
      },
      {
        name: "Non-registered",
        data: Object.values(calculatedState.nonRegisteredInvestmentWithdrawals || {}),
        color: "#7cb5ec", // light blue
      },
      {
        name: "RRSP",
        data: Object.values(calculatedState.rrspWithdrawals || {}),
        color: "#f7a35c", // light orange
      },
      {
        name: "OAS",
        data: Object.values(calculatedState.oasValues || {}),
        color: "#8085e9", // light purple
      },
      {
        name: "CPP/QPP",
        data: Object.values(calculatedState.cppValues || {}),
        color: "#f9b5ae", // light pink
      },
      {
        name: "Other Retirement Income",
        data: Object.values(calculatedState.otherIncomeValues || {}),
        color: "#e4d354", // light yellow
      },
    ],
  };

  // const netWorthOptions = {
  //   chart: {
  //     type: "column",
  // backgroundColor: 'transparent', // Set background to transparent
  //   },
  //   title: {
  //     text: "Stacked Net Worth",
  //   },
  //   xAxis: {
  //     categories: retirementYears,
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: "Amount ($)",
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Net Worth",
  //       data: retirementYears,
  //     },
  //   ],
  // };

  // const cashFlowOptions = {
  //   chart: {
  //     type: "column",
  // backgroundColor: 'transparent', // Set background to transparent
  //   },
  //   title: {
  //     text: "Cash Flow Summary",
  //   },
  //   xAxis: {
  //     categories: retirementYears,
  //   },
  //   yAxis: {
  //     min: 0,
  //     title: {
  //       text: "Amount ($)",
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Cash Flow",
  //       data: calculatedState.desiredIncomeValues,
  //     },
  //   ],
  // };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={incomeProjectionOptions}
    />
  );
};

export default IncomeProjectionsBarChart;
