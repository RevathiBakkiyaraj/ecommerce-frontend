import React from 'react'
import { Divider } from '@mui/material'
import { useAppSelector } from '../../../State/Store'

const PricingCard = () => {

  const { cart } = useAppSelector((store) => store)

  const cartData = cart?.cart

  const subtotal = cartData?.totalSellingPrice || 0
  const discount = cartData?.discount || 0

  const shipping = subtotal >= 1000 ? 0 : 69

  const platformFee = 0

  const total =
    subtotal - discount + shipping + platformFee

  return (
    <>
      <div className='space-y-3 p-5'>

        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span>₹{discount}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span>Platform fee</span>
          <span>Free</span>
        </div>

      </div>

      <Divider />

      <div className='flex justify-between items-center p-5 text-primary-color'>
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </>
  )
}

export default PricingCard