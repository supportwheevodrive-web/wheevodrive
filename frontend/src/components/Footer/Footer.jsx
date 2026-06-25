import React, { useState } from "react";
import "./Footer.css";
import {
  Email,
  LocationOn,
  Phone,
  ArrowUpward,
  Send,
} from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";
import Swal from "sweetalert2";

function Footer() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      await axios.post(ADD_SUBSCRIPTION_URL, { email });
      setLoading(false);
      Swal.fire({
        title: "Subscribed!",
        text: "Welcome to WheevoDrive!",
        icon: "success",
        confirmButtonColor: "#ff0030",
      });
      setEmail("");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Note",
        text: "You are already subscribed.",
        icon: "info",
        confirmButtonColor: "#ff0030",
      });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", path: "/" },
        { name: "Inventory", path: "/used-cars" },
        { name: "Services", path: "/services" },
        { name: "Blog", path: "/blogs" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "About Us", path: "/about-us" },
        { name: "Contact Us", path: "/contact-us" },
        { name: "FAQs", path: "/faqs" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="dark-premium-footer">
      <div className="footer-main-grid">
        <div className="footer-brand-info">
          <div className="footer-logo">
            <h2>
              Car<span>Auras</span>
            </h2>
          </div>
          <p className="brand-pitch">
            Kerala's elite platform for premium pre-owned vehicles. Quality,
            trust, and performance in every drive.
          </p>
          <div className="footer-contact-details">
            <div className="c-item">
              <Phone /> <span>+91 90000 00000</span>
            </div>
            <div className="c-item">
              <Email /> <span>info@WheevoDrive.com</span>
            </div>
            <div className="c-item">
              <LocationOn /> <span>Kochi, Kerala, India</span>
            </div>
          </div>
        </div>

        {footerLinks.map((section, idx) => (
          <div key={idx} className="footer-nav-col">
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-social-col">
          <h4>Follow Us</h4>
          <div className="social-pill-group">
            <a href="https://facebook.com" className="social-pill">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" className="social-pill">
              <InstagramIcon />
            </a>
            <a href="https://x.com" className="social-pill">
              <XIcon />
            </a>
            <a href="https://youtube.com" className="social-pill">
              <YouTubeIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="bottom-bar-inner">
          <p>
            © {new Date().getFullYear()} WheevoDrive. High Performance Marketplace.
          </p>
          <button className="scroll-top-btn" onClick={scrollToTop}>
            <ArrowUpward />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
