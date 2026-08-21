import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import {Grid2 } from '@mui/material'

import "tailwindcss/tailwind.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import mainCategory from "../../../data/category/mainCategory";
import menLevelTwo from "../../../data/category/level two/menLevelTwo";
import womenLevelTwo from "../../../data/category/level two/womenLevelTwo";
import furnitureLevelTwo from "../../../data/category/level two/furnitureLevelTwo";
import electronicsLevelTwo from "../../../data/category/level two/electronicsLevelTwo";
import menLevelThree from "../../../data/category/level three/menLevelThree";
import { colors } from "../../../data/Filter/color";
import womenLevelThree from "../../../data/category/level three/womenLevelThree";
import furnitureLevelThree from "../../../data/category/level three/furnitureLevelThree";
import electronicsLevelThree from "../../../data/category/level three/electronicsLevelThree";
import { useState } from "react";
import {useFormik} from "formik";
import { uploadtOCloudinary } from "../../../Util/uploadToCloudinary";
import { createProduct } from "../../../State/seller/sellerProductSlice";
import { useAppDispatch } from "../../../State/Store";



const categoryTwo:{[key:string]: any[]} ={
  men:menLevelTwo,
  women:womenLevelTwo,
  kids:[],
  home_furniture:furnitureLevelTwo,
  beauty:[],
  electronics:electronicsLevelTwo,
};


const categoryThree:{[key:string]: any[]} ={
  men:menLevelThree,
  women:womenLevelThree,
  kids:[],
  home_furniture:furnitureLevelThree,
  beauty:[],
  electronics:electronicsLevelThree,
};

