import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401s and unwrap response data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");
    const hasStoredToken = Boolean(localStorage.getItem("token"));

    // Only force logout for token-protected requests, not login/signup failures.
    if (status === 401 && hasStoredToken && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired'));
    }

    const errorData = error.response?.data;
    const message =
      errorData?.detail ||
      errorData?.message ||
      (Array.isArray(errorData?.errors) && errorData.errors[0]?.message) ||
      (typeof errorData === "string" ? errorData : null) ||
      (error.request && !error.response
        ? "Unable to reach the server. Check your API URL and network."
        : null) ||
      'Something went wrong';

    return Promise.reject(new Error(message));
  }
);

export default api;
