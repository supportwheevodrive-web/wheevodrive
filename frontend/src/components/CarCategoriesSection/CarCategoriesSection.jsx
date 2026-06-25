import React from "react";
import "./CarCategoriesSection.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const categories = [
  {
    id: 1,
    title: "Sedan",
    count: "124 Cars",
    img: "/images/sedan-removebg-preview.png",
    description: "Premium Comfort",
    trending: true,
  },
  {
    id: 2,
    title: "SUV",
    count: "85 Cars",
    img: "/images/suv.png",
    description: "All-Terrain Power",
    trending: false,
  },
  {
    id: 3,
    title: "Hatchback",
    count: "62 Cars",
    img: "/images/hatchback.png",
    description: "City Efficiency",
    trending: true,
  },
  {
    id: 4,
    title: "Sports",
    count: "48 Cars",
    img: "/images/sports-removebg-preview.png",
    description: "High Performance",
    trending: false,
  },
];

function CarCategoriesSection() {
  return (
    <section className="category-section-clean">
      <div className="category-container">
        <div className="category-header-main">
          <div className="category-pre-title">
            <span className="red-dot"></span>
            CHOOSE YOUR STYLE
          </div>
          <h2 className="category-main-title">
            Explore <span>Body Types</span>
          </h2>
          <p className="category-main-desc">
            Hand-picked certified vehicles across every segment for your
            specific driving needs.
          </p>
        </div>

        <div className="category-grid-clean">
          {categories.map((cat) => (
            <div className="category-card-clean" key={cat.id}>
              <div className="card-top-row">
                <span className="car-count-pill">{cat.count}</span>
                {cat.trending && (
                  <span className="trending-pill">
                    <TrendingUpIcon sx={{ fontSize: 14 }} /> Trending
                  </span>
                )}
              </div>

              <div className="car-visual-area">
                <div className="car-glow-bg"></div>
                <img src={cat.img} alt={cat.title} className="car-body-img" />
              </div>

              <div className="car-info-area">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <button className="car-explore-btn">
                  Explore <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="category-action-footer">
          <button className="view-all-categories">
            View All Segments <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CarCategoriesSection;
