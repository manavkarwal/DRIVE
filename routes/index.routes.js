const express = require('express');
const multer = require('multer'); // For handling file uploads
const supabase = require('../config/supabase'); // Import Supabase client
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const fileModel = require('../models/files.models')




    router.get('/home',authMiddleware  ,async  (req,res) => {
    
        const userFiles = await fileModel.find({
            user: req.user.userId
        })
    
    
        if(!userFiles) {
            return res.status(401).json({
                message: 'unuthorized '
            })
        }
    
        res.render('home', {
            files: userFiles
        } )
    
    })


     //jab koi usko hit krega to ye run hota
    
    
    module.exports = router
