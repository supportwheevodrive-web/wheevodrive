import React, { useContext, useEffect, useRef, useState } from "react";
import "./HowItWorks.css";
import { UserContext } from "../../hooks/UserContext";
import {
  FiUserPlus,
  FiCamera,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineSpeed } from "react-icons/md";
import { BiHappy } from "react-icons/bi";
import { FaCar } from "react-icons/fa";

function HowItWorks() {
  const { user } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) setLoggedIn(true);
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const steps = [
    {
      id: "01",
      title: "Create Account",
      description: "Sign up in 30 seconds for free.",
      icon: <FiUserPlus />,
      benefits: ["Instant Access", "Secure Profile"],
    },
    {
      id: "02",
      title: "List Your Car",
      description: "Upload photos & set your price.",
      icon: <FiCamera />,
      benefits: ["AI Valuation", "Smart Specs"],
    },
    {
      id: "03",
      title: "Get Paid",
      description: "Connect with buyers and get paid.",
      icon: <GiMoneyStack />,
      benefits: ["Secure Payout", "Fast Process"],
    },
  ];

  const stats = [
    { value: "50k+", label: "Happy Sellers", icon: <BiHappy /> },
    { value: "10k+", label: "Cars Sold", icon: <FaCar /> },
    { value: "24h", label: "Avg. Sale Time", icon: <MdOutlineSpeed /> },
  ];

  const handleGetStarted = () => {
    window.location.href = loggedIn ? "/profile" : "/signin";
  };

  return (
    <div className="hiw-light-section" ref={sectionRef}>
      <div className="hiw-wrapper">
        <div className={`hiw-header-top ${isVisible ? "reveal" : ""}`}>
          <div className="hiw-badge-pill">
            <span className="dot-pulse"></span>
            PROCESS
          </div>
          <h2 className="hiw-heading">
            Sell Your Car In <span className="highlight">3 Simple Steps</span>
          </h2>
          <p className="hiw-sub-text">
            We've streamlined the selling process to be as fast and transparent
            as possible.
          </p>
        </div>

        <div className="hiw-grid-layout">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`hiw-step-card ${isVisible ? "reveal" : ""}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="step-num-bg">{step.id}</div>
              <div className="step-icon-box">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="step-check-list">
                {step.benefits.map((b, i) => (
                  <span key={i}>
                    <FiCheckCircle /> {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`hiw-stats-container ${isVisible ? "reveal" : ""}`}>
          {stats.map((s, i) => (
            <div key={i} className="hiw-stat-box">
              <div className="stat-icon-round">{s.icon}</div>
              <div className="stat-content">
                <strong>{s.value}</strong>
                <label>{s.label}</label>
              </div>
            </div>
          ))}
        </div>

        <div className="hiw-action-footer">
          <button className="btn-get-started" onClick={handleGetStarted}>
            List Your Car Now <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
