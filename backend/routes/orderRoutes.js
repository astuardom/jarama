const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// Configuración de la base de datos
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

// 📨 Guardar nuevo pedido (solo en MongoDB)
router.post('/send-order', async (req, res) => {
  const { name, email, phone, region, address, cart, total, proveedorEnvio } = req.body;
  try {
    const db = await connectToDatabase();
    await db.collection('orders').insertOne({
      name,
      email,
      phone,
      region,
      address,
      cart,
      total,
      proveedorEnvio,
      status: 'pendiente',
      paid: false,
      tracking: '',
      createdAt: new Date()
    });

    res.status(200).send('Pedido guardado con éxito');
  } catch (error) {
    console.error('❌ Error al guardar pedido:', error);
    res.status(500).send('Error al procesar el pedido');
  }
});

// 📦 Obtener todos los pedidos
router.get('/orders', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const orders = await db.collection('orders').find().sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).send('Error al obtener pedidos');
  }
});

// ✏️ Actualizar estado, pago o tracking de pedido
router.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const db = await connectToDatabase();
    const existingOrder = await db.collection('orders').findOne({ _id: new ObjectId(id) });

    if (!existingOrder) {
      return res.status(404).send('Pedido no encontrado');
    }

    const updatedFields = {
      ...(updates.status !== undefined && { status: updates.status }),
      ...(updates.paid !== undefined && { paid: updates.paid }),
      ...(updates.tracking !== undefined && { tracking: updates.tracking }),
      updatedAt: new Date()
    };

    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );

    res.status(200).json({ message: 'Pedido actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).send('Error al actualizar pedido');
  }
});

// 📊 Estadísticas para dashboard (totales + por mes)
router.get('/dashboard-stats', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const orders = await db.collection('orders').find().toArray();

    const totalPedidos = orders.length;
    const ingresosTotales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Agrupar por mes
    const resumenMensual = {};
    for (const order of orders) {
      const fecha = new Date(order.createdAt);
      const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      if (!resumenMensual[mes]) {
        resumenMensual[mes] = { ingresos: 0, pedidos: 0 };
      }
      resumenMensual[mes].ingresos += order.total || 0;
      resumenMensual[mes].pedidos += 1;
    }

    res.json({ totalPedidos, ingresosTotales, resumenMensual });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al calcular estadísticas');
  }
});

module.exports = router;
