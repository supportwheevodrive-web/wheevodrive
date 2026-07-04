import React, { useState } from "react";
import "./FAQ.css";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button on the homepage. Fill in your name, email, phone number, and create a password. Once registered, you'll receive a verification email to activate your account.",
    },
    {
      question: "How can I post my car for sale?",
      answer:
        "After creating an account and getting onboarded as a dealer, log in to your profile and click on 'Add Car' or 'Post Listing'. Fill in all required details including car make, model, year, price, condition, and upload clear photos. Submit the form and your listing will go live instantly.",
    },
    {
      question: "What fees does WheevoDrive charge?",
      answer:
        "Browsing cars and contacting dealers is completely free. We offer premium subscription plans for dealers: Pro Plan at ₹99/month allows up to 20 listings with featured profile badge, and Elite Plan at ₹499/month offers unlimited listings with premium features. Free users can browse all cars without any charges.",
    },
    {
      question: "How do I contact potential buyers or dealers?",
      answer:
        "Buyers can contact dealers directly through the car details page using the 'Call Now' button or 'WhatsApp' button. Dealers will receive notifications and can respond to inquiries through their dashboard. All contact details are visible to facilitate direct communication.",
    },
    {
      question: "How long does it take to get onboarded as a dealer?",
      answer:
        "After you submit your dealer application with required documents, our admin team typically reviews and verifies your profile within 24-48 hours. Once verified, you'll receive an email confirmation and can start listing your cars immediately.",
    },
    {
      question: "What documents do I need to become a verified dealer?",
      answer:
        "To become a verified dealer, you need to submit your business registration certificate, GST registration (if applicable), address proof, and a valid government ID (PAN Card, Aadhar Card, or Driving License). These documents ensure trust and transparency on our platform.",
    },
    {
      question: "Can I edit or delete my car listing after posting?",
      answer:
        "Yes, you can edit or delete your car listings anytime from your dealer dashboard. Simply go to 'My Listings', select the car you want to modify, and click on 'Edit' or 'Delete' option. Changes will be reflected immediately on the platform.",
    },
    {
      question: "How do I upgrade my subscription plan?",
      answer:
        "Go to your profile settings or the 'Plans' section, choose the plan you want to upgrade to (Pro or Elite), and follow the payment process. We accept all major payment methods through our secure Razorpay integration. The upgrade will be activated immediately upon successful payment.",
    },
    {
      question: "Is my personal information safe on WheevoDrive?",
      answer:
        "Absolutely! We take your privacy and security seriously. We use industry-standard encryption and security measures to protect your data. Your personal information is only shared with dealers when you initiate contact through our platform, and we never share your data with third parties.",
    },
    {
      question: "Can I use WheevoDrive on mobile?",
      answer:
        "Yes! WheevoDrive is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktops. You can browse cars, contact dealers, and manage your listings on the go using your mobile browser.",
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h3 className="text-center fw-bold">
          <span className="quality-text">
            Frequently Asked Questions
            <svg
              width="120"
              height="12"
              viewBox="0 0 120 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q60,12 120,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
        </h3>
        <div className="faq-header">
          <p className="faq-subtitle">
            Find answers to common questions about our platform
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question-container">
                <div className="faq-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                  </svg>
                </div>
                <h3 className="faq-question">{faq.question}</h3>
                <div className="faq-arrow">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6 9L12 15L18 9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="faq-answer-container">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
