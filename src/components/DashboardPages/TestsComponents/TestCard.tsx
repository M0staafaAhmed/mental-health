import { Link } from 'react-router-dom';
import { Brain, Frown, HelpCircle, Repeat, ShieldCheck, Zap } from 'lucide-react';
import type { TestType } from '../../../Types/Types';



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

export default function TestCard({ test }: { test: TestType }) {
    const { icon: Icon,
        bg,
        text,
        btn,
    } = getTestStyling(test.TestName);
    return (
        <div key={test.TestName} className="min-w-72 bg-white rounded-xl p-6 border border-gray-200 flex flex-col gap-4 relative">
            {test.isRecommended && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    Recommended
                </span>
            )}
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${text}`} />
            </div>
            <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{test.TestName}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">{test.Description}</p>
            </div>
            <Link to={`tests/${test.TestTypeID}`} className={`mt-auto w-full py-2 ${btn} text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity active:scale-95 cursor-pointer text-center`}>
                Start
            </Link>
        </div>
    )
}
