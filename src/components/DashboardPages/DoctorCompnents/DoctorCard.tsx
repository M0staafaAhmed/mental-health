import { MdVerified } from "react-icons/md";
import type { DoctorType } from "../../../Types/Types";

export default function DoctorCard({ doctor }: { doctor: DoctorType }) {
    // دالة لجلب الحروف الأولى بشكل أشيك لو مفيش صورة
    const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/);
        const first = parts[0]?.[0] ?? "";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase() || "DR";
    };

    return (
        <div className="min-w-70 sm:min-w-72.5 bg-white/90 rounded-4xl overflow-hidden border border-slate-100 flex flex-col group shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            
            {/* Image Container */}
            <div className="relative h-44 overflow-hidden bg-linear-to-br from-slate-50 to-teal-50/40 flex items-center justify-center p-4">
                {/* Available Badge */}
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-100/50 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                </span>

                {doctor.ImageUrl ? (
                    <img
                        src={doctor.ImageUrl}
                        alt={`Dr. ${doctor.FullName}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-black shadow-inner ring-4 ring-primary/5 select-none transition-transform duration-500 group-hover:scale-105">
                        {getInitials(doctor.FullName)}
                    </div>
                )}
                
                {/* Bottom Overlay Smooth Shadow */}
                <div className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Info Body */}
            <div className="p-5 flex flex-col gap-4 flex-1 justify-between bg-white/50">
                <div className="space-y-1 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                        <h4 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-primary transition-colors duration-200">
                            Dr. {doctor.FullName}
                        </h4>
                        <MdVerified className="text-primary text-sm shrink-0 filter drop-shadow-sm" title="Verified Expert" />
                    </div>
                    <p className="text-xs font-medium text-slate-400">
                        {doctor.Specialty}
                    </p>
                </div>

                {/* Booking Button */}
                <button className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-md shadow-primary/10 hover:bg-blue-700 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-98 cursor-pointer transform">
                    View Profile
                </button>
            </div>
        </div>
    );
}