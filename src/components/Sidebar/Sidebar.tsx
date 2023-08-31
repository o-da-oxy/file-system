import React, { useState } from 'react';
import { Folder, FolderProps } from '../../types/types';
import ModalAdd from '../Modals/ModalAdd/ModalAdd';
import ModalDelete from '../Modals/ModalDelete/ModalDelete';
import './Sidebar.css';
import add from '../../assets/add.svg';
import addActive from '../../assets/add-active.svg';
import basketSmall from '../../assets/basket-small.svg';
import arrow from '../../assets/arrow.svg';
import fileImg from '../../assets/file.svg';
import folderImg from '../../assets/folder.svg';

const Sidebar: React.FC<FolderProps> = ({
  folder,
  folders,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  children,
}: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [path, setPath] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState(folder.id);
  const [selectedFileId, setSelectedFileId] = useState(folder.id);
  const [activeFileId, setActiveFileId] = useState(-1);
  const [activeFolderId, setActiveFolderId] = useState(-1);
  const [dropdown, setDropdown] = useState(false);

  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  };

  const handleOpenFile = () => {
    setIsOpen(!isOpen);
    if (activeFolderId === folder.id) {
      setActiveFolderId(-1);
      setActiveFileId(-1);
      setDropdown(false);
    } else {
      setActiveFolderId(folder.id);
      setDropdown(false);
    }
  };

  const handleAddFile = () => {
    setIsOpen(true);
    setModalAddOpen(true);
    setModalType('file');
    setSelectedFolderId(folder.id);
    setDropdown(false);
  };

  const handleAddFolder = () => {
    setIsOpen(true);
    setModalAddOpen(true);
    setModalType('folder');
    setSelectedFolderId(folder.id);
    setDropdown(false);
  };

  const handleDeleteFolder = () => {
    setModalType('folder');
    setPath(getFullPathById(folders, folder.id, ''));
    setModalDeleteOpen(true);
    setDropdown(false);
  };

  const handleDeleteFile = (fileId: number) => {
    setModalType('file');
    setPath(getFullPathById(folders, fileId, ''));
    setModalDeleteOpen(true);
    setDropdown(false);
  };

  const handleConfirmDeleteFolder = () => {
    if (modalType === 'file') {
      onDeleteFile(selectedFolderId, selectedFileId);
    } else if (modalType === 'folder') {
      onDeleteFolder(folder.id);
    }
    handleDeleteModalClose();
  };

  const handleModalSave = (name: string) => {
    if (modalType === 'file') {
      onAddFile(selectedFolderId, name);
    } else if (modalType === 'folder') {
      onAddFolder(selectedFolderId, name);
    }
    handleAddModalClose();
  };

  const handleAddModalClose = () => {
    setModalAddOpen(false);
  };

  const handleDeleteModalClose = () => {
    setModalDeleteOpen(false);
    setActiveFileId(-1);
  };

  const getFullPathById = (
    folders: Folder[],
    id: number,
    path = ''
  ): string => {
    for (const folder of folders) {
      if (folder.id === id) {
        return `${path}/${folder.name}`.substring(1);
      }
      if (folder.folders.length > 0) {
        const folderPath = getFullPathById(
          folder.folders,
          id,
          `${path}/${folder.name}`
        );
        if (folderPath) {
          return folderPath;
        }
      }
      for (const file of folder.files) {
        if (file.id === id) {
          return `${path}/${folder.name}/${file.name}`.substring(1);
        }
      }
    }
    return '';
  };

  return (
    <div className="folder">
      <div
        className="folder-items-container"
        data-active={activeFolderId === folder.id}
      >
        <div
          className="folder-item"
          onClick={handleOpenFile}
          role="button"
          data-active={activeFolderId === folder.id}
        >
          <div
            className="orange-rectangle"
            data-active={activeFolderId === folder.id}
          ></div>
          <img src={arrow} className="arrow-img" />
          <img src={folderImg} className="folder-img" />
          {folder.name}
        </div>
        <button
          type="button"
          className="button-dropdown"
          onClick={handleDropdownClick}
        >
          {dropdown ? (
            <img src={addActive} className="dropdown-img" />
          ) : (
            <img src={add} className="dropdown-img" />
          )}
        </button>
        {dropdown && (
          <div className="dropdown-menu">
            <button
              type="button"
              className="dropdown-item"
              onClick={handleAddFolder}
            >
              <img src={folderImg} className="dropdown-item-img" />
              <span className="dropdown-item-text">Add Folder</span>
            </button>
            <button
              type="button"
              className="dropdown-item"
              onClick={handleAddFile}
            >
              <img src={fileImg} className="dropdown-item-img" />
              <span className="dropdown-item-text">Add Sequence</span>
            </button>
          </div>
        )}
        <button
          type="button"
          className="button-basket"
          onClick={handleDeleteFolder}
        >
          <img src={basketSmall} className="basket-small-img" />
        </button>
      </div>

      {isOpen && (
        <div>
          {folder.files.map((file) => (
            <div key={file.id} className="file-items-container">
              <div
                className="file-item"
                onClick={() => setActiveFileId(file.id)}
                data-active={activeFileId === file.id}
              >
                <img src={fileImg} className="file-img" />
                {file.name}
              </div>
              <button
                type="button"
                className="button-basket"
                onClick={() => {
                  setSelectedFileId(file.id);
                  setSelectedFolderId(folder.id);
                  handleDeleteFile(file.id);
                }}
              >
                <img src={basketSmall} className="basket-small-img" />
              </button>
            </div>
          ))}
          {folder.folders.map((subFolder) => (
            <div key={folder.id} className="subfolder-item">
              <Sidebar
                key={subFolder.id}
                folder={subFolder}
                folders={folders}
                onAddFile={onAddFile}
                onAddFolder={onAddFolder}
                onDeleteFile={onDeleteFile}
                onDeleteFolder={onDeleteFolder}
              />
            </div>
          ))}
        </div>
      )}
      {children}

      <ModalAdd
        isOpen={modalAddOpen}
        folderName={folder.name}
        title={modalType === 'file' ? 'Sequence' : 'Folder'}
        placeholder={
          modalType === 'file' ? 'Enter sequence name' : 'Enter folder name'
        }
        onClose={handleAddModalClose}
        onSave={handleModalSave}
      />

      <ModalDelete
        isOpen={modalDeleteOpen}
        filePath={path}
        title={modalType === 'file' ? 'Sequence' : 'Folder'}
        onCancel={handleDeleteModalClose}
        onDelete={handleConfirmDeleteFolder}
      />
    </div>
  );
};

export default Sidebar;
