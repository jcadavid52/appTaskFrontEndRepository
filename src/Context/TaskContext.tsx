import { createContext, useEffect, useState } from "react";
import { AddTask, ContextTaskPropsType } from "../Types/TaskInterface";
import { getTasks } from "../Api/TasksApi";
import { GetTask } from "../Types/TaskInterface";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { InputProps } from "../Types/TaskInterface";


interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext<ContextTaskPropsType | undefined>(
  undefined
);

export function TaskContextProvider(props: TaskProviderProps) {
  const [tasks, setTasks] = useState<GetTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Get All Tasks
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

  //crud
  const createTask = (task:AddTask) =>{
    console.log(task)
  }

  const HandleEdit = (params: GetTask): void => {
    console.log(params);
  };

  const HandleDelete = (params: GetTask): void => {
    console.log(params);
  };

  //Columns datagrid
  const columnsTasks: GridColDef[] = [
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

 

  return (
    <TaskContext.Provider
      value={{ rowsDatagrid: tasks, columnsDatagrid: columnsTasks,createElement:createTask,inputProps }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
