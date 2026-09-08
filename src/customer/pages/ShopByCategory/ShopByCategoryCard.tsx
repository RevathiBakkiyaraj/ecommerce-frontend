import React from "react";
import "./ShopByCategory.css";
import { HomeCategory } from "../../../types/HomeCategoryTypes";

const ShopByCategoryCard = ({
  item,
}: {
  item: HomeCategory;
}) => {
  return (
    <div
      className="
        flex
        flex-col
        justify-center
        items-center
        gap-2
        sm:gap-3
        group
        cursor-pointer
        w-auto
      "
    >
      <div
        className="
          custome-border
          w-[110px]
          h-[110px]
          sm:w-[140px]
          sm:h-[140px]
          md:w-[170px]
          md:h-[170px]
          lg:w-[200px]
          lg:h-[200px]
          xl:w-[249px]
          xl:h-[249px]
          rounded-full
          bg-primary-color
          overflow-hidden
        "
      >
        <img
          className="
            rounded-full
            group-hover:scale-95
            transition-transform
            duration-700
            object-cover
            object-top
            h-full
            w-full
          "
          src={item.image}
          alt={item.name || "Category"}
        />
      </div>

      <h1
        className="
          text-sm
          sm:text-base
          md:text-lg
          font-semibold
          text-center
          leading-tight
          px-1
        "
      >
        {item.name}
      </h1>
    </div>
  );
};

export default ShopByCategoryCard;