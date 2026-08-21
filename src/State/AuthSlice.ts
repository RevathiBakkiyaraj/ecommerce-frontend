import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User,Address } from "../types/userTypes";

export const sendLoginSignupOtp=createAsyncThunk("/auth/sendLoginSignupOtp",
    async({email} : {email:string}, {rejectWithValue}) => {
        try{
          const response=await api.post("/auth/sent/login-signup-otp",{email})
          console.log("login otp ",response)
        } catch(error) {
            console.log("error - - -",error);
        }
        
    }
)

export const signin=createAsyncThunk<any,any>("/auth/signin",
    async(loginRequest, {rejectWithValue}) => {
        try{
          const response=await api.post("/auth/signing",loginRequest)
          console.log("login otp ",response.data)
          localStorage.setItem("jwt",response.data.jwt)
          return response.data.jwt;
        } catch(error) {
            console.log("error - - -",error);
        }
        
    }
)

export const signup=createAsyncThunk<any,any>("/auth/signup",
    async(signupRequest, {rejectWithValue}) => {
        try{
          const response=await api.post("/auth/signup",signupRequest)
          console.log("login otp ",response.data)
          localStorage.setItem("jwt",response.data.jwt)
          return response.data.jwt;
        } catch(error) {
            console.log("error - - -",error);
        }
        
    }
)

export const fetchUserProfile=createAsyncThunk<any,any>("/auth/fetchUserProfile",
    async({jwt}, {rejectWithValue}) => {
        try{
          const response=await api.get("/api/users/profile",{
            headers:{
                Authorization: `Bearer ${jwt}`,
            },
          })
          console.log("user profile ",response.data)
          return response.data;
        } catch(error) {
            console.log("error - - -",error);
        }
        
    }
)

export const logout=createAsyncThunk<any,any>("/auth/logout",
    async(navigate,{rejectWithValue})=>{
        try{
            localStorage.clear()
            console.log("logout success")
            navigate("/")
            
        } catch (error){
            console.log("error - - -", error);
        }
    }
)

export const addAddress = createAsyncThunk<any, {address: Address, jwt: string}>(
    "/auth/addAddress",
    async ({ address, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/api/users/address",
                address,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            );

            return response.data;

        } catch (error: any) {
            console.log("add address error", error.response);
            return rejectWithValue("Failed to add address");
        }
    }
);

interface AuthState{
    jwt:string | null,
    otpSent:boolean,
    isLoggedIn:boolean,
    user: User|null,
    loading:boolean
}
const initialState: AuthState = {
    jwt: localStorage.getItem("jwt"),
    otpSent: false,
    isLoggedIn: !!localStorage.getItem("jwt"),
    user: null,
    loading: false
};
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(sendLoginSignupOtp.pending,(state)=>{
            state.loading=true;
        })

          builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
            state.loading=false;
            state.otpSent=true;
        })
        
        builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
            state.loading=false;
        })
        
        builder.addCase(signin.fulfilled,(state,action)=>{
            state.jwt=action.payload;
            state.isLoggedIn=true
        })
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.jwt=action.payload;
            state.isLoggedIn=true
        })

         builder.addCase(fetchUserProfile.fulfilled,(state,action)=>{
            state.user=action.payload;
            state.isLoggedIn=true
        })

        builder.addCase(logout.fulfilled,(state)=>{
            state.jwt=null
            state.isLoggedIn=false
            state.user=null
        })
        builder.addCase(addAddress.fulfilled, (state, action) => {
        state.user = action.payload;
       });

    }
})

export default authSlice.reducer;