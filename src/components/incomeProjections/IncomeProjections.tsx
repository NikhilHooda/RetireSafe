import React, { useState } from "react";
import IncomeProjectionsDataTable from "./IncomeProjectionsDataTable";
import IncomeProjectionsBarChart from "./IncomeProjectionsBarChart";
import IncomeProjectionsAreaChart from "./IncomeProjectionsAreaChart";

const IncomeProjections: React.FC<{}> = () => {
  const [childTab, setChildTab] = useState<string>('barChart');

  return (
    <>
      <div className="child-tabs">
        <button 
          className={childTab === 'barChart' ? 'active' : ''} 
          onClick={() => setChildTab('barChart')}
        >
          Bar Chart
        </button>
        <button 
          className={childTab === 'areaChart' ? 'active' : ''} 
          onClick={() => setChildTab('areaChart')}
        >
          Area Chart
        </button>
        <button 
          className={childTab === 'dataTable' ? 'active' : ''} 
          onClick={() => setChildTab('dataTable')}
        >
          Data Table
        </button>
      </div>
      <div className="child-tabs__content">
        {childTab === 'barChart' && (
          <IncomeProjectionsBarChart />
        )}
        {childTab === 'areaChart' && (
          <IncomeProjectionsAreaChart />
        )}
        {childTab === 'dataTable' && (
          <IncomeProjectionsDataTable />
        )}
      </div>
    </>
  );
};

export default IncomeProjections;
