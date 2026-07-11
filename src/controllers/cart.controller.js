import prisma from "../config/database.js";

export const createCart = async (req, res) => {
    const { productId, variantId, productName, variantName, price, image } = req.body;
    if (!productId || !variantId || !productName || !variantName || !price) {
        return res.status(400).json({
            message: "Missing required fields",
        });
    }
    const { userId } = req.user;
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        })
        if (existingCart) {
            const existingItem = existingCart.items.find((item) => item.variantId === variantId)
            if (existingItem) {
                await prisma.cartItem.update({
                    where: {
                        id: existingItem.id
                    },
                    data: {
                        quantity: {
                            increment: 1
                        }
                    }
                })
            } else {
                await prisma.cartItem.create({
                    data: {
                        cartId: existingCart.id,
                        productId,
                        variantId,
                        variantName,
                        productName,
                        price,
                        image: image ? image : '',
                        quantity: 1
                    }
                })
            }
        } else {
            await prisma.cart.create({
                data: {
                    userId: userId,
                    items: {
                        create: {
                            productId,
                            variantId,
                            variantName,
                            productName,
                            price,
                            image: image ? image : '',
                            quantity: 1
                        }
                    }
                }
            })
        }
        return res.status(200).json({
            message: "Item added to cart",
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const getCart = async (req, res) => {
    const { userId } = req.user;
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        })
        if (existingCart.items.length <= 0) {
            return res.status(200).json({
                data: {
                    items: [],
                },
                message: "Cart is empty",
            });
        }
        res.status(200).json({
            data: existingCart,
            message: "Cart Fetch Success"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const increaseQty = async (req, res) => {
    const { variantId } = req.params;
    const { userId } = req.user;
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        })
        if (!existingCart) {
            return res.status(404).json({
                data: {
                    items: [],
                },
                message: "Cart not found",
            });
        }
        const item = existingCart.items.find((item) => item.variantId === variantId);
        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }
        await prisma.cartItem.update({
            where: {
                id: item.id
            },
            data: {
                quantity: {
                    increment: 1
                }
            }
        })
        return res.status(200).json({
            message: "Qty increase success",
        });


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const decreaseQty = async (req, res) => {
    const { variantId } = req.params;
    const { userId } = req.user;
    try {
        const existingCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        })
        if (!existingCart) {
            return res.status(404).json({
                data: {
                    items: [],
                },
                message: "Cart not found",
            });
        }
        const item = existingCart.items.find((item) => item.variantId === variantId);
        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }
        if (item.quantity === 1) {
            await prisma.cartItem.delete({
                where: {
                    id: item.id
                }
            })
            return res.status(200).json({
                message: "Item removed from cart",
            });
        } else {
            await prisma.cartItem.update({
                where: {
                    id: item.id
                },
                data: {
                    quantity: {
                        decrement: 1
                    }
                }
            })
            return res.status(200).json({
                message: "Qty descrease success",
            });
        }


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}