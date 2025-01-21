import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    // baseURL: 'https://bistro-boss-server-swart-nine.vercel.app'
    baseURL: 'http://localhost:3000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { signOutUser } = useAuth()
    // requst interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorizetion = `Bearer ${token}`
        return config
    }, function (error) {
        // Do somthing with request error
        return Promise.reject(error)
    })
    // interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await signOutUser()
            navigate('/login')
        }

        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;