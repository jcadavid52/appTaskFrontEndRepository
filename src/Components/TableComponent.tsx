import { Task } from "../Types/TaskInterface";
import React, { useEffect, useState } from "react";
import { getTasks } from "../Api/TasksApi";
import { DataGrid,GridCol } from "@mui/x-data-grid";
import "./TableComponent.css";
import Box from "@mui/material/Box";

interface ArgumentsTable {
  tasks: Task[];
}

const TableComponent: React.FC = () => {
  //Use states
  const [tasks, setTasks] = useState<Task[]>([]);
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

  //colums
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName:"MuiDataGrid-columnHeader--alignCenter"
    },
    {
      field: "status",
      headerName: "Estado",
      width: 90,
      headerClassName:"MuiDataGrid-columnHeader--alignCenter"
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 90,
      headerClassName:"MuiDataGrid-columnHeader--alignCenter"
    },
    {
      field: "createdAt",
      headerName: "Fecha De Creación",
      width: 90,
      headerClassName:"MuiDataGrid-columnHeader--alignCenter"
    },
    {
      field: "updatedAt",
      headerName: "Fecha De Creación",
      width: 90,
      headerClassName:"MuiDataGrid-columnHeader--alignCenter"
    },
  ];

  return (
    <div className="datagrid-container">
      <h1>Tasks List</h1>
      {loading ? (
        <p>{"Cargando..."}</p>
      ) : (
        <Box sx={{ height:"400px",  width: '100%' }}>
          <DataGrid rows={tasks} columns={columns} density="compact" />
        </Box>
      )}
    </div>
  );
};

export default TableComponent;
