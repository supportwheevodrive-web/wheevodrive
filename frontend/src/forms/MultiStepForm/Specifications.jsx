import React, { useContext } from "react";
import { Formik } from "formik";
import Button from "antd/es/button";
import Input from "antd/es/input";
import Select from "antd/es/select";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import {
  DirectionsCar,
  Speed,
  Category,
  People,
  LocalGasStation,
  SyncAlt,
  AttachMoney,
} from "@mui/icons-material";
import MultiStepFormContext from "./MultiStepFormContext";

const { Title } = Typography;
const { Option } = Select;

function Specifications() {
  const { specificationDetails, setSpecificationDetails, next, prev } =
    useContext(MultiStepFormContext);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title
        level={3}
        style={{ textAlign: "left", marginBottom: 32, color: "#111" }}
      >
        Enter Car Specifications
      </Title>

      <Formik
        initialValues={specificationDetails}
        onSubmit={(values) => {
          setSpecificationDetails(values);
          next();
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fuel_type) errors.fuel_type = "Fuel type is required";
          if (!values.transmission)
            errors.transmission = "Transmission is required";
          if (!values.body_type) errors.body_type = "Body type is required";
          if (!values.engine_size)
            errors.engine_size = "Engine size is required";
          if (!values.seats) errors.seats = "Number of seats is required";
          if (!values.price_negotiable)
            errors.price_negotiable = "Please select an option";
          return errors;
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <Row gutter={24}>
              <Col xs={24} md={12} marginTop={0} style={{ marginTop: "20px" }}>
                <div
                  className={`form__item ${errors.fuel_type && "input__error"}`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Fuel Type*
                  </label>
                  <Select
                    placeholder="Select Fuel Type"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.fuel_type}
                    onChange={(value) => setFieldValue("fuel_type", value)}
                  >
                    {["Petrol", "Diesel", "Hybrid", "Electric"].map((fuel) => (
                      <Option key={fuel} value={fuel}>
                        {fuel}
                      </Option>
                    ))}
                  </Select>
                  {errors.fuel_type && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.fuel_type}
                    </p>
                  )}
                </div>
              </Col>

              <Col xs={24} md={12} style={{ marginTop: "20px" }}>
                <div
                  className={`form__item ${
                    errors.transmission && "input__error"
                  }`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Transmission*
                  </label>
                  <Select
                    placeholder="Select Transmission"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.transmission}
                    onChange={(value) => setFieldValue("transmission", value)}
                  >
                    {["Automatic", "Manual"].map((trans) => (
                      <Option key={trans} value={trans}>
                        {trans}
                      </Option>
                    ))}
                  </Select>
                  {errors.transmission && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.transmission}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12} style={{ marginTop: "20px" }}>
                <div
                  className={`form__item ${errors.body_type && "input__error"}`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Body Type*
                  </label>
                  <Select
                    placeholder="Select Body Type"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.body_type}
                    onChange={(value) => setFieldValue("body_type", value)}
                  >
                    {["Sedan", "SUV", "Hatchback"].map((body) => (
                      <Option key={body} value={body}>
                        {body}
                      </Option>
                    ))}
                  </Select>
                  {errors.body_type && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.body_type}
                    </p>
                  )}
                </div>
              </Col>

              <Col xs={24} md={12} style={{ marginTop: "20px" }}>
                <div
                  className={`form__item ${
                    errors.engine_size && "input__error"
                  }`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Engine Size*
                  </label>
                  <Input
                    name="engine_size"
                    placeholder="Example: 1500cc"
                    value={values.engine_size}
                    onChange={handleChange}
                    size="large"
                    style={{ borderRadius: 8, height: "60px" }}
                  />
                  {errors.engine_size && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.engine_size}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12} style={{ marginTop: "20px" }}>
                <div className={`form__item ${errors.seats && "input__error"}`}>
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Number of Seats*
                  </label>
                  <Input
                    name="seats"
                    placeholder="Example: 5"
                    value={values.seats}
                    onChange={handleChange}
                    size="large"
                    style={{ borderRadius: 8, height: "60px" }}
                  />
                  {errors.seats && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.seats}
                    </p>
                  )}
                </div>
              </Col>

              <Col xs={24} md={12} style={{ marginTop: "20px" }}>
                <div
                  className={`form__item ${
                    errors.price_negotiable && "input__error"
                  }`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Price Negotiable?*
                  </label>
                  <Select
                    placeholder="Select Option"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.price_negotiable}
                    onChange={(value) =>
                      setFieldValue("price_negotiable", value)
                    }
                  >
                    {["Yes", "No"].map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                  {errors.price_negotiable && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.price_negotiable}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: 32 }} justify="space-between">
              <Button
                type="default"
                size="large"
                onClick={prev}
                style={{ borderRadius: 8, padding: "10px 32px" }}
              >
                Back
              </Button>
              <Button
                size="large"
                onClick={handleSubmit}
                style={{
                  borderRadius: 8,
                  background: "#ff0030",
                  color: "#fff",
                  padding: "10px 32px",
                }}
              >
                Next
              </Button>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Specifications;
