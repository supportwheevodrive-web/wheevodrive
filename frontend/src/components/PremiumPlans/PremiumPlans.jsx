import React, { useContext, useState } from "react";
import { FaCrown, FaStar, FaRocket, FaShieldAlt } from "react-icons/fa";
import "./PremiumPlans.css";
import { BACKEND_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import { SUBRIPTION_PLANS } from "../../constants/userConstants";
import { useRazorpay } from "react-razorpay";
import Swal from "sweetalert2";

const PremiumPlans = () => {
  const { error, isLoading: isRzrLoading, Razorpay } = useRazorpay();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const verifyPaymentOnBackend = async (paymentData) => {
    // POST paymentData to backend for verification
    setIsLoading(true);
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
      if (response.ok && result.success) {
        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your subscription has been activated.",
        });
        window.location.href = "/profile";
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text:
            result.message ||
            "We could not verify your payment. Please contact support if you were charged.",
        });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Verification Failed",
        text: "We could not verify your payment. Please contact support if you were charged.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribePan = async (plan) => {
    if (!user) {
      window.location.href = "/signin";
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/create-subscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan,
            userId: user._id,
            receipt: `rcpt_${Date.now()}`,
          }),
        }
      );
      const order = await response.json();
      if (!response.ok || !order.id) {
        throw new Error(order.message || "Could not create payment order");
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WheevoDrive",
        description: "Subscription Payment",
        order_id: order.id,
        handler: function (response) {
          verifyPaymentOnBackend({ ...response, plan, userId: user._id });
        },
        prefill: {
          name: user.username || "",
          email: user.email || "",
          contact: user.phone || "",
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

  return (
    <div className="premium-plans-container mt-2">
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="premium-plans-header">
        <h2>Upgrade Your Experience</h2>
        <p>
          Get more visibility, more leads, and sell faster with our premium
          plans
        </p>
      </div>

      <div className="plans-grid">
        <div className="plan-card free-plan">
          <div className="plan-header">
            <div className="plan-icon">
              <FaShieldAlt />
            </div>
            <h3>Free Plan</h3>
          </div>
          <div className="plan-price">
            <p className="price">₹0</p>
            <p className="price-subtext">Forever free</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Max 5 active listings
            </li>
            <li>
              <span>✓</span> Basic dealer profile
            </li>
            <li>
              <span>✓</span> Basic performance analytics
            </li>
          </ul>
          <button className="plan-button free-button">Current Plan</button>
        </div>

        <div className="plan-card pro-plan highlighted">
          <div className="plan-header">
            <div className="plan-icon">
              <FaStar />
            </div>
            <h3>Pro Plan</h3>
            <span className="popular-badge">POPULAR</span>
          </div>
          <div className="plan-price">
            <p className="price">₹99</p>
            <p className="price-subtext">Per month</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Up to 20 listings
            </li>
            <li>
              <span>✓</span> Featured profile badge
            </li>
            <li>
              <span>✓</span> Basic performance analytics
            </li>
            <li>
              <span>✓</span> Top listings
            </li>
          </ul>
          <button
            className="plan-button pro-button"
            onClick={() => handleSubscribePan(SUBRIPTION_PLANS.PRO.TITLE)}
          >
            Upgrade Now
          </button>
        </div>

        <div className="plan-card elite-plan">
          <div className="plan-header">
            <div className="plan-icon">
              <FaCrown />
            </div>
            <h3>Elite Plan</h3>
          </div>
          <div className="plan-price">
            <p className="price">₹499</p>
            <p className="price-subtext">Per month</p>
          </div>
          <ul className="plan-features">
            <li>
              <span>✓</span> Unlimited listings
            </li>
            <li>
              <span>✓</span> Featured profile badge
            </li>
            <li>
              <span>✓</span> WhatsApp contact button
            </li>
            <li>
              <span>✓</span> Basic performance analytics
            </li>
            <li>
              <span>✓</span> Top listings
            </li>
          </ul>
          <button
            className="plan-button elite-button"
            onClick={() => handleSubscribePan(SUBRIPTION_PLANS.ELITE.TITLE)}
          >
            Go Elite
          </button>
        </div>
      </div>

      <div className="enterprise-cta">
        <div className="cta-icon">
          <FaRocket />
        </div>
        <div className="cta-content">
          <h3>Need more power?</h3>
          <p>
            Contact us for enterprise solutions with custom features and
            dedicated support.
          </p>
        </div>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "/contact-us")}
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default PremiumPlans;
