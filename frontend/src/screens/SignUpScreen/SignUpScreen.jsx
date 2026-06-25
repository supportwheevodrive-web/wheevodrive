import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  IconButton,
  InputBase,
  Switch,
  FormControlLabel,
  InputAdornment,
  CircularProgress,
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { districtsInKerala } from "../../dummyData/discticts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SIGN_UP_URL } from "../../config/api";
import axios from "axios";
import ComboBox from "../../components/ComboBox/ComboBox";
import { styled } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  overflow: "hidden",
  boxShadow: "none",
  background: "#ffffff",
  width: "100%",
  minHeight: "100vh",
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
    opacity: 0.6,
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

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasPhysicalStore, setHasPhysicalStore] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    business_name: "",
    location: "",
    has_physical_store: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .required("Username is required"),
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    business_name: hasPhysicalStore
      ? Yup.string().required("Business name is required")
      : Yup.string(),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${SIGN_UP_URL}`, values);
      if (res && res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Successfully created account",
          icon: "success",
          confirmButtonColor: "#ff0030",
          timer: 2000,
          background: "#ffffff",
          color: "#1a1a2e",
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again",
          icon: "error",
          confirmButtonColor: "#ff0030",
          background: "#ffffff",
          color: "#1a1a2e",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Unable to process request",
        icon: "error",
        confirmButtonColor: "#ff0030",
        background: "#ffffff",
        color: "#1a1a2e",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    name,
    label,
    placeholder,
    icon,
    type = "text",
    xs = 12,
    sm = 6
  ) => (
    <Grid item xs={xs} sm={sm}>
      <FieldContainer>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
          {React.cloneElement(icon, {
            sx: { color: "#ff0030", fontSize: "1.1rem" },
          })}
          <Typography
            component="label"
            htmlFor={name}
            sx={{
              ml: 1,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#2d3748",
              letterSpacing: "0.3px",
            }}
          >
            {label}
          </Typography>
        </Box>
        <Field
          as={StyledInput}
          name={name}
          placeholder={placeholder}
          type={type}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{
                    mr: 1,
                    padding: 0,
                    color: "#a0aec0",
                    "&:hover": { color: "#ff0030" },
                  }}
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
        />
        <ErrorMessage name={name} component={ErrorText} />
      </FieldContainer>
    </Grid>
  );

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
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: { xs: "none", md: "block" },
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
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DirectionsCarIcon
                  sx={{ fontSize: 40, color: "#ff0030", mr: 1.5 }}
                />
                <Typography
                  variant="h4"
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
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                Start Your Journey With Us
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
                Join thousands of happy customers who found their dream car
                through our platform
              </Typography>

              <Box sx={{ mt: 2 }}>
                <FeatureCard sx={{ backgroundColor: "rgba(255, 0, 48, 0.1)" }}>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Hassle-free car buying experience
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Verified sellers and listings
                  </Typography>
                </FeatureCard>
                <FeatureCard>
                  <CheckCircleIcon
                    sx={{ color: "#ff0030", mr: 1.5, fontSize: 20 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Secure and safe transactions
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

          <Grid item xs={12} md={7}>
            <Box
              sx={{ p: { xs: 3, sm: 4, md: 5 }, maxWidth: "600px", mx: "auto" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  color: "#1a1a2e",
                  letterSpacing: "-0.5px",
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: "#718096",
                  fontSize: "0.95rem",
                }}
              >
                Fill in your details to get started
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, isValid }) => (
                  <Form>
                    <Grid container spacing={2}>
                      {renderField(
                        "first_name",
                        "First Name",
                        "Enter first name",
                        <PersonIcon />,
                        "text",
                        12,
                        6
                      )}
                      {renderField(
                        "last_name",
                        "Last Name",
                        "Enter last name",
                        <BadgeIcon />,
                        "text",
                        12,
                        6
                      )}
                      {renderField(
                        "email",
                        "Email Address",
                        "Enter email",
                        <EmailIcon />,
                        "text",
                        12,
                        12
                      )}
                      {renderField(
                        "username",
                        "Username",
                        "Choose username",
                        <PersonIcon />,
                        "text",
                        12,
                        6
                      )}
                      {renderField(
                        "phone",
                        "Phone Number",
                        "10-digit number",
                        <PhoneIcon />,
                        "text",
                        12,
                        6
                      )}

                      <Grid item xs={12}>
                        <FieldContainer>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 0.75,
                            }}
                          >
                            <LocationOnIcon
                              sx={{
                                color: "#ff0030",
                                fontSize: "1.1rem",
                              }}
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
                              Location
                            </Typography>
                          </Box>
                          <ComboBox
                            options={districtsInKerala}
                            value={values.location || ""}
                            onChange={(e, newValue) =>
                              setFieldValue("location", newValue)
                            }
                            placeholder="Select your district"
                            sx={{
                              width: "100%",
                              "& .MuiInputBase-root": {
                                padding: "10px 14px",
                                fontSize: "0.95rem",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "12px",
                                border: "2px solid #e8ecf1",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  borderColor: "#ff0030",
                                  backgroundColor: "#ffffff",
                                },
                                "&.Mui-focused": {
                                  borderColor: "#ff0030",
                                  backgroundColor: "#ffffff",
                                  boxShadow: "0 0 0 4px rgba(255, 0, 48, 0.08)",
                                },
                              },
                              "& .MuiInputBase-input": {
                                color: "#1a1a2e",
                              },
                              "& .MuiSvgIcon-root": {
                                color: "#a0aec0",
                              },
                            }}
                          />
                          <ErrorMessage name="location" component={ErrorText} />
                        </FieldContainer>
                      </Grid>

                      <Grid item xs={12}>
                        <FieldContainer>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 0.75,
                            }}
                          >
                            <LockIcon
                              sx={{
                                color: "#ff0030",
                                fontSize: "1.1rem",
                              }}
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
                              Password
                            </Typography>
                          </Box>
                          <Field
                            as={StyledInput}
                            name="password"
                            placeholder="Create a strong password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  sx={{
                                    mr: 1,
                                    padding: 0,
                                    color: "#a0aec0",
                                    "&:hover": { color: "#ff0030" },
                                  }}
                                  size="small"
                                >
                                  {showPassword ? (
                                    <VisibilityOff fontSize="small" />
                                  ) : (
                                    <Visibility fontSize="small" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <ErrorMessage name="password" component={ErrorText} />
                        </FieldContainer>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={hasPhysicalStore}
                              onChange={() => {
                                setHasPhysicalStore(!hasPhysicalStore);
                                setFieldValue(
                                  "has_physical_store",
                                  !hasPhysicalStore
                                );
                              }}
                              size="small"
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#ff0030",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  {
                                    backgroundColor: "#ff0030",
                                  },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#4a5568",
                                fontWeight: 500,
                              }}
                            >
                              I have a physical store
                            </Typography>
                          }
                        />
                      </Grid>

                      {hasPhysicalStore && (
                        <Grid item xs={12}>
                          <FieldContainer>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 0.75,
                              }}
                            >
                              <BusinessIcon
                                sx={{
                                  color: "#ff0030",
                                  fontSize: "1.1rem",
                                }}
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
                                Business Name
                              </Typography>
                            </Box>
                            <Field
                              as={StyledInput}
                              name="business_name"
                              placeholder="Enter your business name"
                            />
                            <ErrorMessage
                              name="business_name"
                              component={ErrorText}
                            />
                          </FieldContainer>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <SubmitButton
                          type="submit"
                          disabled={loading || !isValid}
                        >
                          {loading ? (
                            <CircularProgress
                              size={24}
                              sx={{ color: "#ffffff" }}
                            />
                          ) : (
                            "Create Account"
                          )}
                        </SubmitButton>
                      </Grid>
                    </Grid>

                    <Divider
                      sx={{
                        my: 3,
                        borderColor: "#e8ecf1",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#a0aec0" }}>
                        OR
                      </Typography>
                    </Divider>

                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" sx={{ color: "#718096" }}>
                        Already have an account?{" "}
                        <Box
                          component="a"
                          href="/signin"
                          sx={{
                            color: "#ff0030",
                            textDecoration: "none",
                            fontWeight: 700,
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          Sign In
                        </Box>
                      </Typography>
                      <Box mt={1.5}>
                        <Typography variant="caption" sx={{ color: "#a0aec0" }}>
                          <Box
                            component="a"
                            href="/forgot-password"
                            sx={{
                              color: "#a0aec0",
                              textDecoration: "none",
                              "&:hover": { color: "#ff0030" },
                            }}
                          >
                            Forgot Password?
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
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

export default SignUpScreen;
