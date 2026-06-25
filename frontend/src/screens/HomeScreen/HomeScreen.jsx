import React, { useEffect, useRef, useState } from "react";
import "./HomeScreen.css";
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import Card from "../../components/Card/Card";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import NewsAndResources from "../../sections/NewsAndResources/NewsAndResources";
import FAQSection from "../../sections/FAQ/FAQ";
import Counter from "../../components/Counter/Counter";
import FeaturesSection from "../../sections/FeaturesSection/FeaturesSection";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import { GET_ALL_CARS } from "../../config/api";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import CategoryCars from "../../components/CategoryCars/CategoryCars";
import Banner2 from "../../components/Banner2/Banner2";
import CarCategoriesSection from "../../components/CarCategoriesSection/CarCategoriesSection";
import AdvSection from "../../sections/AdvSection/AdvSection";
import { LOCAL_STORAGE_KEY } from "../../store/useAuthStore";
import PopularBrandsSection from "../../sections/PopularBrandsSection/PopularBrandsSection";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";

const images = [
  "https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg",
  "https://i.pinimg.com/736x/be/83/60/be83607be6a98648c47b8563b8b7edca.jpg",
];

const tabs = {
  SEDAN: "sedan",
  SUV: "suv",
  HATCHBACK: "hatchback",
};

function HomeScreen() {
  const sliderRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentTab = carBodyTypes.find((tab) => tab.index == 2);
  const [selectedTab, setSelectedTab] = useState(currentTab);
  const [originalCars, setOriginalCars] = useState([]);
  const [categoryCars, setCategoryCars] = useState({});
  const [categoryLoading, setCategoryLoading] = useState({});
  const categorySliderRefs = useRef({});

  const storedSearches =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  const calculateRelevanceScore = (car, searchTerms) => {
    if (!searchTerms || searchTerms.length === 0) return 0;

    let score = 0;
    const lowerCaseSearchTerms = searchTerms.map((term) => term.toLowerCase());
    const totalTerms = lowerCaseSearchTerms.length;
    lowerCaseSearchTerms.forEach((term, index) => {
      const weight = index === totalTerms - 1 ? 10 : 1;

      if (car.car_name && car.car_name.toLowerCase().includes(term))
        score += 3 * weight;
      if (car.brand && car.brand.toLowerCase().includes(term))
        score += 2 * weight;
      if (car.place && car.place.toLowerCase().includes(term))
        score += 1 * weight;
    });

    return score;
  };

  const sortCarsByPreviousSearches = (carList, searches) => {
    return [...carList].sort((a, b) => {
      const scoreA = calculateRelevanceScore(a, searches);
      const scoreB = calculateRelevanceScore(b, searches);
      return scoreB - scoreA;
    });
  };

  useEffect(() => {
    const sortedCars = sortCarsByPreviousSearches(cars, storedSearches);
    setCars(sortedCars);
  }, []);

  const tabListRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabListRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollCategory = (category, direction) => {
    const ref = categorySliderRefs.current[category];
    if (ref) {
      const scrollAmount = direction === "left" ? -280 : 280;
      ref.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GET_ALL_CARS}`);
        if (res && res.data?.data?.length > 0) {
          const sortedInitialCars = sortCarsByPreviousSearches(
            res.data.data,
            storedSearches
          );
          setCars(sortedInitialCars);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchCategoryCars = async () => {
      const categories = carBodyTypes?.slice(0, 4) || [];
      for (const type of categories) {
        try {
          setCategoryLoading((prev) => ({ ...prev, [type.value]: true }));
          const res = await axios.get(`${GET_ALL_CARS}?category=${type.value}`);
          if (res && res.data?.data) {
            const sorted = sortCarsByPreviousSearches(
              res.data.data,
              storedSearches
            );
            setCategoryCars((prev) => ({ ...prev, [type.value]: sorted }));
          }
        } catch (error) {
          console.error(`Error fetching ${type.value} cars:`, error);
        } finally {
          setCategoryLoading((prev) => ({ ...prev, [type.value]: false }));
        }
      }
    };
    fetchCategoryCars();
  }, []);

  return (
    <div className="screens" id="Choose by Category">
      <div className="">
        <Banner2 />
      </div>

      <div>
        <div className="mt-0">
          <div className="latst-cars-section">
            <div className="container mt-5">
              <div className="profile-content">
                <TitleHeader
                  title1={"Cars by "}
                  title2={"Category"}
                  option={"View all"}
                  optionLink={`/used-cars?.category=sedan`}
                />

                <div className="tabs-container">
                  <Tabs>
                    <div className="tab-scroll-wrapper">
                      <button
                        className="tab-scroll-button left"
                        onClick={() => scrollTabs("left")}
                        aria-label="Scroll tabs left"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <TabList ref={tabListRef}>
                        {carBodyTypes?.slice(0, 3).map((type, index) => (
                          <Tab key={index}>{type.text}</Tab>
                        ))}
                      </TabList>

                      <button
                        className="tab-scroll-button right"
                        onClick={() => scrollTabs("right")}
                        aria-label="Scroll tabs right"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    {carBodyTypes?.slice(0, 4).map((type, index) => (
                      <TabPanel key={index}>
                        <div className="category-slider-wrapper">
                          {categoryLoading[type.value] ? (
                            <Loader />
                          ) : categoryCars[type.value]?.length === 0 ? (
                            <EmptyState />
                          ) : (
                            <>
                              <button
                                className="category-slider-btn left"
                                onClick={() =>
                                  scrollCategory(type.value, "left")
                                }
                              >
                                <ChevronLeft />
                              </button>
                              <div
                                className="category-slider"
                                ref={(el) => {
                                  if (el)
                                    categorySliderRefs.current[type.value] = el;
                                }}
                              >
                                {categoryCars[type.value]?.map((car, idx) => (
                                  <div
                                    className="category-slider-item"
                                    key={idx}
                                  >
                                    <Card
                                      car={car}
                                      editable={false}
                                      category={type.text}
                                    />
                                  </div>
                                ))}
                              </div>
                              <button
                                className="category-slider-btn right"
                                onClick={() =>
                                  scrollCategory(type.value, "right")
                                }
                              >
                                <ChevronRight />
                              </button>
                            </>
                          )}
                        </div>
                      </TabPanel>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
            <div className="container mt-2">
              <h3 className="text-center fw-bold">
                <span className="quality-text">
                  Latest Cars
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
                </span>
              </h3>
              <div className="mt-4">
                {loading ? (
                  <Loader />
                ) : cars.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="cards-grid">
                    {cars?.slice(0, 8).map((car, index) => (
                      <Card
                        car={car}
                        editable={false}
                        key={index}
                        category={"Latest"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CarCategoriesSection />
      </div>

      <div className="mt-0">
        <HowItWorks />

        <div className="mt-0">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
