import React from "react";
import { HomeCategory } from "../../../../types/HomeCategoryTypes";

const ElectricCategoryCard = ({ item }: { item: HomeCategory }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full px-1">
      <img
        className="
          h-8
          sm:h-10
          md:h-12
          w-full
          object-contain
        "
        src={item.image}
        alt={item.name}
      />

      <h2
        className="
          text-xs
          sm:text-sm
          md:text-sm
          text-center
          font-semibold
          leading-tight
        "
      >
        {item.name}
      </h2>
    </div>
  );
};

export default ElectricCategoryCard;