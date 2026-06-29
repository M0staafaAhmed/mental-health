import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
    Calendar, Info, TrendingDown, PhoneCall, 
    Sparkles, BookOpen, RefreshCw, Share2, Loader2 
} from 'lucide-react';
import type { RootState } from '../../../redux/store';
import type { LocationState, RawTestResult } from '../../../Types/Types';





function getInterpretation(percentage: number) {
    if (percentage <= 25) {
        return {
            badge: "Minimal Symptoms",
            description: "Your responses suggest minimal or no significant symptoms at this time.",
            interpretation: "Your score falls within the minimal range. This suggests your symptoms are currently mild or not clinically significant.",
            whatItMeans: "Keep monitoring how you feel over time. Regular check-ins can help catch changes early.",
        };
    }
    if (percentage <= 50) {
        return {
            badge: "Mild Symptoms",
            description: "Your responses indicate mild symptoms that may be worth monitoring.",
            interpretation: "Your score falls within the mild range. You may notice some impact on your mood, sleep, or concentration.",
            whatItMeans: "Consider self-care strategies and keep tracking your progress with periodic assessments.",
        };
    }
    if (percentage <= 75) {
        return {
            badge: "Moderate Symptoms",
            description: "Your score indicates symptoms commonly associated with a moderate level of distress.",
            interpretation: "Your score falls within the moderate range. At this level, you might find your mood, sleep patterns, and concentration are noticeably impacted.",
            whatItMeans: "It's important to monitor these feelings with professional guidance.",
        };
    }
    return {
        badge: "Severe Symptoms",
        description: "Your responses indicate a high level of symptoms that may significantly affect daily life.",
        interpretation: "Your score falls within the severe range. This level of symptoms often has a significant impact on daily functioning.",
        whatItMeans: "We strongly recommend speaking with a clinical specialist soon to discuss your results.",
    };
}

