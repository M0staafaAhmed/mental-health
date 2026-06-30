import { MdVerified } from "react-icons/md";
import { AiFillStar } from "react-icons/ai"; // إضافة أيقونة النجمة للتقييم
import type { DoctorType } from "../../../Types/Types";

export default function DoctorCard({ doctor }: { doctor: DoctorType }) {
  // دالة لاستخراج أول حرفين من الاسم بشكل أنيق ومميز في حالة عدم وجود صورة
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase() || "DR";
  };
  // معادلة مخصصة لحساب تقييم مختلف لكل دكتور (بين 4.5 و 5.0) بناءً على الـ ID
  const rating = (4.5 + ((doctor.DoctorID * 7) % 6) * 0.1).toFixed(1);

  // معادلة لحساب عدد مراجعات متغير (بين 40 و 280 مثلاً) بناءً على الـ ID
  const reviewsCount = 40 + ((doctor.DoctorID * 13) % 241);

  // توليد ألوان خلفية عشوائية أو ثابتة هادئة للحروف الأولى لتطابق التصميم (مثل MA و LK)
  const getInitialsBg = (name: string) => {
    const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
    const colors = [
      "bg-purple-600 text-white",
      "bg-blue-500 text-white",
      "bg-teal-500 text-white",
      "bg-indigo-500 text-white",
    ];
    return colors[charCode % colors.length];
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 flex flex-col group shadow-[0_4px_25px_-5px_rgba(148,163,184,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(148,163,184,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Upper Section: Avatar and Status */}
      <div className="relative pt-8 pb-4 flex flex-col items-center justify-center bg-white">
        {/* Avatar Wrapper */}
        <div className="relative w-24 h-24 select-none">
          {doctor.ImageUrl ? (
            <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-slate-50 shadow-inner">
              <img
                src={doctor.ImageUrl}
                alt={`Dr. ${doctor.FullName}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ) : (
            // الدائرة الملونة الموضحة في السكتش الأصلي عند غياب الصورة
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-lg font-black tracking-wider shadow-md ${getInitialsBg(doctor.FullName)}`}
            >
              {getInitials(doctor.FullName)}
            </div>
          )}

          {/* Online Dot: النقطة الخضراء المتداخلة أسفل الدائرة */}
          <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-white">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
        </div>
      </div>

      {/* Info Body Section */}
      <div className="px-5 pb-6 pt-2 flex flex-col gap-4 flex-1 justify-between text-center bg-white">
        <div className="space-y-1">
          {/* Name & Verified Badge */}
          <div className="flex items-center justify-center gap-1">
            <h4 className="text-base font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
              Dr. {doctor.FullName}
            </h4>
            <MdVerified
              className="text-blue-500 text-base shrink-0"
              title="Verified Expert"
            />
          </div>

          {/* Specialty */}
          <p className="text-[11px] font-bold text-blue-600/90 tracking-wide uppercase">
            {doctor.Specialty}
          </p>

          {/* Fake Dynamic Rating: إضافة النجوم والتقييمات كالمظهر الأصلي */}
          {/* Rating Group */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <div className="flex items-center gap-0.5 bg-amber-50/80 border border-amber-100/50 rounded-md px-2 py-0.5 text-xs font-black text-amber-600">
              <AiFillStar className="text-amber-500 text-xs -mt-1px" />
              {/* هنا بنعرض التقييم المتغير */}
              <span>{rating}</span>
            </div>
            {/* هنا بنعرض عدد المراجعات المتغير */}
            <span className="text-[11px] font-bold text-slate-400">
              ({reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Styled View Profile Button: تحويله إلى Outline شفاف بحدود زرقاء أنيقة */}
        <button className="w-full py-2.5 bg-white border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-xs rounded-xl shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer">
          View Profile
        </button>
      </div>
    </div>
  );
}
