import React from 'react'
import {Grid2, Box, Avatar, Rating, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <Grid2 container spacing={9} >
           <Grid2 size={{xs:1}}>
            <Box>
                <Avatar className='text-white' sx={{width:56, height:56, bgcolor:'#9155FD'}} >
                    Z
                </Avatar>
            </Box>
            </Grid2>
            <Grid2  size={{xs:9}}>

                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Rev</p>
                        <p className='opacity-70'>2026-08-05T23:16:07.47833</p>
                    </div>

                </div>
                <Rating
                   readOnly
                   value={4}
                   precision={1}
                   />
                   <p>value for money product, great product</p>

                   <div>
                     <img className='w-24 h-24 object-cover' src="https://images.meesho.com/images/ratings_reviews/6357158252/6390493499/6357158252_6390493499_c652489eccbec.avif?width=512" alt=''/>
                   </div>
            </Grid2>


           </Grid2>
           <div>
              <IconButton>
                <DeleteIcon sx={{color:red[700]}} />
            </IconButton>
       </div>

    </div>
  )
}

export default ReviewCard