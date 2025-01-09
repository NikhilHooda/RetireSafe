import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GlobalState, RetirementIncome } from '../../types';
import { useSelector } from 'react-redux';

interface RetirementIncomePieChartProps {
  usage?: "dashboard" | "form";
}

const RetirementIncomePieChart: React.FC<RetirementIncomePieChartProps> = ({ usage }) => {
  const retirementIncome = useSelector((state: GlobalState) => state.retirementIncome);
  const totalIncome = Object.values(retirementIncome).reduce((acc, value) => acc + value, 0);

  const data = [
    { name: 'CPP', y: retirementIncome.cpp || 0 },
    { name: 'OAS', y: retirementIncome.oas || 0 },
    { name: 'Pension', y: retirementIncome.pension || 0 },
    { name: 'Spouse CPP', y: retirementIncome.spouseCpp || 0 },
    { name: 'Spouse OAS', y: retirementIncome.spouseOas || 0 },
    { name: 'Spouse Pension', y: retirementIncome.spousePension || 0 },
    { name: 'Other Income', y: retirementIncome.otherRetirementIncome || 0 },
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
      text: `Retirement Income: $${totalIncome.toLocaleString()}`,
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
        name: 'Retirement Income',
        colorByPoint: true,
        data: data.map(item => ({
          name: `${item.name}: ${item.y} (${((item.y / totalIncome) * 100).toFixed(1)}%)`,
          y: item.y,
        })),
      },
    ],
  };

  return (
    <div className="pie-chart retirement-income-pie-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RetirementIncomePieChart;