export default function TestResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state: RootState) => state.userInfo.token);

    const state = (location.state || {}) as LocationState;

    const getAuthHeader = (rawToken: string) => {
        if (!rawToken) return '';
        return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    };

    const { data: rawData, isLoading } = useQuery<any>({
        queryKey: ['test-results'],
        queryFn: async () => {
            const res = await axios.get(`https://mental-heath-backend.vercel.app/test-results`, {
                headers: { Authorization: getAuthHeader(token) }
            });
            return res.data;
        },
        enabled: !!token,
    });

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[70vh] space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin stroke-[1.5]" />
                <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">Analyzing your responses...</p>
            </div>
        );
    }

    // شكل الـ response الحقيقي: { status, success, count, data: [...] } مرتبة الأحدث أولاً
    const allResults: RawTestResult[] = rawData?.data || [];
    const latestResult = allResults[0];

    const testName = state.testName || latestResult?.TestName || "Assessment";
    const score = state.score ?? latestResult?.ResultValue;
    const maxScore = state.maxScore ?? 27;
    const date = latestResult?.ResultDate
        ? new Date(latestResult.ResultDate).toLocaleDateString()
        : "Today";

    if (score === undefined) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh] space-y-5">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-2xl">⚠️</div>
                <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-800">No Results Found</h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">We couldn't retrieve the data for this test. Please complete an assessment first.</p>
                </div>
                <Link to="/dashboard/tests" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">
                    Go Back to Tests
                </Link>
            </div>
        );
    }

    const percentage = Math.round((score / maxScore) * 100);
    const strokeDasharray = `${percentage} ${100 - percentage}`;
    const targetTestId = state.testId || "1";
    const { badge, description, interpretation, whatItMeans } = getInterpretation(percentage);

    const sameTestHistory = allResults
        .filter((r) => r.TestName === testName)
        .slice(0, 3)
        .reverse();

    return (
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6 animate-[fadeIn_0.3s_ease-out]">
            
            <div className="text-[11px] font-bold text-slate-400 tracking-wide space-x-2 flex items-center">
                <span>Wellness Tracker</span><span>/</span><span>Assessments</span><span>/</span>
                <span className="text-slate-600">{testName}</span>
            </div>

            <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Your Assessment Result</h2>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span><span>•</span><span>{testName} Clinical Assessment</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-blue-600 transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray={strokeDasharray} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-3xl font-black text-slate-800 block leading-none">{percentage}%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">{score} out of {maxScore}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <span className="inline-block bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-teal-100">
                            {badge}
                        </span>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs">{description}</p>
                    </div>
                </div>

                <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-3.5 bg-blue-600 rounded-sm inline-block" />
                            Clinical Interpretation
                        </h4>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">{interpretation}</p>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 flex gap-3 items-start">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 stroke-2" />
                        <div className="space-y-1">
                            <h5 className="text-xs font-bold text-blue-900">What this means for you</h5>
                            <p className="text-[11px] font-medium text-blue-700/90 leading-relaxed">{whatItMeans}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-black text-slate-800 tracking-tight">Score Progress</h4>
                        <p className="text-[11px] font-semibold text-slate-400 tracking-wide">Comparison over your last attempts</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-teal-600 bg-teal-50/60 px-2.5 py-1 rounded-lg border border-teal-100/50">
                        <TrendingDown className="w-3.5 h-3.5" /><span>Monitored</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 text-center border-t border-slate-50 relative">
                    {sameTestHistory.length > 0 ? (
                        sameTestHistory.map((attempt, index) => {
                            const isLast = index === sameTestHistory.length - 1;
                            const attemptPercentage = Math.round((attempt.ResultValue / maxScore) * 100);
                            return (
                                <div key={attempt.TestResultID} className="space-y-2 group">
                                    <span className={`text-base font-black block transition-transform group-hover:scale-105 ${isLast ? 'text-blue-600' : 'text-slate-700'}`}>
                                        {attemptPercentage}%
                                    </span>
                                    <span className={`text-[10px] font-bold block uppercase tracking-wider ${isLast ? 'text-blue-600' : 'text-slate-400'}`}>
                                        {isLast ? "Today" : new Date(attempt.ResultDate).toLocaleDateString()}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className="space-y-2"><span className="text-base font-black text-slate-700 block">--</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prev 1</span></div>
                            <div className="space-y-2"><span className="text-base font-black text-slate-700 block">--</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prev 2</span></div>
                            <div className="space-y-2"><span className="text-base font-black text-blue-600 block">{percentage}%</span><span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Today</span></div>
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-800 tracking-tight">Recommended Next Steps</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-600 text-white rounded-3xl p-5 shadow-md shadow-blue-600/10 flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center"><PhoneCall className="w-4 h-4 text-white" /></div>
                            <h5 className="text-sm font-black tracking-tight">Book a consultation</h5>
                            <p className="text-[11px] font-medium text-blue-100 leading-relaxed">Speak with a clinical specialist to discuss your results and create a personalized plan.</p>
                        </div>
                        <button className="w-full py-2 bg-white text-blue-600 font-bold text-xs rounded-xl active:scale-[0.98] transition-transform cursor-pointer">Schedule Now</button>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600"><Sparkles className="w-4 h-4" /></div>
                            <h5 className="text-sm font-black tracking-tight text-slate-800">Guided Meditation</h5>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Try our 10-minute "Morning Mood Boost" session designed for clarity and focus.</p>
                        </div>
                        <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 font-bold text-xs rounded-xl active:scale-[0.98] transition-transform cursor-pointer">Start Session</button>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-6">
                        <div className="space-y-2">
                            <div className="w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600"><BookOpen className="w-4 h-4" /></div>
                            <h5 className="text-sm font-black tracking-tight text-slate-800">Stress Guide</h5>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed">Evidence-based strategies to manage daily stress and eliminate mental fatigue.</p>
                        </div>
                        <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 font-bold text-xs rounded-xl active:scale-[0.98] transition-transform cursor-pointer">Read Guide</button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button 
                    onClick={() => navigate(`/dashboard/tests/${targetTestId}`)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
                >
                    <RefreshCw className="w-3.5 h-3.5" /> Retake Test
                </button>
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 transition-all active:scale-95 cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" /> Share Results with Doctor
                </button>
            </div>
        </div>
    );
}