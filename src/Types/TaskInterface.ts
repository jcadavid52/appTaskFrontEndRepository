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