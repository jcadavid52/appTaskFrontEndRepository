
import { GridColDef } from "@mui/x-data-grid";
import { SxProps, Theme } from '@mui/system';

export interface TaskType{
    id:string,
    description:string,
    status:string,
    createdAt:string,
    updatedAt:string
}

export interface TaskContextProps{
    createTask: (task:TaskType) => void;
    updateTask:(task:TaskType) => void;
    textFieldStyle?:SxProps<Theme>;
    loading?:boolean;
    tasks:TaskType[];
    columnsDatagrid:GridColDef[];
    modalEdit:boolean;
    closeModal:() => void;
    modelUpdate?:TaskType;
    openModalEditStatus?:boolean;
    closeModalEditStatus:() => void;
    updateStatusTask:(task:TaskType) => void;
    handleVisibleAlert: (open:boolean) => void;
    isVisibleAlert:boolean;
    messageAlert:string;
    
}

export interface FormProps {
    classCss: {
      formContainer?: string;
      inputContainer?: string;
      itemInputContainer?: string;
      buttonContainer?: string;
    };
}

