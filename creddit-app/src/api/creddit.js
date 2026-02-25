import axios from "axios";

const API_BASE = "https://awf-api.lvl99.dev";

const USERNAME = "egarcia0715"; // lowercase
const PASSWORD = "8820715";      // student ID

let token = null;

export async function authenticate() {
  if (token) return token;

  const res = await axios.post(`${API_BASE}/auth/login`, {
    username: "egarcia0715",
    password: "8820715"
  });

      console.log("Login response data:", res.data); // <--- check this

  token = res.data.access_token;
    console.log("JWT received:", token); // <--- TEMPORARY LOG

  return token;

}

export async function apiGet(endpoint) {
  const jwt = await authenticate();

  return axios.get(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
    
  });
  
}