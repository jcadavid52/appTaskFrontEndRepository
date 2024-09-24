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
    color:string,
    messageMinLength:string,
    minLength:number,
    name:string,
    required:boolean
    focused:boolean
}

