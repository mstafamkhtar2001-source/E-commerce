import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexxt/CartContext'; // استدعاء الكونتيكست

export default function Cart() {
  // سحب البيانات والدوال الجاهزة من الكونتيكست
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // حساب الإجمالي
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const count = parseInt(item.count||item.Qty) || 1;
    return acc + (price * count);
  }, 0);
  // دالة صغيرة تحسب إجمالي أي منتج يجي لها
  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price) || 0;
    const count = parseInt(item.Qty || item.count) || 1;
    return price * count;
  };
  

 return (
  <div className="cart-container">
    <h2>سلة التسوق</h2>

    {cartItems.length === 0 ? (
      <p>السلة فارغة حالياً</p>
    ) : (
      <div className="cart-items">
        {cartItems.map((item) => (
  <div key={item.id} className="cart-item" style={{ marginBottom: '20px', borderBottom: '1px soli #ccc ', paddingBottom: '10px' }}>
    {item.image && <img src={item.image} alt={item.name} style={{ width: '50px' }} />}
    <h4>{item.name}</h4>
    <p>السعر: {item.price}$</p>
    <p>كود المنتج: {item.id}</p>
    <p>العدد: {item.Qty}</p>
    <p>الإجمالي: {calculateItemTotal(item).toFixed(2)}$</p>

    <button onClick={() => removeFromCart(item.id)}>حذف</button>
    <button onClick={() => navigate('/checkout', { state: { items: [item] } })}>
      إتمام شراء هذا المنتج
    </button>
  </div>
))}
          
        
        
      </div>
    )
}
    {/* الإجمالي الكلي لكل السلة تحت خالص */}
    <div className="cart-total">
      <h3>الإجمالي الكلي: {totalPrice.toFixed(2)}$</h3>
    </div>
  </div>

);
}
