import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
    ClipboardList, TrendingUp, CalendarClock, Search, 
    SlidersHorizontal, Eye, Download, ChevronLeft, ChevronRight, 
    Sparkles, CheckCircle2, Info, Loader2
} from 'lucide-react';
import type { RootState } from '../../../redux/store';
import type { RawTestResult, TestType } from '../../../Types/Types';



const PAGE_SIZE = 5;

// تحسين مظهر شارات الحالة (Status Badges) لتناسب التصميم العصري
function getStatusBadge(percentage: number) {
    if (percentage <= 25) return { label: "Normal", classes: "bg-emerald-50 text-emerald-600 border-emerald-100" };
    if (percentage <= 50) return { label: "Mild", classes: "bg-blue-50 text-blue-600 border-blue-100" };
    if (percentage <= 75) return { label: "Moderate", classes: "bg-amber-50 text-amber-600 border-amber-100" };
    return { label: "High Risk", classes: "bg-rose-50 text-rose-600 border-rose-100" };
}

export default function ResultsOverviewPage() {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.userInfo.token);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const getAuthHeader = (rawToken: string) => {
        if (!rawToken) return '';
        return rawToken.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
    };

    // جلب نتائج الاختبارات
    const { data: resultsData, isLoading: loadingResults } = useQuery<{ data: RawTestResult[] }>({
        queryKey: ['test-results', token],
        queryFn: async () => {
            const res = await axios.get(`https://mental-heath-backend.vercel.app/test-results`, {
                headers: { Authorization: getAuthHeader(token) }
            });
            return res.data;
        },
        enabled: !!token,
    });

    // جلب أنواع الاختبارات لحساب معدل الـ Max Score ديناميكياً
    const { data: testsData, isLoading: loadingTests } = useQuery<{ tests: TestType[] }>({
        queryKey: ['tests-types', token],
        queryFn: async () => {
            const res = await axios.get(`https://mental-heath-backend.vercel.app/tests`, {
                headers: { Authorization: getAuthHeader(token) }
            });
            return res.data;
        },
        enabled: !!token,
    });

    const isLoading = loadingResults || loadingTests;
    const rawResults = resultsData?.data || [];
    const testTypes = testsData?.tests || [];

    // دمج وربط البيانات مع حساب النسبة المئوية
    const enrichedResults = useMemo(() => {
        return rawResults.map((r) => {
            const matchingType = testTypes.find((t) => t.TestName === r.TestName);
            const maxScore = (matchingType?.TotalQuestions || 9) * 3;
            const percentage = Math.round((r.ResultValue / maxScore) * 100);
            return { ...r, maxScore, percentage, testTypeId: matchingType?.TestTypeID };
        });
    }, [rawResults, testTypes]);

    // ترتيب تنازلي من الأحدث للأقدم
    const sortedResults = useMemo(
        () => [...enrichedResults].sort((a, b) => new Date(b.ResultDate).getTime() - new Date(a.ResultDate).getTime()),
        [enrichedResults]
    );

    // حساب الإحصائيات العامة الكلية
    const totalTests = sortedResults.length;
    const avgWellbeing = totalTests > 0
        ? Math.round(100 - (sortedResults.reduce((sum, r) => sum + r.percentage, 0) / totalTests))
        : 0;
        
    const lastTestDate = sortedResults[0]?.ResultDate
        ? new Date(sortedResults[0].ResultDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : "—";

    // أحدث 6 نتائج للرسم البياني (مرتبة زمنياً من الأقدم للأحدث ليظهر المنحنى تصاعدياً بشكل منطقي)
    const trendData = useMemo(() => [...sortedResults].slice(0, 6).reverse(), [sortedResults]);

    // فلترة وPagination للجدول والتاريخ التفصيلي
    const filteredResults = sortedResults.filter((r) =>
        r.TestName.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filteredResults.length / PAGE_SIZE));
    const paginatedResults = filteredResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleViewResult = (result: typeof sortedResults[0]) => {
        if (!result.testTypeId) return;
        navigate(`/dashboard/tests/${result.testTypeId}/result`, {
            state: {
                testId: result.testTypeId,
                testName: result.TestName,
                score: result.ResultValue,
                maxScore: result.maxScore,
            },
        });
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[70vh] space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin stroke-[1.5]" />
                <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">Loading your results...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-8 animate-[fadeIn_0.3s_ease-out]">

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-soft hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-blue-50/70 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tests</p>
                        <p className="text-2xl font-black text-slate-800 mt-0.5">{totalTests}</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-soft hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-emerald-50/70 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Well-Being</p>
                        <p className="text-2xl font-black text-slate-800 mt-0.5">{avgWellbeing}%</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-soft hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-purple-50/70 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                        <CalendarClock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Test Date</p>
                        <p className="text-2xl font-black text-slate-800 mt-0.5">{lastTestDate}</p>
                    </div>
                </div>
            </div>

            {/* Wellness Trend + Key Insight Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Chart Block */}
                <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 tracking-tight">Wellness Trend</h4>
                            <p className="text-xs text-slate-400 mt-0.5">Your progress over recent attempts</p>
                        </div>
                    </div>

                    {trendData.length > 0 ? (
                        <div className="flex items-end justify-between gap-4 h-44 px-2 pt-6">
                            {trendData.map((r) => {
                                const wellbeing = 100 - r.percentage;
                                const isLatest = r.TestResultID === sortedResults[0]?.TestResultID;
                                return (
                                    <div key={r.TestResultID} className="flex-1 flex flex-col items-center justify-end gap-2 h-full group relative">
                                        {/* التول تيب الرقمي عند الـ Hover */}
                                        <span className="absolute -top-4 text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {wellbeing}%
                                        </span>
                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-500 ease-out cursor-pointer shadow-xs ${isLatest ? 'bg-blue-600 shadow-blue-200' : 'bg-blue-100/80 group-hover:bg-blue-200'}`}
                                            style={{ height: `${Math.max(wellbeing, 6)}%` }}
                                            title={`${r.TestName}: ${wellbeing}%`}
                                        />
                                        <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap tracking-tight mt-1">
                                            {new Date(r.ResultDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-14 text-slate-400 space-y-2">
                            <p className="text-xs">No attempts yet — complete a test to see your trend data.</p>
                        </div>
                    )}
                </div>

                {/* Key Insights Block */}
                <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-soft flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            Key Insight
                        </h4>
                        <div className="space-y-3.5">
                            {totalTests >= 2 && (
                                <div className="flex gap-2.5 items-start">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Your <span className="font-semibold text-slate-700 capitalize">{sortedResults[0].TestName}</span> score changed by{' '}
                                        <span className="font-bold text-slate-800">
                                            {Math.abs(
                                                sortedResults[0].percentage -
                                                (sortedResults.find((r, i) => i > 0 && r.TestName === sortedResults[0].TestName)?.percentage ?? sortedResults[0].percentage)
                                            )}%
                                        </span>{' '}
                                        since your last attempt.
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-2.5 items-start">
                                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Consider a follow-up test in 2 weeks to keep tracking your psychological progress accurately.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate('/dashboard/doctors')}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-emerald-100 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        Book a Consultation
                    </button>
                </div>
            </div>

            {/* Detailed History Table Block */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 tracking-tight">Detailed History</h4>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                placeholder="Search tests..."
                                className="pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:border-blue-400 w-48 transition-all"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-xl border border-slate-50">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                                <th className="py-3 px-4">Test Name</th>
                                <th className="py-3 px-4">Score</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedResults.map((r) => {
                                const status = getStatusBadge(r.percentage);
                                return (
                                    <tr key={r.TestResultID} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="py-4 px-4">
                                            <p className="text-xs font-bold text-slate-700 capitalize">{r.TestName}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-xs font-bold text-slate-700">
                                                {r.ResultValue}<span className="text-slate-400 font-normal">/{r.maxScore}</span>
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-xs text-slate-500">
                                            {new Date(r.ResultDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${status.classes}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button
                                                    onClick={() => handleViewResult(r)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-30 cursor-pointer"
                                                    title="View Analysis"
                                                    disabled={!r.testTypeId}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                                                    title="Download Report"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {paginatedResults.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-xs text-slate-400 font-medium">No diagnostic history found matching your query.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Block */}
                {filteredResults.length > 0 && (
                    <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
                        <p className="text-[11px] font-semibold text-slate-400">
                            Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filteredResults.length)} of {filteredResults.length} results
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 border border-slate-200 rounded-xl text-slate-500 disabled:opacity-40 hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 text-xs font-bold rounded-xl transition-all cursor-pointer ${p === page ? 'bg-blue-600 text-white shadow-sm shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-1.5 border border-slate-200 rounded-xl text-slate-500 disabled:opacity-40 hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Elegant CTA Banner */}
            <div className="relative rounded-3xl overflow-hidden p-8 bg-linear-to-r from-blue-700 to-teal-600 text-white shadow-lg shadow-blue-100">
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white to-transparent" />
                <div className="relative z-10 space-y-4 max-w-md">
                    <h4 className="text-xl font-black tracking-tight">Ready for a check-in?</h4>
                    <p className="text-xs text-blue-50/90 leading-relaxed">
                        Taking regular assessments helps you stay perfectly in tune with your mental landscape. It only takes 5 minutes of your time.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/tests')}
                        className="px-6 py-2.5 bg-white text-blue-700 font-bold text-xs rounded-xl hover:bg-blue-50 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                    >
                        Start New Test
                    </button>
                </div>
            </div>
        </div>
    );
}