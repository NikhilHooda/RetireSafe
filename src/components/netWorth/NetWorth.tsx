import React, { useState } from "react";
import NetWorthAreaChart from "./NetWorthAreaChart";
import NetWorthDataTable from "./NetWorthDataTable";
import NetWorthBarChart from "./NetWorthBarChart";

const NetWorth: React.FC<{}> = () => {
  const [childTab, setChildTab] = useState<string>('barChart');

  return (
    <div>
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
          <NetWorthBarChart />
        )}
        {childTab === 'areaChart' && (
          <NetWorthAreaChart />
        )}
        {childTab === 'dataTable' && (
          <NetWorthDataTable />
        )}
      </div>
    </div>
  );
};

export default NetWorth;
