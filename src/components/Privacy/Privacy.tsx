import { Shield, Eye, Lock, Database, Bell, Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = [
    {
        id: '01',
        icon: Database,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        accent: 'bg-blue-600',
        title: 'What We Collect',
        content: [
            {
                subtitle: 'Account Information',
                body: 'When you register, we collect your full name, email address, phone number, date of birth, and gender solely to create and manage your account.'
            },
            {
                subtitle: 'Assessment Data',
                body: 'Your responses to mental health assessments and the resulting scores are stored securely and linked only to your account. This data is used exclusively to show you your own progress over time.'
            },
            {
                subtitle: 'Chat History',
                body: 'Conversations with our AI support assistant are saved to allow continuity across sessions. You may request deletion of your chat history at any time.'
            }
        ]
    },
    {
        id: '02',
        icon: Eye,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        accent: 'bg-purple-600',
        title: 'How We Use It',
        content: [
            {
                subtitle: 'Personalizing Your Experience',
                body: 'Assessment results and onboarding answers are used to recommend the most relevant mental health tests for you, helping you focus on what matters most.'
            },
            {
                subtitle: 'Improving the Platform',
                body: 'Aggregated, anonymized usage patterns help us understand which features are most helpful. No individual user data is ever included in this analysis.'
            },
            {
                subtitle: 'Service Communications',
                body: 'We use your email to send account verification codes, password resets, and important service updates. We do not send marketing emails without your explicit opt-in.'
            }
        ]
    },
    {
        id: '03',
        icon: Lock,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        accent: 'bg-teal-600',
        title: 'How We Protect It',
        content: [
            {
                subtitle: 'Encrypted Storage',
                body: 'All passwords are hashed using bcrypt before storage. Your personal data is stored on secured, SSL-encrypted cloud servers. We never store passwords in plain text.'
            },
            {
                subtitle: 'Token-Based Authentication',
                body: 'Access to your data requires a valid authentication token issued at login. Tokens are verified on every request and your account data is never exposed without one.'
            },
            {
                subtitle: 'Minimal Data Principle',
                body: 'We only request information we actually need. We do not build advertising profiles, we do not sell data, and we do not share it with third parties without your consent.'
            }
        ]
    },
    {
        id: '04',
        icon: Bell,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        accent: 'bg-amber-600',
        title: 'Your Rights',
        content: [
            {
                subtitle: 'Access & Portability',
                body: 'You have the right to request a copy of all personal data we hold about you at any time. We will provide it in a readable format within 7 business days.'
            },
            {
                subtitle: 'Correction & Deletion',
                body: 'You may update your account information at any time from your profile. To request full account deletion, contact our support team and we will process it within 30 days.'
            },
            {
                subtitle: 'Withdrawing Consent',
                body: 'You may withdraw consent for data processing at any time by deleting your account. Withdrawal does not affect the lawfulness of processing carried out before that point.'
            }
        ]
    },
];

export default function PrivacyPolicyPage() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 min-h-screen bg-slate-50/40">

            {/* Hero Section */}
            <div className="relative bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 overflow-hidden border-b border-slate-800/40">
                {/* Subtle Geometric Background Overlay */}
                <div className="absolute inset-0 opacity-5 mix-blend-overlay"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 1.5px, transparent 1.5px),
                                         radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px),
                                         radial-gradient(circle at 60% 80%, white 1.5px, transparent 1.5px)`,
                        backgroundSize: '80px 80px, 120px 120px, 60px 60px'
                    }}
                />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold mb-8 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-all group backdrop-blur-xs cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-14 h-14 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/40 border border-blue-400/30">
                            <Shield className="w-7 h-7 text-white stroke-2" />
                        </div>
                        <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2 select-none">
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">Safe Space</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-[10px] font-bold text-slate-400">Last updated: June 2026</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                                Privacy Policy
                            </h1>
                            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
                                Mental health is deeply personal. This policy explains clearly and honestly what we collect, why we collect it, and how we keep it safe.
                            </p>
                        </div>
                    </div>

                    {/* Quick Nav Pills - تم تصحيح بناء الوسوم المكسورة وجعلها تفاعلية زجاجية */}
                    <div className="flex flex-wrap gap-2.5 mt-10">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#section-${s.id}`}
                                className="flex items-center gap-2 text-[11px] font-black text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xs backdrop-blur-md"
                            >
                                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                                {s.title}
                                <ChevronRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sections Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-8">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        id={`section-${section.id}`}
                        className="bg-white border border-slate-100 rounded-4xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(148,163,184,0.03)] transition-all hover:shadow-[0_8px_30px_-6px_rgba(148,163,184,0.06)] scroll-mt-6"
                    >
                        {/* Section Header */}
                        <div className="flex items-center gap-4 p-6 border-b border-slate-50 bg-slate-50/30">
                            <div className={`w-12 h-12 ${section.bg} rounded-2xl flex items-center justify-center shrink-0 shadow-2xs`}>
                                <section.icon className={`w-5 h-5 ${section.color} stroke-[2.2]`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 select-none">
                                    <span className={`text-[10px] font-black ${section.color} uppercase tracking-widest`}>Section {section.id}</span>
                                    <span className="w-12 h-px bg-slate-200/60" />
                                </div>
                                <h2 className="text-lg font-black text-slate-800 tracking-tight mt-0.5">{section.title}</h2>
                            </div>
                        </div>

                        {/* Section Content Subsections */}
                        <div className="divide-y divide-slate-50">
                            {section.content.map((item, idx) => (
                                <div key={idx} className="p-6 md:p-8 flex gap-5 group hover:bg-slate-50/40 transition-colors">
                                    {/* Accent Indicator bar */}
                                    <div className={`w-1 rounded-full ${section.accent} shrink-0 opacity-15 group-hover:opacity-100 transition-all duration-300`} />
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">{item.subtitle}</h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Support Card - تم تصحيح وسم الرابط المكسور وتحسين الكارد بالكامل */}
                <div className="bg-linear-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800/80 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400 stroke-[2.5]" />
                            <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest">Have Questions?</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">We're here to help protect you</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xl">
                            If you have any questions about this policy or how your sensitive health data is handled, reach out to our privacy compliance team directly.
                        </p>
                    </div>
                    
                    <a
                        href="mailto:mental.health.auth@gmail.com"
                        className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-950/50 cursor-pointer border border-blue-400/20"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        Contact Support
                    </a>
                </div>

                {/* Footer Note */}
                <p className="text-center text-[11px] font-semibold text-slate-400 pt-4 select-none">
                    © 2026 Safe Space Mental Wellness. This policy is effective as of June 2026.
                </p>
            </div>
        </div>
    );
}