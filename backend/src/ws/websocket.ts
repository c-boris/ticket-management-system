import { Server } from "socket.io";
import { data } from "../utils/loadData";

export const setupWebSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("deleteTickets", (hotlinerId) => {
      if (!hotlinerId) {
        socket.emit("error", "Hotliner ID is required");
        return;
      }
      const initialLength = data.length;
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].hotlinerId === hotlinerId) {
          data.splice(i, 1);
        }
      }
      if (data.length < initialLength) {
        io.emit("ticketsUpdated", data);
        console.log(
          `Tickets for hotlinerId ${hotlinerId} have been successfully deleted.`
        );
      }
    });

    socket.on("assignTickets", ({ fromHotliner, toHotliner }) => {
      if (!fromHotliner || !toHotliner) {
        socket.emit(
          "error",
          "Both fromHotliner and toHotliner IDs are required"
        );
        return;
      }
      data.forEach((ticket) => {
        if (ticket.hotlinerId === fromHotliner) {
          ticket.hotlinerId = toHotliner;
        }
      });
      io.emit("ticketsUpdated", data);
      console.log(
        `Tickets have been successfully assigned from ${fromHotliner} to ${toHotliner}.`
      );
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
