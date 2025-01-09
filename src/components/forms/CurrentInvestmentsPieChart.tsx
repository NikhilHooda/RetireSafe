import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CurrentInvestments, GlobalState } from '../../types';
import { useSelector } from 'react-redux';

interface CurrentInvestmentsPieChartProps {
  usage?: "dashboard" | "form";
}

const CurrentInvestmentsPieChart: React.FC<CurrentInvestmentsPieChartProps> = ({ usage }) => {
  const currentInvestments = useSelector((state: GlobalState) => state.currentInvestments);
  const totalInvestment = Object.values(currentInvestments).reduce((acc, value) => acc + value, 0);

  const data = [
    { name: 'RRSP', y: currentInvestments.rrsp || 0 },
    { name: 'TFSA', y: currentInvestments.tfsa || 0 },
    { name: 'Non-registered Investments', y: currentInvestments.nonRegisteredInvestments || 0 },
    { name: 'Spouse RRSP', y: currentInvestments.spouseRrsp || 0 },
    { name: 'Spouse TFSA', y: currentInvestments.spouseTfsa || 0 },
    { name: 'Spouse Non-registered Investments', y: currentInvestments.spouseNonRegisteredInvestments || 0 },
  ].filter(item => item.y > 0);

  const isDashboard = usage === "dashboard";

  const options = {
    chart: {
      type: 'pie',
      width: isDashboard ? 425 : undefined,
      height: isDashboard ? 200 : undefined,
      padding: isDashboard ? [0, 0, 0, 0] : undefined,
      // backgroundColor: 'transparent', // Set background to transparent
      style: {
        zIndex: 1, // Lowered z-index
      },
    },
    credits: {
        enabled: false,
    },
    title: {
      // text: undefined,
      text: `Current Investments: $${totalInvestment.toLocaleString()}`,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        position: 'middle',
        },
    },
    // tooltip: {
    //   headerFormat: '<b>{point.key}</b><br/>',
    //   pointFormat: '{point.y} ({point.percentage:.1f}%)',
    // },
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
        name: 'Current Investments',
        colorByPoint: true,
        data: data.map(item => ({
          name: `${item.name}: ${item.y} (${((item.y / totalInvestment) * 100).toFixed(1)}%)`,
          y: item.y,
        })),
      },
    ],
  };

  return (
    <div className="pie-chart current-investments-pie-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CurrentInvestmentsPieChart;
