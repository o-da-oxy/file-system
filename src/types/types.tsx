interface File {
  id: number;
  name: string;
}

interface Folder {
  id: number;
  name: string;
  files: File[];
  folders: Folder[];
}

interface FolderProps {
  folder: Folder;
  folders: Folder[];
  onAddFile: (fileId: number, fileName: string) => void;
  onAddFolder: (folderId: number, folderName: string) => void;
  onDeleteFile: (folderId: number, fileId: number) => void;
  onDeleteFolder: (folderId: number) => void;
  children?: React.ReactNode;
}

interface ModalAddProps {
  isOpen: boolean;
  folderName: string;
  title: string;
  placeholder: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

interface ModalDeleteProps {
  isOpen: boolean;
  filePath: string;
  title: string;
  onCancel: () => void;
  onDelete: () => void;
};

export type { File, Folder, FolderProps, ModalAddProps, ModalDeleteProps }
