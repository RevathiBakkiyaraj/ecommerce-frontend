
import { createAsyncThunk,createSlice, PayloadAction} from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { ApiResponse,DealState,Deal} from "../../types/dealTypes";

const initialState: DealState={
    deals: [],
    loading: false,
    error: null,
    dealCreated:false,
    dealUpdated:false,
};

export const createDeal =createAsyncThunk(
 "deals/createDeal",
    async(deal:any, {rejectWithValue}) => {
        try{
          const response=await api.post("/admin/deals", deal, {
            headers:
            {
                "Content-Type" : "application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`,
            },
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create deal"
      );
    }
  }
);

export const getAllDeals =createAsyncThunk(
 "deals/getAllDeals",
    async(_, {rejectWithValue}) => {
        try{
          const response=await api.get("/admin/deals", {
            headers:
            {
                "Content-Type" : "application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        console.log("get all deal", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
      );
    }
  }
);



export const deleteDeal =createAsyncThunk<ApiResponse,number>(
 "deals/deleteDeal",
    async(id: number, {rejectWithValue}) => {
        try{
          const response=await api.delete(`/admin/deals/${id}`, {
            headers:
            {
                "Content-Type" : "application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`,
            },
        });
      return response.data;
    } catch (error: any) {
        console.log("error ",error.response)
      return rejectWithValue(
        error.response?.data || "Failed to delete deal"
      );
    }
  }
);

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    resetDealState: (state) => {
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })

      .addCase(createDeal.fulfilled, (state, action:PayloadAction<Deal>) => {
        state.loading = false;
        state.dealCreated = true;
        state.deals.push(action.payload);
      })

      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;

        // If API returns deleted deal/id
        const deletedId = action.meta.arg;

        state.deals = state.deals.filter(
          (deal) => deal.id !== deletedId
        );
      })

      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDealState } = dealSlice.actions;

export default dealSlice.reducer;
