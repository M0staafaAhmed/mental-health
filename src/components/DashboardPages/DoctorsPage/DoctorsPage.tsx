import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Search, SlidersHorizontal, Users } from 'lucide-react';
import type { RootState } from '../../../redux/store';

import DoctorCard from '../../../components/DashboardPages/DoctorCompnents/DoctorCard'; 
import type { DoctorType } from '../../../Types/Types';
import DoctorCardSkeleton from '../DoctorCompnents/DoctorCardSkeleton';

export default function DoctorsPage() {
    const token = useSelector((state: RootState) => state.userInfo.token);
    const [searchQuery, setSearchQuery] = useState("");
    // تم تعديل القيمة الابتدائية لـ 6 لتناسب التوزيع الثلاثي (3 في كل صف)
    const [visibleCount, setVisibleCount] = useState(6); 

    const getAuthHeader = (rawToken: string) => {
        if (!rawToken) return '';
        return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    };

    // جلب بيانات الدكاترة من الـ API
    const { data: doctorsData, isLoading } = useQuery<{ data: DoctorType[] } | DoctorType[]>({
        queryKey: ['doctors', token],
        queryFn: async () => {
            if (!token) return [];
            const res = await axios.get(`https://mental-heath-backend.vercel.app/doctors`, {
                headers: { Authorization: getAuthHeader(token) }
            });
            return res.data;
        },
        enabled: !!token,
    });

    // التعامل مع شكل الـ response
    const doctorsList = useMemo(() => {
        if (!doctorsData) return [];
        if (Array.isArray(doctorsData)) return doctorsData;
        if ('data' in doctorsData && Array.isArray(doctorsData.data)) return doctorsData.data;
        return [];
    }, [doctorsData]);

    // فلترة الدكاترة بناءً على الاسم أو التخصص
    const filteredDoctors = useMemo(() => {
        return doctorsList.filter((doc) => {
            const query = searchQuery.toLowerCase();
            return (
                doc.FullName.toLowerCase().includes(query) ||
                doc.Specialty.toLowerCase().includes(query)
            );
        });
    }, [doctorsList, searchQuery]);

    // الدكاترة المعروضين حالياً بناءً على الـ Load More
    const displayedDoctors = useMemo(() => {
        return filteredDoctors.slice(0, visibleCount);
    }, [filteredDoctors, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3); // زيادة صف كامل (3 دكاترة إضافيين)
    };

    // شاشة التحميل باستخدام السكيلتون (توزيع 3 كروت في الصف)
    if (isLoading) {
        return (
            <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8">
                {/* العناوين الافتراضية أثناء التحميل */}
                <div className="space-y-2 opacity-60 animate-pulse">
                    <div className="h-8 bg-slate-200 rounded-lg w-48" />
                    <div className="h-4 bg-slate-100 rounded-lg w-full max-w-xl" />
                </div>

                {/* سكيلتون شريط البحث */}
                <div className="h-16 bg-slate-100/80 rounded-2xl border border-slate-100 animate-pulse" />

                {/* شبكة السكيلتون المتطابقة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <DoctorCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8 animate-[fadeIn_0.3s_ease-out]">
            
            {/* Header Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Find Your Support</h2>
                    
                    {/* Badge الموضح أعلى اليمين */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        240+ Verified Doctors
                    </div>
                </div>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                    Connect with licensed professionals specialized in anxiety, depression, and personal growth in a safe, judgment-free environment.
                </p>
            </div>

            {/* Search and Filter Bar Section */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-soft flex flex-col sm:flex-row gap-2.5 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                        placeholder="Search by name or specialty..."
                        className="w-full pl-11 pr-4 py-3 text-xs border border-slate-100 bg-slate-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:border-blue-500 transition-all font-medium text-slate-700"
                    />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors w-full sm:w-auto cursor-pointer">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Filters
                    </button>
                    
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors w-full sm:w-auto cursor-pointer">
                        Search
                    </button>
                </div>
            </div>

            {/* Grid Layout Grid for Cards (تم ضبطها على lg:grid-cols-3) */}
            {displayedDoctors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedDoctors.map((doctor) => (
                        <DoctorCard key={doctor.DoctorID} doctor={doctor} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3 bg-white border border-slate-100 rounded-3xl shadow-soft">
                    <Users className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                    <p className="text-xs font-medium">No doctors found matching your criteria.</p>
                </div>
            )}

            {/* Load More Button Block */}
            {filteredDoctors.length > displayedDoctors.length && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 bg-slate-100 hover:bg-slate-200/80 text-blue-700 font-bold text-xs rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-xs"
                    >
                        Load More Professionals
                    </button>
                </div>
            )}
        </div>
    );
}