
import axios from 'axios'
const BASEURL = import.meta.env.VITE_SERVER_URL + "/api/users"
const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api/users",
    withCredentials: true //  აუცილებელია cookies გადასაგზავნად
});
export const signupUser = (data) => API.post('/signup', data)
export const loginUser = (data) => API.post('/login', data)
export const logoutUser = () => API.get('/logout')
export const getAllUsers = () => API.get('/')
export const updateUser = (id, data) => API.patch(`/update/${id}`, data);
export const deleteUser = (id) => API.delete(`/delete/${id}`);
export const authoLogin = () => API.get('/me')
export const changePassword = (data) => API.patch('/change-password', data);
export const updateMe = (data) => API.patch('/update-me', data);
export const googleAuth = () => {
    window.location.href = `${BASEURL}/oauth/google`;
};