import React from "react";
import DataTable from "../organisms/DataTable";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Ticket Management</h1>
      <div className="table-container">
        <DataTable />
      </div>
    </div>
  );
};

export default Dashboard;
