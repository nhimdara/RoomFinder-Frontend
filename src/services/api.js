/**
 * Real API client for University RoomFinder Laravel Backend
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://roomfinder-backend-ozp3.onrender.com/api';

const getHeaders = (isFormData = false, customHeaders = {}) => {
  const token = localStorage.getItem('rf_token');
  const headers = {
    Accept: 'application/json',
    ...customHeaders
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (data && data.message) ||
      (data && data.errors && Object.values(data.errors).flat().join(', ')) ||
      `HTTP Error ${response.status}: ${response.statusText}`;

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const formatUrl = (endpoint, params = {}) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = new URL(`${API_BASE_URL}/${cleanEndpoint}`);

  if (params && typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((val) => url.searchParams.append(`${key}[]`, val));
        } else {
          url.searchParams.append(key, value);
        }
      }
    });
  }

  return url.toString();
};

export const apiClient = {
  baseUrl: API_BASE_URL,

  get: async (endpoint, params = {}, customHeaders = {}) => {
    const url = formatUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(false, customHeaders)
    });
    return handleResponse(response);
  },

  post: async (endpoint, payload = {}, customHeaders = {}) => {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(isFormData, customHeaders),
      body: isFormData ? payload : JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  put: async (endpoint, payload = {}, customHeaders = {}) => {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: 'PUT',
      headers: getHeaders(isFormData, customHeaders),
      body: isFormData ? payload : JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  delete: async (endpoint, customHeaders = {}) => {
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(false, customHeaders)
    });
    return handleResponse(response);
  }
};

export default apiClient;
