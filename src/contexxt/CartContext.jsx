import React, { createContext, useState, useEffect } from 'react';
import api from '../api'; // تأكد إن مسار الاستدعاء صحيح حسب مكان الملف

// إنشاء الـ Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. دالة جلب السلة من الباك إند
  const fetchCart = async () => {
    try {
      const response = await api.get('/api/cart');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("خطأ أثناء جلب السلة:", error);
    }
  };

  // جلب السلة أول ما التطبيق يفتح
  useEffect(() => {
    fetchCart();
  }, []);

  // 2. دالة إضافة منتج للسلة
  const addToCart = async (item) => {
    try {
      // إرسال المنتج للسيرفر (item لازم يحتوي على id, name, price, Qty, image)
      const response = await api.post('/api/cart/add' , item);
      
      // تحديث السلة بالبيانات الجديدة اللي راجعة من السيرفر
      if (response.data && response.data.cart) {
         setCartItems(response.data.cart.items);
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة المنتج للسلة:", error);
      alert("حدث خطأ أثناء الإضافة للسلة");
    }
  };

  // 3. دالة حذف منتج من السلة
  const removeFromCart = async (id) => {
    try {
      await api.delete(`/api/cart/remove/${id}`);
      
      // تحديث الـ state محلياً عشان المنتج يختفي فوراً من الشاشة بدون عمل ريفريش
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("خطأ أثناء حذف المنتج:", error);
      alert("فشل حذف المنتج من السلة");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};