import React from "react";
import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { Ticket } from "../../context/DataContext";

interface DeleteToolbarProps {
  selectedRows: GridRowSelectionModel;
  setSelectedRows: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
  data: Ticket[];
  setData: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const DeleteToolbar: React.FC<DeleteToolbarProps> = ({
  selectedRows,
  setSelectedRows,
  data,
  setData,
}) => {
  const handleDelete = async () => {
    try {
      for (const id of selectedRows) {
        await axios.delete(`http://localhost:3000/api/tickets/${id}`);
      }
      const newData = data.filter((row) => !selectedRows.includes(row.id));
      setData(newData);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedRows.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedRows.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedRows.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tickets
        </Typography>
      )}
      {selectedRows.length > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default DeleteToolbar;
