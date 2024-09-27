
import { GridColDef } from "@mui/x-data-grid";
import { SxProps, Theme } from '@mui/system';




export interface classTextfieldMuiCssType{
    asdas: 
}
export interface TaskType{
    id:string,
    description:string,
    status:string,
    createdAt:Date,
    updatedAt:Date
}

export interface GetTask{
    id:string,
    description:string,
    status:string,
    createdAt:Date,
    updatedAt:Date
}

export interface AddTask{
    description:string
}

export interface UpdateTask{
    description:string
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

export interface ContextTaskPropsType{
    createTask: (task:TaskType) => void;
    updateTask:(task:TaskType) => void;
    rowsDatagrid:GetTask[];
    loading:boolean;
    columnsDatagrid:GridColDef[];
    inputPropsEdit?: InputProps[];
    inputPropsAdd?: InputProps[];
    openModal:boolean;
    closeModal:() => void;
    modelUpdate?:TaskType;
    
    
}

