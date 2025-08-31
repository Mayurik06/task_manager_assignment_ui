import { useRecoilState } from 'recoil';
import type { LoginType } from './Types'; // Using type-only import
import { useAdminAppService } from '../../utils/Axios';
import { toast } from 'react-toastify';
import { loginState } from './Atom';

export const useAuthHook = () => {
    const [loginData, setLoginData] = useRecoilState(loginState);
    const adminAppService = useAdminAppService();

    const LoginHook = async (username: string, password: string) => {
        try {
            const response: any = await adminAppService.post(`/auth/login`, {
                username,
                password
            });
            if (response.success) {
                const { id, token, username, email } = response;
                const userData: LoginType = {
                    loggedIn: true,
                    token,
                    message: response.message,
                    userData: {
                        id,
                        email,
                        username
                    }
                };
                setLoginData(userData);
                      toast.success(response.message);

                return { success: true, data: userData, message: response.message };
            }
            toast.success(response.message);
            return { success: true, message: response.message };
        } catch (error: any) {
            toast.error(error.error || error.message || 'Login failed');
            return { success: false, message: error.error || error.message || 'Login failed' };
        }
    };


    const signUpHook = async (email: string, username: string, password: string) => {
        try {
            const response: any = await adminAppService.post(`/auth/signup`, {
                email,
                username,
                password
            });
            toast.success(response.message);
            return { success: response.success, message: response.message };
        } catch (error: any) {
            toast.error(error.error || error.message || 'Signup failed');
            return { success: false, message: error.error || error.message || 'Signup failed' };
        }
    };

    return {
        LoginHook,
        loginData,
        signUpHook
    };
};
