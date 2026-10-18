import React from 'react';
import { Link } from 'react-router-dom';
import { heroBanner, womensImg, mensImg, hm } from '../AppRoutes';
import { products } from '../data';
  import  { useState, useRef } from 'react';
//1-   هما 4اول حاجة hooks  والاستيراد  

export default function Home() {




  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // حالة تشغيل الفيديو
  const videoRef = useRef(null);

  // دالة التحكم في الصوت
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // دالة التحكم في التشغيل والإيقاف
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // عكس الحالة
    }
  };

  
  //2- الدالة 
  return (
     //3- ريترن
    <div className="home-content">
     {/* <section className="hero-banner">
        <img src={heroBanner} alt="Season Sale" />
      </section>
       {/*4- كونتينر كبير فيه سيشن الهيرو جوة السيشن الصورة واقفل السيشن على كدة*/}

      <section className="categories-section">
        <Link to="/women" className="card"><img src={womensImg} alt="Women" /></Link>
        <Link to="/men" className="card"><img src={mensImg} alt="Men" /></Link>
      </section>
       {/*5-   سيشن فيه لينك وجو اللينك كلاس لصفحة الرجال مع الصورة بتاعتهم واقفل اللينك على كدة وبردة واحد للبنات واقفل السيشن على كدة */}

      <section className="featured-products">
      <h2>BRAND HIGHLIGHTS</h2>
      <div className="home-products-grid">
        <video 
          ref={videoRef}
          src={hm} 
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          style={{ width: '60%', borderRadius: '10px '  }}
        />
        
        {/* أزرار التحكم */}
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={togglePlay}>
            {isPlaying ? "⏸️ إيقاف الفيديو" : "▶️ تشغيل الفيديو"}
          </button>
          
          <button onClick={toggleMute}>
            {isMuted ? "🔇 تشغيل الصوت" : "🔊 كتم الصوت"}
          </button>
        </div>
      </div>
    </section>
    </div>
  );
  }


 