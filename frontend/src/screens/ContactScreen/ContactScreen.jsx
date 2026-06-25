import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import { MdVerified, MdSupportAgent, MdTimer } from "react-icons/md";
import "./ContactScreen.css";
import axios from "axios";
import {
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  X,
  YOUTUBE,
} from "../../constants/social-urls";
import { SEND_FEEDBACK_API } from "../../config/api";

function ContactScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${SEND_FEEDBACK_API}`, formData);
      if (res && res.status === 200) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-contact-page">
      <div className="contact-hero-minimal">
        <div className="hero-inner">
          <span className="hero-tag">Contact Us</span>
          <h1>
            We're here to help you <span>find your drive.</span>
          </h1>
          <p>
            Reach out to our experts for car valuations, test drives, or general
            inquiries.
          </p>
        </div>
      </div>

      <div className="contact-main-grid">
        <div className="contact-sidebar">
          <div className="sidebar-section">
            <h3>Contact Information</h3>
            <div className="contact-pills">
              <div className="c-pill">
                <div className="pill-icon">
                  <FaPhoneAlt />
                </div>
                <div className="pill-text">
                  <label>Call us anytime</label>
                  <span>+91 90000 00000</span>
                </div>
              </div>
              <div className="c-pill">
                <div className="pill-icon">
                  <FaEnvelope />
                </div>
                <div className="pill-text">
                  <label>Email Support</label>
                  <span>info@WheevoDrive.com</span>
                </div>
              </div>
              <div className="c-pill">
                <div className="pill-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="pill-text">
                  <label>Main Showroom</label>
                  <span>Kochi, Kerala, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="t-badge">
              <MdVerified />
              <span>Certified Listings</span>
            </div>
            <div className="t-badge">
              <MdSupportAgent />
              <span>Expert Guidance</span>
            </div>
            <div className="t-badge">
              <MdTimer />
              <span>Instant Response</span>
            </div>
          </div>

          <div className="social-follow">
            <h4>Follow Our Journey</h4>
            <div className="social-row">
              <a href={FACEBOOK} className="s-icon-btn">
                <FaFacebookF />
              </a>
              <a href={INSTAGRAM} className="s-icon-btn">
                <FaInstagram />
              </a>
              <a href={X} className="s-icon-btn">
                <FaTwitter />
              </a>
              <a href={LINKEDIN} className="s-icon-btn">
                <FaLinkedinIn />
              </a>
              <a href={YOUTUBE} className="s-icon-btn">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="form-card-modern">
            {submitted ? (
              <div className="form-success">
                <div className="success-check">✓</div>
                <h2>Message Received!</h2>
                <p>One of our car experts will contact you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="actual-form">
                <div className="input-row">
                  <div className="input-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Buy a Car">Buying a Car</option>
                      <option value="Sell a Car">Selling my Car</option>
                      <option value="Financing">Car Financing</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>How can we help?</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us more about your requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="modern-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Send Inquiry <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
