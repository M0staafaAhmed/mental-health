import { MdOutlineAnalytics, MdOutlineQuiz } from 'react-icons/md';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../DoctorCompnents/DoctorCard';
import DoctorCardSkeleton from '../DoctorCompnents/DoctorCardSkeleton';
import TestCard from '../TestsComponents/TestCard';
import TestCardSkeleton from '../TestsComponents/TestCardSkeleton';
import type { DoctorType, TestType } from '../../../Types/Types';

export default function Main() {
    const stats = useSelector((state: RootState) => state.userInfo.stats); 
    const token = useSelector((state: RootState) => state.userInfo.token);

    const {
        data: tests = [],
        isLoading: testsLoading,
        error: testsError,
    } = useQuery<TestType[]>({
        queryKey: ["tests"],
        queryFn: async () => {
            const res = await axios.get("https://mental-heath-backend.vercel.app/tests", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await res.data;
            return json.tests ?? [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: doctors = [],
        isLoading: doctorsLoading,
        error: doctorsError,
    } = useQuery<DoctorType[]>({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get("https://mental-heath-backend.vercel.app/doctors");
            const json = await res.data;
            return json.data ?? [];
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        <main className="flex-1 py-6 px-4 md:py-10 space-y-10 max-w-6xl mx-auto w-full animate-[fadeIn_0.4s_ease-out]">

            {/* Top Grid: Mood & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Mood Widget */}
                <div className="lg:col-span-7 bg-white/80 rounded-2xl p-6 border border-slate-100 shadow-soft backdrop-blur-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">How are you feeling today?</h3>
                        <p className="text-xs text-slate-400 mt-1 mb-6">Tracking your mood helps customize your care plan.</p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        {[
                            { emoji: "😢", label: "Sad" },
                            { emoji: "😕", label: "Neutral" },
                            { emoji: "🙂", label: "Okay" },
                            { emoji: "😊", label: "Happy" },
                            { emoji: "🤩", label: "Great" },
                        ].map(({ emoji, label }) => (
                            <button
                                key={label}
                                className="group flex flex-col items-center gap-2 flex-1 py-3 px-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer active:scale-95"
                            >
                                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 transform scale-100 group-hover:scale-110">
                                    {emoji}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary uppercase tracking-wider transition-colors duration-200">
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tests Taken */}
                    <div className="bg-white/80 rounded-2xl p-6 border border-slate-100 shadow-soft backdrop-blur-sm flex flex-col justify-between group hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <MdOutlineQuiz className="text-xl" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tests Taken</p>
                            <h4 className="text-4xl font-black text-slate-800 mt-1">{stats.totalTests}</h4>
                        </div>
                    </div>

                    {/* Last Score */}
                    <div className="bg-white/80 rounded-2xl p-6 border border-slate-100 shadow-soft backdrop-blur-sm flex flex-col justify-between group hover:border-teal-200 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                                <MdOutlineAnalytics className="text-xl" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Score</p>
                            <h4 className={`${stats.lastScore ? 'text-4xl font-black text-teal-600' : 'text-xs font-semibold text-slate-500 leading-relaxed'} mt-1`}>
                                {stats.lastScore ? `${stats.lastScore}%` : 'Take your first test to track progress'}
                            </h4>
                        </div>
                    </div>
                </div>

            </div>

            {/* Self-Assessment Tests Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="space-y-0.5 w-3/4 lg:w-fit">
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Self-Assessment Tests</h3>
                        {tests.filter((test) => test.isRecommended).length > 0 ? (
                            <p className="text-xs text-slate-400">
                                The <span className="text-primary font-bold">Recommended</span> tag added based on your answers during registration
                            </p>
                        ) : (
                            <p className="text-xs text-slate-400 hidden sm:block">
                                Quick, scientifically-backed checkups for your mental well-being.
                            </p>
                        )}
                    </div>
                    <Link to="tests" className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-xl transition-all duration-200 shadow-sm">
                        View All
                    </Link>
                </div>
                
                <div className="flex overflow-x-auto gap-6 pb-4 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none mask-gradient">
                    {testsLoading && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="snap-start shrink-0">
                            <TestCardSkeleton />
                        </div>
                    ))}
                    
                    {testsError && (
                        <div className="w-full p-6 bg-red-50/60 border border-red-100 text-red-600 rounded-2xl text-center text-sm font-medium backdrop-blur-sm">
                            ⚠️ Unable to load tests at the moment. Please refresh.
                        </div>
                    )}
                    
                    {!testsLoading && !testsError && tests.slice(0, 4).map((test) => (
                        <div key={test.TestName} className="snap-start shrink-0 transition-transform duration-300 hover:-translate-y-1">
                            <TestCard test={test} />
                        </div>
                    ))}
                </div>
            </section>

<section className="space-y-4 overflow-hidden">
    <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Available Doctors</h3>
            <p className="text-xs text-slate-400 hidden sm:block">Connect with verified and friendly professionals.</p>
        </div>
        <Link to="doctors" className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 shadow-sm">
            View All
        </Link>
    </div>

    {/* الحاوية هنا flex دائم في كل الشاشات مع تفعيل السكرول الأفقي بشكل سلس */}
    <div className="flex overflow-x-auto gap-6 pb-5 pt-2 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        
        {doctorsLoading && Array.from({ length: 5 }).map((_, i) => (
            // تثبيت العرض للسكيلتون في كل الشاشات لمنع الالتصاق
            <div key={i} className="snap-start shrink-0 w-72.5 sm:w-77.5 md:w-[320px]">
                <DoctorCardSkeleton />
            </div>
        ))}

        {doctorsError && (
            <div className="w-full p-6 bg-red-50/60 border border-red-100 text-red-600 rounded-2xl text-center text-sm font-medium backdrop-blur-sm">
                ⚠️ Unable to load therapists. Please try again later.
            </div>
        )}
        
        {!doctorsLoading && !doctorsError && doctors.slice(0, 5).map((doctor) => (
            // تثبيت العرض للكروت الحقيقية: w للموبايل و md:w للشاشات الكبيرة عشان تحافظ على قوامها أثناء السكرول
            <div 
                key={doctor.DoctorID || doctor.FullName} 
                className="snap-start shrink-0 w-72.5 sm:w-77.5 md:w-[320px] transition-all duration-300"
            >
                <DoctorCard doctor={doctor} />
            </div>
        ))}
    </div>
</section>

        </main>
    );
}