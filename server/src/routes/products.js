 
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Products = require('../models/Products');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Route to add Products

router.post('/addproducts',fetchuser,
    [
        body('title', "Enter title ").isLength({ min: 3 }),
        body('description', "Enter description ").isLength({ min: 5 }),
    ],
    async (req, res) => {
    
console.log(req.user)
       if(req.user.role != "user"){
        try {
            const { title, description, price,category , image} = req.body;
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const products = new Products({
                title, description, price,category,image, user: req.user.id
            })
            const savedProducts = await products.save();
            res.json(savedProducts);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
       }
       else{
        console.log('You cant add products as a buyer')
        res.status(500).send("You cant add products as a buyer");

       }
    })

// Route to fetch all Products

router.get("/getproducts", async (req, res) => {

    try {
        const products = await Products.find()
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route to Update Products

router.put("/updateproducts/:id", fetchuser, async (req, res) => {

    const { title, description } = req.body;
    const newTask = {};
    if (title) { newTask.title = title }
    if (description) { newTask.description = description }
 
    res.json({ newTask });

})
// Route to delete Products

router.delete("/deleteproducts/:id", fetchuser, async (req, res) => {

    try {

        let product = await Products.findById(req.params.id);
        if (!product) { return res.status(401).send("Not Found") }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).send("Not Found")
        }

        product = await Products.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Product has been deleted", product: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router