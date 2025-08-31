import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthHook } from '../Store/Hooks';

const SignupPage: React.FC = () => {
    const { signUpHook } = useAuthHook(); // Assuming you have a signup hook
    const navigate = useNavigate();

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Please confirm your password')
    });

    const handleSignup = async (values: any) => {
        try {
            const signupResponse: any = await signUpHook(
                values.email,
                values.username,
                values.password
            );
            
            if (signupResponse.success) {
                navigate('/');
            }
        } catch (error) {
            console.log('Signup error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden p-8">
                {/* Left side - Form */}
                    <div className="w-full">
                        <Formik
                            initialValues={{ 
                                email: '', 
                                username: '', 
                                password: '', 
                                confirmPassword: '' 
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={handleSignup}
                        >
                            {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
                                <Form className="space-y-4">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                                    <p className="text-gray-600 mb-6">Join us to start managing your tasks</p>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <InputText
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email"
                                            className={`w-full ${touched.email && errors.email ? 'p-invalid' : ''}`}
                                        />
                                        {touched.email && errors.email && (
                                            <small className="p-error text-red-500 text-xs">{errors.email}</small>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Choose a username"
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
                                            placeholder="Create a password"
                                            toggleMask
                                            className={`w-full ${touched.password && errors.password ? 'p-invalid' : ''}`}
                                            inputClassName="w-full"
                                            feedback
                                        />
                                        {touched.password && errors.password && (
                                            <small className="p-error text-red-500 text-xs">{errors.password}</small>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <Password
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Confirm your password"
                                            toggleMask
                                            className={`w-full ${touched.confirmPassword && errors.confirmPassword ? 'p-invalid' : ''}`}
                                            inputClassName="w-full"
                                            feedback={false}
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && (
                                            <small className="p-error text-red-500 text-xs">{errors.confirmPassword}</small>
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
                                                    Creating Account...
                                                </span>
                                            ) : 'Sign Up'}
                                        </Button>
                                    </div>

                                    <div className="text-center pt-4">
                                        <p className="text-gray-600">
                                            Already have an account?{' '}
                                            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                                Log in
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                </div>
                
            </div>
        </div>
    );
};

export default SignupPage;