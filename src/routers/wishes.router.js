const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const {
  getWishesById,
  getUsersMemories,
  createNewMemory,
  deleteWishes,
  getAllWishes,
  deleteWish,
} = require('../models/wishes.model');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all wishes
router.get('/getAllWishes', async (req, res) => {
  try {
    const memories = await getAllWishes();
    res.status(200).json(memories);
  } catch (error) {
    console.error('Error fetching all wishes:', error.message);
    res.status(500).json({ error: 'Failed to fetch memories.' });
  }
});

// Get wishes by ID
router.get('/getWishesById/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const wishes = await getWishesById(id);
    if (!wishes) {
      return res.status(404).json({ error: 'Wish not found.' });
    }
    res.status(200).json(wishes);
  } catch (error) {
    console.error('Error fetching wishes by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch Wish.' });
  }
});

// Get wish by user ID
router.get('/getUsersWishes/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const userWishes = await getUsersWishes(user_id);
    if (!userWishes) {
      return res.status(404).json({ error: 'No wishes found for this user.' });
    }
    res.status(200).json(userWishes);
  } catch (error) {
    console.error('Error fetching user wishes:', error.message);
    res.status(500).json({ error: 'Failed to fetch user wishes.' });
  }
});
// Create a new wish
router.post('/createWish', async (req, res) => {
    const { user_id, message } = req.body;

    if (!user_id || !message) {
      return res.status(400).json({ error: 'User ID and message are required.' });
    }

    try {
      const newWish = await createNewWish(user_id, message);
      res.status(201).json(newWish);
    } catch (err) {
      console.error('Error creating new wish:', err.message);
      res.status(500).json({ error: 'Failed to create new wish.' });
    }
  });



// Delete a wish
router.delete('/deleteWish/:wish_id', async (req, res) => {
  const { wish_id } = req.params;

  try {
    const deletedWish = await deleteWish(wish_id);
    res.status(200).json(deletedWish);
  } catch (error) {
    console.error('Error deleting wish:', error.message);
    res.status(500).json({ error: 'Failed to delete wish.' });
  }
});

module.exports = router;