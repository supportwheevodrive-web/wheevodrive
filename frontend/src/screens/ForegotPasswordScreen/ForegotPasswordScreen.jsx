import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputBase,
  Box,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { FOREGOT_PASSWORD_URL } from "../../config/api";
import { styled } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ArrowBack from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  overflow: "hidden",
  boxShadow: "none",
  background: "#ffffff",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: "100%",
    margin: 0,
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  padding: "14px 16px",
  fontSize: "0.95rem",
  borderRadius: theme.spacing(1.5),
  border: "2px solid #e8ecf1",
  transition: "all 0.3s ease",
  backgroundColor: "#f8f9fa",
  color: "#1a1a2e",
  "&::placeholder": {
    color: "#a0aec0",
  },
  "&:hover": {
    borderColor: "#ff0030",
    backgroundColor: "#ffffff",
  },
  "&.Mui-focused": {
    borderColor: "#ff0030",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 4px rgba(255, 0, 48, 0.08)",
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
  width: "100%",
  padding: "16px",
  fontSize: "1rem",
  fontWeight: 700,
  color: "#ffffff",
  background: "#ff0030",
  border: "none",
  borderRadius: theme.spacing(1.5),
  cursor: "pointer",
  transition: "all 0.3s ease",
  letterSpacing: "0.5px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(255, 0, 48, 0.25)",
    background: "#e6002a",
  },
  "&:disabled": {
    background: "#e8ecf1",
    color: "#a0aec0",
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
}));

const FieldContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

const ErrorText = styled("div")(({ theme }) => ({
  color: "#ff0030",
  fontSize: "0.75rem",
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
  fontWeight: 500,
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  backgroundColor: "rgba(255, 0, 48, 0.04)",
  marginBottom: theme.spacing(1.5),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 0, 48, 0.08)",
    transform: "translateX(4px)",
  },
}));

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${FOREGOT_PASSWORD_URL}`, values);
      setLoading(false);

      if (res && res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Password reset link sent to your email",
          icon: "success",
          confirmButtonColor: "#ff0030",
          background: "#ffffff",
          color: "#1a1a2e",
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "User not found with this email",
          icon: "error",
          confirmButtonColor: "#ff0030",
          background: "#ffffff",
          color: "#1a1a2e",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "User not found with this email",
        icon: "error",
        confirmButtonColor: "#ff0030",
        background: "#ffffff",
        color: "#1a1a2e",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <StyledPaper elevation={0}>
        <Grid container sx={{ minHeight: "100vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              color: "white",
              p: 5,
              position: "relative",
              overflow: "hidden",
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DirectionsCarIcon
                  sx={{ fontSize: 40, color: "#ff0030", mr: 1.5 }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: "-1px",
                  }}
                >
                  <Box component="span" sx={{ color: "#ffffff" }}>
                    Car
                  </Box>
                  <Box component="span" sx={{ color: "#ff0030" }}>
                    Auras
                  </Box>
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                Forgot Password?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  opacity: 0.7,
                  fontSize: "1rem",
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                No worries! We'll send you a reset link
              </Typography>

              <Box sx={{ mt: 2 }}>
                <FeatureCard sx={{ backgroundColor: "rgba(255, 0, 48, 0.1)" }}>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Enter your registered email
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    We'll send a password reset link
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Create a new password and login
                  </Typography>
                </FeatureCard>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <Typography variant="caption" sx={{ opacity: 0.5 }}>
                  Trusted by 50,000+ customers
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Typography
                      key={star}
                      sx={{ color: "#ff0030", fontSize: "1.2rem" }}
                    >
                      ★
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,0,48,0.05) 0%, transparent 70%)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,0,48,0.03) 0%, transparent 70%)",
                zIndex: 1,
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: "auto", md: "100vh" },
              py: { xs: 4, md: 0 },
            }}
          >
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                maxWidth: "480px",
                width: "100%",
                mx: "auto",
              }}
            >
              {isMobile && (
                <IconButton
                  onClick={() => navigate("/")}
                  sx={{ mb: 2, color: "#1a1a2e" }}
                >
                  <ArrowBack />
                </IconButton>
              )}

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  color: "#1a1a2e",
                  letterSpacing: "-0.5px",
                }}
              >
                Forgot Password?
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: "#718096", fontSize: "0.95rem" }}
              >
                Enter your email address and we'll send you a reset link
              </Typography>

              {message && (
                <Box
                  sx={{
                    backgroundColor: "#e6fffa",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    color: "#234e52",
                    mb: 3,
                    border: "1px solid #b2f5ea",
                  }}
                >
                  {message}
                </Box>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form style={{ width: "100%" }} noValidate>
                    <FieldContainer>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.75 }}
                      >
                        <EmailIcon
                          sx={{ color: "#ff0030", fontSize: "1.1rem" }}
                        />
                        <Typography
                          component="label"
                          sx={{
                            ml: 1,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#2d3748",
                            letterSpacing: "0.3px",
                          }}
                        >
                          Email Address
                        </Typography>
                      </Box>
                      <Field
                        as={StyledInput}
                        name="email"
                        placeholder="Enter your email"
                        startAdornment={
                          <EmailIcon sx={{ color: "#a0aec0", mr: 1 }} />
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                        style={{
                          color: "#ff0030",
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          marginLeft: "8px",
                          fontWeight: 500,
                        }}
                      />
                    </FieldContainer>

                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                      ) : (
                        "Send Reset Link"
                      )}
                    </SubmitButton>
                  </Form>
                )}
              </Formik>

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#718096" }}>
                  <Link
                    to="/signin"
                    style={{
                      textDecoration: "none",
                      color: "#ff0030",
                      fontWeight: 600,
                    }}
                  >
                    Back to Sign In
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#718096" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      color: "#ff0030",
                      fontWeight: 700,
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>

              {!isMobile && (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "#a0aec0",
                      fontSize: "0.875rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <ArrowBack sx={{ fontSize: "1rem" }} />
                    Back to Home
                  </Link>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

export default ForgotPasswordScreen;
