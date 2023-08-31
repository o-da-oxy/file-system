import React, { useState } from 'react';
import { Folder } from './types/types';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const App: React.FC = () => {
  const initialFolders: Folder[] = [
    {
      id: 1,
      name: 'AAA',
      files: [
        { id: 11, name: 'First' },
        { id: 12, name: 'Second' },
        { id: 13, name: 'Third' },
      ],
      folders: [],
    },
    {
      id: 2,
      name: 'BBB',
      files: [
        { id: 21, name: 'First' },
        { id: 22, name: 'Second' },
        { id: 23, name: 'Third' },
      ],
      folders: [],
    },
    {
      id: 3,
      name: 'CCC',
      files: [
        { id: 31, name: 'First' },
        { id: 32, name: 'Second' },
        { id: 33, name: 'Third' },
      ],
      folders: [],
    },
  ];

  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const handleAddFile = (folderId: number, fileName: string) => {
    if (fileName) {
      setFolders((prevFolders) =>
        updateFolder(prevFolders, folderId, { fileName, operation: 'addFile' })
      );
    }
  };

  const handleAddFolder = (folderId: number, folderName: string) => {
    if (folderName) {
      setFolders((prevFolders) =>
        updateFolder(prevFolders, folderId, {
          folderName,
          operation: 'addFolder',
        })
      );
    }
  };

  const handleDeleteFile = (folderId: number, fileId: number) => {
    setFolders((prevFolders) =>
      updateFolder(prevFolders, folderId, { fileId, operation: 'deleteFile' })
    );
  };

  const handleDeleteFolder = (folderId: number) => {
    setFolders((prevFolders) =>
      updateFolder(prevFolders, folderId, { operation: 'deleteFolder' })
    );
  };

  const updateFolder = (
    folders: Folder[],
    folderId: number,
    payload: {
      fileName?: string;
      folderName?: string;
      fileId?: number;
      operation: string;
    }
  ): Folder[] => {
    return folders
      .map((folder) => {
        if (folder.id === folderId) {
          if (payload.operation === 'addFile') {
            const newFileId = getNewFileId(
              folderId,
              folder.files.length === folder.folders.length
                ? folder.files.length + 1
                : folder.files.length + 2
            );
            return {
              ...folder,
              files: [
                ...folder.files,
                {
                  id: newFileId,
                  name: payload.fileName!,
                },
              ],
            };
          } else if (payload.operation === 'addFolder') {
            const newFolderId = getNewFolderId(
              folderId,
              folder.folders.length === folder.files.length
                ? folder.folders.length + 1
                : folder.folders.length + 2
            );
            const newFolder: Folder = {
              id: newFolderId,
              name: payload.folderName!,
              files: [],
              folders: [],
            };
            return {
              ...folder,
              folders: [...folder.folders, newFolder],
            };
          } else if (payload.operation === 'deleteFile') {
            const updatedFiles = folder.files.filter(
              (file) => file.id !== payload.fileId
            );
            return {
              ...folder,
              files: updatedFiles,
            };
          } else if (payload.operation === 'deleteFolder') {
            return null;
          }
        } else if (folder.folders.length > 0) {
          const updatedFolders = updateFolder(
            folder.folders,
            folderId,
            payload
          );
          return {
            ...folder,
            folders: updatedFolders.filter((folder) => folder !== undefined),
          };
        }
        return folder;
      })
      .filter((folder) => folder !== null) as Folder[];
  };

  const getNewFileId = (baseId: number, numFiles: number): number => {
    const suffix = numFiles.toString().padStart(2, '0');
    return parseInt(baseId.toString() + suffix);
  };

  const getNewFolderId = (baseId: number, numFolders: number): number => {
    const suffix = numFolders.toString().padStart(2, '0');
    return parseInt(baseId.toString() + suffix);
  };

  return (
    <div className="sidebar">
      {folders.map((folder) => (
        <Sidebar
          key={folder.id}
          folder={folder}
          folders={folders}
          onAddFile={handleAddFile}
          onAddFolder={handleAddFolder}
          onDeleteFile={handleDeleteFile}
          onDeleteFolder={handleDeleteFolder}
        />
      ))}
    </div>
  );
};

export default App;
