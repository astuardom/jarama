import React, { useEffect, useState } from 'react';
import {
  FaChartBar, FaBoxOpen, FaPlusCircle, FaSignOutAlt, FaTimes, FaBoxes
} from 'react-icons/fa';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">📦 Pedidos Realizados</h2>
      
      <ul className="divide-y divide-gray-300 bg-white rounded shadow">
        {orders.map((o, idx) => (
          <li key={idx} className="p-4">
            <p><strong>Cliente:</strong> {o.name} | <strong>Total:</strong> ${o.total}</p>
            <p className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
