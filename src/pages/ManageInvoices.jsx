import React, { useContext, useState } from 'react';
import { InvoiceContext } from '../contexxt/InvoiceContext';

export default function ManageInvoices() {
  const { invoices, addInvoice, deleteInvoice, updateInvoice } = useContext(InvoiceContext);
  const [searchId, setSearchId] = useState('');
  const [activeInv, setActiveInv] = useState(null);
  const [newInvData, setNewInvData] = useState({ date: '', productName: '', Qty: '', total: '', subtotal: '', tax: '', discount: '', name: '', phone: '', address: '' });

  

  return (

    <div className="manage-container">
      <h1>لوحة إدارة الفواتير</h1>

      {/* 1. كارت الإضافة */}
      <div className="cart-style">
        <h3>إضافة فاتورة جديدة</h3>
        <input className="input-style" type="date" placeholder="التاريخ" value={newInvData.date} onChange={(e) => setNewInvData({...newInvData, date: e.target.value})} />
        <input className="input-style" placeholder="اسم المنتج" value={newInvData.productName} onChange={(e) => setNewInvData({...newInvData, productName: e.target.value})} />
        <input className="input-style" type="number" placeholder="العدد" value={newInvData.Qty} onChange={(e) => setNewInvData({...newInvData, Qty: e.target.value})} />
        <input className="input-style" type="number" placeholder="العميل " value={newInvData.total} onChange={(e) => setNewInvData({...newInvData, total: e.target.value})} />
        <input className="input-style" type="number" placeholder="المبيعات" value={newInvData.subtotal} onChange={(e) => setNewInvData({...newInvData, subtotal: e.target.value})} />
        <input className="input-style" type="number" placeholder="ضريبة القيمة المضافة" value={newInvData.tax} onChange={(e) => setNewInvData({...newInvData, tax: e.target.value})} />
        <input className="input-style" type="number" placeholder="الخصم" value={newInvData.discount} onChange={(e) => setNewInvData({...newInvData, discount: e.target.value})} />
         <input className="input-style" type="number" placeholder="الاجمالى" value={newInvData.total} onChange={(e) => setNewInvData({...newInvData, total: e.target.value})} />
         <input className="input-style" placeholder="اسم العميل" value={newInvData.name} onChange={(e) => setNewInvData({...newInvData, name: e.target.value})} />
         <input className="input-style" placeholder="رقم الهاتف" value={newInvData.phone} onChange={(e) => setNewInvData({...newInvData, phone: e.target.value})} />
        <input className="input-style" placeholder="العنوان" value={newInvData.address} onChange={(e) => setNewInvData({...newInvData, address: e.target.value})} />


        <button onClick={() => {  const formattedInvoice = {
      ...newInvData,
      items: [{
        name: newInvData.productName,
        Qty: newInvData.Qty,
        price: newInvData.subtotal
      }]
    };
    addInvoice(formattedInvoice); 
    alert("تمت الإضافة بنجاح");
    setNewInvData({ date: '', productName: '', Qty: '', total: '', subtotal: '', tax: '', discount: '', name: '', phone: '' , address: '' });
      console.log("البيانات اللي رايحة للـ addInvoice:", JSON.stringify(formattedInvoice, null, 2));
  }}>  الفاتورة حفظ</button>
      </div>

      {/* 2. كارت الاستعلام */}
      <div className="card-style">
        <h3>🔍 استعلام</h3>
        <input className="input-style" placeholder="رقم الفاتورة" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        <button onClick={() => {
         
          // بدل الـ find اللي بتعتمد على الـ state بس
          console.log("Searching for ID:", searchId); // هيطبع اللي بتكتبه في الـ console
          console.log("Available Invoices:", invoices); // هيطبع كل الفواتير اللي وصلت من الداتابيز
      
         // في دالة البحث داخل ManageInvoices.jsx
        // في دالة البحث:
          const found = invoices.find(i => i.invoiceNumber == searchId);
          if (found) {
            setActiveInv({
              ...found,
              productName: (found.items && found.items.length > 0) ? found.items[0].name : "",
              qty: (found.items && found.items.length > 0) ? found.items[0].Qty : 1,
              subtotal: (found.items && found.items.length > 0) ? parseFloat(found.items[0].price.toString().replace('$', '')) : 0
            });
          } else {
            alert("الفاتورة غير موجودة");
          }
        }}>استدعاء البيانات</button>
      </div>

      {/* 3. كارت التعديل */}
      {activeInv && (
        <div className="card-style edit-card">
          <h3>✏️ تعديل الفاتورة رقم: {activeInv.invoiceNumber}</h3>
          <input className="input-style" value={activeInv.date} onChange={(e) => setActiveInv({...activeInv, date: e.target.value})} />
          <input className="input-style" value={activeInv.items[0].name} onChange={(e) => { const updatedItems = [...activeInv.items]; updatedItems[0] = { ...updatedItems[0], name: e.target.value }; setActiveInv({...activeInv, items: updatedItems }); }} />
          <input className="input-style" value={activeInv.qty} onChange={(e) => setActiveInv({...activeInv, qty: e.target.value})} />
          <input className="input-style" value={activeInv.total} onChange={(e) => setActiveInv({...activeInv, total: e.target.value})} />
          <input className="input-style" value={activeInv.subtotal} onChange={(e) => setActiveInv({...activeInv, subtotal: e.target.value})} />
          <input className="input-style" value={activeInv.tax} onChange={(e) => setActiveInv({...activeInv, tax: e.target.value})} />
          <input className="input-style" value={activeInv.discount} onChange={(e) => setActiveInv({...activeInv, discount: e.target.value})} />
          <input className="input-style" value={activeInv.total} onChange={(e) => setActiveInv({...activeInv, total: e.target.value})} />
          <button onClick={() => { updateInvoice(activeInv); alert("تم التعديل"); }}>حفظ التعديلات</button>
        </div>
      )}

      {/* 4. كارت الحذف */}
      {activeInv && (
        <div className="card-style delete-card">
          <h3>🗑️ حذف الفاتورة</h3>
          <button onClick={() => { deleteInvoice(activeInv.invoiceNumber); setActiveInv(null); alert("تم الحذف"); }}>حذف الفاتورة رقم {activeInv.invoiceNumber}</button>
        </div>
      )}
    </div>
  );
}
