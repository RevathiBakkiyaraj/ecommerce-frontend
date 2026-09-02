import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import menLevelTwo from "../../../data/category/level two/menLevelTwo";
import womenLevelTwo from "../../../data/category/level two/womenLevelTwo";
import electronicsLevelTwo from "../../../data/category/level two/electronicsLevelTwo";
import furnitureLevelTwo from "../../../data/category/level two/furnitureLevelTwo";

import menLevelThree from "../../../data/category/level three/menLevelThree";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import electronicsLevelThree from "../../../data/category/level three/electronicsLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";

const categoryTwo: { [key: string]: any } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree: { [key: string]: any } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

interface CategorySheetProps {
  selectedCategory: string;
}

const CategorySheet: React.FC<CategorySheetProps> = ({
  selectedCategory,
}) => {
  const navigate = useNavigate();

  const childCategory = (
    category: any[],
    parentCategoryId: any
  ) => {
    return category?.filter(
      (child: any) =>
        child.parentCategoryId === parentCategoryId
    );
  };

  const selectedLevelTwo =
    categoryTwo[selectedCategory] || [];

  const selectedLevelThree =
    categoryThree[selectedCategory] || [];

  return (
    <Box
      sx={{
        zIndex: 2,
        width: "100%",
      }}
      className="
        bg-white
        shadow-lg
        h-full
        lg:h-[500px]
        overflow-y-auto
      "
    >
      <div className="flex text-sm flex-wrap">
        {selectedLevelTwo.map(
          (item: any, index: number) => {
            const children = childCategory(
              selectedLevelThree,
              item.categoryId
            );

            return (
              <div
                key={item.categoryId || index}
                className={`
                  p-5
                  sm:p-6
                  lg:p-8
                  w-full
                  sm:w-1/2
                  lg:w-[20%]
                  ${
                    index % 2 === 0
                      ? "bg-slate-50"
                      : "bg-white"
                  }
                `}
              >
                {/* LEVEL TWO CATEGORY */}

                <p
                  className="
                    text-primary-color
                    mb-4
                    lg:mb-5
                    font-semibold
                    text-base
                    lg:text-sm
                  "
                >
                  {item.name}
                </p>

                {/* LEVEL THREE CATEGORIES */}

                <ul className="space-y-3">
                  {children.map(
                    (child: any) => (
                      <li
                        key={child.categoryId}
                        onClick={() =>
                          navigate(
                            `/products/${child.categoryId}`
                          )
                        }
                        className="
                          hover:text-primary-color
                          cursor-pointer
                          transition-colors
                          duration-200
                        "
                      >
                        {child.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            );
          }
        )}
      </div>
    </Box>
  );
};

export default CategorySheet;