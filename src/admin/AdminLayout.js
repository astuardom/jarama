import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { FaBars } from 'react-icons/fa';
import AdminOrders from './AdminOrders';

const AdminLayout = () => {
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const renderContent = () => {
    switch (view) {
      case 'dashboard': return <Dashboard />;
      case 'products': return (
        <ProductList onEdit={(product) => {
          setEditingProduct(product);
          setView('edit');
        }} />
      );
      case 'add': return <ProductForm onSuccess={() => setView('products')} />;
      case 'edit': return (
        <ProductForm
          editMode={true}
          productData={editingProduct}
          onSuccess={() => setView('products')}
        />
      );
      case 'orders':
      return <AdminOrders />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNavigate={(val) => {
        setView(val);
        setSidebarOpen(false); // close drawer on mobile
      }} />
      <main className="flex-1 overflow-y-auto p-6 relative">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        >
          <FaBars className="text-red-600" />
        </button>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
