import React, { useContext, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const shippingRates = {
  'región metropolitana': { starken: 4500, chilexpress: 3990, blue: 3428 },
  valparaíso: { starken: 3820, chilexpress: 4290, blue: 4205 },
  biobío: { starken: 4510, chilexpress: 5890, blue: 5934 },
  araucanía: { starken: 4730, chilexpress: 6150, blue: 6821 },
  'los lagos': { starken: 5220, chilexpress: 6750, blue: 7104 },
  coquimbo: { starken: 4550, chilexpress: 5590, blue: 5816 },
  antofagasta: { starken: 6680, chilexpress: 6990, blue: 6044 },
  tarapacá: { starken: 7340, chilexpress: 7450, blue: 6044 },
  atacama: { starken: 5230, chilexpress: 5950, blue: 4877 },
  "o'higgins": { starken: 4740, chilexpress: 5190, blue: 5032 },
  maule: { starken: 4580, chilexpress: 5490, blue: 5877 },
  ñuble: { starken: 4170, chilexpress: 5690, blue: 5934 },
  'los ríos': { starken: 5080, chilexpress: 6290, blue: 7104 },
  aysén: { starken: 5540, chilexpress: 6990, blue: 7374 },
  magallanes: { starken: 5530, chilexpress: 8690, blue: 8488 }
};

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, shippingCost, setShippingCost, clearCart } = useCart();
  const [region, setRegion] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [showSummary, setShowSummary] = useState(false);
  const totalFinal = Number(cartTotal) + Number(shippingCost);


  useEffect(() => {
    if (region && proveedor) {
      const costo = shippingRates[region.toLowerCase()]?.[proveedor];
      setShippingCost(costo || 0);
    }
  }, [region, proveedor, setShippingCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.address || !region || !proveedor || !paymentMethod) {
      alert('Completa todos los campos antes de enviar el pedido.');
      return;
    }

    const orderDetails = {
      ...form,
      region,
      address: form.address,
      cart: cartItems,
      total: totalFinal,
      paymentMethod,
      proveedorEnvio: proveedor
    };

    try {
      const response = await fetch('http://localhost:5050/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        setShowSummary(true);
        //clearCart();
      } else {
        alert('❌ Error al enviar el pedido');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Fallo al conectar con el servidor');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Carrito de Compras</h1>

      {showSummary ? (
        <div className="bg-white border border-gray-300 rounded p-6 text-gray-800 max-w-xl mx-auto">
          <div className="flex items-center gap-2 text-green-600 mb-3">
            <span className="text-2xl">✅</span>
            <h2 className="font-bold text-lg">Pedido Realizado</h2>
          </div>
          <p>Gracias por tu compra, <strong>{form.name}</strong>. A continuación, te dejamos los detalles del pedido:</p>
          <p className="mt-3"><strong>Dirección:</strong> {form.address}, {region}</p>
          <p><strong>Correo:</strong> {form.email} <strong>Teléfono:</strong> {form.phone}</p>
          <p><strong>Método de pago:</strong> {paymentMethod}</p>
          <p><strong>Proveedor de envío:</strong> {proveedor} | <strong>Envío:</strong> ${shippingCost.toLocaleString()}</p>
          <p><strong>Total:</strong> ${(Number(cartTotal) + Number(shippingCost)).toLocaleString()}</p>

          {paymentMethod === 'transferencia' && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-800">
              <p className="mb-2">💳 Realiza una transferencia a:</p>
              <p><strong>Banco:</strong> Mercado Pago</p>
              <p><strong>Cuenta:</strong> 1065656083</p>
              <p><strong>Nombre:</strong> Alejandro Stuardo Matus</p>
              <p><strong>Correo:</strong> jaramacolor_pedidos@gmail.com</p>
              <p><strong>RUT:</strong> 16.140.311-3</p>
              <p className="mt-2">Una vez confirmado tu pago, procesaremos tu pedido. ✅</p>
            </div>
          )}
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          {/* Tabla productos */}
          <table className="w-full bg-white rounded shadow overflow-hidden text-left mb-6">
            <thead className="bg-red-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Miniatura</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                  </td>
                  <td className="px-4 py-3">${item.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded text-center"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">${(item.price * item.quantity).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeFromCart(item._id)} className="text-red-600 hover:text-red-800 font-bold">❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">📝 Información de Contacto</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="p-2 border rounded" type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="p-2 border rounded" type="email" placeholder="Correo" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="p-2 border rounded" type="text" placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <input className="p-2 border rounded" type="text" placeholder="Dirección completa" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
            </div>

            {/* Envío y pago */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-gray-700">Región:</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full border p-2 rounded">
                  <option value="">-- Selecciona región --</option>
                  {Object.keys(shippingRates).sort().map((r) => (
                    <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Proveedor:</label>
                <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} className="w-full border p-2 rounded">
                  <option value="">-- Selecciona proveedor --</option>
                  <option value="starken">Starken 💼</option>
                  <option value="chilexpress">Chilexpress 🚚</option>
                  <option value="blue">Blue Express 📦</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mt-4">Método de Pago:</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2 rounded">
                <option value="">-- Selecciona método --</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="mercadopago" disabled>Mercado Pago (Próximamente)</option>
              </select>
            </div>

            <div className="text-right space-y-2 mt-6 text-lg text-gray-800">
              <p>Subtotal: <strong>${cartTotal.toLocaleString()}</strong></p>
              <p>Envío: <strong>${shippingCost.toLocaleString()}</strong></p>
              <p><strong>Total:</strong> ${(Number(cartTotal) + Number(shippingCost)).toLocaleString()}</p>

              <button
                type="submit"
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-lg transition-transform hover:scale-105"
              >
                🧾 Finalizar Pedido
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CartPage;
