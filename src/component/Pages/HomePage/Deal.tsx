import { Button } from "@mui/material";
import React, { useState } from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

const tabs = [
  "Deals",
  "Category",
  "Create Deal",
];

const Deal = () => {
  const [activeTab, setActiveTab] = useState("Deals");

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 px-2 sm:px-0">
        {tabs.map((item) => (
          <Button
            key={item}
            onClick={() => setActiveTab(item)}
            variant={activeTab === item ? "contained" : "outlined"}
            size="small"
            sx={{
              minWidth: {
                xs: "90px",
                sm: "110px",
              },
            }}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-5 w-full overflow-x-auto">
        {activeTab === "Deals" ? (
          <DealTable />
        ) : activeTab === "Category" ? (
          <DealCategoryTable />
        ) : (
          <div className="mt-5 flex justify-center items-center px-2 sm:px-4">
            <CreateDealForm />
          </div>
        )}
      </div>

    </div>
  );
};

export default Deal;