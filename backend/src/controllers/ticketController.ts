import { Request, Response } from "express";
import { z } from "zod";
import { Ticket, TicketSchema } from "../models/ticketModel";
import { data } from "../utils/loadData";

const isIdUnique = (id: string) => {
  return !data.some((ticket) => ticket.id === id);
};

export const getAllTickets = (req: Request, res: Response) => {
  res.send(data);
};

export const createTicket = (req: Request, res: Response) => {
  try {
    const newTicket = TicketSchema.parse(req.body);

    if (!isIdUnique(newTicket.id)) {
      return res.status(400).send({ message: "ID must be unique" });
    }

    data.push(newTicket);
    res.status(201).send(newTicket);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ message: error.errors });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getTicketById = (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const ticket = data.find((d) => d.id === ticketId);
  if (ticket) {
    res.send(ticket);
  } else {
    res.status(404).send({ message: "Ticket not found" });
  }
};

export const deleteTicketById = (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const index = data.findIndex((d) => d.id === ticketId);
  if (index !== -1) {
    const deletedTicket = data.splice(index, 1)[0];
    res
      .status(200)
      .send({ message: "Ticket deleted successfully", ticket: deletedTicket });
  } else {
    res.status(404).send({ message: "Ticket not found" });
  }
};

export const updateTicketById = (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const ticketIndex = data.findIndex((d) => d.id === ticketId);

  if (ticketIndex === -1) {
    return res.status(404).send({ message: "Ticket not found" });
  }

  try {
    if (req.body.id && req.body.id !== ticketId) {
      return res.status(400).send({ message: "ID cannot be modified" });
    }
    const updatedTicket = TicketSchema.parse(req.body);
    data[ticketIndex] = { ...data[ticketIndex], ...updatedTicket };
    res.send(data[ticketIndex]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ message: error.errors });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getTicketsByCompany = (req: Request, res: Response) => {
  const companyId = req.params.companyId;
  const tickets = data.filter((ticket) => ticket.companyId === companyId);

  if (tickets.length === 0) {
    return res
      .status(404)
      .send({ message: "No tickets found for this company" });
  }

  res.send(tickets);
};

export const getTicketsByHotliner = (req: Request, res: Response) => {
  const hotlinerId = req.params.hotlinerId;
  const tickets = data.filter((ticket) => ticket.hotlinerId === hotlinerId);

  if (tickets.length === 0) {
    return res
      .status(404)
      .send({ message: "No tickets found for this hotliner" });
  }

  res.send(tickets);
};

export const searchTicketsByKeyword = (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== "string") {
    return res
      .status(400)
      .send({ message: "Keyword is required and must be a string" });
  }

  const lowerCaseKeyword = keyword.toLowerCase();

  const tickets = data.filter((ticket) =>
    ticket.name.toLowerCase().includes(lowerCaseKeyword)
  );

  if (tickets.length === 0) {
    return res
      .status(404)
      .send({ message: "No tickets found matching the keyword" });
  }

  res.send(tickets);
};
