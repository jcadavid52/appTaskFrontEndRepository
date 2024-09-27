import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import Box from "@mui/material/Box";

interface TableProps {
  title:string
}
export function TableComponent(props:TableProps) {
 
  const data = useContext(TaskContext);
  

  return (
    <div className="datagrid-container">
      <h1>{props.title}</h1>
      {data?.loading ? (
        <p>{"Cargando..."}</p>
      ) : (
        <Box sx={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={data?.rowsDatagrid}
            columns={data?.columnsDatagrid}
            density="compact"
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },

              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      )}
    </div>
  );
};


