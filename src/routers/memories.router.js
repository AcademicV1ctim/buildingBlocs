const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
require('dotenv').config();

const {
  getAllMemories,
  getMemoryById,
  getUsersMemories,
  createNewMemory,
  updateMemory,
  deleteMemory,
} = require('../models/memories.model');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all memories
router.get('/getAllMemories', async (req, res) => {
    try {
        const memories = await getAllMemories();
        res.status(200).json(memories);
    } catch (error) {
        console.error('Error fetching all memories:', error.message);
        res.status(500).json({ error: 'Failed to fetch memories.' });
    }
});

// Get memory by ID
router.get('/getMemoryById/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const memory = await getMemoryById(id);
        if (!memory) {
        return res.status(404).json({ error: 'Memory not found.' });
        }
        res.status(200).json(memory);
    } catch (error) {
        console.error('Error fetching memory by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch memory.' });
    }
});

// Get memories by user ID
router.get('/getUsersMemories/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const userMemories = await getUsersMemories(user_id);
        if (!userMemories) {
        return res.status(404).json({ error: 'No memories found for this user.' });
        }
        res.status(200).json(userMemories);
    } catch (error) {
        console.error('Error fetching user memories:', error.message);
        res.status(500).json({ error: 'Failed to fetch user memories.' });
    }
});

// Create a new memory
router.post('/createMemory', upload.single('image'), async (req, res) => {
    const { user_id, message } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Image is required.' });
    }

    try {
        const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: 'buildingblocs',
            resource_type: 'image',
        },
        async (error, result) => {
            if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Failed to upload image.' });
            }

            try {
            const newMemory = await createNewMemory(user_id, message, result.secure_url);
            res.status(201).json(newMemory);
            } catch (err) {
            console.error('Error creating new memory:', err.message);
            res.status(500).json({ error: 'Failed to create new memory.' });
            }
        }
        );

        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error handling create memory request:', error.message);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

// Update a memory
router.put('/updateMemory/:memory_id', async (req, res) => {
    const { memory_id } = req.params;
    const { user_id, message } = req.body;

    try {
        const updatedMemory = await updateMemory(user_id, memory_id, message);
        res.status(200).json(updatedMemory);
    } catch (error) {
        console.error('Error updating memory:', error.message);
        res.status(500).json({ error: 'Failed to update memory.' });
    }
});

// Delete a memory
router.delete('/deleteMemory/:memory_id', async (req, res) => {
    const { memory_id } = req.params;

    try {
        const deletedMemory = await deleteMemory(memory_id);
        res.status(200).json(deletedMemory);
    } catch (error) {
        console.error('Error deleting memory:', error.message);
        res.status(500).json({ error: 'Failed to delete memory.' });
    }
});

module.exports = router;
