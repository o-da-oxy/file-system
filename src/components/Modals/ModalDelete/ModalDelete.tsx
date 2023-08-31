import React from 'react';
import './ModalDelete.css';
import { ModalDeleteProps } from '../../../types/types';
import basketBig from '../../../assets/basket-big.svg';

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  filePath,
  title,
  onCancel,
  onDelete,
}) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete">
            <img src={basketBig} className="basket-big-img" />
            <span className="file-path">{filePath}</span>
            <span className="p">
              Are you sure you want to delete this {title}?
            </span>
            <div className="modal-delete-buttons">
              <button className="cancel-button" onClick={onCancel}>
                No, cancel
              </button>
              <button className="delete-button" onClick={onDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDelete;
