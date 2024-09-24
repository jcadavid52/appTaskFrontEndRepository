import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

interface TableProps<T> {
  data: T[];
  columns: T[];
  loading: boolean;
  title:string
}
const TableComponent = <T,>({ data, columns, loading,title }: TableProps<T>) => {
  return (
    <div className="datagrid-container">
      <h1>{title}</h1>
      {loading ? (
        <p>{"Cargando..."}</p>
      ) : (
        <Box sx={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
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

export default TableComponent;
