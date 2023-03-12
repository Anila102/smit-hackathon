 
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Products = require('../models/Products');
const express = require('express');
const router = express.Router();

router.post("/buyproduct", fetchuser,async (req, res) => {
    if(req.user.role != "seller"){
        try {
            
        } catch (error) {
                
        }
    }

})