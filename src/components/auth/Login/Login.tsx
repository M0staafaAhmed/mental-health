import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaSpa } from 'react-icons/fa';
import { MdOutlineMail, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { setUserInfo } from '../../../redux/slices/userInfoSlice';
import Tools from '../../Addons/Tools';

const loginSchema = z.object({
    Email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Email: '',
            password: ''
        },
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const handleLogin = async (data: any) => {
        console.log("Login Data:", data);
        setIsLoading(true)
        try {
            const req = await axios.post(`https://mental-heath-backend.vercel.app/login`, data)
            console.log(req)
            const res = await req.data
            console.log(res)
            toast.success(res.message || "Login successful!")
            console.log(res);
            dispatch(setUserInfo({
                token: res.token,
                user: res.user,
                stats: res.stats
            }))
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Error logging in user:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
            console.log(error.response?.data || error.message);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <div className="bg-[#f8faff] min-h-screen flex flex-col justify-between font-sans relative overflow-hidden">

                {/* Auth Layout Wrapper */}
                <main className="grow flex items-center justify-center px-4 md:px-8 py-12 relative z-30">
                    <div className="w-full max-w-110">

                        {/* Brand Anchor */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white mb-3 shadow-sm text-2xl">
                                <FaSpa />
                            </div>
                            <h1 className="text-3xl font-bold text-blue-600 tracking-tight block">Safe Space</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back to your mental wellness sanctuary.</p>
                        </div>

                        {/* Login Card (Glassmorphism Style) */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]">
                            <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>

                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 block px-1" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <input
                                            {...register("Email")}
                                            type="email"
                                            id="email"
                                            placeholder="name@example.com"
                                            required
                                            className={`w-full h-12 pl-4 pr-11 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white ${errors.Email ? 'focus:ring-4 focus:ring-red-100 focus:border-red-600' : 'focus:ring-4 focus:ring-blue-100 focus:border-blue-600'} outline-none transition-all duration-200 text-sm placeholder:text-gray-400`}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200 text-lg pointer-events-none">
                                            <MdOutlineMail />
                                        </span>
                                    </div>
                                    {errors.Email && <p className="text-xs text-red-600 mt-1">{errors.Email.message}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-semibold text-gray-500 block" htmlFor="password">
                                            Password
                                        </label>
                                        <Link className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200" to="/forgot-password">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            {...register("password")}
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            placeholder="••••••••"
                                            required
                                            className={`w-full h-12 pl-4 pr-11 bg-gray-50/50 border ${errors.password ? 'border-red-600' : 'border-gray-200'} rounded-xl focus:bg-white ${errors.password ? 'focus:ring-4 focus:ring-red-100 focus:border-red-600' : 'focus:ring-4 focus:ring-blue-100 focus:border-blue-600'} outline-none transition-all duration-200 text-sm placeholder:text-gray-400`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none text-lg cursor-pointer"
                                        >
                                            {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-600/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    {isLoading ? <AiOutlineLoading3Quarters className="mx-auto animate-spin" /> : "Sign In"}
                                </button>
                            </form>

                        </div>

                        {/* Footer Link */}
                        <p className="text-center mt-6 text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link className="text-blue-600 font-semibold hover:underline decoration-2 underline-offset-4 transition-all" to="/register">
                                Create one
                            </Link>
                        </p>
                    </div>
                </main>

                {/* Visual Element: Soft Blur Orbs */}
                <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px] z-10 pointer-events-none"></div>
                <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-400/10 rounded-full blur-[100px] z-10 pointer-events-none"></div>

                {/* Global Footer */}
                <footer className="w-full py-6 border-t border-gray-100 bg-white/40 relative z-30">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-xs text-gray-400">© 2026 Safe Space. All rights reserved.</span>
                        <div className="flex gap-6">
                            <Link className="text-xs text-gray-400 hover:text-blue-600 transition-colors" to="/about">About</Link>
                            <Link className="text-xs text-gray-400 hover:text-blue-600 transition-colors" to="/privacy">Privacy</Link>
                            <Link className="text-xs text-gray-400 hover:text-blue-600 transition-colors" to="/terms">Terms</Link>
                            <Link className="text-xs text-gray-400 hover:text-blue-600 transition-colors" to="/help">Help</Link>
                        </div>
                    </div>
                </footer>
            </div>
            <Tools style='m-5 md:m-10' auth={true}/>
        </>

    );
}