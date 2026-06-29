import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import type { RootState } from "../../../redux/store";
import type { TestType } from "../../../Types/Types";

// استيراد الكارت المعدل والـ Skeleton الخاص به من المجلد المجاور
import TestCard from "../TestsComponents/TestCard";

export default function TestsPage() {
  const token = useSelector((state: RootState) => state.userInfo.token);

  // سحب داتا الاختبارات بالـ useQuery
  const {
    data: tests = [],
    isLoading,
    error,
  } = useQuery<TestType[]>({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axios.get(
        "https://mental-heath-backend.vercel.app/tests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.tests ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Header Description */}
      <div className="space-y-2 max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Wellness Assessments
        </h2>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
          Take a moment for yourself. Our clinically-validated screening tools
          help you understand your mental health journey in a private,
          supportive environment.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skeleton Loading State */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-4xl p-6 border border-slate-100 shadow-soft h-64 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                <div className="h-5 bg-slate-200 rounded w-1/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-5/6" />
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-9 bg-slate-200 rounded w-1/3" />
              </div>
            </div>
          ))}

        {/* Error State */}
        {error && (
          <div className="col-span-full p-6 bg-red-50/80 border border-red-100 text-red-600 rounded-2xl text-center font-medium">
            ⚠️ There was an error loading the tests. Please try again.
          </div>
        )}

        {/* Rendering via the imported TestCard component */}
        {!isLoading &&
          !error &&
          tests.map((test) => (
            <TestCard key={test.TestTypeID || test.TestName} test={test} />
          ))}

        {/* Call to Action: Need Help Now Widget */}
        {!isLoading && (
          <div className="bg-linear-to-br from-blue-700 to-teal-700 text-white rounded-4xl p-6 shadow-md flex flex-col justify-between min-h-65">
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight">
                Need Help Now?
              </h3>
              <p className="text-xs font-medium leading-relaxed text-blue-50/90">
                Assessments are for screening purposes. If you're in crisis,
                please connect with a professional immediately.
              </p>
            </div>

            <div className="space-y-2.5 mt-4">
              <Link
                to="/doctors"
                className="block w-full py-2.5 bg-white text-blue-700 hover:bg-blue-50 text-center text-xs font-bold rounded-xl transition-all shadow-sm active:scale-98"
              >
                Talk to a Doctor
              </Link>
              <Link
                to="/dashboard/chat"
                className="flex items-center justify-center w-full py-2.5 bg-transparent border border-white/30 hover:bg-white/10 text-center text-xs font-bold rounded-xl transition-all active:scale-98 cursor-pointer"
              >
                Chat with a AI Therapist
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
