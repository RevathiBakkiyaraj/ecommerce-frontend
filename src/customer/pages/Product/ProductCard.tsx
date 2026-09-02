import React, { useEffect, useState } from "react";
import "./ProductCard.css";

import {
  Favorite,
  ModeComment,
} from "@mui/icons-material";

import {
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { teal } from "@mui/material/colors";

import { Product } from "../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { addProductToWishlist } from "../../../State/customer/wislistSlice";


const ProductCard = ({ item }: { item: Product }) => {

  // --------------------------------------------------
  // STATES
  // --------------------------------------------------

  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // --------------------------------------------------
  // RESPONSIVE
  // --------------------------------------------------

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  // --------------------------------------------------
  // NAVIGATION / REDUX
  // --------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // --------------------------------------------------
  // IMAGE SLIDER
  // --------------------------------------------------

  useEffect(() => {

    let interval: ReturnType<typeof setInterval> | undefined;

    // Only start slider when:
    // 1. Card is hovered
    // 2. Product has more than one image

    if (
      isHovered &&
      item.images &&
      item.images.length > 1
    ) {
      interval = setInterval(() => {

        setCurrentImage((prevImage) => (
          (prevImage + 1) % item.images.length
        ));

      }, 1000);
    }

    return () => {

      if (interval) {
        clearInterval(interval);
      }

    };

  }, [isHovered, item.images]);

  // --------------------------------------------------
  // WISHLIST
  // --------------------------------------------------

  const handleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {

    // Prevent product card navigation
    event.stopPropagation();

    if (item.id) {
      dispatch(
        addProductToWishlist({
          productId: item.id,
        })
      );
    }
  };

  // --------------------------------------------------
  // PRODUCT DETAILS NAVIGATION
  // --------------------------------------------------

  const handleProductClick = () => {

    navigate(
      `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
    );

  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (

    <div
      onClick={handleProductClick}
      className="
        group
        relative
        w-full
        px-1
        sm:px-2
        md:px-3
        lg:px-4
        cursor-pointer
      "
    >

      {/* ================================
          PRODUCT IMAGE
      ================================= */}

      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* PRODUCT IMAGES */}

        {item.images?.map((image, index) => (

          <img
            key={index}
            className="card-media"
            src={image}
            alt={item.title}
            style={{
              transform: `
                translateX(
                  ${(index - currentImage) * 100}%
                )
              `,
            }}
          />

        ))}


        {/* ================================
            ACTION BUTTONS
        ================================= */}

        {/* 
          Desktop:
          Buttons appear on hover.

          Mobile:
          Buttons are always visible because
          mobile devices don't have hover.
        */}

        {(isHovered || isMobile) && (

          <div className="indicator">

            <div className="flex gap-2 sm:gap-3">

              {/* WISHLIST */}

              <Button
                onClick={handleWishlist}
                variant="contained"
                color="secondary"
                sx={{
                  minWidth: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  width: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  height: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  padding: 0,

                  borderRadius: "50%",
                }}
              >

                <Favorite
                  sx={{
                    fontSize: {
                      xs: 19,
                      sm: 21,
                      md: 24,
                    },

                    color: teal[500],
                  }}
                />

              </Button>


              {/* COMMENT */}

              <Button
                onClick={(event) => {
                  event.stopPropagation();
                }}
                variant="contained"
                color="secondary"
                sx={{
                  minWidth: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  width: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  height: {
                    xs: 38,
                    sm: 42,
                    md: 45,
                  },

                  padding: 0,

                  borderRadius: "50%",
                }}
              >

                <ModeComment
                  sx={{
                    fontSize: {
                      xs: 19,
                      sm: 21,
                      md: 24,
                    },

                    color: teal[500],
                  }}
                />

              </Button>

            </div>

          </div>

        )}

      </div>


      {/* ================================
          PRODUCT DETAILS
      ================================= */}

      <div
        className="
          details
          pt-2
          sm:pt-3
          space-y-1
          rounded-md
        "
      >

        {/* SELLER NAME + PRODUCT NAME */}

        <div className="name">

          <h1
            className="
              text-xs
              sm:text-sm
              md:text-base
              font-medium
              truncate
            "
          >
            {item.seller?.businessDetails?.businessName}
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              md:text-base
              text-gray-700
              truncate
            "
          >
            {item.title}
          </p>

        </div>


        {/* ================================
            PRICE
        ================================= */}

        <div
          className="
            price
            flex
            flex-wrap
            items-center
            gap-1
            sm:gap-2
            md:gap-3
          "
        >

          {/* SELLING PRICE */}

          <span
            className="
              font-semibold
              text-gray-800
              text-sm
              sm:text-base
              md:text-lg
            "
          >
            ₹ {item.sellingPrice}
          </span>


          {/* MRP */}

          <span
            className="
              text-gray-400
              text-xs
              sm:text-sm
              md:text-base
              line-through
            "
          >
            ₹ {item.mrpPrice}
          </span>


          {/* DISCOUNT */}

          <span
            className="
              text-primary-color
              font-semibold
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            {item.discountPercent}
          </span>

        </div>

      </div>

    </div>

  );
};


export default ProductCard;

