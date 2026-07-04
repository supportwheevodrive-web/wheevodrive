import React, { useContext, useEffect, useState } from "react";
import {
  FaSearch,
  FaUserPlus,
  FaShieldAlt,
  FaPhone,
  FaWhatsapp,
  FaCar,
  FaCheckCircle,
  FaUserCheck,
  FaStore,
  FaChartLine,
} from "react-icons/fa";
import "./Services.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import Swal from "sweetalert2";
import { useRazorpay } from "react-razorpay";
import { BACKEND_URL } from "../../config/api";
import { SUBRIPTION_PLANS } from "../../constants/userConstants";

const Services = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { error, isLoading: isRzrLoading, Razorpay } = useRazorpay();

  useEffect(() => {
    if (user) setLoggedIn(true);
  }, [user]);

  const verifyPaymentOnBackend = async (paymentData) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/verify-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );
      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your subscription has been activated.",
        });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
    }
  };

  const handleSubscribePlan = async (plan) => {
    let amount = 0;
    if (plan === SUBRIPTION_PLANS.PRO.TITLE) {
      amount = SUBRIPTION_PLANS.PRO.amount;
    } else if (plan === SUBRIPTION_PLANS.ELITE.TITLE) {
      amount = SUBRIPTION_PLANS.ELITE.amount;
    } else {
      amount = 0;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/create-subscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            receipt: "order_rcpt_01",
          }),
        }
      );
      const order = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WheevoDrive",
        description: "Subscription Payment",
        order_id: order.id,
        handler: function (response) {
          verifyPaymentOnBackend(response);
        },
        prefill: {
          name: user?.name || "John Doe",
          email: user?.email || "john@example.com",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: response.error.description,
        });
        setIsLoading(false);
      });
      rzp.open();
      setIsLoading(false);
    } catch (error) {
      console.error("Payment failed:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handlePlanClick = (planTitle) => {
    if (!loggedIn) {
      navigate("/signin");
      return;
    }

    if (planTitle === "Free") {
      Swal.fire({
        icon: "info",
        title: "Free Plan",
        text: "You are already on the Free Plan. Upgrade to access more features!",
      });
      return;
    }

    Swal.fire({
      title: `Upgrade to ${planTitle} Plan`,
      text: `Are you sure you want to upgrade your account to the ${planTitle} plan?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3498db",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Upgrade Now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (planTitle === SUBRIPTION_PLANS.PRO.TITLE) {
          handleSubscribePlan(SUBRIPTION_PLANS.PRO.TITLE);
        } else if (planTitle === SUBRIPTION_PLANS.ELITE.TITLE) {
          handleSubscribePlan(SUBRIPTION_PLANS.ELITE.TITLE);
        }
      }
    });
  };

  const steps = [
    {
      id: 1,
      icon: <FaSearch className="step-icon" />,
      title: "Browse Cars",
      description:
        "Explore thousands of verified cars from trusted dealers across India. Use filters to find your perfect match.",
    },
    {
      id: 2,
      icon: <FaPhone className="step-icon" />,
      title: "Connect with Dealers",
      description:
        "Call or WhatsApp dealers directly from the car details page. Get instant responses and schedule test drives.",
    },
    {
      id: 3,
      icon: <FaUserPlus className="step-icon" />,
      title: "Create Account",
      description:
        "Sign up to list your car for sale. Your account will be reviewed by our admin team for verification.",
    },
    {
      id: 4,
      icon: <FaUserCheck className="step-icon" />,
      title: "Get Onboarded",
      description:
        "Once our admin verifies your documents and dealership, you'll be onboarded as a verified dealer.",
    },
    {
      id: 5,
      icon: <FaCar className="step-icon" />,
      title: "List Your Car",
      description:
        "Add your car details, photos, and price. Your listing will go live instantly for buyers to see.",
    },
  ];

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Dealers Only",
      description:
        "Every dealer on our platform is thoroughly verified by our admin team for your safety.",
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp Connect",
      description:
        "Chat with dealers directly via WhatsApp. Get quick responses and negotiate deals instantly.",
    },
    {
      icon: <FaPhone />,
      title: "Direct Calling",
      description:
        "Call dealers directly from the car details page. No middlemen, no hidden charges.",
    },
    {
      icon: <FaChartLine />,
      title: "Price Transparency",
      description:
        "See fair market prices and negotiate transparently with dealers.",
    },
    {
      icon: <FaStore />,
      title: "Dealer Profiles",
      description:
        "View dealer ratings, reviews, and complete inventory before making a decision.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Hassle-Free Listing",
      description:
        "List your car in minutes. Our simple process makes selling your car easy and quick.",
    },
  ];

  const pricingPlans = [
    {
      title: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "Browse all listed cars",
        "View dealer profiles",
        "Call & WhatsApp dealers",
        "Basic search filters",
      ],
      buttonText: "Current Plan",
      buttonClass: "free-btn",
    },
    {
      title: SUBRIPTION_PLANS.PRO.TITLE,
      price: "₹99",
      period: "per month",
      features: [
        "List up to 20 cars",
        "Verified dealer badge",
        "Featured profile",
        "Priority WhatsApp support",
        "Basic analytics",
      ],
      buttonText: "Become a Dealer",
      buttonClass: "pro-btn",
      popular: true,
    },
    {
      title: SUBRIPTION_PLANS.ELITE.TITLE,
      price: "₹499",
      period: "per month",
      features: [
        "Unlimited car listings",
        "Premium dealer badge",
        "Top profile priority",
        "Dedicated account manager",
        "Advanced analytics",
        "Featured listings",
      ],
      buttonText: "Go Elite",
      buttonClass: "elite-btn",
    },
  ];

  return (
    <div className="services-container">
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      {/* Hero Section */}
      <div className="services-hero">
        <div className="services-hero-content">
          <h1 className="services-title">
            Your Trusted <span className="highlight">Car Marketplace</span>
          </h1>
          <p className="services-subtitle">
            Buy and sell used cars with confidence. Connect with verified
            dealers and get the best deals.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/cars")}>
              Browse Cars
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              Sell Your Car
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple steps to buy or sell your car on our platform</p>
        </div>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className="step-number">{step.id}</div>
              <div className="step-content">
                <div className="step-icon-wrapper">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>We make car buying and selling safe, simple, and transparent</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans Section */}
      <div className="plans-section">
        <div className="section-header">
          <h2>Choose Your Plan</h2>
          <p>Start with free browsing or upgrade to sell your cars</p>
        </div>
        <div className="plans-grid">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <div className="plan-header">
                <h3>{plan.title}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <FaCheckCircle className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`plan-btn ${plan.buttonClass}`}
                onClick={() => handlePlanClick(plan.title)}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of satisfied users. Buy your dream car or sell yours
            in minutes.
          </p>
          <div className="cta-buttons">
            <button
              className="cta-primary"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/contact-us")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
