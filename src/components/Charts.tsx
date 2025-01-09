import React, { useState } from "react";
import IncomeProjections from "./incomeProjections/IncomeProjections";
import NetWorth from "./netWorth/NetWorth";
import { ICONS } from "../utils/icons";
import SimulationResultsComponent from "./simulation/SimulationResultsComponent";

const Charts: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Income Projections");

  return (
    <div className="charts-container">
      <div className="chart-tabs">
        <button 
          className={selectedOption === 'Income Projections' ? 'active' : ''} 
          onClick={() => setSelectedOption('Income Projections')}
        >
          <span className="option-icon">{ICONS.investment_icon_slategray_25}</span>
          Income Projections
        </button>
        <button 
          className={selectedOption === 'Net Worth' ? 'active' : ''} 
          onClick={() => setSelectedOption('Net Worth')}
        >
          <span className="option-icon">{ICONS.investment_icon_slategray_25}</span>
          Net Worth
        </button>
        <button 
          className={selectedOption === 'Success Rate' ? 'active' : ''} 
          onClick={() => setSelectedOption('Success Rate')}
        >
          <span className="option-icon">{ICONS.investment_icon_slategray_25}</span>
          Success Rate
        </button>
      </div>
      <div className="charts-content">
        {selectedOption === "Income Projections" && <IncomeProjections />}
        {selectedOption === "Net Worth" && <NetWorth />}
        {selectedOption === "Success Rate" && <SimulationResultsComponent />}
      </div>
    </div>
  );
};

//   return (
//     <div className="charts-container">
//       <div className="charts-dropdown">
//         <label htmlFor="charts-select" className="visually-hidden">Select Chart: </label>
//         <div className="custom-select-icon">
//             {selectedOption === "Income Projections" && <span className="option-icon">{ICONS.investment_icon_slategray_25}</span>}
//             {selectedOption === "Net Worth" && <span className="option-icon">{ICONS.investment_icon_slategray_25}</span>}
//         </div>
//         <select id="charts-select" value={selectedOption} onChange={handleChange}>
//           <option value="Income Projections">Income Projections</option>
//           <option value="Net Worth">Net Worth</option>
//         </select>
//       </div>
//       <div className="charts-content">
//         {selectedOption === "Income Projections" && <IncomeProjections />}
//         {selectedOption === "Net Worth" && <NetWorth />}
//       </div>
//     </div>
//   );
// };

export default Charts;
