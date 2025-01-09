import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Histogram from "highcharts/modules/histogram-bellcurve";
import { GlobalState, RetirementPlan, SimulationResults } from "../../types";
import { useSelector } from "react-redux";

// Initialize the histogram module
Histogram(Highcharts);

interface GrowthRateDistributionsChartProps {
  noOfTrials: number;
}

const GrowthRateDistributionsChart: React.FC<
  GrowthRateDistributionsChartProps
> = ({ noOfTrials }) => {
  const retirementPlans = useSelector(
    (state: GlobalState) => state.retirementPlans
  );
  const selectedPlan = useSelector(
    (state: GlobalState) => state.ui.selectedPlan
  );
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(
    (plan) => plan.planId === selectedPlan
  );
  const simulationResults = currentPlan
    ? currentPlan.simulationResults
    : ({} as SimulationResults);
  const growthRates = simulationResults.growthRates;
  const meanReturn = simulationResults.meanReturn;
  const standardDeviation = simulationResults.standardDeviation;

  if (growthRates.length === 0) {
    return null;
  }

  //   const { growthRates, meanReturn, standardDeviation} = useSelector((state: GlobalState) => state.simulationResults);

  const binWidth = (Math.max(...growthRates) - Math.min(...growthRates)) / 20;

  const growthRateDistributionsChartOptions: Highcharts.Options = {
    credits: {
      enabled: false,
    },
    title: {
      text: "Simulated Growth Rate Distribution",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "slategray",
      },
    },
    subtitle: {
      text: `${growthRates?.length} Data points`,
    },
    xAxis: [
      {
        title: { text: "Data" },
        alignTicks: false,
        plotLines: [
          {
            color: "blue",
            dashStyle: "ShortDash",
            value: meanReturn - standardDeviation,
            width: 2,
            label: { text: "-1σ (68%)", align: "left", y: 5, x: -12 },
          },
          {
            color: "blue",
            dashStyle: "ShortDash",
            value: meanReturn + standardDeviation,
            width: 2,
            label: { text: "+1σ (68%)", align: "left", y: 5 },
          },
          {
            color: "red",
            dashStyle: "ShortDash",
            value: meanReturn - 2 * standardDeviation,
            width: 2,
            label: { text: "-2σ (95%)", align: "left", y: 5, x: -12 },
          },
          {
            color: "red",
            dashStyle: "ShortDash",
            value: meanReturn + 2 * standardDeviation,
            width: 2,
            label: { text: "+2σ (95%)", align: "left", y: 5 },
          },
        ],
      },
      {
        title: {
          text: "Normal Distribution",
        },
        opposite: true,
        alignTicks: false,
      },
    ],
    yAxis: [
      {
        title: { text: "Frequency" },
      },
      {
        title: { text: "Probability" },
        opposite: true,
      },
    ],
    plotOptions: {
      histogram: {
        color: "#2caffe",
        tooltip: {
          pointFormatter: function (this: Highcharts.Point): string {
            const point = this as Highcharts.Point & { x2: number };
            return `<b>Range:</b> ${point.x.toFixed(2)} - ${point.x2.toFixed(
              2
            )}<br><b>Frequency:</b> ${point.y}`;
          },
        },
        // events: {
        //     mouseOver: function () {
        //         this.update({ type: 'histogram', zIndex: 3 });
        //     },
        //     mouseOut: function () {
        //         this.update({ type: 'histogram', zIndex: 1 });
        //     }
        // },
        // zIndex: 1
      },
      bellcurve: {
        color: "#26A69A",
        tooltip: {
          headerFormat: "<b>Value:</b> {point.x:.2f}<br>",
          pointFormatter: function (this: Highcharts.Point): string {
            return `<b>Probability:</b> ${this.y ? this.y.toFixed(4) : "N/A"}`;
          },
        },
        // zIndex: 2
      },
      scatter: {
        showInLegend: false,
        tooltip: {
          pointFormatter: function () {
            return `<b>Value:</b> ${this.y?.toFixed(2) ?? "N/A"}`;
          },
        },
        // zIndex: 0
      },
    },
    series: [
      {
        name: "Data",
        type: "histogram",
        xAxis: 0,
        yAxis: 0,
        baseSeries: "s1",
        binWidth,
        zIndex: -1,
      },
      {
        name: "Normal Distribution Curve",
        type: "bellcurve",
        xAxis: 1,
        yAxis: 1,
        baseSeries: "s1",
        marker: {
          enabled: false,
        },
      },
      {
        name: "Generated Data",
        type: "scatter",
        data: growthRates,
        id: "s1",
        visible: false,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={growthRateDistributionsChartOptions}
      />
    </>
  );
};

export default GrowthRateDistributionsChart;
