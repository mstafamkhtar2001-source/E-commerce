import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexxt/CartContext';
import { data, useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Checkout() {
    const { cartItems } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();

// أضف السطر ده في بداية الـ component عشان تعرف التاريخ
const currentDate = new Date().toLocaleDateString();
 // 1-نفتح الدالة ونضع جواها كونست للتاريخ وكونست للزرار 
 // وكونست للمكان وكونست للسلة  (4)

    const [itemToBuy] = useState(location.state?.product || null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({ name: '', address: '', phone: '', card: '', cvv: '' });

   //2-  كمان 3 كونست  واحد للداتا  مكانها جى منين وهنا قصدة جاية من صفحة بروديكت
   // و يوز استيت عشان نستخدمهم فى زرار الدفع 
   // وكمان كونست نعرف فيه الداتا بتاعت الفورم


    const itemsToProcess = location.state?.items || cartItems;
     const subtotal = itemsToProcess.reduce((acc, item) => {
  const price = parseFloat(item.price) || 0;
  const count = parseInt(item.Qty || item.count) || 1;
  return acc + (price * count);
}, 0);
       const tax = subtotal * 0.14;
        const discount = subtotal*0.01;
       const totalCalculated = subtotal + tax - discount ;
     
         //3- هنعمل 5 كونست 4 منهم للعمليات الحسابية 
         // واول واحد عشان خاطر الداتاالى جاية من الكارت ايتيم
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
           // 1. التحقق من رقم التليفون (لازم يكون أرقام وبطول معين)
     const handleSubmit = async (e) => {
        e.preventDefault();
        const phoneRegex = /^[0-9]{11}$/;
     if (!phoneRegex.test(formData.phone)) {
        toast.error('من فضلك أدخل رقم هاتف صحيح (11 رقم)');
        return; // بيوقف الكود هنا وما بيكملش
        // 4- نفتح الدالة بتاعتنا ونشوف الداتا بتاعتنا 
        //5- نعمل فلاديشن للتحقق من الرقم مكون من 4 خطوات 
        // (كونست+اف+تويست ايرور+ريترن)
    }
      // 2. التحقق لو الدفع بالبطاقة لازم البيانات تكون موجودة
     if (paymentMethod === 'card' && (!formData.card || !formData.cvv)) {
        toast.error('من فضلك أكمل بيانات البطاقة');
        return;
    }
    //6-  3فلاديشن تانية مكونه من 
    // (اف+تويست+ريترن)
;   
          // دولت طريقتين للتحقق validation

        const invoiceData = {
            ...formData,
            items: itemsToProcess,
            total:totalCalculated ,
            tax: tax,
            discount: discount,
            date: currentDate,
            uniqueId: Date.now()
            
        };
        //7- بعد كدة نعرف الداتا بتاعتنا فى كونست

        try {
    // لو اختار دفع عند الاستلام (كاش)
    if (paymentMethod === 'cash') {
        const response = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoiceData)
            });
            if (response.ok){
                toast.success('تم تأكيد الطلب، جاري الترحيل...');
                setTimeout(() => {
                    navigate('/accounting', { state: { invoiceData: invoiceData } });
                }, 1000);
            }
        
        
    } 
    // لو اختار الدفع ببطاقة ائتمانية (إلكتروني)
    else if (paymentMethod === 'card') {
    
    
    const paymentResponse = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
    });

    if (paymentResponse.ok) {
        toast.success('تم دفع وتأكيد الطلب بنجاح!');
        setTimeout(() => {
            navigate('/accounting', { state: { invoicedata: invoiceData } });
        }, 1000);
    } else {
        toast.error('حدثت مشكلة أثناء حفظ الفاتورة');
    }
}

} catch (error) {
    console.error("مشكلة في الاتصال بالسيرفر:", error);
    toast.error('مشكلة في الاتصال بالسيرفر');
}
    };
    //8- بعد كدة نرسل الداتا بتاعتنا لاكونتينج فى تراى مكونة من12 نقطة
    //(تراي+كونست فى اى بلا اي +ميثود وهيدرزو بادى+وايف +بعد كدة رسالة تاكيد +وتحديث المصفوفة + واستخدام نيفاجيت عشان تبعت للصفحة +وكاتش وايرور)
      //
    return (
        <div className="checkout-container">
            <h2>إتمام عملية الشراء</h2>
            <Toaster />
            <div className="order-summary" style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>ملخص المنتجات</h3>
                {itemsToProcess.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p>العدد: {item.Qty}</p>
                        <p>اسم المنتج: {item.name}</p>
                        <p>السعر: {parseFloat(item.price).toFixed(2)} جنيه</p>
                        <p>كود المنتج: {item.id}</p>
                    </div>
                ))}
                <hr />
                <p>التاريخ: {currentDate}</p>
                <p> الاجمالى قبل الضريبة: {subtotal.toFixed(2)} جنيه</p>
                <p>ضريبة القيمة المضافة: {tax.toFixed(2)} جنيه</p>
                <p>الخصم: {discount.toFixed(2)} جنيه</p>
                <h3>الإجمالي النهائي: {totalCalculated.toFixed(2)} جنيه</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="الاسم بالكامل" onChange={handleChange} required />
                <input name="address" placeholder="العنوان" onChange={handleChange} required />
                <input name="phone" placeholder="رقم الهاتف" onChange={handleChange} required />

               <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'row', gap: '12px',marginLeft:'65px' }}>
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#fff' ,fontSize:'25px'}}>
                        <input type="radio" name="paymentMethod" value="cash" onChange={(e) => setPaymentMethod(e.target.value)} required />
                      دفع عند الاستلام
                    </label>

                    <label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#fff',marginRight:'50px' }}>
                        <input type="radio" name="paymentMethod" value="card" onChange={(e) => setPaymentMethod(e.target.value)} required />
                     بطاقة ائتمانية                         
                    </label>
                         </label>
                      </div>
                
                {paymentMethod === 'card' && (
                    <div className="card-fields" style={{ display: 'flex', flexDirection: 'column' }}>
                        <input name="card" placeholder="رقم البطاقة" onChange={handleChange} required  dir="rtl"/>
                        <input name="cvv" placeholder="رقم تأكيد البطاقة (CVV)" onChange={handleChange} required dir="rtl" />
                    </div>
                    
                )}
                
                <button type="submit" style={{ marginTop: '20px' }}>تأكيد الطلب</button>
            </form>
        </div>
        

            
    );
}

export default Checkout;