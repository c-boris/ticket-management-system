import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes";
import { loadData } from "./utils/loadData";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(bodyParser.json());

loadData();

app.use("/api", ticketRoutes);

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
