import { z } from "zod";

export const ContentSchema = z.object({
  field: z.string().optional(),
  value: z.string().optional(),
});

export const TicketSchema = z.object({
  id: z.string().regex(/^\d{10}$/, "ID must be a string of 10 digits"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(20, "Name must be at most 20 characters long"),
  hotlinerId: z
    .string()
    .regex(/^\d{10}$/, "Hotliner ID must be a string of 10 digits"),
  companyId: z
    .string()
    .regex(/^\d{10}$/, "Company ID must be a string of 10 digits"),
  content: z.array(ContentSchema),
});

export type Ticket = z.infer<typeof TicketSchema>;
