// routes/supabase.routes.js
const express = require('express');
const multer = require('multer'); // For handling file uploads
const supabase = require('../config/supabase'); // Import Supabase client
const router = express.Router();
const fileModel = require('../models/files.models')
const authMiddleware = require('../middleware/auth')


// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File upload route
const { v4: uuidv4 } = require('uuid');  // Import UUID if needed

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {

 

  const { buffer, originalname} = req.file;
  
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Extract the file extension
  const ext = originalname.split('.').pop();
  
  // Remove the extension from the file name
  const baseName = originalname.replace(`.${ext}`, '');

  // Generate a unique name by appending the timestamp at the end
  const uniqueName = `${baseName}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;


  // Upload file to Supabase storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`folder/${uniqueName}`, buffer, {
      contentType: req.file.mimetype,
    });

  if (error) {
    return res.status(500).send('Error uploading file: ' + error.message);
  }

 
  const newFile = await fileModel.create({
    path: uniqueName,
    originalname: req.file.originalname,
    user: req.user.userId

  })

  res.json(newFile)
 
});


module.exports = router;
