import React, { useState } from 'react';
import './ModalAdd.css';
import { ModalAddProps } from '../../../types/types';
import close from '../../../assets/close.svg';
import arrow from '../../../assets/arrow.svg';
import folderImg from '../../../assets/folder.svg';
import file from '../../../assets/file.svg';
import addDark from '../../../assets/add-dark.svg';

const ModalAdd: React.FC<ModalAddProps> = ({
  isOpen,
  onClose,
  onSave,
  folderName,
  title,
  placeholder,
}) => {
  const [name, setName] = useState('');

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    onSave(name);
    setName('');
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="forder-name-container">
                <img src={folderImg} className="folder-img" />
                <span>{folderName}</span>
              </div>
              <img src={arrow} className="arrow-img" />
              <span>New {title}</span>
            </div>
            <button className="close-button" onClick={onClose}>
              <img src={close} className="close-img" />
            </button>
            <div className="modal-body">
              <img src={file} className="file-img" />
              <input
                type="text"
                value={name}
                placeholder={placeholder}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <hr />
              <button onClick={handleSave}>
                <img src={addDark} className="add-dark-img" />
                Add {title}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAdd;
