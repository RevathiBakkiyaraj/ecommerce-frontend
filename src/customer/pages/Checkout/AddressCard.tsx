import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../types/userTypes'

interface AddressCardProps {
  address: Address
  selected: boolean
  onSelect: () => void
}

const AddressCard = ({
  address,
  selected,
  onSelect
}: AddressCardProps) => {

  return (
    <div className='p-5 border rounded-md flex'>

      <div>
        <Radio
          checked={selected}
          onChange={onSelect}
          value={address.id}
        />
      </div>

      <div className='space-y-3 pt-3'>
        <h1>{address.name}</h1>

        <p className='w-[320px]'>
          {address.address}, {address.locality}, {address.city} - {address.pinCode}
        </p>

        <p>
          <strong>Mobile : </strong>
          {address.mobile}
        </p>
      </div>

    </div>
  )
}

export default AddressCard