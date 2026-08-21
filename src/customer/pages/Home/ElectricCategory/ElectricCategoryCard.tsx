import React from "react";
import { HomeCategory } from "../../../../types/HomeCategoryTypes";

const ElectricCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <img
        className="h-10 object-contain"
        src={item.image} alt=""
      />

      <h2 className="text-sm text-center font-semibold">{item.name}</h2>
    </div>
  );
};

export default ElectricCategoryCard;