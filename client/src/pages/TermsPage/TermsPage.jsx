import React, { useEffect } from 'react';
import '../LegalPages.css';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-content">
        <h1 className="legal-title">Terms of Use</h1>
        <p className="legal-updated">Last Updated: March 2026</p>

        <h2>1. Introduction</h2>
        <p>Welcome to Divine. This website serves as a personal fashion portfolio showcasing creative work, projects, and related content. By accessing or using this website, you agree to the terms outlined below. If you do not agree with these terms, please refrain from using the site.</p>

        <h2>2. Purpose of the Website</h2>
        <p>This website is intended for:</p>
        <ul>
          <li>Displaying personal fashion designs, concepts, and visual work</li>
          <li>Professional viewing by clients, collaborators, or recruiters</li>
          <li>Non-commercial browsing and inspiration</li>
        </ul>
        <p>No content is intended as professional, legal, or commercial advice.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content on this website—including but not limited to:</p>
        <ul>
          <li>Designs</li>
          <li>Photographs</li>
          <li>Videos</li>
          <li>Text</li>
          <li>Logos and branding</li>
        </ul>
        <p>is the intellectual property of Divine, unless otherwise stated. You may not copy, reproduce, distribute, modify content, use content for commercial purposes, or claim ownership of any showcased work without prior written permission.</p>

        <h2>4. Permitted Use</h2>
        <p>You may:</p>
        <ul>
          <li>View and browse the website for personal or professional reference</li>
          <li>Share links to the website (without altering content)</li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>Scrape or download content in bulk</li>
          <li>Misrepresent the work as your own</li>
          <li>Use the site in a way that disrupts its functionality</li>
        </ul>

        <h2>5. External Links</h2>
        <p>This website may contain links to third-party platforms (e.g., Instagram, Behance, LinkedIn). I am not responsible for the content or practices of external websites, or any loss or damage arising from third-party links.</p>

        <h2>6. Limitation of Liability</h2>
        <p>This website is provided “as is.” While efforts are made to ensure accuracy, I do not guarantee that all content is always complete, current, or error-free. I am not liable for any direct or indirect damages, or loss arising from the use or inability to use this website.</p>

        <h2>7. Changes to Terms</h2>
        <p>These Terms may be updated occasionally to reflect changes in content or legal requirements. Continued use of the website implies acceptance of updated terms.</p>

        <h2>8. Contact</h2>
        <p>For permissions, inquiries, or concerns:<br/>
        Email: contact@divine.com</p>
      </div>
    </div>
  );
}