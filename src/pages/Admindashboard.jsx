import React, { useState, useEffect } from 'react';

export default function Admindashboard() {
  const [emailsList, setEmailsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEmails = async () => {
      try {
        const response = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/auth/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            
          }
        });

        if (!response.ok) {
          throw new Error('فشل في جلب البيانات من السيرفر');
        }

        const data = await response.json();
        setEmailsList(data);
      } catch (err) {
        console.error('خطأ:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmails();
  }, []);

  return (
    <div style={{ padding: '40px', color: '#fff', background: '#121212', minHeight: '100vh', direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', background: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333', boxShadow: '0 4px 10px rgba(0,0,0,0.5)',marginTop:'100px' }}>
        <h2 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px', marginBottom: '20px', color: '#4CAF50',textAlign:'center' }}>
          Admindashboard
        </h2>

        {loading ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>جاري تحميل الإيميلات...</p>
        ) : error ? (
          <p style={{ color: '#f44336', textAlign: 'center', padding: '20px' }}>خطأ: {error}</p>
        ) : (
          <div>
            <p style={{ fontSize: '16px', color: '#ccc', marginBottom: '20px',textAlign:'center' }}>
              إجمالي الإيميلات المسجلة: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{emailsList.length}</span>
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#333', textAlign: 'right' }}>
                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #444', color: '#4CAF50' }}>#</th>
                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #444', color: '#4CAF50' }}>البريد الإلكتروني</th>
                    <th style={{ padding: '12px 15px', borderBottom: '1px solid #444', color: '#4CAF50' }}>تاريخ الانضمام</th>
                  </tr>
                </thead>
                <tbody>
                  {emailsList.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>لا توجد إيميلات مسجلة حالياً</td>
                    </tr>
                  ) : (
                    emailsList.map((item, index) => (
                      <tr key={item._id || index} style={{ borderBottom: '1px solid #333' }}>
                        <td style={{ padding: '8px 10px', color: '#888',textAlign:'center'}}>{index + 1}</td>
                        <td style={{ padding: '8px 10px', color: '#fff', fontWeight: '500',fontSize:'11px',textAlign:'center'}}>
                          {item.email || item}
                        </td>
                        <td style={{ padding: '12px 15px', color: '#aaa', fontSize: '14px' }}>
                          {/* تحويل التاريخ لتنسيق عربي مقروء */}
                          {item.updatedAt
                            ? new Date(item.updatedAt).toLocaleString('ar-EG', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'غير محدد'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}