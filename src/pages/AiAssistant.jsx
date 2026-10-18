import React, { useState } from 'react';

export default function AiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setReply('');

    try {
      const response = await fetch('https://backend-ecommerce-production-0cc8.up.railway.app/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success) {
        setReply(data.reply);
      } else {
        setReply('حدث خطأ: ' + (data.error || 'غير معروف'));
      }
    } catch (err) {
      console.error(err);
      setReply('تعذر الاتصال بالسيرفر، تأكد من تشغيل الباك إند.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>مساعد الذكاء الاصطناعي للمتجر</h2>
      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <textarea
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="اكتب سؤالك أو طلبك هنا..."
          style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {loading ? 'جاري الإرسال...' : 'إرسال للـ AI'}
        </button>
      </form>

      {reply && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px', border: '1px solid #dee2e6' }}>
          <strong>الرد:</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{reply}</p>
        </div>
      )}
    </div>
  );
}