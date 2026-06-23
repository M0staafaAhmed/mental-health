import axios from 'axios';
import React, { useRef, useState } from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VerficatioForm({ setPage, email }: { setPage: (page: string) => void; email: string }) {
    // 6 خانات للـ OTP
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    // دالة التعامل مع الكتابة داخل المربعات والتنقل التلقائي
    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, ""); // أرقام فقط
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); // ناخد آخر رقم بس لو عمل paste
        setOtp(newOtp);

        // نقل الفوكس للمربع التالي تلقائياً
        if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // دعم زرار الـ Backspace للرجوع للمربع السابق عند المسح
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);

            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleVerify = async () => {
        const fullCode = otp.join("");
        console.log("Submitting OTP Code:", fullCode);
        const data = {
            Email: email,
            code: fullCode
        };
        setIsLoading(true)
        try {
            const req = await axios.post(`https://mental-heath-backend.vercel.app/verify`, data)
            const res = await req.data
            toast.success(res.message || "email verified successfully! Please login to your account.")
            console.log(res);
            setPage("pre-register");
            navigate("/login");
        } catch (error: any) {
            console.error("Error registering user:", error);
            toast.error(error.response?.data?.message || "Verification failed. Please try again.");
            console.log(error.response?.data || error.message);
        } finally {
            setIsLoading(false)
        }
        // هنا هتحط الـ API Request لتأكيد الكود
    };

    return (
        <div className="bg-[#f8faff] min-h-screen flex flex-col justify-between font-sans relative overflow-hidden">

            {/* Top Navigation */}
            <header className="flex justify-between items-center h-16 px-6 md:px-12 w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600 tracking-tight">Safe Space</span>
                </div>
            </header>

            {/* Main Content Canvas */}
            <main className="grow flex items-center justify-center px-4 relative z-30 my-8">
                {/* Centered Card Container (Glassmorphism Effect) */}
                <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] border border-white/60">

                    {/* Icon/Visual Header */}
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm text-3xl">
                        <MdOutlineMarkEmailRead />
                    </div>

                    {/* Title & Subtext */}
                    <h1 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">Check your email</h1>
                    <p className="text-sm text-gray-500 max-w-70 leading-relaxed">
                        We sent a 6-digit verification code to your email
                    </p>

                    {/* OTP Input Section */}
                    <div className="mt-8 w-full">
                        <div className="flex justify-between gap-2 md:gap-3 mb-6">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={data}
                                    ref={(el) => { if (el) inputRefs.current[index] = el; }}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    autoFocus={index === 0}
                                    className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
                                />
                            ))}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleVerify}
                            disabled={otp.some(slot => slot === "") || isLoading}
                            className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {isLoading ? "Verifying..." : "Verify Account"}
                        </button>
                    </div>
                </div>
            </main>

            {/* Visual Atmosphere Background (Decorative) */}
            <div className="fixed bottom-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden z-10">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#86f2e4] rounded-full blur-[120px]" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#dbe1ff] rounded-full blur-[100px]" />
            </div>

            {/* Global Footer */}
            <footer className="w-full py-6 bg-white/40 border-t border-gray-100 relative z-30">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-gray-400">© 2026 Safe Space. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a className="text-xs text-gray-400 hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
                        <a className="text-xs text-gray-400 hover:text-blue-600 transition-colors" href="#">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
