import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");

  // Emit the assignTickets event
  const fromHotliner = "5388300145"; // Replace with the source hotliner ID you want to test
  const toHotliner = "3492292038"; // Replace with the target hotliner ID you want to test
  socket.emit("assignTickets", { fromHotliner, toHotliner });

  // Listen to the ticketsUpdated event to confirm the assignment
  socket.on("ticketsUpdated", () => {
    console.log(
      `Tickets have been successfully assigned from ${fromHotliner} to ${toHotliner}.`
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
