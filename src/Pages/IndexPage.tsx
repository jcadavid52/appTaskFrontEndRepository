import "./indexPage.css"
import React, { useEffect, useState } from "react";
import FormComponent from "../Components/FormComponent";
import TableComponent from "../Components/tableComponent";
import { GetTask } from "../Types/TaskInterface";
import { AddTask } from "../Types/TaskInterface";
import { getTasks } from "../Api/TasksApi";
export default function IndexPage(){
    const [tasks, setTasks] = useState<GetTask[]>([]);
    const [error, setError] = useState<string | null>(null);

    const agregarTarea = (nuevoTarea: AddTask) => {
       console.log(nuevoTarea)
       refreshTable()
    }

    const refreshTable = async () =>{
        try {
            const data = await getTasks();
            setTasks(data);
          } catch (err) {
            setError("Error al cargar las tareas" + err);
          } 
    }
    return(
        <div className="pageIndex-container">
           

            <FormComponent agregarElemento={agregarTarea}/>
            <TableComponent taskList={tasks}/>

        </div>
    )
}



  
