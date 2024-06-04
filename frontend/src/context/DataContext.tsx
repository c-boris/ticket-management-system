import React, { createContext, useState, useMemo, ReactNode } from "react";
import axios from "axios";

interface Content {
  field: string;
  value: string;
}

export interface Ticket {
  id: string;
  name: string;
  hotlinerId: string;
  companyId: string;
  content: Content[];
}

// Define the DataContextType interface representing the shape of the data and the setData function in the context
interface DataContextType {
  data: Ticket[];
  setData: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

// Create a context with the DataContextType or undefined as the default value
export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

// Define the DataProvider component which will provide the context to its children
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to hold the array of tickets
  const [data, setData] = useState<Ticket[]>([]);

  // useMemo to fetch data once the component is mounted
  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Ticket[]>(
          "http://localhost:3000/api/tickets"
        );
        // Update the state with the fetched data
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
