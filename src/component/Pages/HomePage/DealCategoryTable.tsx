import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const DealCategoryTable = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div className="w-full overflow-x-auto px-0 sm:px-2">
      <HomeCategoryTable
        data={customer.homePageData?.dealCategories || []}
      />
    </div>
  );
};

export default DealCategoryTable;