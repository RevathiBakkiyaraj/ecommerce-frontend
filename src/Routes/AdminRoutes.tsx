
import React from 'react'
import { Routes , Route} from 'react-router-dom'
import SellersTable from '../component/Pages/Sellers/SellersTable'
import Coupon from '../component/Pages/Coupon/Coupon'
import AddNewCouponForm from '../component/Pages/Coupon/AddNewCouponForm'
import GridTable from '../component/Pages/HomePage/GridTable'
import ElectronicTable from '../component/Pages/HomePage/ElectronicTable'
import ShopByCategoryTable from '../component/Pages/HomePage/ShopByCategoryTable'
import Deal from '../component/Pages/HomePage/Deal'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable/>}/>
            <Route path='/coupon' element={<Coupon/>}/>
            <Route path="/add-coupon" element={<AddNewCouponForm/>}/>
            <Route path="/home-grid" element={<GridTable/>}/>
            <Route path="/electronics-category" element={<ElectronicTable/>}/>
            <Route path="/shop-by-category" element={<ShopByCategoryTable/>}/>
            <Route path="/deals" element={<Deal/>}/>

        </Routes>
    </div>
  )
}

export default AdminRoutes