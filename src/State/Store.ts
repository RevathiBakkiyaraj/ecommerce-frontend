import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/cartSlice"
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wislistSlice"
import sellerOrderSlice from "./seller/sellerOrderSlice"
import transactionSlice from "./seller/transactionSlice"
import adminSlice from "./admin/adminSlice"
import customerSlice from "./customer/customerSlice"
import dealSlice from "./admin/DealSlice"
import sellerDashboardReducer from "./seller/sellerDashboardSlice";

const rootReducer = combineReducers({
  seller:sellerSlice,
  sellerProduct:sellerProductSlice,
  product:productSlice,
  auth:authSlice,
  cart:cartSlice,
  order:orderSlice,  
  wishlist:wishlistSlice,
  customer:customerSlice,
  sellerOrder:sellerOrderSlice,
  transactions:transactionSlice,
  admin:adminSlice,
  deal:dealSlice,
  sellerDashboard: sellerDashboardReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;