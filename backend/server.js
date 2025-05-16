const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5050;
//const MONGODB_URI = 'mongodb://localhost:27017';
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'animerch';
const COLLECTION = 'products';

const productRoutes = require('./routes/productRoutes');


app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);
let db;

// 📦 Conexión a MongoDB
async function connectToDatabase() {
  if (db) return db;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log('✅ Conectado a MongoDB');
  return db;
}

// 🛍 Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const products = await db.collection(COLLECTION).find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
});

// 🛍 Obtener producto por ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const product = await db.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).send('Producto no encontrado');
    res.json(product);
  } catch (error) {
    res.status(500).send('Error al obtener producto');
  }
});

// ➕ Agregar producto
app.post('/api/products', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(500).send('Error al agregar producto');
  }
});

// ✏️ Actualizar producto
app.put('/api/products/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const productData = { ...req.body };
    delete productData._id;

    const updateResult = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: productData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).send('Producto no encontrado');
    }

    res.json({ _id: req.params.id, ...productData });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
});

// 🗑 Eliminar producto
app.delete('/api/products/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send('Producto no encontrado');
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).send('Error al eliminar producto');
  }
});

// 🔐 Login admin
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ username, password, role: 'admin' });

    if (!user) {
      return res.status(401).send('Credenciales incorrectas');
    }

    res.status(200).json({ message: 'Acceso concedido' });
  } catch (error) {
    res.status(500).send('Error al verificar credenciales');
  }
});

// 🔄 Importar rutas externas
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes); // Todas las rutas de pedidos están aquí

// ✅ Arranque del servidor
app.listen(port, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
});
