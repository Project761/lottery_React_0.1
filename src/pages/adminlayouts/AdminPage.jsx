import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataTablePage from "./DataTablePage";
import { getPageConfig } from "../../config/adminPages.jsx";
import { getApiForPage } from "../../services/adminApiService";

const AdminPage = ({ page: propPage }) => {
  // console.log("🚀 ~ AdminPage ~ propPage:", propPage)

  return (
    <div className="container py-4">
      {
        propPage === "DemandDraftAmount" ? (
          <DataTablePage
            page={propPage}
            getDataApiUrl={"Amount/GetData_Amount"}
            updateApiUrl={"Amount/Update_Amount"}
            deleteApiUrl={"Amount/Delete_Amount"}
            addApiUrl={"Amount/Insert_Amount"}
            getSingleDataApiUrl={"Amount/GetSingleData_Amount"}

            listCode={"AmountCode"}
            listId={"AmountID"}
          />
        )
          :
          propPage === "bank" ? (
            <DataTablePage
              page={propPage}
              getDataApiUrl={"Bank/GetData_Bank"}
              updateApiUrl={"Bank/Update_Bank"}
              deleteApiUrl={"Bank/Delete_Bank"}
              addApiUrl={"Bank/Insert_Bank"}
              getSingleDataApiUrl={"Bank/GetSingleData_Bank"}

              listCode={"BankCode"}
              listId={"BankID"}
            />
          )
            :
            propPage === "caste" ? (
              <DataTablePage
                page={propPage}
                getDataApiUrl={"Cast/GetData_Cast"}
                addApiUrl={"Cast/Insert_Cast"}
                updateApiUrl={"Cast/Update_Cast"}
                deleteApiUrl={"Cast/Delete_Cast"}
                getSingleDataApiUrl={"Cast/GetSingleData_Cast"}

                listCode={"CastCode"}
                listId={"CastID"}
              />
            )
            :
            propPage === "City" ? (
              <DataTablePage
                page={propPage}
                getDataApiUrl={"City/GetData_City"}
                addApiUrl={"City/Insert_City"}
                updateApiUrl={"City/Update_City"}
                deleteApiUrl={"City/Delete_City"}
                getSingleDataApiUrl={"City/GetSingleData_City"}

                listCode={"CityCode"}
                listId={"CityID"}
              />
            )
              :
              (
                <DataTablePage
                  page={propPage}
                  getDataApiUrl={""}
                  updateApiUrl={""}
                  deleteApiUrl={""}
                  addApiUrl={""}
                  getSingleDataApiUrl={""}
                />
              )
      }
    </div>
  );
};

export default AdminPage;
