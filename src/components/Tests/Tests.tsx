import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Frown,
  Brain,
  Repeat,
  Zap,
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

interface TestType {
  TestTypeID: number;
  TestName: string;
  Description: string;
  NormalRange: string;
  TotalQuestions: number;
}

const API_URL = "https://mental-heath-backend.vercel.app/tests";

function getTestStyling(testName: string) {
  const name = testName.toLowerCase();
  if (name.includes("depression"))
    return {
      icon: Frown,
      bg: "bg-blue-50",
      text: "text-blue-600",
      btn: "bg-blue-600 hover:bg-blue-700",
    };
  if (name.includes("anxiety"))
    return {
      icon: Brain,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      btn: "bg-emerald-600 hover:bg-emerald-700",
    };
  if (name.includes("ocd"))
    return {
      icon: Repeat,
      bg: "bg-purple-50",
      text: "text-purple-600",
      btn: "bg-purple-600 hover:bg-purple-700",
    };
  if (name.includes("adhd"))
    return {
      icon: Zap,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      btn: "bg-indigo-600 hover:bg-indigo-700",
    };
  if (name.includes("ptsd"))
    return {
      icon: ShieldCheck,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      btn: "bg-cyan-600 hover:bg-cyan-700",
    };

  return {
    icon: HelpCircle,
    bg: "bg-slate-100",
    text: "text-slate-600",
    btn: "bg-slate-700 hover:bg-slate-800",
  };
}

function TestCardSkeleton() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="h-6 bg-slate-200 rounded w-20" />
      </div>
      <div className="h-6 bg-slate-200 rounded w-2/3 mb-3" />
      <div className="space-y-2 flex-1 mb-6">
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>
      <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
      <div className="h-11 bg-slate-200 rounded-xl w-full" />
    </div>
  );
}

function Tests() {
  const navigate = useNavigate();

  const {
    data: tests = [],
    isLoading,
    error,
  } = useQuery<TestType[]>({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to load tests");
      const json = await res.json();
      return json.tests ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleStartTest = (testId: number) => {
    navigate(`/dashboard/tests/${testId}`);
  };

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
            <CheckCircle2 className="w-3.5 h-3.5" /> Clinically Validated
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
          Wellness Assessments
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed text-center">
          Take a moment for yourself. Our screening tools help you understand
          your mental health journey in a private, supportive environment.
        </p>
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8 border border-red-100 shadow-sm text-center">
            حصل خطأ في تحميل الاختبارات، حاول تاني
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {isLoading && (
            <>
              <TestCardSkeleton />
              <TestCardSkeleton />
              <TestCardSkeleton />
              <TestCardSkeleton />
              <TestCardSkeleton />
              <TestCardSkeleton />
            </>
          )}

          {!isLoading &&
            tests.map((test) => {
              const {
                icon: Icon,
                bg,
                text,
                btn,
              } = getTestStyling(test.TestName);

              return (
                <div
                  key={test.TestTypeID}
                  className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute top-6 right-6 inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-100">
                    Available
                  </span>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${bg} shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 ${text}`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 capitalize">
                    {test.TestName}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {test.Description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-5 border-t border-slate-50 pt-4">
                    <HelpCircle className="w-4 h-4 text-slate-300" />
                    <span>
                      Questions:{" "}
                      <strong className="text-slate-600">
                        {test.TotalQuestions}
                      </strong>
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartTest(test.TestTypeID)}
                    className={`w-full py-3 text-sm font-bold text-white rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98] ${btn}`}
                  >
                    Start Assessment
                  </button>
                </div>
              );
            })}

          {!isLoading && (
            <div className="rounded-2xl p-6 flex flex-col text-white bg-gradient-to-br from-blue-600 to-teal-600 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Need Help Now?</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-6 flex-1">
                Assessments are for screening purposes. If you're in crisis,
                please connect with a professional immediately.
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <button
                  onClick={() => navigate("/doctors")}
                  className="w-full bg-white text-blue-700 font-bold rounded-xl py-3 text-sm hover:bg-slate-50 shadow-sm transition-colors active:scale-[0.98]"
                >
                  Talk to a Doctor
                </button>
                <button
                  onClick={() => navigate("/dashboard/chat")}
                  className="w-full border border-white/30 text-white font-bold rounded-xl py-3 text-sm hover:bg-white/10 transition-colors active:scale-[0.98]"
                >
                  Chat with a AI Therapist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tests;
