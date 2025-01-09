import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FutureInvestments, GlobalState } from '../../types';
import { useSelector } from 'react-redux';

interface FutureInvestmentsPieChartProps {
  usage?: "dashboard" | "form";
}

const FutureInvestmentsPieChart: React.FC<FutureInvestmentsPieChartProps> = ({ usage }) => {
  const futureInvestments = useSelector((state: GlobalState) => state.futureInvestments);
  console.log('futureInvestments', futureInvestments);
  const totalInvestments = Object.values(futureInvestments).reduce((acc, value) => acc + value, 0);

  const data = [
    { name: 'Future RRSP', y: futureInvestments.futureAnnualRrsp || 0 },
    { name: 'Future TFSA', y: futureInvestments.futureAnnualTfsa || 0 },
    { name: 'Future Non-registered Investments', y: futureInvestments.futureAnnualNonRegisteredInvestments || 0 },
    { name: 'Spouse Future RRSP', y: futureInvestments.spouseFutureAnnualRrsp || 0 },
    { name: 'Spouse Future TFSA', y: futureInvestments.spouseFutureAnnualTfsa || 0 },
    { name: 'Spouse Future Non-registered Investments', y: futureInvestments.spouseFutureAnnualNonRegisteredInvestments || 0 },
  ].filter(item => item.y > 0);

  const isDashboard = usage === "dashboard";

  const options = {
    chart: {
      type: 'pie',
      width: isDashboard ? 425 : undefined,
      height: isDashboard ? 200 : undefined,
      padding: isDashboard ? [0, 0, 0, 0] : undefined,
      // backgroundColor: 'transparent', // Set background to transparent
    },
    credits: {
        enabled: false,
    },
    title: {
      text: `Future Investments: $${totalInvestments.toLocaleString()}`,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        position: 'middle',
      },
    },
    subtitle: {
      text: `Annual future investments made until retirement begins`,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: isDashboard ? {
      align: 'right',
      verticalAlign: 'middle',
      width: "60%",
      layout: 'vertical',
      itemMarginBottom: 5,
      //   x: 0,
      y: 10,
      itemStyle: {
        textOverflow: undefined,
      },
      //   title: {
      //     text: `Total Current Investments: $${totalInvestment.toLocaleString()}`,
      //     style: {
      //         fontSize: '16px',
      //         fontWeight: 'bold',
      //         position: 'middle',
      //     },
      //   },
      //   x: -50, // Move legend closer to the pie chart
    } : {},
    series: [
      {
        name: 'Future Investments',
        colorByPoint: true,
        data: data.map(item => ({
          name: `${item.name}: ${item.y} (${((item.y / totalInvestments) * 100).toFixed(1)}%)`,
          y: item.y,
        })),
      },
    ],
  };

  return (
    <div className="pie-chart future-investments-pie-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default FutureInvestmentsPieChart;
