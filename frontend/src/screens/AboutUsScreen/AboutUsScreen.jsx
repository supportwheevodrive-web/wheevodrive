import React, { useContext, useEffect, useState } from "react";
import "./AboutUsScreen.css";
import {
  FaCar,
  FaShieldAlt,
  FaHandshake,
  FaSearch,
  FaUserCheck,
  FaTags,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { STATS_COUNT } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 420,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
  p: 0,
  overflow: "hidden",
  border: "none",
};

const AboutUsScreen = () => {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${STATS_COUNT}`);
        if (res?.data) setData(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, []);

  const handleSellCar = () => {
    if (!user) setOpen(true);
    else window.location.href = "/car/add";
  };

  return (
    <div className="au-wrap">
      <section className="au-what">
        <div className="au-container">
          <div className="au-what-grid">
            <div className="au-what-text">
              <p className="au-eyebrow">What We Do</p>
              <h2 className="au-section-title">
                A smarter way to buy or sell a used car
              </h2>
              <p className="au-body">
              WheevoDrive was built by automotive enthusiasts who were frustrated
                by the complexities of traditional car markets. We created a
                platform where buyers and sellers meet directly — making the
                entire experience transparent, fast, and trustworthy.
              </p>
              <ul className="au-checklist">
                <li>
                  <FaCheckCircle /> Browse thousands of verified listings
                </li>
                <li>
                  <FaCheckCircle /> Connect directly with dealers via chat
                </li>
                <li>
                  <FaCheckCircle /> No brokerage or hidden platform fees
                </li>
                <li>
                  <FaCheckCircle /> Every listing reviewed before publishing
                </li>
              </ul>
            </div>
            <div className="au-what-image">
              <img
                src="/images/about-wheelzlloop.avif"
                alt="WheevoDrive showroom"
                className="au-img"
              />
              <div className="au-img-badge">
                <FaShieldAlt />
                <span>100% Verified Listings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="au-values">
        <div className="au-container">
          <div className="au-section-header">
            <p className="au-eyebrow">Why WheevoDrive</p>
            <h2 className="au-section-title">
              Everything you need, nothing you don't
            </h2>
          </div>
          <div className="au-values-grid">
            {[
              {
                icon: <FaSearch />,
                title: "Smart Search",
                desc: "Advanced filters help you zero in on the exact car you want in seconds.",
              },
              {
                icon: <FaUserCheck />,
                title: "Verified Dealers",
                desc: "Every dealer on WheevoDrive is manually reviewed before listing any vehicle.",
              },
              {
                icon: <FaTags />,
                title: "No Hidden Fees",
                desc: "What you see is what you pay. No surprises, no brokerage, no nonsense.",
              },
              {
                icon: <FaHandshake />,
                title: "Direct Contact",
                desc: "Chat with the seller directly. No call centre, no middleman delays.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Safe Platform",
                desc: "Secure accounts, private data, and a team that monitors for fraud.",
              },
              {
                icon: <FaCar />,
                title: "All Vehicles",
                desc: "Hatchbacks, sedans, SUVs, luxury — every category in one place.",
              },
            ].map((v, i) => (
              <div key={i} className="au-value-card">
                <div className="au-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="au-cta">
        <div className="au-container">
          <div className="au-cta-inner">
            <h2>Ready to find your next car?</h2>
            <p>Join thousands of buyers and sellers on WheevoDrive today.</p>
            <div className="au-cta-btns">
              <button
                className="au-btn-primary"
                onClick={() => (window.location.href = "/used-cars")}
              >
                Browse Inventory <FaArrowRight />
              </button>
              <button className="au-btn-outline" onClick={handleSellCar}>
                List Your Car
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <div className="au-modal">
            <div className="au-modal-icon">🔐</div>
            <h3>Sign in required</h3>
            <p>You need an account to list a vehicle on WheevoDrive.</p>
            <div className="au-modal-actions">
              <button
                className="au-btn-primary"
                onClick={() => (window.location.href = "/signin")}
              >
                Go to Login
              </button>
              <button
                className="au-btn-ghost-sm"
                onClick={() => setOpen(false)}
              >
                Maybe later
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AboutUsScreen;
