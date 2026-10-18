// src/pages/Men.jsx
import React from 'react';
import { products } from '../data'; // استيراد البيانات
import { Link } from 'react-router-dom';
 
  //1-   هما 4اول حاجة hooks  والاستيراد  
export default function Men() {
  //2- الدالة 
  const menProducts = products.filter(p => p.category === 'men');
 {/*3- هنعمل مصفوفة هيتخزن فيها المنتجات بتاتعت الرجالة بس عن طريق فيلتر*/}
  return (
    //4- ريترن
    <div className="men-page-container">
   
    <h1>Men's Collection</h1>

          

      <div className="men-products-grid">
           {/* 6-  هنعمل ديف يكون فيها استدعاء المنتج بتاع الرجال فى المصفوفى الى عملناها*/}
            {/*7- وهنعمل لينك  بيقول ان كل منتج هيتم الضغط عليه هنروح لمسار تانى بناء على الاى دى*/}
             {/*8- بعد كدة هنعمل كلاس فيه هنستدعى فيه الصورة والاسم بتاعها */}
               {/*9- وهنعمل كلاس فيه الاسم والسعر وال اى دى  */}
               {/*10- بعد كدة هنقفل اللينك والديفين */}

        {menProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price:{product.price}</p>
            <p>Id:{product.id}</p>
            <p>Qty:{product.Qty}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


