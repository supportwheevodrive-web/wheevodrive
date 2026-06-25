import React, { useContext, useEffect, useState } from "react";
import "./ProfileScreen.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Card from "../../components/Card/Card";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_DEALER_CAR_URL } from "../../config/api";
import Loader from "../../components/Loader/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import { UserContext } from "../../hooks/UserContext";
import EmptyState from "../../components/EmptyState/EmptyState";
import PremiumPlans from "../../components/PremiumPlans/PremiumPlans";
import SubscriptionPromoCard from "../../components/SubscriptionPromoCard/SubscriptionPromoCard";
import { Box, Modal } from "@mui/material";
import {
  FREE_SUBSCRIPTION_MAX_CAR_COUNT,
  SUBRIPTION_PLANS,
} from "../../constants/userConstants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProfileScreen() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (user) {
      setIsSubscribed(user.subscribed);
    }
  }, [user]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_DEALER_CAR_URL, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        if (res && res.data) {
          setCars(res.data);
        }
      } catch (error) {
        return error;
      }
    };
    fetchCar();
  }, []);

  const handleAddCar = () => {
    if (
      user &&
      user.subscription_plan === SUBRIPTION_PLANS.FREE.TITLE &&
      cars.length === SUBRIPTION_PLANS.FREE.MAX_LISTING
    ) {
      handleOpen();
    } else if (
      user &&
      user.subscription_plan === SUBRIPTION_PLANS.PRO.TITLE &&
      cars.length === SUBRIPTION_PLANS.PRO.MAX_LISTING
    ) {
      handleOpen();
    } else {
      navigate("/car/add");
    }
  };

  return (
    <div className="profile-screen-container">
      <div className="profile-layout">
        <div className="profile-sidebar">
          <ProfileCard user={user} editable={true} />
          {user && !user?.subscribed && (
            <div className="mt-4">
              <SubscriptionPromoCard />
            </div>
          )}
        </div>

        <div className="profile-content">
          <Tabs>
            <TabList>
              {/* {isSubscribed && <Tab>Dashboard</Tab>} */}
              <Tab>Dashboard</Tab>
              <Tab>My Cars</Tab>
            </TabList>

            {/* {isSubscribed && (
              <TabPanel>
                <Dashboard dealerId={user?._id} />
              </TabPanel>
            )} */}

            <TabPanel>
              <Dashboard dealerId={user?._id} />
            </TabPanel>

            <TabPanel>
              <div className="cars-header">
                <button className="add-car-btn mt-2" onClick={handleAddCar}>
                  <ControlPointIcon />
                  Add Car
                </button>
              </div>
              <div className="cars-grid">
                {loading ? (
                  <Loader />
                ) : cars.length === 0 ? (
                  <div className="no-cars">
                    <EmptyState />
                  </div>
                ) : (
                  cars?.map((car, index) => (
                    <Card
                      key={index}
                      car={car}
                      editable={true}
                      category={car.status == "Sold" && "Sold"}
                    />
                  ))
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "24px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxWidth: "400px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                You have crossed your free subscription plan. Please subscribe
                our premium to add more cars.
              </span>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff0030",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background-color 0.2s",
                  ":hover": {
                    backgroundColor: "#30bfa1",
                  },
                }}
                onClick={() => (window.location.href = "/premium-plans")}
              >
                View plans
              </button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileScreen;
