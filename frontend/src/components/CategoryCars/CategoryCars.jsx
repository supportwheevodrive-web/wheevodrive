import React, { useEffect, useState } from "react";
import "./CategoryCars.css";
import axios from "axios";
import { GET_ALL_CARS } from "../../config/api";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

function CategoryCars({ category }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${GET_ALL_CARS}?body_type=${category}`);
        setLoading(false);
        if (res && res.data && res.data.data?.length > 0) {
          setCars(res.data.data);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [category]);

  return (
    <div>
      <div className="cars-grid">
        {loading ? (
          <Loader />
        ) : cars?.length === 0 ? (
          <div className="no-cars">No cars available</div>
        ) : (
          cars?.map((car, index) => (
            <Card key={index} car={car} editable={false} category={"Latest"} />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryCars;
