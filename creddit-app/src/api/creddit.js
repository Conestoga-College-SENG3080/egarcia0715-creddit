import axios from "axios";


const API_BASE = "https://awf-api.lvl99.dev";
const USERNAME = "egarcia0715@conestogac.on.ca"; 
const PASSWORD = "8220715";

let token = null;

export async function authenticate() {
    if (token) {
        return token;
    }

    const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username: USERNAME,
        password: PASSWORD
    });

    token = res.data.token;
    return token;
}

export async function apiGet(url) {
    const jwt = await authenticate();

    return axios.get(`${API_BASE}${url}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
}