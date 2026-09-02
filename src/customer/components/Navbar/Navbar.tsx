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

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategorySheet(true);
  };

  return (
    <>
      {/* NAVBAR */}
      <Box
        className="sticky top-0 left-0 right-0 bg-white"
        sx={{ zIndex: 1100 }}
      >
        <div
          className="
            flex items-center justify-between
            px-2 sm:px-5 lg:px-20
            h-[60px] sm:h-[70px]
            border-b
          "
        >
          {/* LEFT SECTION */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* MOBILE MENU */}
            {!isLarge && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                size="small"
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* LOGO */}
            <h1
              onClick={() => navigate("/")}
              className="
                logo cursor-pointer
                text-base sm:text-lg md:text-2xl
                text-primary-color
                whitespace-nowrap
              "
            >
              Rev Bazaar
            </h1>

            {/* DESKTOP CATEGORIES */}
            {isLarge && (
              <ul className="flex items-center font-medium text-gray-800 ml-4">
                {mainCategory.map((item) => (
                  <li
                    key={item.categoryId}
                    onMouseLeave={() => setShowCategorySheet(false)}
                    onMouseEnter={() => {
                      setShowCategorySheet(true);
                      setSelectedCategory(item.categoryId);
                    }}
                    className="
                      mainCategory
                      hover:text-primary-color
                      hover:border-b-2
                      h-[70px]
                      px-4
                      border-primary-color
                      flex items-center
                      cursor-pointer
                    "
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-0 sm:gap-2 lg:gap-4">

            {/* SEARCH */}
            <IconButton
              onClick={() => navigate("/search")}
            >
              <SearchIcon />
            </IconButton>

            {/* ACCOUNT */}
            {auth.user ? (
              <Button
                onClick={() => navigate("/account/orders")}
                className="flex items-center gap-1"
                sx={{
                  minWidth: "auto",
                  padding: { xs: "4px", sm: "6px 10px" },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                  }}
                  src="https://media.istockphoto.com/id/1094918638/photo/beat-the-deadline-with-technology.jpg?s=2048x2048&w=is&k=20&c=s9Uvd_8ZiEzpckpPvxlzmwsYTTYHi492MMLUWw6Twc0="
                />

                <span className="font-semibold hidden lg:block">
                  {auth.user?.fullName}
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                size="small"
              >
                Login
              </Button>
            )}

            {/* WISHLIST */}
            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorder
                sx={{
                  fontSize: { xs: 24, sm: 29 },
                }}
              />
            </IconButton>

            {/* CART */}
            <IconButton onClick={() => navigate("/cart")}>
              <AddShoppingCart
                sx={{
                  fontSize: { xs: 24, sm: 29 },
                }}
              />
            </IconButton>

            {/* SELLER */}
            {isLarge && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<Storefront />}
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>

        {/* DESKTOP CATEGORY SHEET */}
        {isLarge && showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
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
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{
            width: { xs: 280, sm: 320 },
            padding: 2,
          }}
        >
          <h2 className="text-xl font-semibold mb-4">
            Categories
          </h2>

          {mainCategory.map((item) => (
            <div
              key={item.categoryId}
              onClick={() => {
                handleCategoryClick(item.categoryId);
                setMobileMenuOpen(false);
              }}
              className="
                py-3
                px-2
                border-b
                cursor-pointer
                hover:text-primary-color
              "
            >
              {item.name}
            </div>
          ))}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Storefront />}
            sx={{ mt: 3 }}
            onClick={() => {
              navigate("/become-seller");
              setMobileMenuOpen(false);
            }}
          >
            Become Seller
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;