import { Router } from "express";
import {
  getAllTickets,
  createTicket,
  getTicketById,
  deleteTicketById,
  updateTicketById,
  getTicketsByCompany,
  getTicketsByHotliner,
  searchTicketsByKeyword,
} from "../controllers/ticketController";

const router = Router();

router.get("/tickets", getAllTickets);
router.post("/tickets", createTicket);
router.get("/tickets/:id", getTicketById);
router.delete("/tickets/:id", deleteTicketById);
router.put("/tickets/:id", updateTicketById);
router.get("/tickets/company/:companyId", getTicketsByCompany);
router.get("/tickets/hotliner/:hotlinerId", getTicketsByHotliner);
router.get("/search", searchTicketsByKeyword);

export default router;
