import axios from "axios";

const apiClient = axios.create({
    // baseURL: API_URL, // <- ENV variable
    baseURL: 'http://localhost:8080/http://localhost:30600/api'
});

apiClient.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");

        return ({
            ...config,
            headers: {
                'content-type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': "GET, POST, OPTIONS",
                'Authorization' : `${token}`
            },
        })
    },
    error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
        response,
    async (error) => {
        // ...
        return Promise.reject(error.response.data);
    },
);

const { get, post, put, delete: destroy, patch } = apiClient;
export { get, post, put, destroy, patch };