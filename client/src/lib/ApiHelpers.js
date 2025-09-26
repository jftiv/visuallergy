export function getApiUrl() {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  console.log('VITE_API_URL:', apiUrl, 'type:', typeof apiUrl);
  
  // Return the API URL or fallback to /api for production
  if (apiUrl && apiUrl !== 'undefined') {
    return apiUrl;
  }
  
  return '/api';
}

export function createApiUrl(endpoint) {
  const baseUrl = getApiUrl();
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
}