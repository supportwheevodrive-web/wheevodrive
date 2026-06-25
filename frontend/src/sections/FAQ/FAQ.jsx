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
        "You can create an account by clicking the 'Sign Up' button on the homepage and filling out the required details.",
    },
    {
      question: "How can I post my car for sale?",
      answer:
        "Once logged in, go to your profile, and click on post a car, provide the details of your car, and submit the form.",
    },
    {
      question: "What fees does WheevoDrive charge?",
      answer:
        "Posting a car is free, but we charge a small fee for premium features like highlighting your listing.",
    },
    {
      question: "How do I contact potential buyers?",
      answer:
        "Buyers will contact you via the details you provide in your listing or through our secure messaging system.",
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
