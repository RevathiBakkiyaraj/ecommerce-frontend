import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "../ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import Storefront from "@mui/icons-material/Storefront";

function Home() {
  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-16 relative pb-10 lg:pb-20">

      {/* Electric Categories */}
      <ElectricCategory />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Today's Deal */}
      <section className="pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-6 lg:px-0">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary-color pb-5 sm:pb-7 lg:pb-10 text-center">
          TODAY'S DEAL
        </h1>

        <Deal />
      </section>

      {/* Shop By Category */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-0">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-primary-color pb-5 sm:pb-7 lg:pb-10 text-center">
          SHOP BY CATEGORY
        </h1>

        <ShopByCategory />
      </section>

      {/* Become Seller */}
      <section
        className="
          relative
          mx-4
          sm:mx-6
          lg:mx-20
          h-[220px]
          sm:h-[280px]
          md:h-[350px]
          lg:h-[450px]
          overflow-hidden
        "
      >
        <img
          className="w-full h-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetwW9FN-UZtQpoy4y3So3y_Toy6UMBFINTTPG_vV6Iw&s=10"
          alt="Advertisement"
        />

        {/* Overlay Content */}
        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-4
            sm:px-6
            lg:items-end
            lg:text-left
            lg:justify-center
            lg:pr-16
            xl:pr-32
          "
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Sell your Product
          </h1>

          <p className="text-base sm:text-lg md:text-2xl mt-2">
            With <span className="logo">Rev Bazaar</span>
          </p>

          <div className="mt-4 sm:mt-6">
            <Button
              startIcon={<Storefront />}
              variant="contained"
              size="large"
            >
              Become Seller
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;