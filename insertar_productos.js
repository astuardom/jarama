
const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017';
const dbName = 'animerch';
const collectionName = 'products';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Leer productos desde archivo JSON
    const data = fs.readFileSync('productos_completos.json', 'utf-8');
    const productos = JSON.parse(data);

    // Insertar productos
    const result = await collection.insertMany(productos);
    console.log(`${result.insertedCount} productos insertados correctamente`);
  } catch (err) {
    console.error('Error al insertar productos:', err);
  } finally {
    await client.close();
  }
}

main();
