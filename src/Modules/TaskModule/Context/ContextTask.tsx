import { createContext, useEffect, useState } from "react";
import { TaskContextProps, TaskType } from "../../../Types/TaskInterface";
import { addTask, deleteTask, getTasks, updateStatusTask, updateTask } from "../../../Api/TasksApi";
import { IconButton, SxProps, Theme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskContext2 = createContext<TaskContextProps | undefined>(
  undefined
);

export function TaskContextProvider2(props: TaskProviderProps) {
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [openModalEditTask, setOpenModalEditTask] = useState<boolean>(false);
  const [modelUpdate, setModelUpdate] = useState<TaskType>();
  const [openModelEditStatusTask, setOpenModalEditStatusTask] = useState<boolean>(false);
 

  //alert
  const HandleVisibleAlert = (open:boolean) =>{
    setIsVisibleAlert(open);
  }
  //Styles
  const TextFieldStyle: SxProps<Theme> = {
    "& label.MuiInputLabel-root": {
      color: "#d0ece7",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#85929e",
      },
      "&:hover fieldset": {
        borderColor: "#f7f9f9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f7f9f9",
      },
    },

    input: {
      color: "#d0ece7",
    },
  };

  //useEffect
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

  // Crud
  const CreateTask = async (task: TaskType) => {
    try {
      const response = await addTask(task);

      if (response == undefined) {
        alert("Hubo un error");
      } else {
        setMessageAlert("Task Add Successfully!");
        setIsVisibleAlert(true);

        if (refreshTable) {
          setRefreshTable(false);
        } else {
          setRefreshTable(true);
        }
      }
    } catch {
      alert("Hubo un error");
    }
  };

  const UpdateTask = async (task: TaskType) => {
    try {
      const response = await updateTask(task);

      if (response == undefined) {
        alert("Hubo un error");
      } else {
        setOpenModalEditTask(false);

        setMessageAlert("Task Updated Successfully!");
        setIsVisibleAlert(true);

        if (refreshTable) {
          setRefreshTable(false);
        } else {
          setRefreshTable(true);
        }
      }
    } catch {
      alert("Hubo un error");
    }
  };

  const UpdatedStatusTask = async (task:TaskType) => {
    console.log(task)
    try {
      const response = await updateStatusTask(task);

      if (response == undefined) {
        alert("Hubo un error");
      } else {
        setOpenModalEditStatusTask(false);

        setMessageAlert("Task Status Updated Successfully!");
        setIsVisibleAlert(true);

        if (refreshTable) {
          setRefreshTable(false);
        } else {
          setRefreshTable(true);
        }
      }
    } catch {
      alert("Hubo un error");
    }
  };
  const DeleteTask = async (task: TaskType) => {
    const respuesta = await asyncConfirm("¿Estás seguro de que quieres realizar esta acción?");

    if (respuesta) {
      try {
        const response = await deleteTask(task.id);

        if (response == null) {
          alert("Hubo un error");
        } else {
          if (refreshTable) {
            setRefreshTable(false);
          } else {
            setRefreshTable(true);
          }

          setMessageAlert("Task Deleted Successfully!");
          setIsVisibleAlert(true);
        }
        
      } catch {
        alert("Hubo un error");
      }
    }
  };

  const asyncConfirm = (message:string) => {
    return new Promise((resolve) => {
      const respuesta = confirm(message);
      resolve(respuesta);
    });
  };

  //modal
  const HandleModalEditTask = (params: TaskType) => {
    
    setOpenModalEditTask(true);
    setModelUpdate(params);
  };

  const handleCloseModalEditTask = () => {
    setOpenModalEditTask(false);
  };

  const HandleModalEditStatusTask = (params: TaskType) => {
    setOpenModalEditStatusTask(true);
    setModelUpdate(params);
    console.log(params)
  };

  const handleCloseModalEditStatusTask = () => {
    setOpenModalEditStatusTask(false);
  };

  //Table
  const columnsTasks: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 0,
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "status",
      headerName: "Staus",
      width: 110,
      minWidth: 110,
      maxWidth: 200,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      minWidth: 150,
      maxWidth: 250,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      minWidth: 150,
      maxWidth: 280,
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "updatedAt",
      headerName: "Update At",
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
              onClick={() => HandleModalEditTask(params.row)}
            >
              <EditNoteIcon />
            </IconButton>
          </div>
        );
      },
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "editStatus",
      headerName: "EditStatus",
      width: 125,
      hideable: false,
      resizable: false,
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => HandleModalEditStatusTask(params.row)}
            >
              <AssignmentIcon />
            </IconButton>
          </div>
        );
      },
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
    {
      field: "delete",
      headerName: "Delete",
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
              onClick={() => DeleteTask(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
      headerClassName: "MuiDataGrid-columnHeader--alignLeft",
    },
  ];

  return (
    <TaskContext2.Provider
      value={{
        message: "asdasd",
        createTask: CreateTask,
        textFieldStyle: TextFieldStyle,
        loading,
        tasks,
        columnsDatagrid: columnsTasks,
        modalEdit:openModalEditTask,
        closeModal:handleCloseModalEditTask,
        modelUpdate,
        updateTask:UpdateTask,
        openModalEditStatus:openModelEditStatusTask,
        closeModalEditStatus:handleCloseModalEditStatusTask,
        updateStatusTask:UpdatedStatusTask,
        handleVisibleAlert:HandleVisibleAlert,
        isVisibleAlert,
        messageAlert
        
      }}
    >
      {props.children}
    </TaskContext2.Provider>
  );
}
