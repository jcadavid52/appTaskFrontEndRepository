import TableTasks from "../Components/TableComponent";
import { AddTask, GetTask } from "../Types/TaskInterface";
import React, { useEffect, useState } from "react";
import { getTasks } from "../Api/TasksApi";
import "../assets/css/TableComponent.css";
import "../assets/css/indexPage.css";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FormComponent from "../Components/FormComponent";
import FormPrueba from "../Components/FormPrueba";
import TextField from "@mui/icons-material/TextField";
import { InputProps } from "../Types/TaskInterface";
import { addTask } from "../Api/TasksApi";


export default function PageIndex() {
  const [tasks, setTasks] = useState<GetTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
  }, []);

  //functions

  const HandleEdit = (params: GetTask): void => {
    console.log(params);
  };

  const HandleDelete = (params: GetTask): void => {
    console.log(params);
  };

  const agregarTarea = (nuevoTarea: AddTask) => {
    console.log(nuevoTarea);
    refreshTable();
  };

  const refreshTable = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Error al cargar las tareas" + err);
    }
  };

  //input props

  const inputProps: InputProps[] = [
    {
      id: "filled-basic1",
      type: "text",
      label: "Tarea",
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
      }
    } catch {
      alert("Hubo un error");
    }
  };

  return (
    <div className="pageIndex-container">
      {/* <FormComponent agregarElemento={agregarTarea}/> */}
      <FormPrueba<AddTask>
        inputProps={inputProps}
        agregarElemento={agregarTarea}
        handleSubmitData={HandleSubmitData}
      />
      <TableTasks
        data={tasks}
        columns={columnsTasks}
        loading={loading}
        title="Task List"
      />
    </div>
  );
}
