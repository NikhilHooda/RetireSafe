import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftMenu, updatePlanNameDescription } from '../redux/actions';
import { GlobalState, RetirementPlan } from '../types';
import Overlay from './common//Overlay';
// import '../modal.scss';

const TopSection: React.FC = () => {
  // console.log("*******RENDERING TopSection**********");
  const dispatch = useDispatch();
  const { selectedSection, selectedPlan, overlayClickHandler } = useSelector((state: GlobalState) => state.ui);
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  // const currentPlan = retirementPlans.find(plan => plan.planId === selectedPlan);
  // console.log('retirementPlans:', retirementPlans);
  // console.log('currentPlan:', currentPlan);
  // console.log('selectedPlan:', selectedPlan);

  const personalInfo = useSelector((state: GlobalState) => state.personalInfo);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<RetirementPlan | null>(null);

  const handleToggleLeftMenu = () => {
    dispatch(toggleLeftMenu());
  };

  const handleEditPlan = (plan: RetirementPlan) => {
    setCurrentPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleSaveEditPlan = () => {
    if (currentPlan) {
      dispatch(updatePlanNameDescription(currentPlan.planId, currentPlan.planName, currentPlan.planDescription));
      setIsEditModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isEditModalOpen]);
  
  useEffect(() => {
    if (selectedPlan) {
      setCurrentPlan(retirementPlans.find(plan => plan.planId === selectedPlan) || null);
    }
  }, [selectedPlan, retirementPlans]);
  

  return (
    <div className="app__main-section__top-section">
      <button className="app__main-section__hamburger-btn" onClick={handleToggleLeftMenu}>
        <i className="fas fa-bars"></i>
      </button>
      {selectedSection === 'dashboard' && <strong className="app__main-section__top-section__header">Dashboard</strong>}
      {selectedSection === 'currentFinances' && <strong className="app__main-section__top-section__header">Current Finances</strong>}
      {selectedSection === 'futureInvestments' && <strong className="app__main-section__top-section__header">Future Investments</strong>}
      {selectedSection === 'retirementIncome' && <strong className="app__main-section__top-section__header">Retirement Income</strong>}
      {selectedSection === 'assumptions' && <strong className="app__main-section__top-section__header">Assumptions</strong>}
      {selectedSection === 'plan' && (
        <>
          <strong className="app__main-section__top-section__header">
            {/* <i className="fas fa-file-alt"></i>  */}
            {currentPlan?.planName}
            <button className="app__main-section__edit-plan-btn" onClick={() => handleEditPlan(retirementPlans.find(plan => plan.planId === selectedPlan)!)}>
              <i className="fas fa-edit"></i>
            </button>
          </strong>
          <strong className="app__main-section__top-section__header plan-details">
          {currentPlan && (
            <>
              Retirement begins at age {currentPlan.retirementGoals?.retirementStartingAge} and ends at age {currentPlan.retirementGoals?.retirementEndingAge}. CPP begins at age {currentPlan.retirementGoals?.cppStartAge} and OAS begins at age {currentPlan.retirementGoals?.oasStartAge}.
            </>
          )}
          </strong>
        </>
      )}
      <div className="app__main-section__top-section__last-item">
        <strong className="app__main-section__top-section__header">{personalInfo.name} & {personalInfo.spouseName}</strong>
        <button className="app__main-section__top-section__btn"><strong className="app__main-section__top-section__header sign-in">Sign in</strong></button>
      </div>

      {isEditModalOpen && <Overlay handleCloseModal={ handleCloseModal } />}

      {isEditModalOpen && currentPlan && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="editPlanModalLabel" onClick={(event) => overlayClickHandler(event as unknown as React.MouseEvent<HTMLDivElement>, handleCloseModal)}>
          <div className="modal__content">
            <span className="modal__close" onClick={handleCloseModal}>&times;</span>
            <div className="modal__header">
              <i className="fas fa-edit" style={{ color: '#2BB4F6', fontSize: '24px' }}></i>
              <h2 id="editPlanModalLabel" style={{ color: '#2BB4F6' }}>Edit Plan</h2>
            </div>
            <div className="modal__body">
              <label>
                Plan Name:
                <input
                  type="text"
                  value={currentPlan.planName}
                  maxLength={20}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, planName: e.target.value })}
                />
              </label>
              <label>
                Plan Description:
                <textarea
                  value={currentPlan.planDescription}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, planDescription: e.target.value })}
                />
              </label>
            </div>
            <div className="modal__footer">
              <button className="modal__footer__save-button" onClick={handleSaveEditPlan}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSection;
