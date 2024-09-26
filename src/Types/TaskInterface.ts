
import { GridColDef } from "@mui/x-data-grid";
import { useForm, UseFormRegister } from "react-hook-form";
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
    defaultValue?:string
}

export interface ContextTaskPropsType{
    // inputProps: InputProps[];
    // createTask: (task:AddTask) => void;
    // updateTask:(task:UpdateTask) => void;
    // deleteTask:(id:string) => void
    // getAllTasks:() => GetTask[];
    rowsDatagrid:GetTask[];
    columnsDatagrid:GridColDef[];
    inputProps?: InputProps[];
    createElement: (task:AddTask) => void;
    
    
}

