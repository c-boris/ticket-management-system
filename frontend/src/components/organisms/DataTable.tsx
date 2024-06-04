import { useContext, useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { DataContext } from "../../context/DataContext";
import { Box } from "@mui/material";
import DeleteToolbar from "../molecules/DeleteToolbar";

const columns: GridColDef[] = [
  { field: "id", headerName: "Ticket ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "hotlinerId", headerName: "Hotliner ID", width: 150 },
  { field: "companyId", headerName: "Company ID", width: 150 },
  {
    field: "content",
    headerName: "Content",
    width: 600,
    renderCell: (params) => (
      <span>
        {params.value
          .map(
            (item: { field: string; value: string }) =>
              `${item.field}: ${item.value}`
          )
          .join("; ")}
      </span>
    ),
  },
];

export default function DataTable() {
  const context = useContext(DataContext);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

  if (!context) {
    return null;
  }

  const { data, setData } = context;

  return (
    <Box sx={{ height: 660, width: "100%" }}>
      <DeleteToolbar
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        data={data}
        setData={setData}
      />
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
    </Box>
  );
}
