import React from "react";
import { FaCrown, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Chip,
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid #f0f0f0",
  maxWidth: "380px",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
    borderColor: "#ff0030",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #ff0030, #ff6b6b, #ff0030)",
    backgroundSize: "200% 100%",
    animation: "gradientMove 3s ease-in-out infinite",
  },
  "@keyframes gradientMove": {
    "0%, 100%": {
      backgroundPosition: "200% 0",
    },
    "50%": {
      backgroundPosition: "-200% 0",
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: "#ff0030",
  color: "#ffffff",
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.3rem",
  flexShrink: 0,
  boxShadow: "0 4px 12px rgba(255, 0, 48, 0.25)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05) rotate(-5deg)",
  },
}));

const FeatureListItem = styled(ListItem)(({ theme }) => ({
  padding: "8px 0",
  "& .MuiListItemIcon-root": {
    minWidth: 32,
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  background: "#ff0030",
  color: "#ffffff",
  borderRadius: "12px",
  padding: "12px 24px",
  fontWeight: 700,
  fontSize: "0.95rem",
  textTransform: "none",
  width: "100%",
  boxShadow: "0 4px 16px rgba(255, 0, 48, 0.25)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "#e6002a",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(255, 0, 48, 0.35)",
  },
  "& .MuiButton-endIcon": {
    transition: "transform 0.3s ease",
  },
  "&:hover .MuiButton-endIcon": {
    transform: "translateX(4px)",
  },
}));

const PremiumBadge = styled(Chip)(({ theme }) => ({
  background: "#ff0030",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.7rem",
  borderRadius: "6px",
  height: 24,
  "& .MuiChip-label": {
    padding: "0 12px",
  },
}));

const SubscriptionPromoCard = () => {
  const navigate = useNavigate();

  const handleSubscribeClick = (e) => {
    e.stopPropagation();
    navigate("/premium-plans");
  };

  const features = [
    {
      icon: <StarsIcon sx={{ color: "#ff0030", fontSize: 20 }} />,
      text: "More listings",
    },
    {
      icon: <WhatshotIcon sx={{ color: "#ff0030", fontSize: 20 }} />,
      text: "Priority placement",
    },
    {
      icon: <TrendingUpIcon sx={{ color: "#ff0030", fontSize: 20 }} />,
      text: "Advanced analytics",
    },
    {
      icon: <LocalOfferIcon sx={{ color: "#ff0030", fontSize: 20 }} />,
      text: "Exclusive deals",
    },
  ];

  return (
    <StyledCard onClick={handleSubscribeClick}>
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
        <IconWrapper>
          <FaCrown />
        </IconWrapper>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: "1.25rem",
              }}
            >
              Upgrade Your Account
            </Typography>
            <PremiumBadge label="PREMIUM" size="small" />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#718096",
              lineHeight: 1.6,
            }}
          >
            Unlock premium features to get more leads and sell faster
          </Typography>
        </Box>
      </Box>

      <List sx={{ py: 1, mb: 2 }}>
        {features.map((feature, index) => (
          <FeatureListItem key={index} disableGutters>
            <ListItemIcon>{feature.icon}</ListItemIcon>
            <Typography
              variant="body2"
              sx={{
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              {feature.text}
            </Typography>
          </FeatureListItem>
        ))}
      </List>

      <SubscribeButton
        variant="contained"
        endIcon={<FaArrowRight />}
        onClick={handleSubscribeClick}
      >
        Subscribe Now
      </SubscribeButton>

      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,0,48,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </StyledCard>
  );
};

export default SubscriptionPromoCard;
