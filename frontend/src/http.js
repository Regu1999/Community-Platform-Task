import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL
})

export async function authendication(mode, formData) {
    try {
        const { data } = await api.post(mode, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
        return data
    } catch (error) {
        const err = new Error(error?.response?.data?.message || error.message || "Network Error");
        err.info = error?.response?.data?.info || null;

        throw err
    }
}

export async function autoLogin() {
    try {
        const { data } = await api.get('/autoLogin', {
            withCredentials: true
        });
        return data
    } catch (error) {
        const err = new Error(error?.response?.data?.message || error.message || "Network Error");
        throw err
    }
}

export async function logout(token) {
    try {
        const { data } = await api.post('/logout', null, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        return data
    } catch (error) {
        const err = new Error(error?.response?.data?.message || error.message || "Network Error");
        throw err
    }

}

export async function getProfile(token) {

    try {
        const { data } = await api.get('/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        const err = new Error(error?.response?.data?.message || error.message || "Network Error");
        throw err
    }
}