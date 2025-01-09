import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  GlobalState,
  RetirementGoals,
  RetirementPlan,
  SimulationResults,
} from "../types";
import CircularInfo from "./common/CircularInfo";
import { formatNetEstateValue } from "../utils/formatters";
import { CalculatedState } from "../types";
import { getLegacyColor, getSuccessColor } from "../utils/utils";
import { ICONS } from "../utils/icons";
import RetirementGoalsForm from "./forms/RetirementGoalsForm";

const Summary: React.FC = () => {
  const retirementPlans = useSelector(
    (state: GlobalState) => state.retirementPlans
  );
  const selectedPlan = useSelector(
    (state: GlobalState) => state.ui.selectedPlan
  );
  const currentPlan: RetirementPlan | undefined = retirementPlans.find(
    (plan) => plan.planId === selectedPlan
  );
  const retirementGoals = currentPlan
    ? currentPlan.retirementGoals
    : ({} as RetirementGoals);
  const calculatedState = currentPlan
    ? currentPlan.calculatedState
    : ({} as CalculatedState);
  const simulationResults = currentPlan
    ? currentPlan.simulationResults
    : ({} as SimulationResults);
  const { personalInfo, assumptions } = useSelector(
    (state: GlobalState) => state
  );

  const [openSection, setOpenSection] = useState<string>("summaryInfo");

  // const calculatedState = useSelector((state: GlobalState) => state.calculatedState);
  // const simulationResults = useSelector((state: GlobalState) => state.simulationResults);
  // console.log("simulationResults", simulationResults);

  const monthlyNeed = Math.round(retirementGoals.desiredRetirementIncome / 12);
  const netWorthAtRetirement =
    calculatedState.openingBalanceRRSP +
    calculatedState.openingBalanceTFSA +
    calculatedState.openingBalanceNonRegisteredInvestments;

  const handleSectionClick = (section: string) => {
    setOpenSection((prevSection) => {
      return prevSection === section ? "" : section;
    });
  };

  return (
    <div className="summary">
      <div className="summary__top-section">
        <CircularInfo
          label="Success"
          value={`${simulationResults.successRate}%`}
          color={getSuccessColor(simulationResults.successRate)}
        />
        <CircularInfo
          label="Legacy"
          value={`$${formatNetEstateValue(calculatedState.netEstateValue)}`}
          color={getLegacyColor(
            calculatedState.netEstateValue,
            netWorthAtRetirement
          )}
        />
      </div>
      <div className="summary__sections">
        <div className="summary__section">
            <button className="summary__section__cta" onClick={() => handleSectionClick("summaryInfo")}>
                <span className="summary__section__cta__icon">
                {ICONS.investment_icon_white_15}
                </span>
                <span className="summary__section__cta__label">Retirement Summary</span>
                <i className={`chevron ${openSection === "summaryInfo" ? 'open' : ''}`}></i>
            </button>
            {openSection === "summaryInfo" && (
                <div className="summary__section__content">
                    <div className="summary__section__info">
                        <div>
                            Monthly Need:{" "}
                            <span className="summary__section__info__value">
                                ${monthlyNeed}
                            </span>
                        </div>
                        <div>
                            Investment growth rate:{" "}
                            <span className="summary__section__info__value">
                                {assumptions.investmentGrowthRate}%
                            </span>
                        </div>
                    </div>
                    {calculatedState.shortfallYears > 0 && (
                    <div className="summary__section__info">
                        <div className="re-text">
                            Shorfall Years:{" "}
                            <span className="summary__section__info__value">
                                {calculatedState.shortfallYears}
                            </span>
                        </div>
                        <div className="re-text">
                            Investment run-out age:{" "}
                            <span className="summary__section__info__value">
                                {retirementGoals.retirementEndingAge - calculatedState.shortfallYears + 1}
                            </span>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </div>
        <div className="summary__section">
          <button className="summary__section__cta" onClick={() => handleSectionClick("retirementGoals")}>
            <span className="summary__section__cta__icon">
              {ICONS.investment_icon_white_15}
            </span>
            <span className="summary__section__cta__label">Retirement Goals</span>
            <i className={`chevron ${openSection === "retirementGoals" ? 'open' : ''}`}></i>
          </button>
          {openSection === "retirementGoals" && (
            <div className="summary__section__content">
              <RetirementGoalsForm layout={"stacked"} />
            </div>
          )}
        </div>
      </div>

      {/* <div className="summary__content">
        <div className="summary__content__info">
          <div>
            Monthly Need:{" "}
            <span className="summary__content__info__value">
              ${monthlyNeed}
            </span>
          </div>
          <div>
            Investment growth rate:{" "}
            <span className="summary__content__info__value">
              {assumptions.investmentGrowthRate}%
            </span>
          </div>
        </div>
        {calculatedState.shortfallYears > 0 && (
          <div className="summary__content__info">
            <div className="red-text">
              Shorfall Years:{" "}
              <span className="summary__content__info__value">
                {calculatedState.shortfallYears}
              </span>
            </div>
            <div className="red-text">
              Investment run-out age:{" "}
              <span className="summary__content__info__value">
                {retirementGoals.retirementEndingAge -
                  calculatedState.shortfallYears +
                  1}
              </span>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Summary;
