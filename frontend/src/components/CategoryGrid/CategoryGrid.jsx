import React, { useRef } from "react";
import "./CategoryGrid.css";
import { FiArrowRight, FiZap, FiAward, FiTag, FiStar } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CategoryGrid = () => {
  const sliderRefs = useRef({});

  const sections = [
    {
      title: "Body Styles",
      tag: "Popular",
      tagIcon: <FiZap />,
      tagClass: "tag-blue",
      items: [
        {
          label: "SUV",
          img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Sedan",
          img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Hatchback",
          img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Coupe",
          img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Convertible",
          img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Wagon",
          img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300",
        },
      ],
    },

    {
      title: "Budget",
      tag: "Deals",
      tagIcon: <FiTag />,
      tagClass: "tag-amber",
      items: [
        {
          label: "Under ₹5L",
          img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "₹5L-₹10L",
          img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "₹10L-₹20L",
          img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Luxury",
          img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Premium",
          img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=300",
        },
        {
          label: "Super",
          img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300",
        },
      ],
    },
  ];

  const scrollSlider = (sectionIndex, direction) => {
    const ref = sliderRefs.current[sectionIndex];
    if (ref) {
      const scrollAmount = direction === "left" ? -280 : 280;
      ref.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="cg-modern">
      <div className="cg-modern-header">
        <h2 className="cg-modern-title">
          Explore <span className="cg-highlight">Categories</span>
          <span className="cg-title-dot">.</span>
        </h2>
        <p className="cg-modern-sub">Find exactly what you're looking for</p>
      </div>

      <div className="cg-modern-grid">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="cg-modern-card">
            <div className="cg-modern-head">
              <div className="cg-modern-head-left">
                <div className={`cg-modern-tag ${section.tagClass}`}>
                  {section.tagIcon}
                  {section.tag}
                </div>
                <h3 className="cg-modern-head-title">{section.title}</h3>
              </div>
              <span className="cg-modern-count">{section.items.length}</span>
            </div>

            <div className="cg-modern-slider-wrap">
              <button
                className="cg-modern-arrow left"
                onClick={() => scrollSlider(sectionIndex, "left")}
              >
                <ChevronLeft />
              </button>

              <div
                className="cg-modern-slider"
                ref={(el) => {
                  if (el) sliderRefs.current[sectionIndex] = el;
                }}
              >
                {section.items.map((item, i) => (
                  <div key={i} className="cg-modern-item">
                    <div className="cg-modern-item-img">
                      <img src={item.img} alt={item.label} loading="lazy" />
                      <div className="cg-modern-item-overlay">
                        <span className="cg-modern-item-name">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="cg-modern-arrow right"
                onClick={() => scrollSlider(sectionIndex, "right")}
              >
                <ChevronRight />
              </button>
            </div>

            <a href="#" className="cg-modern-link">
              <span>View all</span>
              <FiArrowRight />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
