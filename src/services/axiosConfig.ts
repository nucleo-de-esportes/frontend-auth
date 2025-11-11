import axios from "axios";

// Configura a URL base da API
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Interceptor para adicionar o token automaticamente
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove o token inválido
      localStorage.removeItem("auth_token");
      // Redireciona para login
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
