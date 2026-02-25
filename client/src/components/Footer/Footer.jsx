import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="footer-top">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">OPIHAGE</h2>
          <p className="footer-desc">
            Available for bespoke commissions and<br />
            collaborative editorial projects worldwide.
          </p>
        </div>

        {/* Contact Column */}
        <div className="footer-col">
          <h3 className="footer-heading">CONTACT</h3>
          <ul className="footer-list">
            <li><a href="mailto:studio@aura.com">contact@opihage.com</a></li>
            <li><a href="tel:+1234567890">+91 (234) 567-8901</a></li>
          </ul>
        </div>

        {/* Social Column */}
        <div className="footer-col">
          <h3 className="footer-heading">SOCIAL</h3>
          <ul className="footer-list">
            <li><a href="https://www.instagram.com/opihage__24?igsh=N3J4OW52cnE5eGVl" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://pin.it/5mQoH0OwI" target="_blank" rel="noreferrer">Pinterest</a></li>
            <li><a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="footer-bottom">
        <p className="copyright">© 2026 Aura Studios. All rights reserved.</p>
        <div className="legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}