import fs from "fs";
import path from "path";
import { Ticket } from "../models/ticketModel";

export const data: Ticket[] = [];

export const loadData = () => {
  const dataFilePath = path.join(__dirname, "../../data/MOCK_DATA.json");

  fs.readFile(dataFilePath, "utf8", (err, jsonString) => {
    if (err) {
      console.error("File read failed:", err);
      return;
    }

    try {
      const parsedData: Ticket[] = JSON.parse(jsonString);
      data.push(...parsedData);
      console.log("File data loaded:", data.length, "tickets");
    } catch (parseError) {
      console.error("JSON parse failed:", parseError);
    }
  });
};
