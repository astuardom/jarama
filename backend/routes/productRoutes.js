const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

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

// ✅ Ruta para obtener todas las series únicas desde productos
router.get('/series', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const series = await db.collection('products').distinct('series', { series: { $exists: true, $ne: '' } });
    res.json(series.sort());
  } catch (error) {
    console.error('❌ Error al obtener series:', error);
    res.status(500).send('Error al obtener series');
  }
});

module.exports = router;
