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
          <h1>Elevated Form</h1>
          <p>A curated portfolio of modern, <br></br>
             bridal, and traditional fashion designs <br></br>
             exploring the intersection of fabric and architecture.</p>
          
            <button className="main-video-button">
                <span>View Collection</span>
            </button>
          
        </div>
      </div>
    </section>
  );
}