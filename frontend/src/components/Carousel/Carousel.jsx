import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShieldCheckIcon from "@mui/icons-material/VerifiedUser";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const slides = [
    {
      title: "Drive Your Dream",
      location: "Kochi, Kerala",
      description: "500+ Certified Cars Ready for Test Drive",
      bgImage:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2000",
      image: "/images/wheeelzloop cars1.webp",
      badge: "Premium Selection",
      price: "From ₹3.5L",
      offer: "0% EMI Available",
    },
    {
      title: "Sell in 24 Hours",
      location: "All Kerala",
      description: "Free Inspection • Best Price Guarantee",
      bgImage:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2000",
      image: "/images/wheeelzloop blue-sports-car-isolated-white-vector.webp",
      badge: "Instant Cash",
      price: "Get Best Quote",
      offer: "Same Day Payment",
    },
    {
      title: "Trusted Quality",
      location: "Certified Hub",
      description: "150-Point Check • 1 Year Warranty",
      bgImage:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
      badge: "Certified Pre-Owned",
      price: "EMI From ₹5,999",
      offer: "Free Insurance",
    },
  ];

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, slides.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      className="modern-car-slider"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slider-item">
            <div
              className="slider-bg"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="slider-overlay"></div>
            </div>

            <div className="slider-content">
              <div className="content-inner">
                <div className="top-meta">
                  <span className="premium-badge">
                    <ShieldCheckIcon sx={{ fontSize: 14 }} /> {slide.badge}
                  </span>
                  <span className="loc-tag">
                    <LocationOnIcon sx={{ fontSize: 14 }} /> {slide.location}
                  </span>
                </div>

                <h2 className="slide-h2">{slide.title}</h2>
                <p className="slide-p">{slide.description}</p>

                <div className="action-row">
                  <div className="price-box">
                    <span className="price-txt">{slide.price}</span>
                    <span className="offer-txt">{slide.offer}</span>
                  </div>
                  <button className="main-cta">
                    Explore <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>

              <div className="image-container">
                <img src={slide.image} alt="car" className="floating-car" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slide-nav prev" onClick={prevSlide}>
        <ChevronLeftIcon />
      </button>
      <button className="slide-nav next" onClick={nextSlide}>
        <ChevronRightIcon />
      </button>

      <div className="slide-indicators">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`indicator ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
