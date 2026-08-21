import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const steps = [
  { name: "Order Placed", description: "On Thu, 11 July", value: "PLACED" },
  { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "packed" },
  { name: "Shipped", description: "On Sat, 13 July", value: "SHIPPED" },
  { name: "Arriving", description: "Expected on Sun, 14 July", value: "Arriving" },
  { name: "Arrived", description: "Delivered on Mon, 15 July", value: "Arrived" }
];

const canceledStep = [
    {  name: "Order Placed", description: "On Thu, 11 July", value: "PLACED" },
    { name: "Order Canceled", description: "On Thu, 11 July", value: "CANCELLED" },
];

const currentStep = 1;

const OrderStepper = ({ orderStatus} :any) => {
    const [statusStep, setStatusStep] =useState(steps);

    useEffect(() => {
        if(orderStatus == 'CANCELLED') {
            setStatusStep(canceledStep)
        } else {
            setStatusStep(steps)
        }
    }, [orderStatus])
    return (
        <Box className="my-10">
            {statusStep.map((step,index) => (
                <>
                <div key={index} className={`flex px-4`}>
                    <div className='flex flex-col items-center'>
                    <Box
                     sx={{ zIndex: -1}}
                     className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${index <= currentStep
                        ?"bg-gray-200 text-teal-500"
                        :"bg-gray-300 text-gray-600"
                     }`}>
                        {step.value === orderStatus ? (
                            <CheckCircleIcon />
                        ): (
                            <FiberManualRecordIcon sx={{ zIndex: -1}} />
                        )}

                    </Box>
                    { statusStep.length -1!=index && (
                        <div
                        className={` h-20 w-[2px] ${index < currentStep
                            ?"bg-primary-color"
                            :"bg-gray-300 text-gray-600"
                        }`}>
                            </div>

                    )}
                </div>
                <div className={`ml-2 w-full`}>
                    <div
                    className={` ${step.value === orderStatus
                        ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                        :""
                    } ${(orderStatus === "CANCELLED" && step.value
                        === orderStatus) ?"bg-red-500" : ""} w-full`}>
                            <p className={``}>
                                {step.name}
                            </p>
                            <p className={` ${step.value === orderStatus
                                ?"text-gray-200"
                                :"text-gray-500"
                            } text-xs`}
                            >{step.description}
                            </p>

                    </div>
                    </div>
                </div>
                </>
            ))}

        </Box>
    );
};

export default OrderStepper