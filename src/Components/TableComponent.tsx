import { GetTask } from "../Types/TaskInterface";
import React, { useEffect, useState } from "react";
import { getTasks } from "../Api/TasksApi";
import { DataGrid } from "@mui/x-data-grid";
import "./TableComponent.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

interface ArgumentsTable {
  taskList: GetTask[];
}

const TableComponent: React.FC<ArgumentsTable> = ({ taskList }) => {
  //Use states
  const [tasks, setTasks] = useState<GetTask[]>(taskList);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  //colums
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 0,
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "status",
      headerName: "Estado",
  
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
      resizable: false,
    },
    {
      field: "description",
      headerName: "Descripción",
  
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "createdAt",
      headerName: "Fecha De Creación",
      
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "updatedAt",
      headerName: "Fecha De Actualización",
     
      headerClassName: "MuiDataGrid-columnHeader--alignCenter",
    },
    {
      field: "edit",
      headerName: "Edit",
    
      hideable:false,
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
    },
    {
      field: "delete",
      headerName: "Eliminar",
     
      hideable:false,
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
    },
  ];

  return (
    <div className="datagrid-container">
      <h1>Tasks List</h1>
      {loading ? (
        <p>{"Cargando..."}</p>
      ) : (
        <Box sx={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={taskList.length == 0 ? tasks : taskList}
            columns={columns}
            density="compact"
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false
                },
              },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default TableComponent;
