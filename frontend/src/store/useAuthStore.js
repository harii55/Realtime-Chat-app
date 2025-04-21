
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    //start with true to show the loader while checking auth [first time entering the app,[while reloading] all other states will be false]
    

    // makes an axios call to /auth/check-auth
    checkAuth: async () => {

        try {
            //fetch the auth user from the backend using the axios instance
            const res = await axiosInstance.get('/auth/check-auth');

            set({ authUser: res.data });
            //we are setting the authUser state from the null to the response data


        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // posts data to /auth/signup
    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            // Show success toast
            toast.success("Account created successfully!");

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            // Show success toast
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            // Show success toast
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("error in updating profile pic",error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

}));

