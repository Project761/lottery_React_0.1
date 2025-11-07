import React from "react";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      {/* 👇 "row" covers full width with no side gap */}
      <div className="row g-3">
        <StatCard
          title="Total Application"
          value="318"
          icon="user"
          color="#e91e63"
        />  
        <StatCard
          title="Success Application"
          value="318"
          icon="user"
          color="#4caf50"
        />
        <StatCard
          title="Success Application EWS"
          value="207"
          icon="user"
          color="#4caf50"
          showButtons
        />
        <StatCard
          title="Success Application LIG"
          value="91"
          icon="user"
          color="#4caf50"
          showButtons
        />
      </div>
    </div>
  );
};

export default Dashboard;
