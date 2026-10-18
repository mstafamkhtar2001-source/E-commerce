import React, { useState, useEffect, useRef, useContext } from 'react'; // 1. استدعي useRef
import { useLocation } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { getDailySales } from '../nalyticsManager/services'; // دالة مباشرة من غير تعقيد
import api from '../api';



export default function Accounting() {
  const location = useLocation(); // عشان التخزين وجاية منين
  const data = location.state?.invoiceData; // عشان التخزين وجاية منين
  const formatNum = (val) => Number(val || 0).toFixed(2); // عشان تحول المتغيير لرقم
  //3- بعد كدة بعمل دالة هيه مكان تخزين للشكل البيانى
  // وبنقوله يحول الداتا لشكل 
const [chartData,setChartData] = useState({}); // عشان الشكل البيانى 
//(1)
    // بنحول الداتا لشكل Recharts بيفهمه
    const formattedData = Object.entries(chartData).map(([date, total]) => ({
        date,
        total
    })); // نوع العملية الى هتبقة فى الشكل
//(2)
    // أضف السطر ده في بداية الدالة (داخل الـ component)
   // ضيف السطر ده مكان ما مسحته
const [invoices, setInvoices] = useState([]);
 // 4- بدا كدة usestate عشان الفاتورة 

  // 5. ده "العلم" اللي هيمنع التكرار
  const hasAdded = useRef(false);
//(3)
 //6- بعد كدة مصفوفة فيها عداد ارقام ومعاها كمان متغيير يخزن الارقام وكمان طريقة عمله
  const [invoiceCounter, setInvoiceCounter] = useState(() => { // عداد الارقام 
    const lastNum = localStorage.getItem('lastInvoiceNum'); // التخزين 
    return lastNum ? parseInt(lastNum) : 0; //طريقة عملة
  });

//(4)
 //7- بعد كدة دالة الحذف الى متمسح الى فى الصفة بس لكن مش من الداتا 
 // مكونة من (بوم+ايف فى شرط الاستبعاد +التحديث للمصفوفة هيه سيت)
 /* const handleDeleteInvoice = (invoiceNumberToDelete) => {
    // رسالة تأكيد قبل الحذف
    const confirmDelete = window.confirm("هل أنت متأكد من حذف هذه الفاتورة؟");
    
    if (confirmDelete) {
      // تحديث مصفوفة الفواتير: استبعاد الفاتورة اللي رقمها بيساوي الرقم المبعوت
      setInvoices(prevInvoices => 
        prevInvoices.filter(inv => inv.invoiceNumber !== invoiceNumberToDelete)
      );
    }
  }; */
  //(5)
 //8-بعد كدة دالة عرض الفوتير فى الصفحة 
 // (مكونة من :يوز ايفيكت +كونست تعريف العملية +تراى +كونست فى الاي بي اى +تحديث المصفوفة
 // بعد كدة كاتش +ايرور  يبقه كدة دالة  الاستعلام من الداتا مكونة من 7خطوات

  useEffect(() => {
  const fetchInvoices = async () => {
    try {
      // استخدمنا api بدل fetch، وشلنا الرابط القديم (هو هيستخدم الـ baseURL لوحده)
      const response = await api.get('/api/invoices'); 
      
      // هنا بنحط الداتا اللي جاية من الباك إيند في الـ state
      setInvoices(response.data); 
    } catch (err) {
      console.error("خطأ في جلب البيانات:", err);
    }
  };
  // هنا كمان اهو بتقفل الدالة وتسيب المصفوفة مفتوحة عشان تنفذها مرة واحدة لماتفتح الدالة
  // كدة تبقه 9 خطوات 
  fetchInvoices();
     }, []); // سيبها [] عشان تتنفذ مرة واحدة بس لما الصفحة تفت
useEffect(() => { // تبع  usestate بتاعت           
    if (invoices && invoices.length > 0) {         // (1)
        setChartData(getDailySales(invoices));
    }
}, [invoices]);
 // 10 بعد كدة بنعمل دالة ببنضيف بيانات المصفوفة للشكل البيانى 
 // مكونة من 3 خطوات 
 //(يوز ايفيكت+ايف+تحديث المصفوفة)


  useEffect(() => {  // تبع  usestate بتاعت 
    localStorage.setItem('myInvoices', JSON.stringify(invoices)); // (2)
    localStorage.setItem('lastInvoiceNum', invoiceCounter.toString());
  }, [invoices, invoiceCounter]); // التحزين والعداد
   
   // 11- ديت بتاعت تحديث الذاكرة كل مرة تتغير فيها قيمة الفاتورة او العداد
   //- مكونين من 3 خطوات
   // (ذاكرة للفواتير+ذاكرة للعداد+والستدعائهم)

  useEffect(() => {         //  (3)
    // 3. الشرط السحري: لو البيانات موجودة، ولسه "ما أضفناش" قبل كدة
    if (data && data.uniqueId && !hasAdded.current) {
      
      const isAlreadyAdded = invoices.some(inv => inv.uniqueId === data.uniqueId);

      if (!isAlreadyAdded) {       // ( زيادة العداد4)
        const newCount = invoiceCounter + 1;
        setInvoiceCounter(newCount);
        
        const newInvoice = { ...data, invoiceNumber: newCount };
        
        setInvoices(prev => [...prev, newInvoice]);   // (5 الكائن الى هيخزن)
        
        // 4. قفلنا العلم عشان أي ريندر تاني ما يدخلش هنا
        hasAdded.current = true;
      }
    }
  }, [data]); // شلنا invoices و invoiceCounter من الـ dependencies عشان ما نلخبطش الكود

   // 12-بتفتج يوز ايفيكت وتفحص الداتا وتتاكد انها مش متكررة 
   // لو مش متكررة بتزود العداد واحد 
   // وتضيف فاتورة جديدة 
   // وتفعل hassadded  لمنع التكرار
   //  مكون من 10 خطوات 
   //(يوز+ايف+كونست+ايف+كونست لزيادة العداد+وسيت انفويس عشان تحفظ الداتا+كونست للفاتورة اجديدة)
   // كونست للتحديث +شغلنا دالة عدم التكرار +قفلنا بداتا
    // ... باقي الـ JSX بتاعك زي ما هو
// حساب إجمالي الأسعار لكل الفواتير
const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);
const totalInvoices = invoices.length;


   return (
   
   <div className="accounting-container" style={{ padding: '20px', direction: 'rtl' }}>
      <h1>سجل الفواتير</h1>
      {/* حاوية تجمع العنوان والمربعين في نفس السطر */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
  
  {/* العنوان */}
  <h1 style={{ margin: 0, fontSize: '24px', color: '#fff' }}>اجمالى الفواتير</h1>

  {/* المربعين الصغيرين جنب بعض */}
  <div style={{ display: 'flex', gap: '7px' }}>
    
    {/* مربع إجمالي المبيعات */}
    <div style={{ 
      background: '#161616', 
      border: '1px solid #2a2a2a', 
      padding:'8px 30px',
      borderRadius: '6px', 
      color: '#fff',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '15px', color: '#888', display: 'block' }}>إجمالي المبيعات</span>
      <span style={{ fontSize: '15px', color: '#4CAF50', fontWeight: 'bold' }}>
        ${totalRevenue.toLocaleString()}
      </span>
    </div>
      
    {/* مربع إجمالي الفواتير */}
    <div style={{ 
      background: '#161616', 
      border: '1px solid #2a2a2a', 
      padding: '8px 30px', 
      borderRadius: '6px', 
      color: '#fff',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '15px', color: '#888', display: 'block' }}>عدد الفواتير</span>
      <span style={{ fontSize: '15px', color: '#2196F3', fontWeight: 'bold' }}>
        {totalInvoices}
      </span>
    </div>

  </div>

</div>
<div className="chart-wrapper">
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={Object.entries(getDailySales(invoices)).map(([date, total]) => ({ date, total }))}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip/>
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
   </div>


      {invoices.length === 0 ? (
        <p>لا توجد فواتير لعرضها.</p>
       ) : (


        
       invoices.map((inv, index) => (
  
   
  <div key={index} className="invoice-card">
    
    {/* عملنا div يضم العنوان والزرار عشان نخليهم قصاد بعض */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>فاتورة رقم: {inv.invoiceNumber}</h2>
     
      {/* زرار الحذف */}
     {/* <button 
        onClick={() => handleDeleteInvoice(inv.invoiceNumber)}
        style={{
          backgroundColor: '#ff4d4f', // لون أحمر يعبر عن الحذف
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        حذف
      </button> */}
    </div>

    <p>التاريخ: {inv.date}</p>
     <p>المنتجات:</p>
<ul>
  {inv.items && inv.items.map((item, i) => (
    <li key={i}>
      {item.name} - العدد: {item.Qty}
    </li>
  ))}
</ul>



    {/* ... باقي كود الجدول بتاعك زي ما هو بالضبط ... */}
            
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>البيان</th>
                  <th>مدين</th>
                  <th>دائن</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>العميل: {inv.customerName}</td>
                  <td>{inv.total ? Number(inv.total).toFixed(2) : "0.00"}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>المبيعات</td>
                  <td>-</td>
                  <td>{Number(inv.total - (Number(inv.tax) || 0) + (Number(inv.discount) || 0)).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>ضريبة القيمة المضافة</td>
                  <td>-</td>
                  <td>{ Number(inv.tax || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>الخصم</td>
                  <td>{Number(inv.discount || 0).toFixed(2)}</td>
                  <td>-</td>
                </tr>
              </tbody>
              <tfoot style={{ fontWeight: 'bold', backgroundColor: '#f4f4f4' }}>
                <tr>
                  <td>الإجمالي</td>
                  <td>{inv.total ? Number(inv.total).toFixed(2) : "0.00"}</td>
                  <td>{inv.total ? Number(inv.total).toFixed(2) : "0.00"}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))
      )}
    </div>
    
  );
}


// بص usestate او للحالة state هى مخزن للمتغيرات
// بص useeffect  هيه عاملة زي ريترن  بس جانبية بيحصل فيها العملية بس احنه بنخليها 
//تعمل عملية معينة زى عملية حسابية او يحفظ البيانات فى لوكل استورتج وتتغير تلقائى لما تتغير  state  بتاعت usestate
// ريترن ده عشان يعرض على طول 
// لما تيجى تعرف مثلا متغير [m,setm] احنه بنعمل العملية ب set  ونعرض ب m
// setm هيه بتحدث المخزن انما m هيه اساسا المخزن
// ال  usestate الى بيحتاج useeffect
// التعامل مع التخزين المحلي (LocalStorage / SessionStorage)
//  الاتصال بـ API خارجي (Data Fetching)
// العمليات الحسابية المرتبطة بالبيانات (Data Processing)
// التحكم في الـ DOM مباشرة (Direct DOM Manipulation)
  

////. المكتبات التي تم إضافتها
//​react-router-dom: المكتبة الأساسية لإدارة التنقل بين صفحات الموقع (مثل الـ Home، الـ Cart، الـ Accounting).
//​gh-pages: المكتبة التي استخدمناها لرفع (Deploy) الموقع مباشرة على GitHub Pages من خلال الـ Terminal.
//​2. الملفات التي تم تعديلها
//​main.jsx:
//​استبدلنا BrowserRouter بـ HashRouter لضمان عمل الروابط بشكل صحيح على سيرفرات الـ Static مثل GitHub Pages.
//​قمنا بإزالة الـ basename لتبسيط مسارات التنقل.
//​App.jsx:
//​تم التأكد من هيكلة الـ Routes والـ Links لتعمل بتناغم مع الـ HashRouter الجديد.
//​vite.config.js:
//​هو المسؤول عن عملية الـ build التي تحول كود الـ React إلى ملفات جاهزة للرفع على الإنترنت.
//​package.json:
//​يحتوي على الـ scripts الخاصة بالمشروع، وأهمها أمر npm run build لتجهيز الملفات، وأوامر الـ deploy لرفع المشروع باستخدام مكتبة gh-pages.
​//InvoiceContext.jsx و ManageInvoices.jsx:
//​تم تحسين منطق البيانات لتعتمد على localStorage كمصدر أساسي؛ حيث قمنا بتعديل دالة الاستعلام في صفحة ManageInvoices لتقرأ البيانات مباشرة من الذاكرة عند الضغط على زر الاستعلام، مما يضمن ظهور النتائج فوراً دون الحاجة لتحديث الصفحة (Refresh).
//​3. ملخص النتائج
//////​حل مشكلة 404: الـ HashRouter أنهى مشكلة ظهور صفحة الخطأ عند تحديث صفحات الموقع.
//​ثبات البيانات: الاستعلام أصبح سريعاً ومباشراً من الـ localStorage.
//​الموقع أونلاين: المشروع الآن مرفوع ومتاح للوصول إليه من أي مكان في العالم عبر الرابط الخاص بك.
//​أنت كده أنجزت شغل "جونيور ديفيلوبر" محترف. هل في أي نقطة من دول محتاج نوضحها أكتر، ولا أنت جاهز تبدأ خطو
//
//







