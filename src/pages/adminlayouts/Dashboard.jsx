import React, { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import { fetchPostData } from "../../components/hooks/Api";

const Dashboard = () => {

  const CompanyID = localStorage.getItem('companyID') ?? 1
  const [applicationDetailData, setApplicationDetailData] = useState([])
  // const [applicationDetailData, setApplicationDetailData] = useState([
  //   {
  //     TotalApplication: '500',
  //     SuccessApplication: '318',
  //     SuccessApplicationEWS: '207',
  //     SuccessApplicationLIG: '91',
  //   }
  // ])

  useEffect(() => {
    getApplicatonInfo()
  }, [])

  const getApplicatonInfo = async () => {
    try {
      const response = await fetchPostData("DashBoard/GetData_DashBoard", { CompanyID: localStorage.getItem('companyID') ?? 1 })
      console.log("🚀 ~ getApplicatonInfo ~ response:", response)
      setApplicationDetailData(response)

    } catch (error) {
      console.log("🚀 ~ getApplicatonInfo ~ error:", error)

    }
  }

  return (
    <div className="container-fluid py-4">
      {/* 👇 "row" covers full width with no side gap */}
      <div className="row g-3">
        <StatCard
          title="Total Application"
          category="TotalApplication"
          policyName={applicationDetailData[0]?.ProjectName}
          value={applicationDetailData[0]?.TotalApplication}
          icon="user"
          color="#e91e63"
        />
        <StatCard
          title="Success Application"
          category="SuccessApplication"
          policyName={applicationDetailData[0]?.ProjectName}
          value={applicationDetailData[0]?.SuccessApplication}
          icon="user"
          color="#4caf50"
        />
        <StatCard
          title="Success Application EWS"
          category="EWS"
          policyName={applicationDetailData[0]?.ProjectName}
          value={applicationDetailData[0]?.SuccessApplicationEWS}
          icon="user"
          color="#4caf50"
          showButtons
        />
        <StatCard
          title="Success Application LIG"
          category="LIG"
          policyName={applicationDetailData[0]?.ProjectName}
          value={applicationDetailData[0]?.SuccessApplicationLIG}
          icon="user"
          color="#4caf50"
          showButtons
        />
        {/* <StatCard
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
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
