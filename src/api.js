export async function apiFetch(path, options = {}) {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = getCookieValue('XSRF-TOKEN');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    'X-XSRF-TOKEN': decodeURIComponent(token),
  };

  return fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });
}

function getCookieValue(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
