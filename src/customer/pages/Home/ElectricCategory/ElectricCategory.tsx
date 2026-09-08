import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";

const ElectricCategory = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-7
        gap-4
        px-4
        sm:px-6
        md:px-10
        lg:px-20
        py-5
        border-b
      "
    >
      {customer.homePageData?.electricCategories
        ?.slice(0, 7)
        .map((item) => (
          <ElectricCategoryCard
            key={item.id}
            item={item}
          />
        ))}
    </div>
  );
};

export default ElectricCategory;