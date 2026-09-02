import React, { useEffect, useState } from "react";

import FilterSelection from "./FilterSelection";
import ProductCard from "./ProductCard";

import {
  Divider,
  IconButton,
  Pagination,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Button,
} from "@mui/material";

import { FilterAlt } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../State/Store";

import { fetchAllProducts } from "../../../State/customer/ProductSlice";

import { useParams, useSearchParams } from "react-router-dom";

import menLevelThree from "../../../data/category/level three/menLevelThree";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import electronicsLevelThree from "../../../data/category/level three/electronicsLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";


const Product = () => {

  // ==========================================
  // RESPONSIVE
  // ==========================================

  const theme = useTheme();

  const isLarge = useMediaQuery(
    theme.breakpoints.up("lg")
  );

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );


  // ==========================================
  // STATE
  // ==========================================

  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const [filterOpen, setFilterOpen] = useState(false);


  // ==========================================
  // REDUX
  // ==========================================

  const dispatch = useAppDispatch();

  const { product } = useAppSelector(
    (store) => store
  );


  // ==========================================
  // URL PARAMETERS
  // ==========================================

  const [searchParams] = useSearchParams();

  const { category } = useParams();


  // ==========================================
  // CATEGORIES
  // ==========================================

  const allCategories = [
    ...menLevelThree,
    ...womenLevelThree,
    ...electronicsLevelThree,
    ...furnitureLevelThree,
  ];


  const selectedCategory = allCategories.find(
    (item) => item.categoryId === category
  );


  // ==========================================
  // SORT
  // ==========================================

  const handleSortChange = (
    event: any
  ) => {

    setSort(event.target.value);

  };


  // ==========================================
  // PAGINATION
  // ==========================================

  const handlePageChange = (
    value: number
  ) => {

    setPage(value);

  };


  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {

    const [
      minPrice,
      maxPrice,
    ] =
      searchParams
        .get("price")
        ?.split("-") || [];


    const color =
      searchParams.get("color");


    const minDiscount =
      searchParams.get("discount")
        ? Number(
            searchParams.get("discount")
          )
        : undefined;


    const pageNumber = page - 1;


    const newFilter = {

      category: category || "",

      color: color || "",

      minPrice: minPrice
        ? Number(minPrice)
        : undefined,

      maxPrice: maxPrice
        ? Number(maxPrice)
        : undefined,

      minDiscount,

      pageNumber,

    };


    dispatch(
      fetchAllProducts(newFilter)
    );

  }, [
    category,
    searchParams,
    page,
    dispatch,
  ]);


  // ==========================================
  // RESET PAGE WHEN CATEGORY CHANGES
  // ==========================================

  useEffect(() => {

    setPage(1);

  }, [category]);


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="mt-6 sm:mt-8 lg:mt-10">

      {/* =====================================
          CATEGORY TITLE
      ====================================== */}

      <div className="px-4 sm:px-6 lg:px-10">

        <h1
          className="
            text-xl
            sm:text-2xl
            md:text-3xl
            text-center
            font-bold
            text-gray-700
            pb-4
            sm:pb-5
            uppercase
            truncate
          "
        >
          {selectedCategory?.name || "Products"}
        </h1>

      </div>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div className="flex w-full">


        {/* =================================
            DESKTOP FILTER
        ================================== */}

        {isLarge && (

          <section
            className="
              hidden
              lg:block
              w-[20%]
              min-w-[220px]
              px-4
            "
          >

            <FilterSelection />

          </section>

        )}


        {/* =================================
            PRODUCTS AREA
        ================================== */}

        <div
          className="
            w-full
            lg:w-[80%]
            space-y-4
            sm:space-y-5
          "
        >


          {/* =================================
              FILTER + SORT BAR
          ================================== */}

          <div
            className="
              flex
              justify-between
              items-center
              px-3
              sm:px-5
              lg:px-9
              min-h-[48px]
              gap-2
            "
          >


            {/* MOBILE FILTER BUTTON */}

            {!isLarge && (

              <Button
                variant="outlined"
                startIcon={<FilterAlt />}
                onClick={() =>
                  setFilterOpen(true)
                }
                size={isMobile ? "small" : "medium"}
              >
                Filter
              </Button>

            )}


            {/* SORT */}

            <FormControl
              size="small"
              sx={{
                width: {
                  xs: 150,
                  sm: 200,
                },

                ml: "auto",
              }}
            >

              <InputLabel id="sort-label">
                Sort
              </InputLabel>

              <Select
                labelId="sort-label"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >

                <MenuItem value="">
                  Default
                </MenuItem>

                <MenuItem value="price_low">
                  Price: Low - High
                </MenuItem>

                <MenuItem value="price_high">
                  Price: High - Low
                </MenuItem>

              </Select>

            </FormControl>


          </div>


          <Divider />


          {/* =================================
              PRODUCT GRID
          ================================== */}

          <section
            className="
              products_section

              grid

              grid-cols-2

              sm:grid-cols-2

              md:grid-cols-3

              lg:grid-cols-4

              gap-x-2
              sm:gap-x-4
              md:gap-x-5

              gap-y-6
              sm:gap-y-8

              px-2
              sm:px-4
              md:px-5

              w-full
            "
          >

            {product.products.map(
              (item) => (

                <ProductCard
                  key={item.id}
                  item={item}
                />

              )
            )}

          </section>


          {/* =================================
              PAGINATION
          ================================== */}

          <div
            className="
              flex
              justify-center
              py-6
              sm:py-8
              lg:py-10
              px-2
              overflow-x-auto
            "
          >

            <Pagination
              page={page}
              onChange={(e, value) =>
                handlePageChange(value)
              }
              count={10}
              variant="outlined"
              color="primary"
              size={
                isMobile
                  ? "small"
                  : "medium"
              }
            />

          </div>


        </div>

      </div>


      {/* =====================================
          MOBILE FILTER DRAWER
      ====================================== */}

      <Drawer
        anchor="left"
        open={filterOpen}
        onClose={() =>
          setFilterOpen(false)
        }
      >

        <div
          className="
            w-[280px]
            sm:w-[320px]
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
              items-center
              mb-4
            "
          >

            <h2 className="text-xl font-semibold">
              Filters
            </h2>

            <Button
              onClick={() =>
                setFilterOpen(false)
              }
            >
              Close
            </Button>

          </div>


          <FilterSelection />

        </div>

      </Drawer>

    </div>

  );
};


export default Product;
