import { useRecoilValue } from "recoil";
import { loginState } from "../auth/Store/Atom";
import Axios  from "axios";

export const useAdminAppService = () => {
const login_response= useRecoilValue(loginState);

const adminAppService=Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'domainName':'taskmanager',
    }
})

adminAppService.interceptors.request.use((config) => {
    const token = login_response.token;
    if (token) {
        config.headers.Authorization = `Bearer hbdjddskxnmsxnsndendejdejdj`;
    }
    return config;
});

adminAppService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        console.error(message);
       throw new Error(message);
    }
);

return adminAppService;
}