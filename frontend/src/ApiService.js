const BASE_URL = 'http://localhost:8080/';

function getResource(endpoint, params) {
  const url = `${BASE_URL}${endpoint}` + (params ? `/${params}` : '');
  return fetch(url);
}

function createResource(endpoint, body, type) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export default {
  getResource,
  createResource,
};
