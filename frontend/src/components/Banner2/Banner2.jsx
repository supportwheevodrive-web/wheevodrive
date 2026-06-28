import React, { useState, useEffect } from "react";
import "./Banner2.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { SEARCH_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

function Banner2() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const searchCar = async (name) => {
    if (name.length > 2) {
      setIsSearching(true);
      try {
        const res = await axios.get(`${SEARCH_URL}?key=${name}`);
        if (res?.data?.data) {
          setSearchResults(res.data.data.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchKey.trim()) searchCar(searchKey);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchKey]);

  return (
    <div className="autoglow-banner">
      <div className="banner-wrapper">
        <div className="banner-left">
          <div className="brand-accent">
            <span className="accent-line"></span>
            WE SELL, YOU DRIVE
          </div>

          <h1 className="main-headline">
            Trusted <br />
            <span>Used Car Marketplace.</span>
          </h1>

          <p className="sub-headline">
            Explore, buy, and drive away – your dream car deserves the best
            certified protection.
          </p>

          <div className="button-layout">
            <button
              className="btn-solid-red"
              onClick={() => navigate("/used-cars")}
            >
              Find Yours
            </button>
            <button
              className="btn-outline-white"
              onClick={() => setShowSearchModal(true)}
            >
              Search <SearchIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>

        <div className="banner-right">
          <div className="image-blend-overlay"></div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/072/118/301/small/black-muscle-car-revealing-powerful-headlights-in-smoke-photo.jpg"
            alt="Premium Car"
            className="hero-car-img"
          />
        </div>
      </div>

      <div className="slant-bottom"></div>

      {showSearchModal && (
        <div
          className="search-overlay-blur"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="search-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top">
              <h3>Search Inventory</h3>
              <button
                className="close-btn"
                onClick={() => setShowSearchModal(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="search-bar-wrap">
              <SearchIcon className="s-ico" />
              <input
                type="text"
                placeholder="Search BMW, Audi, Thar..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                autoFocus
              />
            </div>
            <div className="results-container">
              {searchResults.map((car) => (
                <div
                  key={car._id}
                  className="res-card"
                  onClick={() => {
                    navigate(`/car/${car._id}`);
                    setShowSearchModal(false);
                  }}
                >
                  <img src={car.images?.[0]} alt="" />
                  <div className="res-txt">
                    <h4>{car.car_name}</h4>
                    <p>
                      {car.year} • {car.brand}
                    </p>
                  </div>
                  <div className="res-price">
                    ₹{(car.price / 100000).toFixed(2)}L
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner2;
