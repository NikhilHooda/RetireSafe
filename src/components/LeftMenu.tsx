import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSection, setSelectedPlan, addNewRetirementPlan, deleteRetirementPlan } from '../redux/actions';
import { GlobalState, RetirementPlan } from '../types';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Overlay from './common/Overlay';
// import '../modal.scss';

const LeftMenu: React.FC = () => {
  const dispatch = useDispatch();
  const retirementPlans = useSelector((state: GlobalState) => state.retirementPlans);
  const { overlayClickHandler } = useSelector((state: GlobalState) => state.ui);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletePlan, setDeletePlan] = useState<RetirementPlan | null>(null);
  const [newPlanName, setNewPlanName] = useState<string>('');
  const [newPlanDescription, setNewPlanDescription] = useState<string>('');
  const [clonePlanId, setClonePlanId] = useState<string>('');
  const dashboardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isAddModalOpen || isDeleteModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isAddModalOpen, isDeleteModalOpen]);

  const handleNewPlan = () => {
    setIsAddModalOpen(true);
  };

  const handleDeletePlan = (plan: RetirementPlan) => {
    setDeletePlan(plan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeletePlan = () => {
    if (deletePlan) {
      dispatch(deleteRetirementPlan(deletePlan.planId));
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveNewPlan = () => {
    if (newPlanName.trim() && newPlanName.length <= 20 && clonePlanId) {
      const clonedPlan = retirementPlans.find(plan => plan.planId === clonePlanId);
      if (clonedPlan) {
        const lastPlanId = retirementPlans[retirementPlans.length - 1].planId;
        const newPlanId = `plan${parseInt(lastPlanId.replace('plan', '')) + 1}`;
        const newPlan: RetirementPlan = {
          ...clonedPlan,
          planId: newPlanId,
          planName: newPlanName,
          planDescription: newPlanDescription,
        };
        dispatch(addNewRetirementPlan(newPlan));
        setIsAddModalOpen(false);
      }
    }
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handlePlanClick = (planId: string) => {
    dispatch(setSelectedSection('plan'))
    dispatch(setSelectedPlan(planId))
  };

  // console.log('retirementPlans:', retirementPlans);

  return (
    <div className="app__left-menu">
      <h3 className="app__left-menu__heading">Financial Planning</h3>
      <div className="app__left-menu__top-section">
        <button
          ref={dashboardRef}
          className="app__left-menu__btn"
          onClick={() => dispatch(setSelectedSection('dashboard'))}
        >
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </button>
        <button className="app__left-menu__btn" onClick={() => dispatch(setSelectedSection('currentFinances'))}>
          <i className="fas fa-wallet"></i> Current Finances
        </button>
        <button className="app__left-menu__btn" onClick={() => dispatch(setSelectedSection('futureInvestments'))}>
          <i className="fas fa-piggy-bank"></i> Future Investments
        </button>
        <button className="app__left-menu__btn" onClick={() => dispatch(setSelectedSection('retirementIncome'))}>
          <i className="fas fa-piggy-bank"></i> Retirement Income
        </button>
        <button className="app__left-menu__btn" onClick={() => dispatch(setSelectedSection('assumptions'))}>
          <i className="fas fa-piggy-bank"></i> Assumptions
        </button>
      </div>
      <div className="app__left-menu__middle-section">
        <h4 className="app__left-menu__accordion-heading" onClick={toggleAccordion} aria-expanded={isAccordionOpen}>
          Plans <i className={`chevron ${isAccordionOpen ? 'open' : ''}`}></i>
        </h4>
        {isAccordionOpen && (
          <div className="app__left-menu__accordion">
            {retirementPlans.map((plan, index) => (
              <div key={index} className="app__left-menu__accordion__item">
                <button
                  className="app__left-menu__accordion-header plan-name-btn"
                  onClick={() => handlePlanClick(plan.planId)}
                  aria-label={`Select ${plan.planName}`}
                >
                  <i className="fas fa-file-alt"></i> {plan.planName}
                </button>
                {plan.planId !== 'plan1' && (
                  <button
                    className="plan-delete-btn"
                    onClick={() => handleDeletePlan(plan)}
                    aria-label={`Delete ${plan.planName}`}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              className="app__left-menu__new-plan-btn"
              onClick={handleNewPlan}
              disabled={retirementPlans.length >= 5}
              aria-label="Add new plan"
            >
              <i className="fas fa-plus"></i> New Plan
            </button>
          </div>
        )}
      </div>
      <div className="app__left-menu__bottom-section">
        <button className="app__left-menu__btn">
          <i className="fas fa-question-circle"></i> Help Center
        </button>
        <button className="app__left-menu__btn">
          <i className="fas fa-book"></i> Resources
        </button>
      </div>

      {(isAddModalOpen || isDeleteModalOpen) && <Overlay handleCloseModal={ handleCloseModal } />}

      {isAddModalOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="addPlanModalLabel" onClick={(event) => overlayClickHandler(event as unknown as React.MouseEvent<HTMLDivElement>, handleCloseModal)}>
          <div className="modal__content">
            <span className="modal__close" onClick={handleCloseModal}>&times;</span>
            <div className="modal__header">
              <i className="fas fa-plus" style={{ color: 'green', fontSize: '24px' }}></i>
              <h2 id="addPlanModalLabel">Add New Plan</h2>
            </div>
            <div className="modal__body">
              <label>
                Plan Name:
                <input
                  type="text"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  maxLength={20}
                  required
                />
              </label>
              <label>
                Plan Description:
                <textarea
                  value={newPlanDescription}
                  onChange={(e) => setNewPlanDescription(e.target.value)}
                />
              </label>
              <label>
                Clone Plan:
                <select value={clonePlanId} onChange={(e) => setClonePlanId(e.target.value)}>
                  <option value="" disabled>Select a plan to clone</option>
                  {retirementPlans.map(plan => (
                    <option key={plan.planId} value={plan.planId}>
                      {plan.planName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal__footer">
              <button className="modal__footer__save-button" onClick={handleSaveNewPlan}>Save</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && deletePlan && (
        <DeleteConfirmationModal
          planName={deletePlan.planName}
          planDescription={deletePlan.planDescription}
          onDelete={handleConfirmDeletePlan}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LeftMenu;
