import React, { useContext, useEffect, useState } from "react";
import {
  Verified as VerifiedIcon,
  ChevronLeft,
  ChevronRight,
  FilterAlt as FilterIcon,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  ThumbUp,
  Comment,
  Share,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import "./ReviewScreen.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, TextField, IconButton } from "@mui/material";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { ADD_REVIEWS_URL, GET_REVIEWS_URL } from "../../config/api";
import Swal from "sweetalert2";
import Ratings from "../../components/Rating/Rating";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 500,
  bgcolor: "#fff",
  borderRadius: "24px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  p: 4,
  border: "1px solid #333",
};

const ReviewScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [statCounts, setStatsCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [likedReviews, setLikedReviews] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      let url = GET_REVIEWS_URL;
      if (currentReview !== null) {
        url += `?rating=${currentReview}`;
      }
      try {
        const res = await axios.get(url);
        if (res?.data?.ratings) {
          setReviews(res.data.ratings);
          setStatsCount(res.data.stats || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
          setAvg(res.data.avg || 0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [currentReview]);

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(activeTab));

  const reviewsPerPage = 6;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const getSentimentIcon = (rating) => {
    switch (rating) {
      case 5:
        return <SentimentVerySatisfied className="s-ico exc" />;
      case 4:
        return <SentimentSatisfied className="s-ico goo" />;
      case 3:
        return <SentimentNeutral className="s-ico ave" />;
      case 2:
        return <SentimentDissatisfied className="s-ico poo" />;
      case 1:
        return <SentimentVeryDissatisfied className="s-ico bad" />;
      default:
        return <SentimentNeutral className="s-ico" />;
    }
  };

  const handleSubmit = async (e) => {
    if (user) {
      setLoading(true);
      e.preventDefault();
      try {
        let userRating = { userId: user._id, rating, reviewText };
        const res = await axios.post(ADD_REVIEWS_URL, userRating);
        if (res?.status === 200) {
          handleClose();
          Swal.fire({
            title: "Success!",
            text: "Your review is live.",
            icon: "success",
            confirmButtonColor: "#ff0030",
          });
          setRating(0);
          setReviewText("");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLike = (reviewId) => {
    setLikedReviews((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const getRatingPercentage = (ratingValue) => {
    if (reviews.length === 0) return 0;
    const count = reviews.filter((r) => r.rating === ratingValue).length;
    return (count / reviews.length) * 100;
  };

  return (
    <div className="rs-main-wrapper">
      <section className="rs-hero-section">
        <div className="rs-container">
          <div className="rs-badge">User Community</div>
          <h1 className="rs-title">
            Real Driver <span className="text-accent">Experiences</span>
          </h1>
          <p className="rs-subtitle">
            Authentic feedback from our certified car owners.
          </p>
        </div>
      </section>

      <section className="rs-stats-grid rs-container">
        <div className="rs-score-card">
          <div className="rs-large-score">
            <h2>{avg.toFixed(1)}</h2>
            <div className="rs-stars-wrap">
              <Ratings rating={Math.round(avg)} />
            </div>
            <p>{reviews.length} Verified Reviews</p>
          </div>
          <div className="rs-progress-wrap">
            {[5, 4, 3, 2, 1].map((val) => (
              <div key={val} className="rs-progress-item">
                <span className="rs-label">{val} ★</span>
                <div className="rs-bar-bg">
                  <div
                    className="rs-bar-fill"
                    style={{ width: `${getRatingPercentage(val)}%` }}
                  ></div>
                </div>
                <span className="rs-pct">
                  {Math.round(getRatingPercentage(val))}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rs-controls rs-container">
        <div className="rs-tabs">
          <button
            className={`rs-tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map((v) => (
            <button
              key={v}
              className={`rs-tab ${activeTab === v.toString() ? "active" : ""}`}
              onClick={() => setActiveTab(v.toString())}
            >
              {v} ★
            </button>
          ))}
        </div>
        <button className="rs-btn-primary" onClick={handleOpen}>
          <EditIcon /> Write Review
        </button>
      </div>

      <div className="rs-review-grid rs-container">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((item) => (
            <div key={item._id} className="rs-card">
              <div className="rs-card-top">
                <div className="rs-user-box">
                  <div className="rs-avatar">{item.name?.charAt(0)}</div>
                  <div className="rs-user-meta">
                    <h4>{item.name}</h4>
                    <span>{new Date(item.date).toDateString()}</span>
                  </div>
                </div>
                <div className="rs-rating-tag">{item.rating}.0</div>
              </div>
              <p className="rs-review-body">{item.reviewText}</p>
              <div className="rs-card-foot">
                <button
                  className={`rs-action ${
                    likedReviews[item._id] ? "active" : ""
                  }`}
                  onClick={() => handleLike(item._id)}
                >
                  <ThumbUp /> {likedReviews[item._id] ? "Liked" : "Helpful"}
                </button>
                <button className="rs-action">
                  <Share /> Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rs-empty">No reviews match your filter.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="rs-pagination rs-container">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="rs-modal-content">
            <div className="rs-modal-header">
              <h3 style={{ color: "#111" }}>Share Experience</h3>
              <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>
            </div>
            {!user ? (
              <div className="rs-auth-msg">
                <p>Please sign in to write a review.</p>
                <button
                  className="rs-btn-primary"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rs-form">
                <Rating
                  value={rating}
                  onChange={(e, n) => setRating(n)}
                  size="large"
                  sx={{ color: "gold", mb: 3 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Your thoughts..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#111",
                      bgcolor: "#fff",
                    },
                    mb: 3,
                  }}
                />
                <button
                  type="submit"
                  className="rs-btn-primary"
                  disabled={!rating || !reviewText || loading}
                >
                  {loading ? "Submitting..." : "Post Review"}
                </button>
              </form>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewScreen;
