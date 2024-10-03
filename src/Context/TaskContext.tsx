import { createContext, useEffect, useState } from "react";
import { ContextTaskPropsType } from "../Types/TaskInterface";
import { getTasks, addTask, updateTask, deleteTask,updateStatusTask } from "../Api/TasksApi";
import {
  TaskType,
} from "../Types/TaskInterface";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { GridColDef } from "@mui/x-data-grid";
import { InputProps,InputSelectProps } from "../Types/TaskInterface";
import { SxProps, Theme } from "@mui/system";
import { SelectChangeEvent } from '@mui/material/Select';


interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext<ContextTaskPropsType | undefined>(
  undefined
);

export function TaskContextProvider(props: TaskProviderProps) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [openModelEditTask, setOpenModalEditTask] = useState<boolean>(false);
  const [openModelEditStatusTask, setOpenModalEditStatusTask] = useState<boolean>(false);
  const [modelUpdate, setModelUpdate] = useState<TaskType>();
  const [valueSelect, setValueSelect] = useState<string>('');
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
  const [messageAlert,setMessageAlert] = useState<string>('');

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
  }, [refreshTable]);

  

  //crud
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

  const UpdatedStatusTask = async (task:TaskType) => {
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

  //modal

  const HandleModalEditTask = (params: TaskType) => {
    setOpenModalEditTask(true);
    setModelUpdate(params);
  };

  const HandleModalEditStatusTask = (params: TaskType) => {
    setOpenModalEditStatusTask(true);
    setModelUpdate(params);
    setValueSelect('');
    console.log(params)
  };

  

  const handleCloseModalEditTask = () => {
    setOpenModalEditTask(false);
  };

  const handleCloseModalEditStatusTask = () => {
    setOpenModalEditStatusTask(false);
  };

  const asyncConfirm = (message:string) => {
    return new Promise((resolve) => {
      const respuesta = confirm(message);
      resolve(respuesta);
    });
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

  //styles input props
  const CssTextFieldAddTask: SxProps<Theme> = {
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

  const CssTextFieldUpdateTask: SxProps<Theme> = {
    "& label.MuiInputLabel-root": {
      color: "#566573",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#85929e",
      },
      "&:hover fieldset": {
        borderColor: "#17202a",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#17202a",
      },
      
    },

    input: {
      color: "#566573",
    },
  };
  //input props

  const inputPropsAddTask: InputProps[] = [
    {
      id: "filled-basic1",
      type: "text",
      label: "Description Task",
      variant: "outlined",
      color: "secondary",
      messageMinLength:
        "the task description, cannot be less or equal to two characters",
      minLength: 2,
      name: "description",
      required: true,
      focused: true,
      cssTextField: CssTextFieldAddTask,
    },
  ];


  const inputPropsUpdateTask: InputProps[] = [
    {
      id: "id",
      type: "text",
      label: "ID",
      variant: "filled",
      color: "secondary",
      name: "id",
      hidden: true,
      defaultValue: modelUpdate?.id,
    },
    {
      id: "description",
      type: "text",
      label: "Description Task",
      variant: "outlined",
      color: "secondary",
      messageMinLength:
        "the task description, cannot be less or equal to two characters",
      minLength: 2,
      name: "description",
      required: true,
      defaultValue: modelUpdate?.description,
      cssTextField: CssTextFieldUpdateTask,
    },
  ];

  const inputPropsSelectUpdateStatusTask: InputSelectProps[] = [
      {
        id:"status",
        label:"Status",
        name:"status",
        required:true,
        value:valueSelect != '' ? valueSelect:modelUpdate?.status
      }
  ]

  const inputPropsUpdateStatusTask: InputProps[] = [
    {
      id: "id",
      type: "text",
      label: "ID",
      variant: "filled",
      color: "secondary",
      name: "id",
      hidden: true,
      defaultValue: modelUpdate?.id,
    },
]


  //crear handles de select

  const handleChange = (event: SelectChangeEvent) => {
    setValueSelect(event.target.value as string);
  };

  //alerts

  const HandleVisibleAlert = (open:boolean) =>{
    setIsVisibleAlert(open);
  }
  return (
    <TaskContext.Provider
      value={{
        rowsDatagrid: tasks,
        columnsDatagrid: columnsTasks,
        createTask: CreateTask,
        updateTask: UpdateTask,
        updateStatusTask:UpdatedStatusTask,
        inputPropsAdd: inputPropsAddTask,
        inputPropsEdit: inputPropsUpdateTask,
        inputPropsSelectEditStatus:inputPropsSelectUpdateStatusTask,
        inputPropsEditStatus:inputPropsUpdateStatusTask,
        loading,
        openModal: openModelEditTask,
        closeModal: handleCloseModalEditTask,
        openModalEditStatus:openModelEditStatusTask,
        closeModalEditStatus:handleCloseModalEditStatusTask,
        onChangeSelect:handleChange,
        isVisibleAlert,
        handleVisibleAlert:HandleVisibleAlert,
        messageAlert
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
