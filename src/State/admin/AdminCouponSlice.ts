const API_URL='/api/coupons'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Coupon } from "../../types/couponTypes";

export const createCoupon =createAsyncThunk<
 Coupon,
 {coupon:any; jwt:string},
 {rejectValue:string}
 >("coupon/fcreateCoupon",
    async({coupon,jwt}, {rejectWithValue}) => {
        try{
          const response=await api.post(`${API_URL}/admin/create`, coupon, {
            headers:{Authorization:`Bearer ${jwt}`},
          });
          console.log("created coupon ",response.data)
          return response.data
        } catch(error:any) {
        return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
});