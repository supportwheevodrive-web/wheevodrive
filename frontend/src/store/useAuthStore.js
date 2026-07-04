import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios";
import { BACKEND_URL, PROFILE_URL } from "../config/api";
import axios from "axios";

// import { BACKEND_URL } from "../config/api";

// const BASE_URL = "http://localhost:5000";

export const LOCAL_STORAGE_KEY = "previousCarSearches";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  // socket: null,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.post(`${PROFILE_URL}`, { token });

        if (res && res.status == 200) {
          set({ authUser: res.data.user });
          // get().connectSocket();
        }
      }
    } catch (error) {
      set({ authUser: null });
      return error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/v1/user/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully");
      // get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/v1/user/signin", data);

      if (res?.data?.user) {
        set({ authUser: res?.data?.user });
        localStorage.setItem("token", res.data.user.token);
        // get().connectSocket();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
      }
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("token");
      await axiosInstance.post("/api/v1/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      // get().disconnectSocket();
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser) return;

    // if (get().socket) {
    //   get().disconnectSocket();
    // }

    // const socket = io(BACKEND_URL, {
    //   auth: {
    //     token: localStorage.getItem("token"),
    //   },
    //   query: {
    //     userId: authUser._id,
    //   },
    // });

    // socket.on("connect", () => {
    //   set({ socket });
    // });

    // socket.on("disconnect", () => {
    //   // Disconnected
    // });

    // socket.on("getOnlineUsers", (userIds) => {
    //   set({ onlineUsers: userIds });
    // });

    // set({ socket });
  },
}));
