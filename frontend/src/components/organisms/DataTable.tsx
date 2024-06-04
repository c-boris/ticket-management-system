import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

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

  if (!context) {
    return null;
  }

  const { data } = context;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
