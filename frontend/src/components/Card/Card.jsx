import React, { useEffect, useState } from "react";
import "./Card.css";
import ActionMenu from "../ActionMenu/ActionMenu";
import axios from "axios";
import { ADD_CAR_VIEWS_COUNT } from "../../config/api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import { formatViews } from "../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

function Card({ car, editable = false, category }) {
  const [favCars, setFavCars] = useState([]);

  useEffect(() => {
    const favsCarss = JSON.parse(localStorage.getItem("fav-cars")) || [];
    setFavCars(favsCarss);
  }, [car]);

  const isFavourite = favCars.includes(car?._id);

  const handleNavigateToCar = async () => {
    const queryParams = new URLSearchParams({
      name: car?.car_name || "",
      brand: car?.brand || "",
      model: car?.model || "",
      year: car?.year || "",
      price: car?.price || "",
      mileage: car?.mileage || "",
      fuel_type: car?.fuel_type || "",
      transmission: car?.transmission || "",
      body_type: car?.body_type || "",
      condition: car?.condition || "",
      place: car?.place || "",
      seats: car?.seats || "",
      engine_size: car?.engine_size || "",
      status: car?.status || "",
      views: car?.views || "",
    }).toString();

    window.location.href = `/car/${car._id}?${queryParams}`;
    await axios.post(`${ADD_CAR_VIEWS_COUNT}/${car._id}`);
  };

  const addToFav = () => {
    let updatedFavCars;

    if (isFavourite) {
      updatedFavCars = favCars.filter((favId) => favId !== car._id);
      toast.error("Removed from favourites");
    } else {
      updatedFavCars = [...favCars, car._id];
      toast.success("Added to favourites");
    }

    localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
    setFavCars(updatedFavCars);
  };

  return (
    <div className="car-card">
      <div className="car-card__image-wrapper">
        <img
          src={car?.images[0]}
          alt={car?.car_name}
          className="car-card__image"
          onClick={handleNavigateToCar}
        />

        {category && <span className="car-card__badge">{category}</span>}

        <button
          className="car-card__favorite"
          onClick={() => {
            if (!editable) {
              addToFav();
            }
          }}
        >
          {!editable && (
            <FaHeart
              className={
                isFavourite
                  ? "car-card__favorite-icon--active"
                  : "car-card__favorite-icon"
              }
            />
          )}
          {editable && <ActionMenu id={car._id} />}
        </button>
      </div>

      <div className="car-card__content">
        <div className="car-card__header">
          <h3 className="car-card__title">{car?.car_name ?? "_"}</h3>
          <div className="car-card__price">
            <span className="car-card__price-current">
              ₹{car?.price?.toLocaleString() ?? "_"}
            </span>
            {car?.original_price && (
              <span className="car-card__price-original">
                ₹{car.original_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="car-card__specs">
          <div className="car-card__spec">
            <DirectionsCarIcon />
            <span>{car?.year ?? "_"}</span>
          </div>
          <div className="car-card__spec">
            <LocalGasStationIcon />
            <span>{car?.fuel_type ?? "_"}</span>
          </div>
          <div className="car-card__spec">
            <SettingsIcon />
            <span>{car?.transmission ?? "_"}</span>
          </div>
        </div>

        <div className="car-card__footer">
          <div className="car-card__location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            <span>{car?.place ?? "_"}</span>
          </div>
          <div className="car-card__views">
            <RemoveRedEyeIcon />
            <span>{formatViews(car?.views?.toLocaleString())}</span>
          </div>
        </div>

        <button className="car-card__button" onClick={handleNavigateToCar}>
          View Details
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Card;
