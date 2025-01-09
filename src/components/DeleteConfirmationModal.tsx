import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../types';

interface DeleteConfirmationModalProps {
  planName: string;
  planDescription: string;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ planName, planDescription, onDelete, onClose }) => {
    const dispatch = useDispatch();
    const { overlayClickHandler } = useSelector((state: GlobalState) => state.ui);
  
  return (
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="deleteConfirmationModalLabel" onClick={(event) => overlayClickHandler(event as unknown as React.MouseEvent<HTMLDivElement>, onClose)}>
        <div className="modal__content">
          <span className="modal__close" onClick={onClose}>&times;</span>
          <div className="modal__header">
            <i className="fas fa-exclamation-triangle" style={{ color: 'red', fontSize: '24px' }}></i>
            <h2 id="deleteConfirmationModalLabel">Delete Plan</h2>
          </div>
          <div className="modal__body">
            <p>Are you sure you want to delete this plan?</p>
            <p>Plan name: <strong>{planName}</strong></p>
            <p>Plan description: {planDescription}</p>
          </div>
          <div className="modal__footer">
            <button className="modal__footer__delete-button" onClick={onDelete}>Delete</button>
            <button className="modal__footer__close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default DeleteConfirmationModal;
