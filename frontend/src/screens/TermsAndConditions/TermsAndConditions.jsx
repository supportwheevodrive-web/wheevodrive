import React from "react";
import {
  FaShieldAlt,
  FaGavel,
  FaHandshake,
  FaUserCheck,
  FaFileContract,
  FaMoneyBillWave,
  FaUserSecret,
  FaExclamationTriangle,
  FaRegCheckCircle,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCar,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      {/* Hero Section */}
      <div className="terms-hero">
        <div className="terms-hero-overlay"></div>
        <div className="terms-hero-content">
          <div className="terms-hero-icon">
            <FaGavel />
          </div>
          <h1>Terms & Conditions</h1>
          <p>
            Welcome to WheevoDrive. Please read these terms carefully before
            using our platform.
          </p>
          <div className="terms-hero-badges">
            <span className="badge">
              <MdVerified /> Last Updated: January 2026
            </span>
            <span className="badge">
              <FaRegCheckCircle /> Effective Immediately
            </span>
          </div>
        </div>
      </div>

      <div className="terms-content">
        {/* Quick Navigation */}
        <div className="quick-nav">
          <div className="nav-item">
            <FaHandshake />
            <span>Agreement</span>
          </div>
          <div className="nav-item">
            <FaUsers />
            <span>User Accounts</span>
          </div>
          <div className="nav-item">
            <FaCar />
            <span>Listings</span>
          </div>
          <div className="nav-item">
            <FaMoneyBillWave />
            <span>Payments</span>
          </div>
          <div className="nav-item">
            <FaShieldAlt />
            <span>Privacy</span>
          </div>
          <div className="nav-item">
            <FaFileContract />
            <span>Terms</span>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">01</span>
            <div>
              <h2>Agreement to Terms</h2>
              <p>By using our platform, you agree to be bound by these terms</p>
            </div>
          </div>
          <div className="content-card">
            <p>
              By accessing or using WheevoDrive's website, mobile application,
              and services, you agree to be bound by these Terms and Conditions.
              If you do not agree to these terms, please do not use our
              platform.
            </p>
            <div className="agreement-highlights">
              <div className="highlight-item">
                <FaRegCheckCircle />
                <span>
                  You must be at least 18 years old to use our platform
                </span>
              </div>
              <div className="highlight-item">
                <FaRegCheckCircle />
                <span>
                  You agree to provide accurate and complete information
                </span>
              </div>
              <div className="highlight-item">
                <FaRegCheckCircle />
                <span>
                  You are responsible for maintaining the confidentiality of
                  your account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Accounts Section */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <div>
              <h2>User Accounts</h2>
              <p>Everything you need to know about your account</p>
            </div>
          </div>
          <div className="account-grid">
            <div className="account-card">
              <div className="account-icon">
                <FaUserCheck />
              </div>
              <h3>Registration</h3>
              <ul>
                <li>Create an account with valid email and phone</li>
                <li>Provide accurate personal information</li>
                <li>Accept verification process for dealers</li>
                <li>Agree to our privacy policy</li>
              </ul>
            </div>
            <div className="account-card">
              <div className="account-icon">
                <FaUserSecret />
              </div>
              <h3>Security</h3>
              <ul>
                <li>Keep your password confidential</li>
                <li>Notify us of unauthorized access</li>
                <li>Use strong passwords for security</li>
                <li>Enable two-factor authentication</li>
              </ul>
            </div>
            <div className="account-card">
              <div className="account-icon">
                <FaExclamationTriangle />
              </div>
              <h3>Termination</h3>
              <ul>
                <li>We may suspend or terminate accounts</li>
                <li>Violation of terms leads to suspension</li>
                <li>Fraudulent activities are reported</li>
                <li>You may delete your account anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Car Listings Section */}
        <div className="terms-section highlight-section">
          <div className="section-header">
            <span className="section-number">03</span>
            <div>
              <h2>Car Listings & Dealer Responsibilities</h2>
              <p>Guidelines for listing and selling vehicles</p>
            </div>
          </div>
          <div className="listing-guidelines">
            <div className="guideline-card">
              <div className="guideline-icon">📋</div>
              <h3>Accurate Listings</h3>
              <ul>
                <li>Provide complete and accurate vehicle details</li>
                <li>Include high-quality photos from all angles</li>
                <li>Mention any defects or damages honestly</li>
                <li>Update listing status when sold</li>
              </ul>
            </div>
            <div className="guideline-card">
              <div className="guideline-icon">🏷️</div>
              <h3>Pricing & Payments</h3>
              <ul>
                <li>Set fair and transparent prices</li>
                <li>Mention additional charges if any</li>
                <li>Payment processing through Razorpay</li>
                <li>Refunds subject to terms</li>
              </ul>
            </div>
            <div className="guideline-card">
              <div className="guideline-icon">🤝</div>
              <h3>Dealer Conduct</h3>
              <ul>
                <li>Respond to inquiries promptly</li>
                <li>Be honest and transparent with buyers</li>
                <li>Maintain professional communication</li>
                <li>Resolve disputes amicably</li>
              </ul>
            </div>
            <div className="guideline-card">
              <div className="guideline-icon">📝</div>
              <h3>Documentation</h3>
              <ul>
                <li>Keep all vehicle documents ready</li>
                <li>Provide RC, insurance, and service records</li>
                <li>Verify documents before sale</li>
                <li>Ensure legal compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">04</span>
            <div>
              <h2>Payments & Subscriptions</h2>
              <p>Understanding our payment policies</p>
            </div>
          </div>
          <div className="payment-grid">
            <div className="payment-card">
              <div className="payment-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Subscription Plans</h3>
              <ul>
                <li>
                  <strong>Free Plan:</strong> Basic features at ₹0
                </li>
                <li>
                  <strong>Pro Plan:</strong> ₹99/month - 20 listings
                </li>
                <li>
                  <strong>Elite Plan:</strong> ₹499/month - Unlimited listings
                </li>
                <li>Upgrade or cancel anytime</li>
              </ul>
            </div>
            <div className="payment-card">
              <div className="payment-icon">
                <FaHandshake />
              </div>
              <h3>Payment Processing</h3>
              <ul>
                <li>Secure payments via Razorpay</li>
                <li>Multiple payment options available</li>
                <li>Auto-renewal for subscriptions</li>
                <li>Full payment before activation</li>
              </ul>
            </div>
            <div className="payment-card">
              <div className="payment-icon">
                <FaFileContract />
              </div>
              <h3>Refund Policy</h3>
              <ul>
                <li>No refunds for subscription fees</li>
                <li>Partial refunds at discretion</li>
                <li>Refund processing within 7 days</li>
                <li>Service interruptions refunds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Conduct Section */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">05</span>
            <div>
              <h2>User Conduct</h2>
              <p>Expected behavior on our platform</p>
            </div>
          </div>
          <div className="conduct-grid">
            <div className="conduct-item">
              <div className="conduct-icon">✅</div>
              <div>
                <h3>Do's</h3>
                <ul>
                  <li>Be respectful and professional</li>
                  <li>Provide accurate information</li>
                  <li>Respond to inquiries promptly</li>
                  <li>Report suspicious activities</li>
                  <li>Follow all legal requirements</li>
                </ul>
              </div>
            </div>
            <div className="conduct-item">
              <div className="conduct-icon">❌</div>
              <div>
                <h3>Don'ts</h3>
                <ul>
                  <li>Post fraudulent or fake listings</li>
                  <li>Harass or spam other users</li>
                  <li>Share misleading information</li>
                  <li>Use platform for illegal activities</li>
                  <li>Attempt to hack or breach security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">06</span>
            <div>
              <h2>Intellectual Property</h2>
              <p>Content ownership and usage rights</p>
            </div>
          </div>
          <div className="ip-content">
            <div className="ip-card">
              <h3>🔒 Our Content</h3>
              <p>
                All content on WheevoDrive, including text, graphics, logos,
                icons, and software, is the property of WheevoDrive and
                protected by copyright laws.
              </p>
            </div>
            <div className="ip-card">
              <h3>📷 User Content</h3>
              <p>
                By posting content, you grant WheevoDrive a non-exclusive,
                royalty-free license to use, display, and distribute your
                content on our platform.
              </p>
            </div>
            <div className="ip-card">
              <h3>🚫 Prohibited Use</h3>
              <p>
                You may not copy, reproduce, distribute, or create derivative
                works from our content without explicit permission.
              </p>
            </div>
          </div>
        </div>

        {/* Liability Section */}
        <div className="terms-section highlight-section">
          <div className="section-header">
            <span className="section-number">07</span>
            <div>
              <h2>Limitation of Liability</h2>
              <p>Understanding our liability limits</p>
            </div>
          </div>
          <div className="liability-content">
            <div className="liability-grid">
              <div className="liability-card">
                <div className="liability-icon">⚠️</div>
                <h3>Disclaimer</h3>
                <p>
                  WheevoDrive provides the platform "as is" without warranties
                  of any kind. We do not guarantee the accuracy of listings or
                  the quality of vehicles.
                </p>
              </div>
              <div className="liability-card">
                <div className="liability-icon">🛡️</div>
                <h3>Limitation</h3>
                <p>
                  In no event shall WheevoDrive be liable for any indirect,
                  incidental, or consequential damages arising from your use of
                  the platform.
                </p>
              </div>
              <div className="liability-card">
                <div className="liability-icon">⚖️</div>
                <h3>Indemnification</h3>
                <p>
                  You agree to indemnify and hold WheevoDrive harmless from any
                  claims arising from your use of the platform or violation of
                  these terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="terms-section">
          <div className="section-header">
            <span className="section-number">08</span>
            <div>
              <h2>Changes to Terms</h2>
              <p>We may update these terms from time to time</p>
            </div>
          </div>
          <div className="changes-content">
            <div className="changes-notice">
              <div className="notice-icon">🔄</div>
              <div>
                <h3>Updates & Notifications</h3>
                <ul>
                  <li>
                    We reserve the right to modify these terms at any time
                  </li>
                  <li>Changes become effective immediately upon posting</li>
                  <li>Significant changes will be notified via email</li>
                  <li>Continued use constitutes acceptance of new terms</li>
                  <li>Review terms periodically for updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="terms-footer">
          <p>
            By using WheevoDrive, you agree to these Terms and Conditions. Thank
            you for being part of our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
