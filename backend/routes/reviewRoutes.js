const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'animerch';

let db;
async function connectToDatabase() {
  if (db) return db;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

// 📌 Crear una reseña
router.post('/reviews', async (req, res) => {
  const { productId, user, rating, comment } = req.body;
  if (!productId || !user || !rating || !comment) {
    return res.status(400).send('Faltan datos obligatorios.');
  }

  try {
    const db = await connectToDatabase();
    const result = await db.collection('reviews').insertOne({
      productId,
      user,
      rating,
      comment,
      createdAt: new Date()
    });
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error al guardar reseña:', error);
    res.status(500).send('Error al guardar la reseña.');
  }
});

// 📌 Obtener reseñas de un producto
router.get('/reviews/:productId', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const reviews = await db.collection('reviews')
      .find({ productId: req.params.productId })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Error al obtener reseñas.');
  }
});

module.exports = router;
