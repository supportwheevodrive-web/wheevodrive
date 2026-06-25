import React, { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
// import { Button, Col, Row, Card } from "antd";
import Button from "antd/es/button";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Card from "antd/es/card";

// import 'antd/es/button/style/css';
// import 'antd/es/col/style/css';
// import 'antd/es/row/style/css';
// import 'antd/es/card/style/css';

import axios from "axios";
import { ADD_CAR_URL } from "../../config/api";
import Swal from "sweetalert2";
import { AnimatePresence } from "framer-motion";
import Overlay from "../../components/Overlay/Overlay";
import { useParams } from "react-router-dom";

function Review() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const {
    basicDetails,
    specificationDetails,
    additionalInformations,
    next,
    prev,
  } = useContext(MultiStepFormContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      ...basicDetails,
      ...specificationDetails,
      ...additionalInformations,
    };
    let res = null;
    const token = localStorage.getItem("token");
    if (id && token) {
      // Edit car
      res = await axios.patch(`${ADD_CAR_URL}/${id}`, body, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await axios.post(ADD_CAR_URL, body, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setLoading(false);
    if (res && res.status == 200) {
      Swal.fire({
        title: "Successfully added your car!",
        text: "Do you want to add another car ?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/car/add";
        } else {
          window.location.href = "/profile";
        }
      });
    }
  };

  return (
    <div className="details__wrapper" style={{ marginBottom: "40px" }}>
      <AnimatePresence>
        {loading && <Overlay isOpen={loading}></Overlay>}
      </AnimatePresence>
      <h2>Review Your Details</h2>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Basic Details">
            <p>
              <strong>Name:</strong> {basicDetails.car_name}
            </p>
            <p>
              <strong>Brand:</strong> {basicDetails.brand}
            </p>
            <p>
              <strong>Model:</strong> {basicDetails.model}
            </p>
            <p>
              <strong>Year:</strong> {basicDetails.year}
            </p>
            <p>
              <strong>Price:</strong> {basicDetails.price}
            </p>
            <p>
              <strong>Condition:</strong> {basicDetails.condition}
            </p>
            <p>
              <strong>Mileage:</strong> {basicDetails.mileage}
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Specifications">
            <p>
              <strong>Fuel Type:</strong> {specificationDetails.fuel_type}
            </p>
            <p>
              <strong>Transmission:</strong> {specificationDetails.transmission}
            </p>
            <p>
              <strong>Body Type:</strong> {specificationDetails.body_type}
            </p>
            <p>
              <strong>Engine Size:</strong> {specificationDetails.engine_size}
            </p>
            <p>
              <strong>Seats:</strong> {specificationDetails.seats}
            </p>
            <p>
              <strong>Color:</strong> {specificationDetails.color || "N/A"}
            </p>
            <p>
              <strong>Price Negotiable:</strong>{" "}
              {specificationDetails.price_negotiable}
            </p>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Additional Information">
            <p>
              <strong>Description:</strong> {additionalInformations.description}
            </p>
            <p>
              <strong>Location:</strong> {additionalInformations.location}
            </p>
            {additionalInformations.features &&
              additionalInformations.features.length > 0 && (
                <>
                  <strong>Features:</strong>
                  <ul>
                    {additionalInformations.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
          </Card>
        </Col>
      </Row>
      <div className="form__item button__items d-flex justify-content-between mt-4">
        <button className="button-transparent w-25" onClick={prev}>
          Back
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          // className="w-100"
          style={{
            borderRadius: 8,
            background: "#ff0030",
            color: "#fff",
            padding: "10px 42px",
            border: "none",
          }}
        >
          {loading ? <>Please wait....</> : <>Confirm</>}
        </button>
      </div>
    </div>
  );
}

export default Review;
