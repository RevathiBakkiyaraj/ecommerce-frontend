import axios from "axios"


const api="https://ecommerce-multivendor-backend-l1dz.onrender.com/products"
export const fetchProducts=async()=> {
    try{
        const response=await axios.get(api)
        console.log("response ",response)

    }
    catch (error ){
        console.error(error)
    }
}