import React, { useState } from "react";
import { formatDate } from "../../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  borderRadius: 16,
  overflow: "hidden",
  background: "#ffffff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid #f0f0f0",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  padding: "40px 24px 56px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,0,48,0.05) 0%, transparent 70%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,0,48,0.03) 0%, transparent 70%)",
  },
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "fit-content",
  margin: "0 auto",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "4px solid white",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const InitialsAvatar = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: "50%",
  background: "#ff0030",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 48,
  fontWeight: 700,
  color: "#ffffff",
  border: "4px solid white",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
}));

const VerifiedBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 4,
  right: 4,
  background: "white",
  borderRadius: "50%",
  padding: 4,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  padding: "24px",
  background: "#ffffff",
  marginTop: "-32px",
  borderRadius: "16px 16px 0 0",
  position: "relative",
  zIndex: 1,
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#1a1a2e",
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: "#718096",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "12px",
  color: "#4a5568",
  fontSize: "0.9rem",
  gap: "12px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "10px 24px",
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  background: "#ff0030",
  color: "#ffffff",
  boxShadow: "0 4px 12px rgba(255, 0, 48, 0.25)",
  "&:hover": {
    background: "#e6002a",
    boxShadow: "0 6px 20px rgba(255, 0, 48, 0.35)",
  },
  "&:disabled": {
    background: "#e8ecf1",
    color: "#a0aec0",
    boxShadow: "none",
  },
}));

const SecondaryButton = styled(StyledButton)(({ theme }) => ({
  background: "#f7fafc",
  color: "#2d3748",
  border: "1px solid #e2e8f0",
  "&:hover": {
    background: "#edf2f7",
    borderColor: "#cbd5e0",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

const SkeletonWrapper = styled(Box)(({ theme }) => ({
  padding: "24px",
  background: "#ffffff",
  borderRadius: "16px",
}));

const SkeletonAvatar = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  margin: "0 auto 20px",
}));

const SkeletonText = styled(Box)(({ theme }) => ({
  height: 16,
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 8,
  margin: "12px 0",
  "&:first-of-type": {
    width: "70%",
    margin: "0 auto 12px",
  },
  "&:last-of-type": {
    width: "50%",
    margin: "0 auto",
  },
}));

function ProfileCard({ user, editable = false, onEdit, onShare }) {
  const [isSharing, setIsSharing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEditProfile = () => {
    if (onEdit) {
      onEdit();
    } else {
      window.location.href = "/profile/edit";
    }
  };

  const handleShareProfile = async () => {
    if (!user) return;

    setIsSharing(true);
    const currentUrl = `${window.location.origin}/profile/${user._id}`;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("✨ Link copied to clipboard!", {
        position: "bottom-center",
        autoClose: 2000,
        style: {
          background: "#1a1a2e",
          color: "#ffffff",
          borderRadius: "12px",
        },
        progressStyle: {
          background: "#ff0030",
        },
      });
      if (onShare) onShare();
    } catch (error) {
      toast.error("Failed to copy link. Please try again.", {
        position: "bottom-center",
        style: {
          background: "#1a1a2e",
          color: "#ffffff",
          borderRadius: "12px",
        },
        progressStyle: {
          background: "#ff0030",
        },
      });
    } finally {
      setIsSharing(false);
    }
  };

  const getInitials = () => {
    if (!user) return "";
    return `${user.first_name?.charAt(0) || ""}${
      user.last_name?.charAt(0) || ""
    }`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!user) {
    return (
      <StyledCard>
        <SkeletonWrapper>
          <SkeletonAvatar />
          <SkeletonText />
          <SkeletonText />
        </SkeletonWrapper>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <ProfileHeader>
        <AvatarWrapper>
          {!imageError && user?.profile_picture ? (
            <StyledAvatar
              src={user.profile_picture}
              alt={`${user.first_name} ${user.last_name}'s avatar`}
              onError={handleImageError}
              imgProps={{ loading: "lazy" }}
            />
          ) : (
            <InitialsAvatar>{getInitials()}</InitialsAvatar>
          )}

          {user?.subscribed && (
            <VerifiedBadge>
              <VerifiedIcon sx={{ color: "#ff0030", fontSize: 20 }} />
            </VerifiedBadge>
          )}
        </AvatarWrapper>
      </ProfileHeader>

      <ProfileContent>
        <Box sx={{ textAlign: "center", mb: 1.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#1a1a2e",
              display: "inline-block",
            }}
          >
            {user?.first_name} {user?.last_name}
          </Typography>
          {user?.pronouns && (
            <Typography
              component="span"
              sx={{
                fontSize: "0.875rem",
                color: "#718096",
                ml: 1,
              }}
            >
              ({user.pronouns})
            </Typography>
          )}
        </Box>

        {user?.bio && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#4a5568",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mb: 2,
              px: 1,
            }}
          >
            {user.bio}
          </Typography>
        )}

        <Box
          sx={{
            mb: 2.5,
            borderTop: "1px solid #f0f0f0",
            paddingTop: "20px",
          }}
        >
          {user?.created_at && (
            <DetailItem>
              <CalendarMonthIcon sx={{ color: "#ff0030", fontSize: 20 }} />
              <span>Joined {formatDate(user.created_at, "MMMM yyyy")}</span>
            </DetailItem>
          )}

          {user?.location && (
            <DetailItem>
              <LocationOnIcon sx={{ color: "#ff0030", fontSize: 20 }} />
              <span>{user.location}</span>
            </DetailItem>
          )}

          {user?.email && (
            <DetailItem>
              <EmailIcon sx={{ color: "#ff0030", fontSize: 20 }} />
              <a
                href={`mailto:${user.email}`}
                style={{
                  color: "#4a5568",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                {user.email}
              </a>
            </DetailItem>
          )}

          {user?.company && (
            <DetailItem>
              <BusinessIcon sx={{ color: "#ff0030", fontSize: 20 }} />
              <span>{user.company}</span>
            </DetailItem>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mb: 3,
            py: 2,
            borderTop: "1px solid #f0f0f0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          {user?.posts_count !== undefined && (
            <StatBox>
              <StatValue>{user.posts_count}</StatValue>
              <StatLabel>Posts</StatLabel>
            </StatBox>
          )}
          {user?.followers_count !== undefined && (
            <StatBox>
              <StatValue>{user.followers_count}</StatValue>
              <StatLabel>Followers</StatLabel>
            </StatBox>
          )}
          {user?.following_count !== undefined && (
            <StatBox>
              <StatValue>{user.following_count}</StatValue>
              <StatLabel>Following</StatLabel>
            </StatBox>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {editable && (
            <PrimaryButton
              onClick={handleEditProfile}
              startIcon={<EditIcon />}
              aria-label="Edit profile"
            >
              Edit Profile
            </PrimaryButton>
          )}
          <SecondaryButton
            onClick={handleShareProfile}
            disabled={isSharing}
            startIcon={<ShareIcon />}
            aria-label="Share profile"
          >
            {isSharing ? "Copying..." : "Share"}
          </SecondaryButton>
        </Box>
      </ProfileContent>
      <ToastContainer />
    </StyledCard>
  );
}

export default ProfileCard;