const AddProductForm=() => {
  const [uploadImage,setUploadingImage] =useState(false);

  const [snackbarOpen,setOpenSnackbar] =useState(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const dispatch = useAppDispatch();

  const formik = useFormik({
  initialValues: {
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    quantity: "",
    color: "",
    images: [],
    category: "",
    category2: "",
    category3: "",
    sizes: "",
  },

  onSubmit: (values) => {
    console.log(values);
    dispatch(createProduct({request:values,jwt:localStorage.getItem("jwt")}))
  },
});

const handleImageChange = async (event: any) => {
  const file = event.target.files[0];
  setUploadingImage(true);
  const image=await uploadtOCloudinary(file);
  formik.setFieldValue("images",[...formik.values.images, image]);
  setUploadingImage(false);
}

const handleRemoveImage=(index:number) =>{
  const updatedImages=[...formik.values.images];
  updatedImages.splice(index, 1);
  formik.setFieldValue("images",updatedImages);
};

const childCategory=(category:any,parentCategoryId:any)=>{
  return category.filter((child:any)=>{
    return child.parentCategoryId == parentCategoryId;
  });
};


const handleCloseSnackbar = ()=> {
  setOpenSnackbar(false);
}

return (
  <div>
    <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
    <Grid2 container spacing={2}>
      <Grid2 className="flex flex-wrap gap-5" size={{xs:12}}>
        <input 
          type="file"
          accept="image/*"
          id="fileInput"
          style={{display:"none"}}
          onChange={handleImageChange}
          />

          <label className="relative" htmlFor="fileInput">
            <span className="w-32  h-32 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
              <AddPhotoAlternateIcon className="text-gray-700"/>
            </span>
            {uploadImage && (
              <div className="absolute left-0 right-0 top-0 bottom-0 w-32 h-32 flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
          </label>

          <div className="flex flex-wrap gap-2">
            {formik.values.images.map((image,index) => (
              <div className="relative" >
                <img 
                className="w-24 h-24 object-cover"
                src={image}
                key={index}
                alt={`ProductImage ${index +1}`}
                />
                <IconButton
                onClick={()=> handleRemoveImage(index)}
                className=""
                size="small"
                color="error"
                sx={{
                  position:"absolute",
                  top:0,
                  right:0,
                  outline:"none",

                }}
                >
                  <CloseIcon sx={{ fontSize:"1rem"}} />
                </IconButton>
                </div>

            ))}

          </div>


      </Grid2>
      <Grid2 size={{xs:12}}>
        <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        required/>
      </Grid2>
      <Grid2 size={{xs:12}}>
        <TextField
        multiline
        rows={4}
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        required/>
      </Grid2>
      <Grid2 size={{xs:12,md:4, lg:3}}>
        <TextField
        fullWidth
        id="mrpPrice"
        name="mrpPrice"
        label="MRP Price"
        value={formik.values.mrpPrice}
        onChange={formik.handleChange}
        error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
        helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
        required/>
      </Grid2>
      <Grid2 size={{xs:12,md:4, lg:3}}>
        <TextField
        fullWidth
        id="sellingPrice"
        name="sellingPrice"
        label="Selling Price"
        value={formik.values.sellingPrice}
        onChange={formik.handleChange}
        error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
        helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
        required/>
      </Grid2>

      <Grid2 size={{xs:12, md:4, lg:3}}>
        <FormControl
        fullWidth
        error={formik.touched.color && Boolean(formik.errors.color)}
        required>
          <InputLabel id="color-label">Color</InputLabel>
          <Select
          labelId="color-label"
          id="color"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          label="Color"
          >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {colors.map((color, index) => <MenuItem value={color.name}>
            <div className="flex gap-3">
              <span style={{backgroundColor:color.hex}} className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}>
              </span>
              <p>{color.name}</p>
              </div>
              </MenuItem>)}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
  <FormControl
    fullWidth
    error={formik.touched.sizes && Boolean(formik.errors.sizes)}
    required
  >
    <InputLabel>Size</InputLabel>

    <Select
      id="sizes"
      name="sizes"
      value={formik.values.sizes}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Sizes"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {sizes.map((size, index) => (
        <MenuItem key={index} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>

    {formik.touched.sizes && formik.errors.sizes && (
      <FormHelperText>
        {formik.errors.sizes}
      </FormHelperText>
    )}
  </FormControl>
</Grid2>

<Grid2 size={{ xs: 12, md: 4, lg: 4}}>
  <FormControl
    fullWidth
    error={
      formik.touched.category &&
      Boolean(formik.errors.category)
    }
    required
  >
    <InputLabel>Category</InputLabel>

    <Select
      id="category"
      name="category"
      value={formik.values.category}
      onChange={(e) => {
        formik.handleChange(e);

        // Reset dependent categories
        formik.setFieldValue("category2", "");
        formik.setFieldValue("category3", "");
      }}
      onBlur={formik.handleBlur}
      label="Category"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {mainCategory.map((category, index) => (
        <MenuItem
          key={index}
          value={category.categoryId}
        >
          {category.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid2>

<Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
  <FormControl
    fullWidth
    error={
      formik.touched.category2 &&
      Boolean(formik.errors.category2)
    }
    required
  >
    <InputLabel>Second Category</InputLabel>

    <Select
      id="category2"
      name="category2"
      value={formik.values.category2}
      onChange={(e) => {
        formik.handleChange(e);

        // Reset third category
        formik.setFieldValue("category3", "");
      }}
      onBlur={formik.handleBlur}
      label="Second Category"
      disabled={!formik.values.category}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {(categoryTwo[formik.values.category] || []).map(
        (category: any, index: number) => (
          <MenuItem
            key={index}
            value={category.categoryId}
          >
            {category.name}
          </MenuItem>
        )
      )}
    </Select>
  </FormControl>
</Grid2>

<Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
  <FormControl
    fullWidth
    error={
      formik.touched.category3 &&
      Boolean(formik.errors.category3)
    }
    required
  >
    <InputLabel>Third Category</InputLabel>

    <Select
      id="category3"
      name="category3"
      value={formik.values.category3}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label="Third Category"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>

      {(categoryThree[formik.values.category] || [])
        .filter(
          (category: any) =>
            category.parentCategoryId ===
            formik.values.category2
        )
        .map(
          (category: any, index: number) => (
            <MenuItem
              key={index}
              value={category.categoryId}
            >
              {category.name}
            </MenuItem>
          )
        )}
    </Select>
  </FormControl>
</Grid2>

<Grid2 size={{ xs: 12 }}>
  <Button
    type="submit"
    variant="contained"
    size="large"
    fullWidth
    disabled={uploadImage}
  >
    Add Product
  </Button>
</Grid2>


  
      
</Grid2>

    </form>

  </div>
  );
};

export default AddProductForm;
