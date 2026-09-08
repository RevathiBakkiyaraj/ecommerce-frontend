import React from "react";
import DealCard from "./DealCard";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useAppSelector } from "../../../../State/Store";

const Deal = () => {
  const { customer } = useAppSelector((store) => store);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="
        w-full
        py-5
        px-4
        sm:px-6
        md:px-10
        lg:px-20
      "
    >
      <Slider {...settings}>
        {customer.homePageData?.deals
          ?.slice(0, 6)
          .map((item) => (
            <div
              key={item.id}
              className="px-2 sm:px-3"
            >
              <DealCard item={item} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Deal;