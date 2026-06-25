import React, { useState, useEffect } from "react";
import "./Filter.css";
import { brands } from "../../dummyData/brands";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { years } from "../../dummyData/year";
import { fuelTypes } from "../../dummyData/fuelTypes";
import { ownerShip } from "../../dummyData/ownerShip";
import { carFeatures } from "../../dummyData/carFeatures";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

function Filter({ onFilterChange, isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("brands");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      document.body.style.overflow = "hidden";
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCheckboxChange = (selectedArray, setSelectedArray, value) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const applyFilters = () => {
    const filters = {
      brands:
        selectedCars.length > 0
          ? selectedCars.map((item) => item.brand)
          : undefined,
      car_name:
        selectedCars.length > 0
          ? selectedCars.map((item) => item.car)
          : undefined,
      year: selectedYear ? String(selectedYear) : undefined,
      fuel_type: selectedFuelTypes.length > 0 ? selectedFuelTypes : undefined,
      ownership: selectedOwnership.length > 0 ? selectedOwnership : undefined,
      body_type: selectedBodyTypes.length > 0 ? selectedBodyTypes : undefined,
      transmission:
        selectedTransmissionTypes.length > 0
          ? selectedTransmissionTypes
          : undefined,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
    };

    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
    onFilterChange(validFilters);
    onClose();
  };

  const clearFilters = () => {
    setSelectedCars([]);
    setSelectedYear(null);
    setSelectedFuelTypes([]);
    setSelectedOwnership([]);
    setSelectedFeatures([]);
    setSelectedBodyTypes([]);
    setSelectedTransmissionTypes([]);
    onFilterChange({});
  };

  const filteredBrands = brands.filter((brand) => {
    return (
      brand.brand.toLowerCase().includes(search.toLowerCase()) ||
      brand.cars.some((car) => car.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCars.length) count++;
    if (selectedYear) count++;
    if (selectedFuelTypes.length) count++;
    if (selectedOwnership.length) count++;
    if (selectedFeatures.length) count++;
    if (selectedBodyTypes.length) count++;
    if (selectedTransmissionTypes.length) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`filter-backdrop ${animateIn ? "active" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`filter-bottom-sheet ${animateIn ? "active" : ""}`}>
        <div className="filter-sheet-header">
          <div className="filter-sheet-drag-bar"></div>
          <div className="filter-sheet-title-section">
            <button className="sheet-close-btn" onClick={onClose}>
              <CloseIcon />
            </button>
            <div className="filter-title-content">
              <FilterAltIcon className="filter-icon-sheet" />
              <h2>Filter Cars</h2>
              {getActiveFiltersCount() > 0 && (
                <span className="filter-badge-sheet">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
            <button className="sheet-clear-btn" onClick={clearFilters}>
              <ClearAllIcon />
            </button>
          </div>
        </div>

        <div className="filter-sheet-content">
          <div className="search-sheet">
            <div className="search-input-sheet">
              <SearchIcon className="search-icon-sheet" />
              <input
                type="text"
                placeholder="Search brand or model..."
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="filter-sections-sheet">
            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(activeSection === "brands" ? null : "brands")
                }
              >
                <div className="section-title-sheet">
                  <DirectionsCarIcon className="section-icon-sheet" />
                  <span>Brands & Models</span>
                </div>
                {activeSection === "brands" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "brands" && (
                <div className="section-content-sheet">
                  <div className="brands-list-sheet">
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((brandItem, index) => (
                        <div key={index} className="brand-item-sheet">
                          <div
                            className="brand-header-sheet"
                            onClick={() => handleAccordionToggle(index)}
                          >
                            <div className="brand-name-sheet">
                              <span className="brand-dot-sheet"></span>
                              {brandItem.brand}
                            </div>
                            {activeIndex === index ? (
                              <KeyboardArrowUpIcon className="accordion-icon-sheet" />
                            ) : (
                              <KeyboardArrowDownIcon className="accordion-icon-sheet" />
                            )}
                          </div>
                          {activeIndex === index && (
                            <div className="brand-models-sheet">
                              {brandItem.cars.map((car, idx) => (
                                <label
                                  key={idx}
                                  className="model-checkbox-sheet"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedCars.some(
                                      (item) =>
                                        item.brand === brandItem.brand &&
                                        item.car === car
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        selectedCars,
                                        setSelectedCars,
                                        {
                                          brand: brandItem.brand,
                                          car,
                                        }
                                      )
                                    }
                                  />
                                  <span className="checkbox-custom-sheet"></span>
                                  <span className="model-name-sheet">
                                    {car}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="empty-state-sheet">
                        <SearchIcon />
                        <p>No brands found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(activeSection === "body" ? null : "body")
                }
              >
                <div className="section-title-sheet">
                  <DashboardIcon className="section-icon-sheet" />
                  <span>Body Type</span>
                </div>
                {activeSection === "body" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "body" && (
                <div className="section-content-sheet">
                  <div className="options-grid-sheet">
                    {carBodyTypes.map((bodyType, index) => (
                      <label key={index} className="checkbox-sheet">
                        <input
                          type="checkbox"
                          checked={selectedBodyTypes.includes(bodyType.text)}
                          onChange={() =>
                            handleCheckboxChange(
                              selectedBodyTypes,
                              setSelectedBodyTypes,
                              bodyType.text
                            )
                          }
                        />
                        <span className="checkbox-custom-sheet"></span>
                        <span>{bodyType.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(activeSection === "year" ? null : "year")
                }
              >
                <div className="section-title-sheet">
                  <CalendarTodayIcon className="section-icon-sheet" />
                  <span>Year</span>
                </div>
                {activeSection === "year" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "year" && (
                <div className="section-content-sheet">
                  <div className="years-grid-sheet">
                    {years.map((year, index) => (
                      <button
                        key={index}
                        className={`year-chip-sheet ${
                          selectedYear === year.value ? "active" : ""
                        }`}
                        onClick={() => setSelectedYear(year.value)}
                      >
                        {year.text}
                        {selectedYear === year.value && <CheckCircleIcon />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(activeSection === "fuel" ? null : "fuel")
                }
              >
                <div className="section-title-sheet">
                  <LocalGasStationIcon className="section-icon-sheet" />
                  <span>Fuel Type</span>
                </div>
                {activeSection === "fuel" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "fuel" && (
                <div className="section-content-sheet">
                  <div className="options-grid-sheet">
                    {fuelTypes.map((fuel, index) => (
                      <label key={index} className="checkbox-sheet">
                        <input
                          type="checkbox"
                          checked={selectedFuelTypes.includes(fuel.text)}
                          onChange={() =>
                            handleCheckboxChange(
                              selectedFuelTypes,
                              setSelectedFuelTypes,
                              fuel.text
                            )
                          }
                        />
                        <span className="checkbox-custom-sheet"></span>
                        <span>{fuel.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(
                    activeSection === "ownership" ? null : "ownership"
                  )
                }
              >
                <div className="section-title-sheet">
                  <SettingsIcon className="section-icon-sheet" />
                  <span>Ownership</span>
                </div>
                {activeSection === "ownership" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "ownership" && (
                <div className="section-content-sheet">
                  <div className="options-grid-sheet">
                    {ownerShip.map((ownership, index) => (
                      <label key={index} className="checkbox-sheet">
                        <input
                          type="checkbox"
                          checked={selectedOwnership.includes(ownership.text)}
                          onChange={() =>
                            handleCheckboxChange(
                              selectedOwnership,
                              setSelectedOwnership,
                              ownership.text
                            )
                          }
                        />
                        <span className="checkbox-custom-sheet"></span>
                        <span>{ownership.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="filter-section-sheet">
              <div
                className="section-header-sheet"
                onClick={() =>
                  setActiveSection(
                    activeSection === "features" ? null : "features"
                  )
                }
              >
                <div className="section-title-sheet">
                  <SettingsIcon className="section-icon-sheet" />
                  <span>Features</span>
                </div>
                {activeSection === "features" ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </div>

              {activeSection === "features" && (
                <div className="section-content-sheet">
                  <div className="features-grid-sheet">
                    {carFeatures.map((feature, index) => (
                      <label key={index} className="checkbox-sheet">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature.text)}
                          onChange={() =>
                            handleCheckboxChange(
                              selectedFeatures,
                              setSelectedFeatures,
                              feature.text
                            )
                          }
                        />
                        <span className="checkbox-custom-sheet"></span>
                        <span>{feature.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filter-sheet-actions">
          <button className="reset-btn-sheet" onClick={clearFilters}>
            Reset All
          </button>
          <button className="apply-btn-sheet" onClick={applyFilters}>
            <DoneIcon />
            Apply{" "}
            {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
