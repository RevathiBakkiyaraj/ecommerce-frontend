import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  AddShoppingCart,
  FavoriteBorder,
  Storefront,
} from "@mui/icons-material";

import CategorySheet from "./CategorySheet";
import mainCategory from "../../../data/category/mainCategory";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../State/Store";

const Navbar = () => {
  const theme = useTheme();

  const isLarge = useMediaQuery(
    theme.breakpoints.up("lg")
  );

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [selectedCategory, setSelectedCategory] =
    useState("men");

  const [showCategorySheet, setShowCategorySheet] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [
    mobileSelectedCategory,
    setMobileSelectedCategory,
  ] = useState<string | null>(null);

  const navigate = useNavigate();

  const { auth } = useAppSelector(
    (store) => store
  );

  // ==========================================
  // DESKTOP CATEGORY
  // ==========================================

  const handleCategoryClick = (
    categoryId: string
  ) => {
    setSelectedCategory(categoryId);
    setShowCategorySheet(true);
  };

  // ==========================================
  // MOBILE CATEGORY
  // ==========================================

  const handleMobileCategoryClick = (
    categoryId: string
  ) => {
    setMobileSelectedCategory(categoryId);
    setMobileMenuOpen(true);
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSelectedCategory(null);
  };

  return (
    <>
      {/* ====================================== */}
      {/* MAIN NAVBAR */}
      {/* ====================================== */}

      <Box
        className="
          sticky
          top-0
          left-0
          right-0
          bg-white
        "
        sx={{
          zIndex: 1100,
        }}
      >
        {/* ==================================== */}
        {/* NAVBAR TOP ROW */}
        {/* ==================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            px-2
            sm:px-5
            lg:px-20
            h-[60px]
            sm:h-[70px]
            border-b
          "
        >
          {/* ================================== */}
          {/* LEFT SECTION */}
          {/* ================================== */}

          <div
            className="
              flex
              items-center
              gap-1
              sm:gap-2
            "
          >
            {/* MOBILE MENU */}

            {!isLarge && (
              <IconButton
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                size="small"
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* LOGO */}

            <h1
              onClick={() => navigate("/")}
              className="
                logo
                cursor-pointer
                text-base
                sm:text-lg
                md:text-2xl
                text-primary-color
                whitespace-nowrap
              "
            >
              Rev Bazaar
            </h1>

            {/* ================================= */}
            {/* DESKTOP CATEGORIES */}
            {/* ================================= */}

            {isLarge && (
              <ul
                className="
                  flex
                  items-center
                  font-medium
                  text-gray-800
                  ml-4
                "
              >
                {mainCategory.map(
                  (item) => (
                    <li
                      key={item.categoryId}
                      onMouseLeave={() =>
                        setShowCategorySheet(
                          false
                        )
                      }
                      onMouseEnter={() => {
                        handleCategoryClick(
                          item.categoryId
                        );
                      }}
                      className="
                        mainCategory
                        hover:text-primary-color
                        hover:border-b-2
                        h-[70px]
                        px-4
                        border-primary-color
                        flex
                        items-center
                        cursor-pointer
                      "
                    >
                      {item.name}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* ================================== */}
          {/* RIGHT SECTION */}
          {/* ================================== */}

          <div
            className="
              flex
              items-center
              gap-0
              sm:gap-2
              lg:gap-4
            "
          >
            {/* SEARCH */}

            <IconButton
              onClick={() =>
                navigate("/search")
              }
            >
              <SearchIcon />
            </IconButton>

            {/* ACCOUNT */}

            {auth.user ? (
              <Button
                onClick={() =>
                  navigate(
                    "/account/orders"
                  )
                }
                className="
                  flex
                  items-center
                  gap-1
                "
                sx={{
                  minWidth: "auto",
                  padding: {
                    xs: "4px",
                    sm: "6px 10px",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: {
                      xs: 28,
                      sm: 32,
                    },
                    height: {
                      xs: 28,
                      sm: 32,
                    },
                  }}
                  src="https://media.istockphoto.com/id/1094918638/photo/beat-the-deadline-with-technology.jpg?s=2048x2048&w=is&k=20&c=s9Uvd_8ZiEzpckpPvxlzmwsYTTYHi492MMLUWw6Twc0="
                />

                <span
                  className="
                    font-semibold
                    hidden
                    lg:block
                  "
                >
                  {auth.user?.fullName}
                </span>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  navigate("/login")
                }
                variant="contained"
                size="small"
              >
                Login
              </Button>
            )}

            {/* WISHLIST */}

            <IconButton
              onClick={() =>
                navigate("/wishlist")
              }
            >
              <FavoriteBorder
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 29,
                  },
                }}
              />
            </IconButton>

            {/* CART */}

            <IconButton
              onClick={() =>
                navigate("/cart")
              }
            >
              <AddShoppingCart
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 29,
                  },
                }}
              />
            </IconButton>

            {/* SELLER */}

            {isLarge && (
              <Button
                onClick={() =>
                  navigate(
                    "/become-seller"
                  )
                }
                startIcon={
                  <Storefront />
                }
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>

        {/* ====================================== */}
        {/* MOBILE HORIZONTAL CATEGORY BAR */}
        {/* ====================================== */}

        {!isLarge && (
          <div
            className="
              flex
              items-center
              gap-6
              px-4
              py-3
              border-b
              bg-white
              overflow-x-auto
              whitespace-nowrap
              scrollbar-hide
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {mainCategory.map(
              (item) => (
                <button
                  key={item.categoryId}
                  onClick={() =>
                    handleMobileCategoryClick(
                      item.categoryId
                    )
                  }
                  className="
                    flex-shrink-0
                    text-sm
                    sm:text-base
                    font-medium
                    text-gray-700
                    hover:text-primary-color
                    active:text-primary-color
                    cursor-pointer
                  "
                >
                  {item.name}
                </button>
              )
            )}
          </div>
        )}

        {/* ====================================== */}
        {/* DESKTOP CATEGORY SHEET */}
        {/* ====================================== */}

        {isLarge &&
          showCategorySheet && (
            <div
              onMouseLeave={() =>
                setShowCategorySheet(
                  false
                )
              }
              onMouseEnter={() =>
                setShowCategorySheet(
                  true
                )
              }
              className="
                categorySheet
                absolute
                top-[4.41rem]
                left-20
                right-20
                border
                bg-white
              "
            >
              <CategorySheet
                selectedCategory={
                  selectedCategory
                }
              />
            </div>
          )}
      </Box>

      {/* ====================================== */}
      {/* MOBILE DRAWER */}
      {/* ====================================== */}

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      >
        <Box
          sx={{
            width: {
              xs: 300,
              sm: 360,
            },
            height: "100%",
          }}
          className="bg-white"
        >
          {/* ================================= */}
          {/* MAIN CATEGORY LIST */}
          {/* ================================= */}

          {!mobileSelectedCategory ? (
            <>
              {/* HEADER */}

              <div
                className="
                  p-4
                  border-b
                  flex
                  items-center
                  justify-between
                "
              >
                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Categories
                </h2>

                <button
                  onClick={closeMobileMenu}
                  className="
                    text-gray-500
                    text-2xl
                    px-2
                  "
                >
                  ×
                </button>
              </div>

              {/* CATEGORY LIST */}

              <div>
                {mainCategory.map(
                  (item) => (
                    <div
                      key={
                        item.categoryId
                      }
                      onClick={() =>
                        handleMobileCategoryClick(
                          item.categoryId
                        )
                      }
                      className="
                        py-4
                        px-5
                        border-b
                        cursor-pointer
                        flex
                        justify-between
                        items-center
                        hover:text-primary-color
                        transition-colors
                        duration-200
                      "
                    >
                      <span>
                        {item.name}
                      </span>

                      <span
                        className="
                          text-xl
                          text-gray-500
                        "
                      >
                        ›
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* BECOME SELLER */}

              <div className="p-4">
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <Storefront />
                  }
                  onClick={() => {
                    navigate(
                      "/become-seller"
                    );
                    closeMobileMenu();
                  }}
                >
                  Become Seller
                </Button>
              </div>
            </>
          ) : (
            /* ================================= */
            /* SELECTED CATEGORY */
            /* ================================= */

            <>
              {/* BACK BUTTON */}

              <div
                onClick={() =>
                  setMobileSelectedCategory(
                    null
                  )
                }
                className="
                  p-4
                  border-b
                  cursor-pointer
                  font-semibold
                  flex
                  items-center
                  gap-3
                  hover:bg-gray-50
                "
              >
                <span className="text-xl">
                  ←
                </span>

                <span>
                  Categories
                </span>
              </div>

              {/* CATEGORY CONTENT */}

              <div
                className="
                  h-[calc(100%-57px)]
                  overflow-y-auto
                "
              >
                <CategorySheet
                  selectedCategory={
                    mobileSelectedCategory
                  }
                />
              </div>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;