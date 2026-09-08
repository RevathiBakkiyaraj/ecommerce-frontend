import { Step, Button, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { useFormik } from 'formik';
import { api } from '../../../config/Api';


const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details",
];

const SellerAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (value: number) => () => {

        (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) && setActiveStep(activeStep + value);
        activeStep == steps.length - 1 && handleCreateAccount();
        console.log("active step:", activeStep)
    };

    const handleCreateAccount = async () => {
    try {
        console.log("Creating seller...", formik.values);

        const response = await api.post("/sellers", {
            email: formik.values.email,
            password: formik.values.password,
            sellerName: formik.values.sellerName,
            mobile: formik.values.mobile,
            GSTIN: formik.values.gstin,

            pickupAddress: {
                name: formik.values.pickupAddress.name,
                mobile: formik.values.pickupAddress.mobile,
                pinCode: formik.values.pickupAddress.pincode,
                address: formik.values.pickupAddress.address,
                locality: formik.values.pickupAddress.locality,
                city: formik.values.pickupAddress.city,
                state: formik.values.pickupAddress.state,
            },

            bankDetails: {
                accountNumber: formik.values.bankDetails.accountNumber,
                ifscCode: formik.values.bankDetails.ifscCode,
                accountHolderName:
                    formik.values.bankDetails.accountHolderName,
            },

            businessDetails: {
                businessName:
                    formik.values.businessDetails.businessName,
                businessEmail:
                    formik.values.businessDetails.businessEmail,
                businessMobile:
                    formik.values.businessDetails.businessMobile,
                logo: formik.values.businessDetails.logo,
                banner: formik.values.businessDetails.banner,
                businessAddress:
                    formik.values.businessDetails.businessAddress,
            },
        });

        console.log("Seller created successfully:", response.data);

    } catch (error: any) {
        console.error(
            "Seller creation failed:",
            error.response?.data || error
        );
    }
};

    const formik = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            gstin: "",
            pickupAddress: {
                name: "",
                mobile: "",
                pincode: "",
                address: "",
                locality: "",
                city: "",
                state: "",
            },
            bankDetails: {
                accountNumber: "",
                ifscCode: "",
                accountHolderName: "",
            },
            sellerName: "",
            email: "",
            businessDetails: {
                businessName: "",
                businessEmail: "",
                businessMobile: "",
                logo: "",
                banner: "",
                businessAddress: ""
            },
            password: ""
        },
        onSubmit: (values) => {
            console.log(values, "formik submitted");
        },
    });

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <section className='mt-20 space-y-10'>
                <div>
                    {activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> :
                        activeStep == 1 ? <BecomeSellerFormStep2 formik={formik} /> :
                            activeStep == 2 ? <BecomeSellerFormStep3 formik={formik} /> :
                                <BecomeSellerFormStep4 formik={formik} />}
                </div>

                <div className='flex items-center justify-between'>
                    <Button
                        onClick={handleStep(-1)}
                        variant='contained'
                        disabled={activeStep == 0}>
                        Back
                    </Button>

                    <Button onClick={handleStep(1)} variant='contained'>
                        {activeStep == steps.length - 1 ? "Create Account" : "continue"}
                    </Button>
                </div>
            </section>

        </div>
    );
};

export default SellerAccountForm