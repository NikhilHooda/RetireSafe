import React from 'react';
import Highcharts, { ChartOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { GlobalState, RetirementPlan, SimulationResults } from '../../types';
import { getSuccessColor } from '../../utils/utils';

interface SuccessRatePieChartProps {
  noOfTrials: number;
}

interface CustomChartOptions extends ChartOptions {
  custom?: {
    label?: Highcharts.SVGElement;
  };
}

const SuccessRatePieChart: React.FC<SuccessRatePieChartProps> = ({ noOfTrials }) => {
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const selectedPlan = useSelector((state: GlobalState) => state.ui.selectedPlan);
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(plan => plan.planId === selectedPlan);
  const simulationResults = currentPlan ? currentPlan.simulationResults : {} as SimulationResults;

  // const simulationResults = useSelector((state: GlobalState) => state.simulationResults);
  const successCount = simulationResults.successCount;
  const failureCount = noOfTrials - successCount;
  const successRate = simulationResults.successRate;
  const successRateColor = getSuccessColor(successRate);

  const updateLabel = (chart: Highcharts.Chart, series: Highcharts.Series, labelText: string, adjustFont: number, adjustY: number = 0, color: string = successRateColor) => {
    let customLabel = (chart.options.chart as CustomChartOptions).custom?.label;

    if (customLabel) {
      customLabel.destroy();
    }

    customLabel = chart.renderer.label(
      labelText,
      0
    )
      .css({
        color,
        fontWeight: 'bold',
        textAnchor: 'middle'
      })
      .add();

    const x = (series as any).center[0] + chart.plotLeft,
      y = (series as any).center[1] + chart.plotTop -
        (Number(customLabel.attr('height')) / 2);

    customLabel.attr({
      x,
      y: y - adjustY,
    });
    // Set font size based on chart diameter
    customLabel.css({
      fontSize: `${(series as any).center[2] / adjustFont}px`
    });

    if (!chart.options.chart) {
      chart.options.chart = {};
    }
    if (!(chart.options.chart as CustomChartOptions).custom) {
      (chart.options.chart as CustomChartOptions).custom = {};
    }
    (chart.options.chart as CustomChartOptions).custom!.label = customLabel;
  };

  const successRateOptions = {
    chart: {
      type: 'pie',
      height: 300, // Make the chart smaller
      width: 300,
      // backgroundColor: 'transparent', // Set background to transparent
      events: {
        load() {
          const chart = this as unknown as Highcharts.Chart;
          const series = chart.series[0];
          updateLabel(chart, series, Math.round(successRate) + '%', 6, 10, successRateColor);
        },
        redraw() {
          const chart = this as unknown as Highcharts.Chart;
          const series = chart.series[0];
          updateLabel(chart, series, Math.round(successRate) + '%', 6, 10, successRateColor);
        }
      }
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Success Rate (%)',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'slategray',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '70%',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        tooltip: {
          pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Success Rate',
        colorByPoint: true,
        data: [
          { name: 'Success', y: successCount, color: '#2ab5f6' },
          { name: 'Failure', y: failureCount, color: '#ee534f' },
        ],
      },
    ],
    legend: {
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function (this: Highcharts.Point): string {
        const percentage = this.y !== undefined ? Math.round((this.y / noOfTrials) * 100) : '0.0';
        return `${this.name}: ${percentage}%`;
      }
    },
  };

  return (
    <div className="success-rate__percent-pie-chart">
      <HighchartsReact highcharts={Highcharts} options={successRateOptions} />
    </div>
  );
};

export default SuccessRatePieChart;
