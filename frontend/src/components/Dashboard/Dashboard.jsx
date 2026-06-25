import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import axios from "axios";
import { BACKEND_URL } from "../../config/api";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningIcon from "@mui/icons-material/Warning";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StyledCard = styled(Card)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "8px",
  padding: "12px 16px",
  boxShadow: "none",
  border: "1px solid #f0f0f0",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "&:hover": {
    borderColor: "#ff0030",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: "rgba(255, 0, 48, 0.08)",
  borderRadius: "8px",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  flexShrink: 0,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "6px",
  backgroundColor: "#f8f9fa",
  border: "1px solid #e8ecf1",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#1a1a2e",
  minWidth: 100,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: "#ffffff",
    borderColor: "#ff0030",
  },
  "&.Mui-focused": {
    backgroundColor: "#ffffff",
    borderColor: "#ff0030",
    boxShadow: "0 0 0 2px rgba(255, 0, 48, 0.08)",
  },
  "& .MuiSelect-select": {
    padding: "6px 12px",
    fontSize: "0.75rem",
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.75rem",
  },
}));

const ChartCard = styled(Paper)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "8px",
  padding: "16px",
  boxShadow: "none",
  border: "1px solid #f0f0f0",
  marginTop: "12px",
}));

function Dashboard({ dealerId }) {
  const [timePeriod, setTimePeriod] = useState("week");
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (dealerId) {
      const fetchStats = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/dashboard/${dealerId}/stats`
          );
          if (res && res.data) {
            setStats(res.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [dealerId]);

  useEffect(() => {
    if (dealerId) {
      const fetchGraphStats = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/v1/user/dashboard/${dealerId}/graph?period=${timePeriod}`
          );
          if (res && res.data) {
            setGraphData(res.data.data || []);
          }
        } catch (error) {
          console.log("Error while fetching graph details : ", error);
        }
      };
      fetchGraphStats();
    }
  }, [dealerId, timePeriod]);

  const cardData = stats
    ? [
        {
          title: "Total Cars",
          value: stats.totalCars || 0,
          icon: <DirectionsCarIcon sx={{ fontSize: 18, color: "#ff0030" }} />,
          trend: stats.totalCars > 0 ? "+12%" : "0%",
          trendUp: stats.totalCars > 0,
        },
        {
          title: "Total Views",
          value: stats.totalViews || 0,
          icon: <VisibilityIcon sx={{ fontSize: 18, color: "#ff0030" }} />,
          trend: stats.totalViews > 0 ? "+8.5%" : "0%",
          trendUp: stats.totalViews > 0,
        },
        {
          title: "Expired Cars",
          value: stats.expiredCars || 0,
          icon: <WarningIcon sx={{ fontSize: 18, color: "#ff0030" }} />,
          trend: stats.expiredCars > 0 ? "-2.3%" : "0%",
          trendUp: stats.expiredCars === 0,
        },
      ]
    : [];

  const getChartData = () => {
    let labels = [];
    if (timePeriod === "week") {
      labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    } else if (timePeriod === "month") {
      labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    } else {
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }

    const data = graphData.length > 0 ? graphData : labels.map(() => 0);

    return {
      labels: labels,
      datasets: [
        {
          label: "Car Views",
          data: data,
          borderColor: "#ff0030",
          backgroundColor: "rgba(255, 0, 48, 0.08)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#ff0030",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 1.5,
          pointRadius: isMobile ? 2 : 3,
          pointHoverRadius: isMobile ? 4 : 5,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1a1a2e",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderRadius: 6,
        padding: 8,
        borderColor: "#ff0030",
        borderWidth: 1,
        titleFont: { size: 11 },
        bodyFont: { size: 11 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#718096",
          font: {
            size: isMobile ? 8 : 10,
          },
          maxTicksLimit: isMobile ? 5 : 12,
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#718096",
          font: {
            size: isMobile ? 8 : 10,
          },
          stepSize: 1,
          maxTicksLimit: 5,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress size={30} sx={{ color: "#ff0030" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#f5f7fa",
        p: { xs: 1, sm: 1.5, md: 2 },
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1a1a2e",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Dashboard
          </Typography>
        </Box>

        <Grid container spacing={1.5}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <StyledCard>
                <IconWrapper>{card.icon}</IconWrapper>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#718096",
                      fontWeight: 500,
                      fontSize: { xs: "0.65rem", sm: "0.7rem" },
                      mb: 0.25,
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#1a1a2e",
                      fontSize: { xs: "1.2rem", sm: "1.4rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {card.value}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.25,
                    }}
                  >
                    {card.trendUp ? (
                      <TrendingUpIcon sx={{ color: "#27ae60", fontSize: 12 }} />
                    ) : (
                      <TrendingDownIcon
                        sx={{ color: "#e74c3c", fontSize: 12 }}
                      />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        color: card.trendUp ? "#27ae60" : "#e74c3c",
                        fontWeight: 600,
                        fontSize: { xs: "0.6rem", sm: "0.65rem" },
                      }}
                    >
                      {card.trend}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#a0aec0",
                        fontSize: { xs: "0.5rem", sm: "0.6rem" },
                        display: { xs: "none", sm: "inline" },
                      }}
                    >
                      vs last month
                    </Typography>
                  </Box>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <ChartCard elevation={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 1.5,
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a2e",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Analytics Overview
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#718096",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                }}
              >
                Car views over selected period
              </Typography>
            </Box>
            <FormControl size="small">
              <StyledSelect
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <MenuItem value="week" sx={{ fontSize: "0.75rem" }}>
                  This Week
                </MenuItem>
                <MenuItem value="month" sx={{ fontSize: "0.75rem" }}>
                  This Month
                </MenuItem>
                <MenuItem value="year" sx={{ fontSize: "0.75rem" }}>
                  This Year
                </MenuItem>
              </StyledSelect>
            </FormControl>
          </Box>

          <Box
            sx={{
              position: "relative",
              height: { xs: 180, sm: 250, md: 300 },
              width: "100%",
            }}
          >
            <Line data={getChartData()} options={options} />
          </Box>
        </ChartCard>
      </Box>
    </Box>
  );
}

export default Dashboard;
