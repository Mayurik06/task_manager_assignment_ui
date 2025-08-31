import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHook } from '../Store/Hooks';

const AuthPage: React.FC = () => {
    const { LoginHook } = useAuthHook();
    const navigate = useNavigate();

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Username or Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleLogin = async (values: any) => {
        try {
            const loginResponse: any = await LoginHook(values.username, values.password);
            if (loginResponse.success) {
                localStorage.setItem('token', loginResponse?.data?.token);
                navigate('/tasks');
            }
        } catch (error) {
         console.log('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden p-8">
                <div className="w-full">
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleLogin}
                        >
                            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
                                <Form className="space-y-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                    <p className="text-gray-600 mb-8">Sign in to continue to your account</p>

                                    <div className="space-y-2">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username or Email
                                        </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your username or email"
                                            className={`w-full ${touched.username && errors.username ? 'p-invalid' : ''}`}
                                        />
                                        {touched.username && errors.username && (
                                            <small className="p-error text-red-500 text-xs">{errors.username}</small>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <Password
                                            id="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your password"
                                            toggleMask
                                            className={`w-full ${touched.password && errors.password ? 'p-invalid' : ''}`}
                                            feedback={false}
                                            inputClassName="w-full"
                                        />
                                        {touched.password && errors.password && (
                                            <small className="p-error text-red-500 text-xs">{errors.password}</small>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out"
                                            disabled={isSubmitting || Object.keys(errors).length > 0}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Logging in...
                                                </span>
                                            ) : 'Login'}
                                        </Button>

                                        <div className="mt-4">
                                        <span>  Don't have an account? 
                                                <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
                                               Sign up
                                            </Link>
                                        </span>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
        
            </div>
    );
};

export default AuthPage;