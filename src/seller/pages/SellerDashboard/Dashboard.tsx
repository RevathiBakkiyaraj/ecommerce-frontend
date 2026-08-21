import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import {
    ShoppingCart,
    Inventory2,
    CurrencyRupee,
    TrendingUp,
} from "@mui/icons-material";

import {
    useAppDispatch,
    useAppSelector,
} from '../../../State/Store';

import {
    fetchSellerDashboard,
} from "../../../State/seller/sellerDashboardSlice";

import {Grid2 } from '@mui/material'

const SellerDashboard = () => {

    const dispatch = useAppDispatch();

    const {
        data,
        loading,
        error,
    } = useAppSelector(
        (state) => state.sellerDashboard
    );


    const jwt = localStorage.getItem("jwt");

    useEffect(() => {

        if (jwt) {
            dispatch(
                fetchSellerDashboard(jwt)
            );
        }

    }, [dispatch, jwt]);


    /*
     * Loading
     */
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    /*
     * Error
     */
    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography
                    variant="h6"
                    color="error"
                >
                    {error}
                </Typography>
            </Box>
        );
    }


    /*
     * No data
     */
    if (!data) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography>
                    No dashboard data available.
                </Typography>
            </Box>
        );
    }


    /*
     * Currency formatter
     */
    const formatCurrency = (
        value: number
    ) => {
        return `₹${value.toLocaleString("en-IN")}`;
    };


    return (
        <Box
            sx={{
                p: {
                    xs: 2,
                    md: 4,
                },
                backgroundColor: "#f8f9fa",
                minHeight: "100vh",
            }}
        >

            {/* ================= HEADER ================= */}

            <Box sx={{ mb: 4 }}>

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Seller Dashboard
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Welcome back! Here's what's
                    happening with your store.
                </Typography>

            </Box>


            {/* ================= OVERVIEW ================= */}

            <Grid2
                container
                spacing={3}
                sx={{ mb: 4 }}
            >

                {/* TOTAL SALES */}

                <Grid2
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Total Sales
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{ mt: 1 }}
                                    >
                                        {formatCurrency(
                                            data.totalSales
                                        )}
                                    </Typography>

                                </Box>

                                <CurrencyRupee />

                            </Box>

                        </CardContent>

                    </Card>

                </Grid2>



                <Grid2
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Total Orders
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{ mt: 1 }}
                                    >
                                        {data.totalOrders}
                                    </Typography>

                                </Box>

                                <ShoppingCart />

                            </Box>

                        </CardContent>

                    </Card>

                </Grid2>


                {/* PRODUCTS */}

                <Grid2
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Products
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{ mt: 1 }}
                                    >
                                        {data.totalProducts}
                                    </Typography>

                                </Box>

                                <Inventory2 />

                            </Box>

                        </CardContent>

                    </Card>

                </Grid2>


                {/* EARNINGS */}

                <Grid2
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Card
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Earnings
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{ mt: 1 }}
                                    >
                                        {formatCurrency(
                                            data.earnings
                                        )}
                                    </Typography>

                                </Box>

                                <TrendingUp />

                            </Box>

                        </CardContent>

                    </Card>

                </Grid2>

            </Grid2>



            <Card
                sx={{
                    borderRadius: 3,
                    mb: 4,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Sales Overview
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Your sales performance
                    </Typography>


                    <Grid2
                        container
                        spacing={2}
                        alignItems="end"
                        sx={{
                            minHeight: 250,
                        }}
                    >

                        {data.salesOverview.map(
                            (item) => {

                                const maxSales =
                                    Math.max(
                                        ...data.salesOverview.map(
                                            (x) => x.sales
                                        ),
                                        1
                                    );

                                const height =
                                    item.sales === 0
                                        ? 5
                                        : (
                                            item.sales /
                                            maxSales
                                        ) * 180;

                                return (

                                    <Grid2
                                        key={item.day}
                                        size={{
                                            xs: 12 / 7,
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                height: 200,
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                justifyContent:
                                                    "flex-end",
                                                alignItems:
                                                    "center",
                                            }}
                                        >

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    mb: 1,
                                                }}
                                            >
                                                {formatCurrency(
                                                    item.sales
                                                )}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    width: "55%",
                                                    height,
                                                    backgroundColor:
                                                        "primary.main",
                                                    borderRadius:
                                                        "6px 6px 0 0",
                                                    minHeight: 5,
                                                }}
                                            />

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    mt: 1,
                                                }}
                                            >
                                                {item.day}
                                            </Typography>

                                        </Box>

                                    </Grid2>

                                );
                            }
                        )}

                    </Grid2>

                </CardContent>

            </Card>


            {/* ================= LOW STOCK ================= */}

            <Grid2
                container
                spacing={3}
                sx={{ mb: 4 }}
            >

                <Grid2
                    size={{
                        xs: 12,
                        md: 5,
                    }}
                >

                    <Card
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Low Stock
                            </Typography>

                            <Divider
                                sx={{ my: 2 }}
                            />

                            {data.lowStockProducts.length === 0 ? (

                                <Typography
                                    color="text.secondary"
                                >
                                    No low stock products.
                                </Typography>

                            ) : (

                                data.lowStockProducts.map(
                                    (product) => (

                                        <Box
                                            key={product.id}
                                            sx={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center",
                                                py: 1.5,
                                            }}
                                        >

                                            <Box>

                                                <Typography
                                                    fontWeight={600}
                                                >
                                                    {product.name}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Only{" "}
                                                    {product.stock}{" "}
                                                    left
                                                </Typography>

                                            </Box>

                                            <Typography
                                                fontWeight={700}
                                                color="error"
                                            >
                                                {product.stock}
                                                {" "}left
                                            </Typography>

                                        </Box>

                                    )
                                )

                            )}

                        </CardContent>

                    </Card>

                </Grid2>


                {/* ================= TOP SELLING ================= */}

                <Grid2
                    size={{
                        xs: 12,
                        md: 7,
                    }}
                >

                    <Card
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Top Selling Products
                            </Typography>

                            <Divider
                                sx={{ my: 2 }}
                            />

                            <TableContainer>

                                <Table>

                                    <TableHead>

                                        <TableRow>

                                            <TableCell>
                                                Product
                                            </TableCell>

                                            <TableCell>
                                                Units Sold
                                            </TableCell>

                                            <TableCell>
                                                Revenue
                                            </TableCell>

                                        </TableRow>

                                    </TableHead>


                                    <TableBody>

                                        {data
                                            .topSellingProducts
                                            .map(
                                                (product) => (

                                                    <TableRow
                                                        key={
                                                            product.id
                                                        }
                                                    >

                                                        <TableCell>
                                                            {
                                                                product.name
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                product.unitsSold
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            {formatCurrency(
                                                                product.revenue
                                                            )}
                                                        </TableCell>

                                                    </TableRow>

                                                )
                                            )}

                                    </TableBody>

                                </Table>

                            </TableContainer>

                        </CardContent>

                    </Card>

                </Grid2>

            </Grid2>


            {/* ================= RECENT ORDERS ================= */}

            <Card
                sx={{
                    borderRadius: 3,
                    mb: 4,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 2 }}
                    >
                        Recent Orders
                    </Typography>


                    <TableContainer>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Order
                                    </TableCell>

                                    <TableCell>
                                        Customer
                                    </TableCell>

                                    <TableCell>
                                        Amount
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                </TableRow>

                            </TableHead>


                            <TableBody>

                                {data.recentOrders.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={4}
                                            align="center"
                                        >
                                            No orders found
                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    data.recentOrders.map(
                                        (order) => (

                                            <TableRow
                                                key={order.id}
                                            >

                                                <TableCell>
                                                    #{order.id}
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        order.customer
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {formatCurrency(
                                                        order.amount
                                                    )}
                                                </TableCell>

                                                <TableCell>

                                                    <Typography
                                                        fontWeight={600}
                                                        color={
                                                            order.status ===
                                                            "DELIVERED"
                                                                ? "success.main"
                                                                : order.status ===
                                                                  "CANCELLED"
                                                                ? "error.main"
                                                                : "warning.main"
                                                        }
                                                    >
                                                        {
                                                            order.status
                                                        }
                                                    </Typography>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    )

                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                </CardContent>

            </Card>

        </Box>
    );
};

export default SellerDashboard;