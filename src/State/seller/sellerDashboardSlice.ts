import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://ecommerce-multivendor-backend-l1dz.onrender.com/api/seller/dashboard";

export interface SalesData {
    day: string;
    sales: number;
}

export interface LowStockProduct {
    id: number;
    name: string;
    stock: number;
}

export interface RecentOrder {
    id: number;
    customer: string;
    amount: number;
    status: string;
}

export interface TopSellingProduct {
    id: number;
    name: string;
    unitsSold: number;
    revenue: number;
}

export interface SellerDashboard {
    totalSales: number;
    totalOrders: number;
    totalProducts: number;
    earnings: number;

    salesOverview: SalesData[];
    lowStockProducts: LowStockProduct[];
    recentOrders: RecentOrder[];
    topSellingProducts: TopSellingProduct[];
}

interface SellerDashboardState {
    data: SellerDashboard | null;
    loading: boolean;
    error: string | null;
}

const initialState: SellerDashboardState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchSellerDashboard = createAsyncThunk<
    SellerDashboard,
    string,
    { rejectValue: string }
>(
    "sellerDashboard/fetchSellerDashboard",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await axios.get<SellerDashboard>(
                API_URL,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            return response.data;

        } catch (error: any) {

            console.error(
                "Seller dashboard error:",
                error.response?.data || error.message
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch seller dashboard"
            );
        }
    }
);

const sellerDashboardSlice = createSlice({
    name: "sellerDashboard",

    initialState,

    reducers: {
        clearSellerDashboard: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder

            .addCase(
                fetchSellerDashboard.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchSellerDashboard.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                    state.error = null;
                }
            )

            .addCase(
                fetchSellerDashboard.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload ||
                        "Unable to load seller dashboard";
                }
            );
    },
});

export const {
    clearSellerDashboard,
} = sellerDashboardSlice.actions;

export default sellerDashboardSlice.reducer;