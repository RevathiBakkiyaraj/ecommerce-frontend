import { Button, Divider, IconButton} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Close } from '@mui/icons-material';
import { CartItem } from '../../../types/cardTypes';
import { useAppDispatch } from '../../../State/Store';
import { updateCartItem,deleteCartItem } from '../../../State/customer/cartSlice';

const CartItemCard = ({item}:{item:CartItem}) => {
  const dispatch=useAppDispatch()

 const handleUpdateQuantity = (value: number) => {

  // If quantity is 1 and user clicks decrease
  if (item.quantity === 1 && value === -1) {
    dispatch(
      deleteCartItem({
        jwt: localStorage.getItem("jwt") || "",
        cartItemId: item.id
      })
    );
    return;
  }

  dispatch(
    updateCartItem({
      jwt: localStorage.getItem("jwt") || "",
      cartItemId: item.id,
      cartItem: {
        quantity: item.quantity + value
      }
    })
  );
};
  const handleDelete = () => {
    dispatch(
        deleteCartItem({
            jwt: localStorage.getItem("jwt") || "",
            cartItemId: item.id
        })
    );
};  
  return (
    <div className='border rounded-md relative'>

        <div className='p-5 flex gap-3'>

            <div>
                <img
  className="w-[90px] rounded-md"
  src={item.product?.images?.[0]?.imageUrl}
  alt={item.product?.title || "Product"}
/>
            </div>
            <div className='space-y-2'>
                <h1 className='font-semibold text-lg'>{item.product.seller?.businessDetails.businessName}</h1>
                <p className='text-gray-600 font-medium text-sm'>{item.product.title} </p>
                 <p className='text-gray-400 text-xs'><strong>Sold by:</strong> Natural Lifestyle products Private Limited</p> 
                  <p>7 days replacement available</p>  
             <p className='text-sm text-gray-500'><strong>quantity : </strong>{item.quantity}</p>

        </div>
    </div>    
          

 <Divider/>
           <div className='flex justify-between items-center'>
             <div className='px-5 py-2 flex justify-between items-center'>
                
                <div className='flex items-center gap-2 w-[140px] justify-between'>
                 <Button
  onClick={() => handleUpdateQuantity(-1)}
>
  <RemoveIcon />
</Button>

<span>{item.quantity}</span>

<Button
  onClick={() => handleUpdateQuantity(1)}
>
  <AddIcon />
</Button>
                </div>
            </div>
                <div className='pr-5'>
                    <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
                </div>
           </div>
           <div className='absolute top-1 right-1'>
         <IconButton color="primary" onClick={handleDelete}>
    <Close />
</IconButton>

           </div>
        </div>
           
  )
}

export default CartItemCard