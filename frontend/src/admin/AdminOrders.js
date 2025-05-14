import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, field, value) => {
    const payload = { [field]: value };

    try {
      await fetch(`http://localhost:5050/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      fetchOrders();
    } catch (err) {
      alert('Error al actualizar pedido');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📦 Pedidos Realizados</h1>

      {loading ? (
        <p className="text-gray-600">Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No hay pedidos registrados aún.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-red-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Dirección</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Pago</th>
                <th className="px-4 py-3">Tracking</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{order.name}</td>
                  <td className="px-4 py-3">
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                  </td>
                  <td className="px-4 py-3">{order.address}, {order.region}</td>
                  <td className="px-4 py-3 font-semibold text-red-600">${order.total?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status || 'pendiente'}
                      onChange={(e) => updateOrder(order._id, 'status', e.target.value)}
                      className="p-1 border rounded text-sm"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.paid ? 'pagado' : 'pendiente'}
                      onChange={(e) => updateOrder(order._id, 'paid', e.target.value === 'pagado')}
                      className="p-1 border rounded text-sm"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="pagado">Pagado</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      defaultValue={order.tracking || ''}
                      onBlur={(e) => updateOrder(order._id, 'tracking', e.target.value)}
                      placeholder="N° Seguimiento"
                      className="w-full p-1 border rounded text-sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
