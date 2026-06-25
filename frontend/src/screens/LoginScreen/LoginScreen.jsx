import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowBack,
} from "@mui/icons-material";
import { useAuthStore } from "../../store/useAuthStore";
import { styled } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    backgroundColor: "#f8f9fa",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "#e8ecf1",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#ff0030",
      backgroundColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff0030",
      borderWidth: "2px",
      boxShadow: "0 0 0 4px rgba(255, 0, 48, 0.08)",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
    color: "#718096",
    "&.Mui-focused": {
      color: "#ff0030",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1a1a2e",
  },
  "& .MuiFormHelperText-root": {
    color: "#ff0030",
    marginLeft: 0,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: "#ff0030",
  borderRadius: theme.spacing(1.5),
  padding: "16px",
  fontSize: "1rem",
  fontWeight: 700,
  textTransform: "none",
  letterSpacing: "0.5px",
  color: "#ffffff",
  boxShadow: "0 4px 20px rgba(255, 0, 48, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 30px rgba(255, 0, 48, 0.3)",
    background: "#e6002a",
  },
  "&:disabled": {
    background: "#e8ecf1",
    color: "#a0aec0",
    transform: "none",
    boxShadow: "none",
  },
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

function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await login({
        email: values.emailOrPhone,
        password: values.password,
      });

      if (res) {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#ffffff",
          color: "#1a1a2e",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Access Denied",
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonColor: "#ff0030",
          confirmButtonText: "Try Again",
          background: "#ffffff",
          color: "#1a1a2e",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ff0030",
        background: "#ffffff",
        color: "#1a1a2e",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
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
                Welcome Back!
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
                Drive your dream today with India's most trusted car marketplace
              </Typography>

              <Box sx={{ mt: 2 }}>
                <FeatureCard sx={{ backgroundColor: "rgba(255, 0, 48, 0.1)" }}>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Access to 10,000+ verified cars
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Best prices guaranteed
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    24/7 customer support
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Free car inspection reports
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
                  Join 50,000+ happy customers
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
                Sign In
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, color: "#718096", fontSize: "0.95rem" }}
              >
                Welcome back! Please enter your credentials
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, handleChange, handleBlur, values }) => (
                  <Form style={{ width: "100%" }} noValidate>
                    <StyledTextField
                      margin="normal"
                      required
                      fullWidth
                      id="emailOrPhone"
                      label="Email or Phone Number"
                      name="emailOrPhone"
                      autoComplete="email"
                      autoFocus
                      value={values.emailOrPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.emailOrPhone && Boolean(errors.emailOrPhone)
                      }
                      helperText={touched.emailOrPhone && errors.emailOrPhone}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: "#a0aec0" }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <StyledTextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: "#a0aec0" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: "#a0aec0" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                      }}
                    >
                      <Link
                        to="/forgot-password"
                        style={{
                          textDecoration: "none",
                          color: "#ff0030",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>

                    <SubmitButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={
                        loading || !values.emailOrPhone || !values.password
                      }
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                      ) : (
                        "Sign In"
                      )}
                    </SubmitButton>

                    <Divider
                      sx={{
                        my: 3,
                        borderColor: "#e8ecf1",
                      }}
                    />

                    <Box sx={{ textAlign: "center" }}>
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
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}

export default LoginScreen;
