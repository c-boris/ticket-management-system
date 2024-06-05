import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { io, Socket } from "socket.io-client";

interface ModalManageTicketsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalManageTickets: React.FC<ModalManageTicketsProps> = ({
  isOpen,
  onClose,
}) => {
  const context = useContext(DataContext);
  const [hotlinerIdToDelete, setHotlinerIdToDelete] = useState<string>("");
  const [fromHotliner, setFromHotliner] = useState<string>("");
  const [toHotliner, setToHotliner] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isOpen) {
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);

      newSocket.on("ticketsUpdated", (updatedData) => {
        context?.setData(updatedData);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [isOpen, context]);

  if (!context) {
    return null;
  }

  const { data, setData } = context;

  const handleSocketEmit = (
    event: string,
    payload: unknown,
    updateFn: () => void
  ) => {
    if (socket) {
      socket.emit(event, payload);
      updateFn();
      onClose();
    }
  };

  const handleDeleteByHotliner = () => {
    handleSocketEmit("deleteTickets", hotlinerIdToDelete, () => {
      setData(
        data.filter((ticket) => ticket.hotlinerId !== hotlinerIdToDelete)
      );
      setHotlinerIdToDelete("");
    });
  };

  const handleAssignTickets = () => {
    handleSocketEmit("assignTickets", { fromHotliner, toHotliner }, () => {
      setData(
        data.map((ticket) =>
          ticket.hotlinerId === fromHotliner
            ? { ...ticket, hotlinerId: toHotliner }
            : ticket
        )
      );
      setFromHotliner("");
      setToHotliner("");
    });
  };

  const renderSelect = (
    labelId: string,
    value: string,
    onChange: (e: SelectChangeEvent<string>) => void,
    label: string
  ) => (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} value={value} label={label} onChange={onChange}>
        {data.map((ticket) => (
          <MenuItem key={ticket.id} value={ticket.hotlinerId}>
            {ticket.hotlinerId}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Manage Tickets
        </Typography>
        {renderSelect(
          "select-delete-label",
          hotlinerIdToDelete,
          (e) => setHotlinerIdToDelete(e.target.value as string),
          "Delete all tickets from Hotliner ID"
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleDeleteByHotliner}
        >
          Delete Tickets
        </Button>
        {renderSelect(
          "select-from-label",
          fromHotliner,
          (e) => setFromHotliner(e.target.value as string),
          "From Hotliner ID"
        )}
        {renderSelect(
          "select-to-label",
          toHotliner,
          (e) => setToHotliner(e.target.value as string),
          "To Hotliner ID"
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAssignTickets}
        >
          Assign Tickets
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalManageTickets;
