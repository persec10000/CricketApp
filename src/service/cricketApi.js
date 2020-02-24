import axios from 'axios';
import {getToken} from '../utils/storage';

export const Root = 'http://192.168.1.5/';
export const API_ROOT = Root + 'api/';

export const STORE_API = Root + 'storage/';

/**
 * Factory for Axios instance used to interact with Qeep
 *
 * @returns {AxiosInstance}
 */
const createQeepAxiosInstance = () =>
    axios.create({
        baseURL: API_ROOT,
        validateStatus: status => status >= 200 && status < 500,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

// create axios instance
const axiosInstance = createQeepAxiosInstance();
/**
 * Set auth token
 */
export function setToken(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function resetToken() {
    axiosInstance.defaults.headers.common.Authorization = null;
}

getToken().then(token => {
    setToken(token);
});
// ====================Auth api ================================

/**
 * Sign up new user
 *
 * @param data the user data
 *
 * @returns {AxiosPromise}
 */
export const signup = data => axiosInstance.post(`auth/signup`, data);
/**
 * Sign in
 *
 * @param data the user login info: email, password
 *
 * @returns {AxiosPromise}
 */
export const signin = data => axiosInstance.post(`auth/login`, data);

/**
 * Sign out
 *
 * @param data
 *
 * @returns {AxiosPromise}
 */
export const signout = () => axiosInstance.get(`auth/logout`);
// ====================Account api ================================
/**
 * fetch User
 *
 * @param data the user login info: email, password
 *
 * @returns {AxiosPromise}
 */
export const fetchAccount = () => axiosInstance.get(`auth/fetchAccount`);

// ==================== Home Screen api ================================
/**
 * fetch matches , leaders, clubs, news
 *
 * @param data
 *
 * @returns {AxiosPromise}
 */
export const fetchHomeData = () => axiosInstance.get(`home/index`);

// ==================== Player  api ================================
/**
 * fetch selected Player data
 *
 * @param data player ID
 *
 * @returns {AxiosPromise}
 */
export const fetchPlayer = id => axiosInstance.get(`players/${id}`);
