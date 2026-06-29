import { Link } from "react-router-dom";
import {
  Brain,
  Frown,
  HelpCircle,
  Repeat,
  ShieldCheck,
  Zap,
  Sparkles,
  HelpCircle as QuestionIcon,
} from "lucide-react";
import type { TestType } from "../../../Types/Types";

function getTestStyling(testName: string) {
  const name = testName.toLowerCase();
  if (name.includes("depression"))
    return {
      icon: Frown,
      bg: "bg-blue-50/80 border border-blue-100",
      text: "text-blue-500",
      btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/10 hover:shadow-blue-600/20",
    };
  if (name.includes("anxiety"))
    return {
      icon: Brain,
      bg: "bg-emerald-50/80 border border-emerald-100",
      text: "text-emerald-500",
      btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10 hover:shadow-emerald-600/20",
    };
  if (name.includes("ocd"))
    return {
      icon: Repeat,
      bg: "bg-purple-50/80 border border-purple-100",
      text: "text-purple-500",
      btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/10 hover:shadow-purple-600/20",
    };
  if (name.includes("adhd"))
    return {
      icon: Zap,
      bg: "bg-amber-50/80 border border-amber-100",
      text: "text-amber-500",
      btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/10 hover:shadow-amber-600/20",
    };
  if (name.includes("ptsd"))
    return {
      icon: ShieldCheck,
      bg: "bg-cyan-50/80 border border-cyan-100",
      text: "text-cyan-500",
      btn: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/10 hover:shadow-cyan-600/20",
    };

  return {
    icon: HelpCircle,
    bg: "bg-slate-50 border border-slate-100",
    text: "text-slate-500",
    btn: "bg-slate-700 hover:bg-slate-800 shadow-slate-700/10 hover:shadow-slate-700/20",
  };
}

export default function TestCard({ test }: { test: TestType }) {
  const { icon: Icon, bg, text, btn } = getTestStyling(test.TestName);

  return (
    <div className="min-w-70 sm:min-w-72.5 bg-white/90 rounded-4xl p-6 border border-slate-100 flex flex-col gap-5 relative shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm group">
      {/* Recommended Badge */}
      {test.isRecommended && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-bold text-primary shadow-sm backdrop-blur-sm">
          <Sparkles className="w-3 h-3 text-primary" />
          Recommended
        </span>
      )}

      {/* Icon Container */}
      <div
        className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm`}
      >
        <Icon className={`w-5 h-5 ${text}`} />
      </div>

      {/* Content info */}
      <div className="space-y-2 flex-1">
        <h4 className="text-base font-bold text-slate-800 tracking-tight capitalize group-hover:text-slate-900 transition-colors duration-200">
          {test.TestName}
        </h4>
        <p className="text-xs font-medium leading-relaxed text-slate-400 line-clamp-3">
          {test.Description}
        </p>

        {/* 📌 الجزء الجديد: عدد الأسئلة (مطابق تماماً للـ Mockup في الصورة) */}
        <div className="flex items-center gap-1.5 text-slate-400/90 pt-1">
          <QuestionIcon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold tracking-wide">
            Questions: {test.TotalQuestions || 15}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={`/dashboard/tests/${test.TestTypeID}`} 
        className={`w-full py-3 ${btn} text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 text-center`}
      >
        Start Assessment
      </Link>
    </div>
  );
}
