import { Modal,Box,Button } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';
import {RadioGroup,Radio,FormControlLabel} from "@mui/material";
import { useAppSelector,useAppDispatch } from '../../../State/Store';
import { Address } from '../../../types/userTypes'
import { createOrder } from '../../../State/customer/orderSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList=[
    {
        value:"RAZORPAY",
        image:"https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/razorpay-icon.png",
        label:""
    },
    {
        value:"STRIPE",
        image:"https://vikwp.com/images/plugins/stripe.png",
        label:""
    }
]

const Checkout = () => {
  const { user,jwt} = useAppSelector((store) => store.auth)

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const dispatch=useAppDispatch()

  const handlePaymentChange = (event:any) =>
  {
    setPaymentGateway(event.target.value);
  };

  const handleCheckout = () => {

    if (!selectedAddress) {
        alert("Please select an address");
        return;
    }

   dispatch(createOrder({
    address: selectedAddress,
    jwt: jwt || "",
    paymentGateway
}));
}

  return (
  <>
    <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
        <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
            <div className='col-span-2 space-y-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-semibold'>Select Address</h1>
                    <Button onClick={handleOpen}>
                        Add New Address
                    </Button>

                </div>
                <div className='text-xs font-medium space-y-5'>
                    <p>Saved Addresses</p>
                    <div className='space-y-3'>
                        {user?.addresses?.map((address) => (
  <AddressCard
    key={address.id}
    address={address}
    selected={selectedAddress?.id === address.id}
    onSelect={() => setSelectedAddress(address)}
  />
))}
                    </div>

                </div>
                                

                <div className='py-4 px-5 rounded-md border'>
                    <Button onClick={handleOpen}>
                        Add New Address
                    </Button>
        </div>        
         </div> 

         <div>
            <div>
                 <div className='space-y-3 border p-5 rounded-md'>
                    <h1 className='text-primary-color font-medium pb-2 text-center'>Choose Payment Gateway</h1>
                     <RadioGroup
                      row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        className='flex justify-between pr-0'
        onChange={handlePaymentChange}
        value={paymentGateway}
      >
       {paymentGatewayList.map((item)=> <FormControlLabel 
       className='border w-[45%] pr-2 rounded-md flex justify-center'
        value={item.value} 
        control={<Radio />} 
        label={
            <img className={`${item.value=="STRIPE"?"w-14":""} object-cover `} 
            src={item.image} alt={item.label}/>
        } />)}
       
      </RadioGroup>
                </div>
            </div>
             <div className='border rounded-md'>
               
                        <PricingCard />
                        <div className='p-5'>
                            <Button
  fullWidth
  variant='contained'
  sx={{ py: "11px" }}
  onClick={handleCheckout}
  disabled={!selectedAddress}
>
  CHECKOUT
</Button>
                        </div>
                    </div>
            </div>      
   </div>

    </div>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   <AddressForm paymentGateway={paymentGateway}/>
  </Box>
</Modal>
  </>
  )
}

export default Checkout