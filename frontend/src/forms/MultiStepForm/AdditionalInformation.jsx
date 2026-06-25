import React, { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { Button, Input, Tag, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "antd/es/button";
import Input from "antd/es/input";
import Tag from "antd/es/tag";
import Upload from "antd/es/upload";

// import 'antd/es/button/style/css';
// import 'antd/es/input/style/css';
// import 'antd/es/tag/style/css';
// import 'antd/es/upload/style/css';

function AdditionalInformation() {
  const { additionalInformations, setAdditionalInformations, next, prev } =
    useContext(MultiStepFormContext);
  const [features, setFeatures] = useState(
    additionalInformations.features || []
  );
  const [featureInput, setFeatureInput] = useState("");
  const [images, setImages] = useState(additionalInformations.images || []);

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput)) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async ({ fileList }) => {
    const base64Images = await Promise.all(fileList.map(convertToBase64));
    setImages(base64Images); // Store Base64 images for preview or further processing
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Formik
      initialValues={{
        description: additionalInformations.description || "",
        place: additionalInformations.place || "",
      }}
      validationSchema={Yup.object({
        description: Yup.string().required("Description is required"),
        place: Yup.string().required("Location is required"),
      })}
      onSubmit={(values) => {
        setAdditionalInformations({ ...values, features, images });
        next();
      }}
    >
      {({ handleSubmit }) => (
        <Form className="details__wrapper" style={{ marginBottom: "40px" }}>
          <div className="form__item">
            <label>Description</label>
            <Field name="description" as={Input} style={{ padding: "15px" }} />
            <ErrorMessage
              name="description"
              component="p"
              className="error__feedback"
            />
          </div>
          <div className="form__item mt-4">
            <label>Location</label>
            <Field name="place" as={Input} style={{ padding: "15px" }} />
            <ErrorMessage
              name="place"
              component="p"
              className="error__feedback"
            />
          </div>
          <div className="form__item mt-4">
            <label>Upload Images</label>
            <Upload
              listType="picture"
              multiple
              beforeUpload={() => false}
              onChange={handleImageUpload}
              showUploadList={false}
              style={{ padding: "15px" }}
            >
              <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={image}
                    alt={`upload-${index}`}
                    className="additional-image"
                    title="addional-inf-user-img"
                  />
                  <DeleteOutlineIcon
                    className="delete-icon"
                    onClick={() => removeImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="form__item">
            <label>Features</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onPressEnter={addFeature}
                style={{ padding: "15px" }}
              />
              <Button icon={<PlusOutlined />} onClick={addFeature} />
            </div>
            <div style={{ marginTop: "8px" }}>
              {features.map((feature) => (
                <Tag
                  key={feature}
                  closable
                  onClose={() => removeFeature(feature)}
                  style={{
                    backgroundColor: "#ff0030",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "4px 12px", // Adjusted padding for better proportions
                    display: "inline-flex",
                    alignItems: "center",
                    border: "none", // Removes default AntD border
                    fontSize: "14px",
                  }}
                >
                  {feature}
                </Tag>
              ))}
            </div>
          </div>
          <div className="form__item button__items d-flex justify-content-between mt-4">
            <Button
              type="default"
              onClick={prev}
              style={{
                borderRadius: 8,
                padding: "20px 32px",
              }}
            >
              Back
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{
                borderRadius: 8,
                background: "#ff0030",
                color: "#fff",
                padding: "20px 32px",
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdditionalInformation;
