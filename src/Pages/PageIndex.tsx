import {TableComponent} from "../Components/TaskComponentes/TableComponent";
import { AddTask, GetTask } from "../Types/TaskInterface";
import React, { useEffect, useState } from "react";
import { getTasks } from "../Api/TasksApi";
import "../assets/css/TableComponent.css";
import "../assets/css/indexPage.css";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import {FormComponent} from "../Components/TaskComponentes/FormComponent";
import { InputProps } from "../Types/TaskInterface";
import { addTask } from "../Api/TasksApi";
import ModalComponent from "../Components/TaskComponentes/ModalComponent";


export default function PageIndex() {
  const [tasks, setTasks] = useState<GetTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTable,setRefreshTable] = useState<boolean>(false);
  //colums
  const columnsTasks = [
    {
      field: "id",
      headerName: "ID",
      width: 0,
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "status",
      headerName: "Estado",
      width: 110,
      minWidth: 110,
      maxWidth: 200,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 150,
      minWidth: 150,
      maxWidth: 250,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "createdAt",
      headerName: "Fecha De Creación",
      width: 150,
      minWidth: 150,
      maxWidth: 280,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "updatedAt",
      headerName: "Fecha De Actualización",
      width: 150,
      minWidth: 150,
      maxWidth: 280,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 125,
      hideable: false,
      resizable: false,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => HandleEdit(params.row)}
            >
              <EditNoteIcon />
            </IconButton>
          </div>
        );
      },
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 125,
      hideable: false,
      resizable: false,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              aria-label="delete"
              size="medium"
              color="secondary"
              onClick={() => HandleDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
  ];

  //use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasks();
        
        setTasks(data);
      } catch (err) {
        setError("Error al cargar las tareas" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTable]);

  //functions

  const HandleEdit = (params: GetTask): void => {
    console.log(params);
  };

  const HandleDelete = (params: GetTask): void => {
    console.log(params);
  };



  

  //input props

  const inputProps: InputProps[] = [
    {
      id: "filled-basic1",
      type: "text",
      label: "Description Task",
      variant: "filled",
      color: "secondary",
      messageMinLength:
        "the task description, cannot be less or equal to two characters",
      minLength: 2,
      name: "description",
      required: true,
      focused: true,
    }
  ];

  const HandleSubmitData = async  (data: AddTask) => {
    try {
      const response = await addTask(data);

      if (response == undefined) {
        alert("Hubo un error");
      } else {
       
        
        alert("task add successfully");

        setRefreshTable(true)
      }
    } catch {
      alert("Hubo un error");
    }
  };

  return (
    <div className="pageIndex-container">
      
      <FormComponent<AddTask>
        inputProps={inputProps}
        titleForm={"Add Task"}
        handleSubmitData={HandleSubmitData}
        
      />
      <TableComponent
        loading={loading}
        title="Task List"
      />
      
    </div>
  );
}
