import { useContext } from "react";
import { TaskContext2 } from "../Context/ContextTask";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function TableComponent2() {
  const data = useContext(TaskContext2);
  return (
    <div className="datagrid-container">
      {data?.loading ? (
        <p>{"Cargando..."}</p>
      ) : (
        <Box sx={{ height: "400px", width: "100%" }}>
          <DataGrid
            columns={data?.columnsDatagrid || []}
            rows={data?.tasks}
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
}
