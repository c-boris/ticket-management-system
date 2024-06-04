import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");

  // Emit the deleteTickets event
  const hotlinerId = "5388300145"; // Replace with the hotliner ID you want to test
  socket.emit("deleteTickets", hotlinerId);

  // Listen to the ticketsUpdated event to confirm the deletion
  socket.on("ticketsUpdated", () => {
    console.log(
      `Tickets for hotlinerId ${hotlinerId} have been successfully deleted.`
    );

    // Disconnect after receiving the confirmation
    socket.disconnect();
  });

  // Error handling
  socket.on("error", (error) => {
    console.error("Error:", error);
    socket.disconnect();
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
