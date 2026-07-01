import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    User, Mail, Phone, Calendar, Shield,
    ChevronRight, Lock, Bell, ClipboardList,
    TrendingUp, Star,
} from 'lucide-react';
import type { RootState } from '../../../redux/store';
import { clearUserInfo } from '../../../redux/slices/userInfoSlice';

export default function ProfilePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userInfo.user);
    const stats = useSelector((state: RootState) => state.userInfo.stats);

    const wellbeingLevel = stats.lastScore !== null
        ? stats.lastScore >= 75 ? { label: 'High Risk', color: 'text-rose-600', bar: 'bg-rose-500', bg: 'bg-rose-50', pct: stats.lastScore }
        : stats.lastScore >= 50 ? { label: 'Moderate', color: 'text-amber-600', bar: 'bg-amber-500', bg: 'bg-amber-50', pct: 100 - stats.lastScore }
        : stats.lastScore >= 25 ? { label: 'Good', color: 'text-blue-600', bar: 'bg-blue-500', bg: 'bg-blue-50', pct: 100 - stats.lastScore }
        : { label: 'Excellent', color: 'text-emerald-600', bar: 'bg-emerald-500', bg: 'bg-emerald-50', pct: 100 - stats.lastScore }
        : { label: 'No Data Yet', color: 'text-slate-500', bar: 'bg-slate-300', bg: 'bg-slate-50', pct: 0 };

    const initials = user.name
        ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    const handleLogout = () => {
        dispatch(clearUserInfo());
        navigate('/login');
    };

    return (
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6 animate-[fadeIn_0.3s_ease-out]">

            {/* Profile Header Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-3xl font-black text-white tracking-tight">{initials}</span>
                        </div>
                        
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left space-y-2">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user.name || 'User'}</h2>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                <Star className="w-3 h-3" /> Safe Space Member
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                ID #{user.id}
                            </span>
                        </div>
                    </div>

                   
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-50">
                    <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-blue-600">
                            <ClipboardList className="w-4 h-4" />
                        </div>
                        <p className="text-2xl font-black text-slate-800">{stats.totalTests}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tests Completed</p>
                    </div>

                    <div className="text-center space-y-1 border-x border-slate-100">
                        <div className="flex items-center justify-center gap-1.5 text-purple-500">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                        <p className="text-2xl font-black text-slate-800">
                            {stats.lastScore !== null ? `${stats.lastScore}%` : '—'}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Score</p>
                    </div>

                    <div className={`text-center space-y-1 rounded-2xl py-2 px-3 ${wellbeingLevel.bg}`}>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Well-being Level</p>
                        <p className={`text-sm font-black ${wellbeingLevel.color}`}>{wellbeingLevel.label}</p>
                        <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-700 ${wellbeingLevel.bar}`}
                                style={{ width: `${wellbeingLevel.pct}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Personal Information */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
                    <h4 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        Personal Information
                    </h4>

                    <div className="space-y-4">
                        {[
                            { icon: User, label: 'Full Name', value: user.name || '—' },
                            { icon: Mail, label: 'Email Address', value: user.email || '—' },
                            { icon: Phone, label: 'Phone Number', value: user.phone || '—' },
                            { icon: Calendar, label: 'Date of Birth', value: user.dateOfBirth || '—' },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                                    <p className={`text-sm font-semibold mt-0.5 ${value === 'Not available yet' ? 'text-slate-300 italic text-xs' : 'text-slate-700'}`}>
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Privacy Note */}
                    <div className="flex gap-2.5 items-start bg-slate-50/80 border border-slate-100 rounded-2xl p-3.5 mt-2">
                        <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[11px] font-bold text-slate-600">Your data is fully protected</p>
                            <p className="text-[10px] font-medium text-slate-400 leading-relaxed mt-0.5">
                                We do not share your personal information with any third party without your explicit consent.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">

                    {/* Quick Actions */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-3">
                        <h4 className="text-sm font-black text-slate-800 tracking-tight">Account Settings</h4>
                        <div className="space-y-2">
                            {[
                                {
                                    icon: Lock,
                                    label: 'Change Password',
                                    sub: 'Update your password regularly for better security',
                                    color: 'text-blue-500',
                                    bg: 'bg-blue-50',
                                    onClick: () => navigate('/dashboard/settings'),
                                },
                                {
                                    icon: Bell,
                                    label: 'Notification Preferences',
                                    sub: 'Control how messages reach you',
                                    color: 'text-purple-500',
                                    bg: 'bg-purple-50',
                                    onClick: () => {},
                                },
                                {
                                    icon: ClipboardList,
                                    label: 'My Test Results',
                                    sub: 'View your full assessment history',
                                    color: 'text-teal-500',
                                    bg: 'bg-teal-50',
                                    onClick: () => navigate('/dashboard/results'),
                                },
                            ].map(({ icon: Icon, label, sub, color, bg, onClick }) => (
                                <button
                                    key={label}
                                    onClick={onClick}
                                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group text-left active:scale-[0.99]"
                                >
                                    <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-4 h-4 ${color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-700">{label}</p>
                                        <p className="text-[10px] font-medium text-slate-400 truncate">{sub}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 p-4 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 font-bold text-sm rounded-2xl transition-all active:scale-[0.99]"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}