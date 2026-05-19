const express = require("express");

const Order = require("../models/Order");

const router = express.Router();

router.get("/sample", async (req, res) => {

    const sampleOrder = new Order({

        userId: "123",

        products: [
            {
                name: "Laptop",
                price: 50000
            }
        ],

        totalPrice: 50000

    });

    await sampleOrder.save();

    res.json({
        message: "Sample Order Added"
    });

});


// CREATE ORDER

router.post("/", async (req, res) => {

    try {

        const order = new Order(req.body);

        await order.save();

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ORDERS

router.get("/", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;