// src/components/MainVideo/MainVideo.jsx
import './Mainvideo.css';
// Adjust this path to point to where your video actually is
import promoVideo from '../../assets/Videos/HomeVideo.mp4'; 

export default function MainVideo() {
  return (
    <section className="main-video-section">
      <video
        className="main-video-bg"
        src={promoVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="main-video-overlay">
        <div className="main-video-text">
          <h1>Form & Fabric</h1>
          <p>Bridal and evening wear built on traditional techniques and modern shapes.</p> 
        </div>
      </div>
    </section>
  );
}