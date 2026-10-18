import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useContext, useState } from 'react';
import { CartContext } from '../contexxt/CartContext';
import { useNavigate } from 'react-router-dom';
 //1-   هما 4اول حاجة hooks  والاستيراد 

function ProductDetails() {
  //2- الدالة 
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
   const [count, setcount] = useState(1);

// دوال الزيادة والنقصان
const increaseQty = () => setcount(prev => prev + 1);
const decreaseQty = () => setcount(prev => (prev > 1 ? prev - 1 : 1));
      // {/*تسمح بقراءة الاى دى من صفحة الرجال او النساء من داخل مصفوفة بروديكت بعد كدة كلمة بريسنت عشان نحول الاى دى لانتيجر عشان الاتنين يتطابقوا مع بعض/} 
      // {/*نقوم بالاستيراد لنتمكن من استخدام اد كارت */}
      // {/*4-روتر */}
       //{/*تسمح لنا بالتنقل البرمجى داخل التطبيق مثل شراء الان*/}
      // {/*4-روتر */}

  if (!product) {
    return <h2>المنتج غير موجود!</h2>;
  }

    {/*رسالة لو المنتج مش موجود*/}
  return (
    //{/*ريترن*/}
     
    <div className="product-details">
    
      {/* قسم الصورة والمعلومات الأساسية */}
       <div className="product-image">
          <img src={product.image} alt={product.name} />
      </div>
         
         
       
      <div className="product-info">
      
       <h1>{product.name}</h1>
       <p>الوصف:{product.الوصف}</p>
        <p>Price:{product.price}</p>
        <p>Id:{product.id}</p>
        <p>Qty:{count}</p>
         {/*هنعمل 3 ديفات واحد كبير وواحد يستقبل الصورة واسمها وواحد اسمها وسعرها والاي دى*/}
        <button onClick={() => {
    // 1. تنظيف السعر: هنشيل $ ونحول القيمة لرقم (Number)
    const cleanPrice = parseFloat(product.price.toString().replace('$', '').replace(',', ''));

    // 2. بنبعت نسخة جديدة من المنتج فيها السعر المتنظف
    addToCart({
        ...product,
        price: cleanPrice,
        count:count,
        Qty:count
    });

    alert(`${product.name} إضافة للسلة بنجاح`);
}}>
    إضافة إلى السلة
</button>
        <button onClick={() => {
  // بنبعت المنتج في مصفوفة عشان صفحة Checkout تستقبله كـ items
  navigate('/checkout', { state: { items: [{...product,count:count,Qty:count}] } });
}}>
  شراء الآن
  </button>

         {/*هنا هنستخدم نافيجات مع تمرير ستات للمنتج الى شيك اوت*/}  
{/* قسم التحكم في الكمية */}
<div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
  <span>الكمية:</span>
  <button onClick={decreaseQty} style={{ padding: '5px 12px', cursor: 'pointer' }}>-</button>
  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{count}</span>
  <button onClick={increaseQty} style={{ padding: '5px 12px', cursor: 'pointer' }}>+</button>
</div>

       
      {/* قسم الـ Tabs الجديد */}
      <div className="tabs-navigation">
        <button onClick={() => setActiveTab('details')}>تفاصيل المنتج</button>
        <button onClick={() => setActiveTab('reviews')}>المراجعات</button>
      </div>
            {/*هنا زرارين كل زرار عند الضغط عليه يغير قيمة اكتيف تاب باستخدام سيت اكتيف مع استخدام الشرط الى هما 3 يساوى */} 
      <div className="content-display">
  {activeTab === 'details' ? (
    <div>
      <p>{product.details}</p>
    </div>
     ) : (
    <div>
      <p>{product.reviews}</p>
    </div>
  
        )}
      </div>
    </div>
    </div>
    
)}
      {/*اقفل الديفات*/}

export default ProductDetails;