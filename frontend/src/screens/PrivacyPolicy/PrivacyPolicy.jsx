import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserSecret,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaRegCheckCircle,
  FaRegCircle,
  FaArrowRight,
  FaUserShield,
  FaServer,
  FaRegClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      {/* Hero Section */}
      <div className="privacy-hero">
        <div className="privacy-hero-overlay"></div>
        <div className="privacy-hero-content">
          <div className="privacy-shield-icon">
            <FaShieldAlt />
          </div>
          <h1>Privacy Policy</h1>
          <p>
            Your trust is our priority. We're committed to protecting your data.
          </p>
          <div className="privacy-hero-badges">
            <span className="badge">
              <MdVerified /> 100% Secure
            </span>
            <span className="badge">
              <FaRegClock /> Updated July 03 2025
            </span>
          </div>
        </div>
      </div>

      <div className="privacy-content">
        {/* Quick Navigation */}
        <div className="quick-nav">
          <div className="nav-item">
            <FaUserSecret />
            <span>Data Collection</span>
          </div>

          <div className="nav-item">
            <FaShieldAlt />
            <span>Security</span>
          </div>
          <div className="nav-item">
            <FaRegCheckCircle />
            <span>Your Rights</span>
          </div>
        </div>

        {/* Data Collection Section */}
        <div className="privacy-section">
          <div className="section-header">
            <span className="section-number">01</span>
            <div>
              <h2>Information We Collect</h2>
              <p>
                We collect essential information to provide you with the best
                experience
              </p>
            </div>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="card-icon">
                <FaUserSecret />
              </div>
              <h3>Personal Information</h3>
              <ul>
                <li>Full name and contact details</li>
                <li>Email address and phone number</li>
                {/* <li>Physical address for dealers</li>
                <li>Government ID for verification</li>
                <li>Business registration details</li> */}
              </ul>
            </div>

            <div className="info-card">
              <div className="card-icon">
                <FaCookie />
              </div>
              <h3>Cookies & Tracking</h3>
              <ul>
                <li>Session cookies for login</li>
                {/* <li>Preference and settings</li> */}
                <li>Analytics and performance</li>
                {/* <li>Third-party tracking</li>
                <li>Marketing preferences</li> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Data Usage Section */}
        <div className="privacy-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <div>
              <h2>How We Use Your Information</h2>
              <p>Every piece of data helps us serve you better</p>
            </div>
          </div>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="use-case-icon">🔐</div>
              <h3>Account Management</h3>
              <p>
                Create and manage your account, verify identity, and provide
                customer support.
              </p>
              <div className="use-case-line"></div>
            </div>

            <div className="use-case-card">
              <div className="use-case-icon">🛡️</div>
              <h3>Security & Safety</h3>
              <p>
                Protect against fraud, unauthorized access, and ensure platform
                security.
              </p>
              <div className="use-case-line"></div>
            </div>
            <div className="use-case-card">
              <div className="use-case-icon">🤝</div>
              <h3>Dealer Verification</h3>
              <p>
                Verify dealer credentials to maintain trust and transparency on
                our platform.
              </p>
              <div className="use-case-line"></div>
            </div>
          </div>
        </div>

        {/* Data Sharing Section */}
        <div className="privacy-section">
          <div className="section-header">
            <span className="section-number">03</span>
            <div>
              <h2>Data Sharing & Disclosure</h2>
              <p>
                We share your data only when necessary and with your consent
              </p>
            </div>
          </div>
          <div className="sharing-grid">
            <div className="sharing-card">
              <div className="sharing-icon">🤝</div>
              <h3>With Dealers</h3>
              <p>
                When you contact a dealer, your contact information is shared to
                facilitate communication.
              </p>
            </div>
            <div className="sharing-card">
              <div className="sharing-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>
                Payment processing is handled through Razorpay. We don't store
                your payment details.
              </p>
            </div>
            <div className="sharing-card">
              <div className="sharing-icon">📊</div>
              <h3>Analytics Partners</h3>
              <p>
                We use Google Analytics and other tools to understand user
                behavior and improve services.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="privacy-footer">
          <p>
            By using WheevoDrive, you agree to our Privacy Policy. We're
            committed to protecting your data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
