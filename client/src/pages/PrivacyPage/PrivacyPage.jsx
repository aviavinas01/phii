import React, { useEffect } from 'react';
import '../LegalPages.css';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-wrapper">
      <div className="legal-content">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last Updated: January 2026</p>

        <h2>1. Overview</h2>
        <p>Your privacy is respected. This Privacy Policy explains how limited information may be collected and used when you visit this personal portfolio website.</p>

        <h2>2. Information Collected</h2>
        <p><strong>a. Personal Information (Only if Provided by You)</strong><br/>
        If you contact me via a form or email, you may voluntarily provide:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Message content</li>
        </ul>
        <p>This information is used only to respond to your inquiry.</p>

        <p><strong>b. Non-Personal Information</strong><br/>
        Basic analytics data may be collected, such as:</p>
        <ul>
          <li>Browser type</li>
          <li>Device type</li>
          <li>Pages visited</li>
          <li>General location (country-level)</li>
        </ul>
        <p>This data helps understand website performance and improve presentation.</p>

        <h2>3. Use of Information</h2>
        <p>Any collected information is used solely for:</p>
        <ul>
          <li>Communication purposes</li>
          <li>Website improvement</li>
          <li>Professional correspondence</li>
        </ul>
        <p>Your data is never sold, rented, or shared with third parties for marketing.</p>

        <h2>4. Cookies</h2>
        <p>This website may use minimal cookies for basic analytics and performance optimization. You can disable cookies through your browser settings if you prefer.</p>

        <h2>5. Third-Party Services</h2>
        <p>If analytics tools or embedded content (e.g., Instagram embeds) are used, those services may collect data according to their own privacy policies. I do not control third-party data handling practices.</p>

        <h2>6. Data Security</h2>
        <p>Reasonable measures are taken to protect submitted information. However, no online transmission is completely secure.</p>

        <h2>7. Your Rights</h2>
        <p>You may request access to your submitted information, or request correction or deletion of your data. Simply contact me at the email below.</p>

        <h2>8. Updates to This Policy</h2>
        <p>This Privacy Policy may be updated as the website evolves. Changes will be reflected on this page.</p>

        <h2>9. Contact</h2>
        <p>For privacy-related questions:<br/>
        Email: contact@divine.com</p>
      </div>
    </div>
  );
}