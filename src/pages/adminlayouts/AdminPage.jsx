import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataTablePage from "./DataTablePage";


const AdminPage = ({ page: propPage }) => {
  // console.log("🚀 ~ AdminPage ~ propPage:", propPage)

  return (
    <div className="container py-4 pb-2">
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
            propPage === "Annual-Income" ? (
              <DataTablePage
                page={propPage}
                getDataApiUrl={"AnnualIncome/GetData_AnnualIncome"}
                updateApiUrl={"AnnualIncome/Update_AnnualIncome"}
                deleteApiUrl={"AnnualIncome/Delete_AnnualIncome"}
                addApiUrl={"AnnualIncome/Insert_AnnualIncome"}
                getSingleDataApiUrl={"AnnualIncome/GetSingleData_AnnualIncome"}

                listCode={"AnnualIncomeCode"}
                listId={"AnnualIncomeID"}
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
                  propPage === "project" ? (
                    <DataTablePage
                      page={propPage}
                      getDataApiUrl={"Project/GetData_Project"}
                      addApiUrl={"Project/Insert_Project"}
                      updateApiUrl={"Project/Update_Project"}
                      deleteApiUrl={"Project/Delete_Project"}
                      getSingleDataApiUrl={"Project/GetSingleData_Project"}

                      listCode={"ProjectCode"}
                      listId={"ProjectID"}
                    />
                  )
                    :
                    propPage === "plot" ? (
                      <DataTablePage
                        page={propPage}
                        getDataApiUrl={"Category/GetDataDropDown_Category"}
                        addApiUrl={"Category/Insert_Category"}
                        updateApiUrl={"Category/Update_Category"}
                        deleteApiUrl={"Category/Delete_Category"}
                        getSingleDataApiUrl={"Category/GetSingleData_Category"}

                        listCode={"CategoryCode"}
                        listId={"CategoryID"}
                      />
                    )
                      :
                      propPage === "application" ? (
                        <DataTablePage
                          page={propPage}
                          getDataApiUrl={"AnnualIncome/GetDataDropDown_AnnualIncome"}
                          addApiUrl={"AnnualIncome/Insert_AnnualIncome"}
                          updateApiUrl={"AnnualIncome/Update_AnnualIncome"}
                          deleteApiUrl={"AnnualIncome/Delete_AnnualIncome"}
                          getSingleDataApiUrl={"AnnualIncome/GetSingleData_AnnualIncome"}

                          listCode={"AnnualIncomeCode"}
                          listId={"AnnualIncomeID"}
                        />
                      )
                        :
                        propPage === "bank-details" ? (
                          <DataTablePage
                            page={propPage}
                            getDataApiUrl={"BankDetails/GetData_BankDetails"}
                            addApiUrl={"BankDetails/Insert_BankDetails"}
                            updateApiUrl={"BankDetails/Update_BankDetails"}
                            deleteApiUrl={"BankDetails/Delete_BankDetails"}
                            getSingleDataApiUrl={"BankDetails/GetSingleData_BankDetails"}

                            listCode={"BankDetailsCode"}
                            listId={"BankDetailsID"}
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
