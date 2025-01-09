import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../types';

interface OverlayProps {
  handleCloseModal: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ handleCloseModal }) => {
  const overlayClickHandler = useSelector((state: GlobalState) => state.ui.overlayClickHandler);

  return (
    <div className="modal-overlay" onClick={(event) => overlayClickHandler(event as unknown as React.MouseEvent<HTMLDivElement>, handleCloseModal)}></div>
  );
};

export default Overlay;
