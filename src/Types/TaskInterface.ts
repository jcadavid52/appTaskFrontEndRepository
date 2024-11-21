
import { GridColDef } from "@mui/x-data-grid";
import { SxProps, Theme } from '@mui/system';
import { SelectChangeEvent } from '@mui/material/Select';





export interface TaskType{
    id:string,
    description:string,
    status:string,
    createdAt:string,
    updatedAt:string
}



export interface InputProps{
    id:string,
    type:string,
    label:string,
    variant:string,
    color?:string,
    messageMinLength?:string,
    minLength?:number,
    name:string,
    required?:boolean,
    focused?:boolean,
    hidden?:boolean,
    defaultValue?:string,
    cssTextField?:SxProps<Theme>
}

export interface InputSelectProps{
    id?:string,
    label?:string,
    name:string,
    required?:boolean,
    value?:string
}

export interface TaskContextProps{
    message:string;
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

export interface ContextTaskPropsType{
    createTask: (task:TaskType) => void;
    updateTask:(task:TaskType) => void;
    updateStatusTask:(task:TaskType) => void;
    rowsDatagrid:TaskType[];
    loading:boolean;
    columnsDatagrid:GridColDef[];
    inputPropsEdit?: InputProps[];
    inputPropsAdd?: InputProps[];
    inputPropsEditStatus:InputProps[];
    inputPropsSelectEditStatus:InputSelectProps[];
    openModal:boolean;
    closeModal:() => void;
    openModalEditStatus:boolean;
    closeModalEditStatus:() => void;
    onChangeSelect:(event:SelectChangeEvent) => void;
    isVisibleAlert:boolean;
    handleVisibleAlert: (open:boolean) => void;
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

