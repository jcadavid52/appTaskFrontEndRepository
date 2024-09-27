import { createContext, useEffect, useState } from "react";
import { AddTask, ContextTaskPropsType } from "../Types/TaskInterface";
import { getTasks, addTask,updateTask } from "../Api/TasksApi";
import { GetTask,UpdateTask,TaskType, classTextfieldMuiCss} from "../Types/TaskInterface";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { InputProps } from "../Types/TaskInterface";
import { SxProps, Theme } from '@mui/system';

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
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [modelUpdate,setModelUpdate] = useState<TaskType>()

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
        alert("task add successfully");

       

        if(refreshTable){
          setRefreshTable(false);
        }else{
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
        setOpen(false);
        
        alert("task updated successfully");

        

        if(refreshTable){
          setRefreshTable(false);
        }else{
          setRefreshTable(true);
        }
      }
    } catch {
      alert("Hubo un error");
    }
  };

  const DeleteTask = (params: GetTask): void => {
    console.log(params);
  };

  const HandleModal = (params: TaskType) =>{
    setOpen(true)
    setModelUpdate(params)
   
  }

  const handleClose = () => {
      setOpen(false);
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
              onClick={() => HandleModal(params.row)}
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
  const CssTextFieldAddTask:SxProps<Theme> = {

    '& label.MuiInputLabel-root': {
      color: '#d0ece7',
    },
    
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#85929e',
        
      },
      '&:hover fieldset': {
        borderColor: '#f7f9f9',
      },
      '&.Mui-focused fieldset': {
        
        borderColor: '#f7f9f9',
      },
      
    },

    'input':{
      color:"#d0ece7"
    }
  }

  const CssTextFieldUpdateTask:SxProps<Theme> = {

    '& label.MuiInputLabel-root': {
      color: '#566573',
    },
    
    
    
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#85929e',
        
      },
      '&:hover fieldset': {
        borderColor: '#17202a',
      },
      '&.Mui-focused fieldset': {
        
        borderColor: '#17202a',
      },
      
    },

    'input':{
      color:"#566573"
    }
  }
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
      cssTextField:CssTextFieldAddTask
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
      cssTextField:CssTextFieldUpdateTask
    },
    
    
  ];

  return (
    <TaskContext.Provider
      value={{
        rowsDatagrid: tasks,
        columnsDatagrid: columnsTasks,
        createTask:CreateTask,
        updateTask:UpdateTask,
        inputPropsAdd: inputPropsAddTask,
        inputPropsEdit: inputPropsUpdateTask,
        loading,
        openModal:open,
        closeModal:handleClose,
        modelUpdate:modelUpdate
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
