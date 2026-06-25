import React, { useContext, useEffect, useState } from "react";
import "./EditProfileScreen.css";
import { UserContext } from "../../hooks/UserContext";
import { DEFAULT_AVATAR } from "../../constants/urls";
import Button from "antd/es/button";
import Upload from "antd/es/upload";
import {
  UploadOutlined,
  Person,
  Business,
  LocationOn,
  Email,
  Phone,
  Store,
  Save,
  CheckCircle,
  Cancel,
  ArrowForwardIos,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../../config/api";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { motion, AnimatePresence } from "framer-motion";

function EditProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    business_name: "",
    location: "",
    address: "",
    has_physical_store: false,
    profile_picture: DEFAULT_AVATAR,
    role: "",
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async ({ fileList }) => {
    if (fileList.length === 0) return;
    const base64Image = await convertToBase64(fileList[fileList.length - 1]);
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: base64Image };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleRemoveImage = () => {
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: DEFAULT_AVATAR };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleDiscardChanges = async () => {
    Swal.fire({
      title: "Discard Changes?",
      text: "You'll lose all unsaved changes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0030",
      cancelButtonColor: "#1a1a1a",
      confirmButtonText: "Yes, discard",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUserData(user);
        setIsEdited(false);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setLoading(true);
        await axios.patch(`${UPDATE_PROFILE_URL}/${user._id}`, userData);
        setIsEdited(false);
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonColor: "#ff0030",
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update profile",
        icon: "error",
        confirmButtonColor: "#ff0030",
      });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({
    icon: Icon,
    label,
    name,
    type = "text",
    placeholder,
    required = false,
  }) => (
    <div className="modern-input-group">
      <label className="modern-label">
        {label} {required && <span>*</span>}
      </label>
      <div className="input-wrapper">
        <Icon className="input-icon" />
        {type === "textarea" ? (
          <textarea
            name={name}
            value={userData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            rows="3"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={userData[name]}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <LoadingOverlay loading={loading} />

      <div className="settings-container">
        <aside className="settings-sidebar">
          <div className="sidebar-profile">
            <div className="sidebar-avatar-container">
              <img src={userData.profile_picture} alt="Profile" />
              <Upload
                beforeUpload={() => false}
                onChange={handleImageUpload}
                showUploadList={false}
              >
                <button className="avatar-edit-fab">
                  <UploadOutlined style={{ fontSize: "16px" }} />
                </button>
              </Upload>
            </div>
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <span className="role-tag">{userData.role}</span>
          </div>

          <nav className="settings-nav">
            <button
              className={`nav-item ${
                activeSection === "personal" ? "active" : ""
              }`}
              onClick={() => setActiveSection("personal")}
            >
              <Person />
              <span>Personal Info</span>
              <ArrowForwardIos className="arrow" />
            </button>
            <button
              className={`nav-item ${
                activeSection === "business" ? "active" : ""
              }`}
              onClick={() => setActiveSection("business")}
            >
              <Business />
              <span>Business Details</span>
              <ArrowForwardIos className="arrow" />
            </button>
          </nav>

          <div className="sidebar-footer">
            {isEdited && (
              <div className="unsaved-status">
                <CheckCircle />
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
        </aside>

        <main className="settings-content">
          <form onSubmit={handleSubmit} className="settings-form">
            <AnimatePresence mode="wait">
              {activeSection === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="settings-section"
                >
                  <div className="section-header">
                    <h2>Personal Information</h2>
                    <p>Update your personal details and contact info</p>
                  </div>

                  <div className="modern-grid">
                    <InputField
                      icon={Person}
                      label="First Name"
                      name="first_name"
                      required
                    />
                    <InputField
                      icon={Person}
                      label="Last Name"
                      name="last_name"
                      required
                    />
                    <InputField
                      icon={Email}
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                    />
                    <InputField
                      icon={Phone}
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {activeSection === "business" && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="settings-section"
                >
                  <div className="section-header">
                    <h2>Business Details</h2>
                    <p>Configure your business identity and location</p>
                  </div>

                  <div className="modern-grid">
                    <InputField
                      icon={Business}
                      label="Business Name"
                      name="business_name"
                    />
                    <InputField
                      icon={LocationOn}
                      label="Location"
                      name="location"
                    />
                    <div className="full-width">
                      <InputField
                        icon={LocationOn}
                        label="Full Address"
                        name="address"
                        type="textarea"
                      />
                    </div>
                    <div className="full-width">
                      <label className="modern-checkbox">
                        <input
                          type="checkbox"
                          name="has_physical_store"
                          checked={userData.has_physical_store}
                          onChange={handleChange}
                        />
                        <div className="checkbox-box">
                          <Store className="check-icon" />
                        </div>
                        <span>I have a physical store location</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="settings-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleDiscardChanges}
                disabled={!isEdited || loading}
              >
                <Cancel />
                Discard
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!isEdited || loading}
              >
                {loading ? (
                  <div className="spinner" />
                ) : (
                  <>
                    <Save /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditProfileScreen;
