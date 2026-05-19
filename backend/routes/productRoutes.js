const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

router.get("/addsample", async (req, res) => {

    const sampleProducts = [

        {
            name: "Laptop",
            price: 50000,
            description: "Gaming Laptop",
            image: ""
        },

        {
            name: "Smartphone",
            price: 25000,
            description: "Android Mobile",
            image: ""
        },

        {
            name: "Headphones",
            price: 3000,
            description: "Wireless Headphones",
            image: ""
        },

        {
            name: "Smart Watch",
            price: 5000,
            description: "Fitness Smart Watch",
            image: ""
        },

        {
            name: "Keyboard",
            price: 1500,
            description: "Mechanical Keyboard",
            image: ""
        }

    ];

    await Product.insertMany(sampleProducts);

    res.json({
        message: "Sample Products Added"
    });

});

router.post("/", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;