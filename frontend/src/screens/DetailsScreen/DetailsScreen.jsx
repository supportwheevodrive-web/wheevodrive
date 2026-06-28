import React, { useContext, useEffect, useState } from "react";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ADD_CHAT_USER, CAR_DETAILS_API, GET_ALL_CARS } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Loader from "../../components/Loader/Loader";
import {
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaPalette,
  FaChair,
  FaHeart,
  FaShareAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaRoad,
  FaUsers,
  FaCog,
  FaShieldAlt,
  FaStar,
  FaRegClock,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { UserContext } from "../../hooks/UserContext";
import { Box, Modal } from "@mui/material";
import { DEFAULT_AVATAR } from "../../constants/urls";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
  p: 0,
  overflow: "hidden",
  border: "none",
};

function DetailsScreen() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [saved, setSaved] = useState(false);
  const [similarCars, setSimilarCars] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigatetoChat = async () => {
    const token = localStorage.getItem("token");
    if (!user) {
      handleOpen();
    } else {
      await axios.post(
        `${ADD_CHAT_USER}`,
        { receiverId: car?.dealer_id?._id },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = "/chats";
    }
  };

  const notify = () => toast.success("Link copied to clipboard");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${CAR_DETAILS_API}/${id}`);
        if (res?.data?.data) {
          setCar(res.data.data);
          let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
          if (favCars.includes(id)) setIsFavourite(true);
          setMainImage(res.data.data.images[0]);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const fetchSimilarCars = async () => {
      if (car) {
        const similar_cars = await axios.get(
          `${GET_ALL_CARS}?brand=${car?.brand}`
        );
        if (similar_cars) setSimilarCars(similar_cars.data.data);
      }
    };
    fetchSimilarCars();
  }, [car]);

  if (loading) return <Loader />;
  if (!car) return <div className="error-state">Car not found</div>;

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => notify())
      .catch((err) => err);
  };

  const addToFav = () => {
    setSaved(!saved);
    let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
    if (!favCars.includes(id)) {
      favCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.success("Added to favourites");
      setIsFavourite(true);
    } else {
      favCars = favCars.filter((favId) => favId !== id);
      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.error("Removed from favourites");
      setIsFavourite(false);
    }
  };

  return (
    <div className="dc-wrap">
      <Helmet>
        <title>
          {car?.title || car?.brand + " " + car?.model} - WheevoDrive
        </title>
        <meta
          name="description"
          content={`Buy ${car?.brand} ${car?.model} in ${car?.location}. ${car?.kilometers_driven} driven, ${car?.fuel_type} car in good condition.`}
        />
        <meta
          name="keywords"
          content={`${car?.brand}, ${car?.model}, used cars in ${car?.location}, second hand ${car?.brand}`}
        />
        <meta
          property="og:title"
          content={`${car?.brand} ${car?.model} - WheevoDrive`}
        />
        <meta
          property="og:description"
          content={`Buy this ${car?.fuel_type} ${car?.brand} ${car?.model} in ${car?.location}.`}
        />
        <meta property="og:image" content={car?.images?.[0]} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://WheevoDrive.com/cars/${id}`}
        />
        <link rel="canonical" href={`https://WheevoDrive.com/cars/${id}`} />
      </Helmet>

      <div className="dc-breadcrumb">
        <a href="/" className="dc-back-link">
          <FaArrowLeft /> <span>Back to listings</span>
        </a>
        <div className="dc-breadcrumb-trail">
          <a href="/">Home</a>
          <span>/</span>
          <span>{car.brand}</span>
          <span>/</span>
          <span className="dc-breadcrumb-current">{car.model}</span>
        </div>
      </div>

      <div className="dc-hero">
        <div className="dc-gallery">
          <div className="dc-main-img-wrap">
            <img
              src={mainImage}
              alt={`${car.brand} ${car.model}`}
              className={`dc-main-img ${imageLoaded ? "dc-img-visible" : ""}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x600?text=Image+Not+Available")
              }
              title="car details image"
              onClick={() => setIsZoomed(!isZoomed)}
            />
            <div className="dc-img-overlay">
              <div className="dc-img-actions">
                <button
                  className={`dc-action-btn ${
                    isFavourite ? "dc-action-active" : ""
                  }`}
                  onClick={addToFav}
                  aria-label="Save to favourites"
                >
                  <FaHeart />
                </button>
                <button
                  className="dc-action-btn"
                  onClick={handleShareClick}
                  aria-label="Share listing"
                >
                  <FaShareAlt />
                </button>
              </div>
              <div className="dc-view-badge">
                <span>{car.views?.toLocaleString()} views</span>
              </div>
            </div>
            <div
              className={`dc-status-flag ${
                car?.status === "Available"
                  ? "dc-status-available"
                  : "dc-status-sold"
              }`}
            >
              {car?.status}
            </div>
            {isZoomed && (
              <div
                className="dc-zoom-overlay"
                onClick={() => setIsZoomed(false)}
              >
                <img src={mainImage} alt="Zoomed" className="dc-zoom-img" />
              </div>
            )}
          </div>

          <div className="dc-thumbnails">
            {car.images.map((image, index) => (
              <button
                key={index}
                className={`dc-thumb ${
                  mainImage === image ? "dc-thumb-active" : ""
                }`}
                onClick={() => {
                  setMainImage(image);
                  setImageLoaded(false);
                }}
              >
                <img
                  src={image}
                  alt={`View ${index + 1}`}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/100x75?text=N/A")
                  }
                  title="car image thumbnail"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="dc-info">
          <div className="dc-info-header">
            <div className="dc-year-tag">
              <FaCalendarAlt /> {car.year}
            </div>
            <h1 className="dc-car-title">
              {car.brand} {car.model}
            </h1>
            <div className="dc-price-row">
              <span className="dc-price">{car.price?.toLocaleString()}</span>
              {car.originalPrice && (
                <span className="dc-orig-price">
                  {car.originalPrice?.toLocaleString()}
                </span>
              )}
              <span className="dc-price-badge">Excellent Deal</span>
            </div>
            <div className="dc-location">
              <FaMapMarkerAlt />
              <span>{car.location || "Location not specified"}</span>
            </div>
            <div className="dc-rating-row">
              <div className="dc-stars">
                <FaStar className="dc-star-filled" />
                <FaStar className="dc-star-filled" />
                <FaStar className="dc-star-filled" />
                <FaStar className="dc-star-filled" />
                <FaStar className="dc-star-filled" />
              </div>
              <span className="dc-rating-text">4.9 (124 reviews)</span>
            </div>
          </div>

          <div className="dc-specs-bar">
            <div className="dc-spec-pill">
              <FaTachometerAlt />
              <div>
                <p className="dc-spec-label">Mileage</p>
                <p className="dc-spec-val">
                  {car.mileage?.toLocaleString()} mi
                </p>
              </div>
            </div>
            <div className="dc-spec-pill">
              <FaGasPump />
              <div>
                <p className="dc-spec-label">Fuel</p>
                <p className="dc-spec-val">{car.fuel_type}</p>
              </div>
            </div>
            <div className="dc-spec-pill">
              <BsFillGearFill />
              <div>
                <p className="dc-spec-label">Transmission</p>
                <p className="dc-spec-val">{car.transmission}</p>
              </div>
            </div>
            <div className="dc-spec-pill">
              <GiCarWheel />
              <div>
                <p className="dc-spec-label">Drive</p>
                <p className="dc-spec-val">{car.drivetrain}</p>
              </div>
            </div>
          </div>

          <div className="dc-cta-group">
            <a
              href={`tel:${car?.dealer_id?.phone}`}
              className="dc-btn dc-btn-primary"
            >
              <FaPhone /> Call Seller
            </a>
            {car?.dealer_id?._id !== user?._id && (
              <>
                <button
                  className="dc-btn dc-btn-whatsapp"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${car?.dealer_id?.phone}`,
                      "_blank"
                    )
                  }
                >
                  <FaWhatsapp /> WhatsApp
                </button>
                <button
                  className="dc-btn dc-btn-ghost"
                  onClick={handleNavigatetoChat}
                >
                  <FaEnvelope /> Chat
                </button>
              </>
            )}
          </div>

          <div className="dc-seller-card">
            <p className="dc-seller-heading">Listed by</p>

            <div className="dc-seller-body">
              <img
                src={car?.dealer_id?.profile_picture || DEFAULT_AVATAR}
                alt="Dealer"
                className="dc-seller-avatar"
              />
              <div className="dc-seller-text">
                <p className="dc-seller-name">
                  {car?.dealer_id?.first_name || "Dealer"}
                </p>
                <p className="dc-seller-loc">
                  <FaMapMarkerAlt />{" "}
                  {car?.dealer_id?.location || "Location not specified"}
                </p>
                <p className="dc-seller-since">
                  <FaRegClock />
                  {car?.dealer_id?.createdAt
                    ? `Member since ${new Date(
                        car?.dealer_id?.createdAt
                      ).getFullYear()} `
                    : "Unavailable"}
                </p>
              </div>
              <button
                className="dc-profile-btn"
                onClick={() =>
                  (window.location.href = `/profile/${car?.dealer_id._id}`)
                }
              >
                View Profile
              </button>
            </div>
          </div>

          <div className="dc-highlights">
            <div className="dc-highlight-item">
              <FaShieldAlt />
              <span>Verified Seller</span>
            </div>
            <div className="dc-highlight-item">
              <FaCheckCircle />
              <span>Inspection Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dc-tabs-wrap">
        <div className="dc-tabs">
          {["details", "specs", "features"].map((tab) => (
            <button
              key={tab}
              className={`dc-tab ${activeTab === tab ? "dc-tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "details"
                ? "Overview"
                : tab === "specs"
                ? "Specifications"
                : "Features"}
            </button>
          ))}
        </div>

        <div className="dc-tab-body">
          {activeTab === "details" && (
            <div className="dc-overview">
              <h2>Vehicle Description</h2>
              <p>{car.description || "No description available."}</p>
              <div className="dc-overview-stats">
                <div className="dc-stat-item">
                  <FaRoad />
                  <div>
                    <span className="dc-stat-label">Mileage</span>
                    <span className="dc-stat-value">
                      {car.mileage?.toLocaleString()} mi
                    </span>
                  </div>
                </div>
                <div className="dc-stat-item">
                  <FaUsers />
                  <div>
                    <span className="dc-stat-label">Seats</span>
                    <span className="dc-stat-value">{car.seats}</span>
                  </div>
                </div>
                <div className="dc-stat-item">
                  <FaCog />
                  <div>
                    <span className="dc-stat-label">Engine</span>
                    <span className="dc-stat-value">{car.engine_size}</span>
                  </div>
                </div>
                <div className="dc-stat-item">
                  <FaPalette />
                  <div>
                    <span className="dc-stat-label">Color</span>
                    <span className="dc-stat-value">{car.color}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="dc-specs-grid">
              <div className="dc-spec-group">
                <h3>
                  <FaCar /> Vehicle
                </h3>
                <SpecItem label="Make" value={car.make} />
                <SpecItem label="Model" value={car.model} />
                <SpecItem label="Year" value={car.year} />
                <SpecItem label="Condition" value={car.condition} />
                <SpecItem label="Body Type" value={car.body_type} />
              </div>
              <div className="dc-spec-group">
                <h3>
                  <GiCarWheel /> Mechanical
                </h3>
                <SpecItem label="Engine" value={car.engine_size} />
                <SpecItem label="Transmission" value={car.transmission} />
                <SpecItem label="Fuel Type" value={car.fuel_type} />
                <SpecItem label="Drivetrain" value={car.drivetrain} />
                <SpecItem
                  label="Mileage"
                  value={car.mileage?.toLocaleString() + " mi"}
                />
              </div>
              <div className="dc-spec-group">
                <h3>
                  <FaPalette /> Exterior
                </h3>
                <SpecItem label="Body Type" value={car.body_type} />
                <SpecItem label="Color" value={car.color} />
                <SpecItem label="Doors" value={car.doors} />
                <SpecItem label="VIN" value={car.vin} />
              </div>
              <div className="dc-spec-group">
                <h3>
                  <FaChair /> Interior
                </h3>
                <SpecItem label="Seats" value={car.seats} />
                <SpecItem label="Upholstery" value={car.upholstery || "—"} />
                <SpecItem
                  label="Interior Color"
                  value={car.interior_color || "—"}
                />
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="dc-features">
              <h2>Features & Options</h2>
              <div className="dc-features-grid">
                {car.features?.length > 0 ? (
                  car.features.map((feature, index) => (
                    <div key={index} className="dc-feature-item">
                      <FaCheckCircle className="dc-check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="dc-empty">No features listed.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {similarCars?.length > 0 && (
        <div className="dc-similar">
          <div className="dc-similar-header">
            <h2>Similar Vehicles</h2>
            <span className="dc-similar-count">
              {similarCars.length} listings
            </span>
          </div>
          <div className="dc-similar-grid">
            {similarCars.map((item, idx) => (
              <div
                key={idx}
                className="dc-similar-card"
                onClick={() => {
                  window.location.href = `/car/${item?._id}`;
                }}
              >
                <div className="dc-similar-img">
                  <img
                    src={item?.images?.[0]}
                    alt={`${item?.brand} ${item?.model}`}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image")
                    }
                    title="similar car"
                  />
                  <div className="dc-similar-fuel">{item?.fuel_type}</div>
                  <div className="dc-similar-year">{item?.year}</div>
                </div>
                <div className="dc-similar-info">
                  <p className="dc-similar-name">
                    {item?.car_name} {item?.model}
                  </p>
                  <p className="dc-similar-price">
                    {(item?.price ?? "").toLocaleString()}
                  </p>
                  <div className="dc-similar-meta">
                    <span>{item?.mileage} mi</span>
                    <span>{item?.transmission}</span>
                    <span>{item?.fuel_type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <div className="dc-modal-inner">
            <div className="dc-modal-icon">🔐</div>
            <h3 className="dc-modal-title">Sign in required</h3>
            <p className="dc-modal-text">
              You need an account to chat with the dealer.
            </p>
            <div className="dc-modal-actions">
              <button
                className="dc-modal-btn dc-modal-primary"
                onClick={() => (window.location.href = "/signin")}
              >
                Go to Login
              </button>
              <button
                className="dc-modal-btn dc-modal-secondary"
                onClick={handleClose}
              >
                Maybe later
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const SpecItem = ({ label, value }) => (
  <div className="dc-spec-row">
    <span className="dc-spec-row-label">{label}</span>
    <span className="dc-spec-row-val">{value || "—"}</span>
  </div>
);

export default DetailsScreen;
