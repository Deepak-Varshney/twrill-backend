import { Router } from "express";
import axios from "axios";
const router = Router();

router.get('/items', async (req, res) => {
    try {
        const { data } = await axios.post(`https://secureapi.twirll.com/businessinventory/get_outlet_menu_items.json?access_token=${process.env.TOKEN}`, {
            "business_location_id": "2029",
            "businessprofile_id": "1989",
            "Output_information_type": "ProductList"
        })
        res.status(200).json(data)
    } catch (error) {
        console.error(error.message)
    }
})

export default router;

router.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const { data } = await axios.post(`https://secureapi.twirll.com/businessinventory/${id}/public_product_detail.json?access_token=${process.env.TOKEN}`, {
            "business_location_id": "2029"
        })
        res.status(200).json(data)
    } catch (error) {
        console.error(error.message)
    }
})