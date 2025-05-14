import React, { useState, useEffect } from 'react';
import { getProductById } from '../api/products';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingCost, setShippingCost] = useState(3500);

  useEffect(() => {
    // Simular carga de carrito
    const loadCart = async () => {
      const items = [
        { productId: 1, quantity: 2, size: 'M' },
        { productId: 3, quantity: 1, size: 'S' }
      ];
      
      const products = await Promise.all(
        items.map(async item => {
          const product = await getProductById(item.productId);
          return { ...product, ...item };
        })
      );
      
      setCartItems(products);
      setLoading(false);
    };
    
    loadCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + shippingCost;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-[#45f882] mb-8">Tu Carrito</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#45f882]"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white text-xl">Tu carrito está vacío</p>
          <a href="/shop" className="text-[#45f882] hover:underline mt-2 inline-block">Explorar productos</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#1b2330] rounded-lg shadow-md p-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row border-b border-[#45f882]/20 pb-6 mb-6 last:border-0 last:mb-0">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img src={item.image} alt={item.name} className="h-32 w-32 object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-400 mb-2">Talla: {item.size}</p>
                    <p className="text-[#45f882] font-bold mb-4">${item.price.toLocaleString('es-CL')}</p>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-[#45f882]/10 text-[#45f882] px-3 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="bg-[#45f882]/20 text-white px-4 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-[#45f882]/10 text-[#45f882] px-3 py-1 rounded-r"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-[#1b2330] rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4">Resumen de Compra</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Envío</span>
                  <span className="text-white">${shippingCost.toLocaleString('es-CL')}</span>
                </div>
                <div className="border-t border-[#45f882]/20 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-[#45f882] font-bold">${total.toLocaleString('es-CL')}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Método de Pago</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-[#45f882]/10 hover:bg-[#45f882]/20 text-white p-3 rounded border border-[#45f882]/30 flex items-center justify-center">
                    💳 Tarjeta
                  </button>
                  <button className="bg-[#45f882]/10 hover:bg-[#45f882]/20 text-white p-3 rounded border border-[#45f882]/30 flex items-center justify-center">
                    📱 Transferencia
                  </button>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#45f882] to-[#2bc46c] text-[#1b2330] py-3 rounded-lg font-bold hover:from-[#3ce077] hover:to-[#1fb359] transition shadow-lg">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;