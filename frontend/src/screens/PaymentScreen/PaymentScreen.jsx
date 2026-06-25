import React, { useState, useEffect, useContext } from "react";
import { FaLock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { SiPhonepe, SiPaytm, SiGooglepay } from "react-icons/si";
import { RiVisaFill, RiMastercardFill } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import "./PaymentScreen.css";
import { CREATE_PAYMENT_INTENT, UPDATE_PROFILE_URL } from "../../config/api";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ plan, planDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(CREATE_PAYMENT_INTENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: planDetails[plan].amount,
          currency: "inr",
          paymentMethodType: paymentMethod,
          plan: plan,
          interval: plan === "yearly" ? "year" : "month",
        }),
      });

      const { clientSecret } = await response.json();

      if (paymentMethod === "card") {
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: user?.username ?? "",
              },
            },
          }
        );

        if (error) throw error;
        if (paymentIntent.status === "succeeded") {
          const handleSubscribePan = async () => {
            try {
              const oneMonthFromNow = new Date();
              oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
              const res = await axios.patch(
                `${UPDATE_PROFILE_URL}/${user?._id}`,
                {
                  subscribed: true,
                  subscription_plan: plan,
                  subscription_expires_at: oneMonthFromNow.toISOString(),
                }
              );

              if (res && res.status == 200) {
                navigate(`/payment-success/${plan}`);
              }
            } catch (error) {
              return error;
            }
          };
          handleSubscribePan();
        }
      } else if (paymentMethod === "upi") {
        const { error, paymentIntent } = await stripe.confirmUpiPayment(
          clientSecret,
          {
            payment_method: {
              upi: {
                vpa: upiId,
              },
            },
          }
        );

        if (error) throw error;
        if (paymentIntent.status === "requires_action")
          navigate("/payment-processing");
      }
    } catch (err) {
      setError(err.message);
      console.error("Payment failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form className="payment-form" onSubmit={handlePayment}>
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div className="method-options">
          <div
            className={`method-option ${
              paymentMethod === "card" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="card-icons">
              <RiVisaFill className="visa-icon" />
              <RiMastercardFill className="mastercard-icon" />
            </div>
            <span>Credit/Debit Card</span>
          </div>

          <div
            className={`method-option ${
              paymentMethod === "upi" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("upi")}
          >
            <div className="upi-icons">
              <SiPhonepe className="phonepe-icon" />
              <SiPaytm className="paytm-icon" />
              <SiGooglepay className="gpay-icon" />
            </div>
            <span>UPI Payment</span>
          </div>
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="card-form">
          <div className="form-group">
            <label>Card Details</label>
            <CardElement options={cardElementOptions} />
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="upi-form">
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>
          <div className="upi-apps">
            <button type="button" className="upi-app">
              <SiPhonepe className="upi-icon" />
              PhonePe
            </button>
            <button type="button" className="upi-app">
              <SiPaytm className="upi-icon" />
              Paytm
            </button>
            <button type="button" className="upi-app">
              <SiGooglepay className="upi-icon" />
              Google Pay
            </button>
          </div>
        </div>
      )}

      {error && <div className="payment-error">{error}</div>}

      <button
        type="submit"
        className="pay-button"
        disabled={!paymentMethod || loading || !stripe}
      >
        {loading
          ? "Processing..."
          : `Pay ${planDetails[plan].price.split(" ")[0]}`}
      </button>
    </form>
  );
};

const PaymentScreen = () => {
  let { plan } = useParams();
  plan = plan?.toLowerCase();
  const navigate = useNavigate();

  const planDetails = {
    pro: {
      name: "Pro Plan",
      price: plan === "yearly" ? "₹5,388 (₹449/month)" : "₹599/month",
      amount: plan === "yearly" ? 538800 : 59900,
      features: [
        "Up to 25-50 listings",
        "Featured profile badge",
        "WhatsApp contact button",
        "Basic performance analytics",
        "Boost 2 listings/month",
      ],
    },
    elite: {
      name: "Elite Plan",
      price: plan === "yearly" ? "₹17,988 (₹1,499/month)" : "₹2,499/month",
      amount: plan === "yearly" ? 1798800 : 249900,
      features: [
        "Unlimited listings",
        "Priority placement",
        "Custom dealer landing page",
        "Advanced analytics",
        "Boost up to 10 listings/month",
      ],
    },
  };

  return (
    <div className="subscribe-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Plans
      </button>

      <div className="subscribe-header">
        <h1>Complete Your Subscription</h1>
        <p>Secure payment processed with 256-bit encryption</p>
      </div>

      <div className="payment-grid">
        <div className="plan-summary">
          <div className="summary-header">
            <h2>{planDetails[plan].name}</h2>
            <p className="price">{planDetails[plan].price}</p>
          </div>

          {/* <ul className="features-list">
            {planDetails[plan].features.map((feature, index) => (
              <li key={index}>
                <FaCheckCircle className="check-icon" /> {feature}
              </li>
            ))}
          </ul> */}

          <div className="security-badge">
            <FaLock className="lock-icon" />
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>

        {/* <div className="payment-form-container">
          <Elements stripe={stripePromise}>
            <PaymentForm plan={plan} planDetails={planDetails} />
          </Elements>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentScreen;
