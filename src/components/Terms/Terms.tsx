import { FileText, Users, ShieldAlert, Ban, Scale, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = [
    {
        id: '01',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        accent: 'bg-blue-600',
        title: 'Who Can Use Safe Space',
        content: [
            {
                subtitle: 'Eligibility',
                body: 'Safe Space is available to individuals aged 16 and above. By creating an account, you confirm that you meet this age requirement and that the information you provide during registration is accurate and truthful.'
            },
            {
                subtitle: 'Account Responsibility',
                body: 'You are responsible for maintaining the confidentiality of your login credentials. Any activity that occurs under your account is your responsibility. Notify us immediately if you suspect unauthorized access.'
            },
            {
                subtitle: 'One Account Per Person',
                body: 'Each individual may maintain only one active account. Creating duplicate accounts to circumvent restrictions or abuse platform features is not permitted.'
            }
        ]
    },
    {
        id: '02',
        icon: ShieldAlert,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        accent: 'bg-teal-600',
        title: 'Not a Medical Service',
        content: [
            {
                subtitle: 'Informational Purpose Only',
                body: 'Safe Space provides self-assessment tools and AI-assisted support for informational and educational purposes only. Nothing on this platform constitutes professional medical advice, diagnosis, or treatment.'
            },
            {
                subtitle: 'No Doctor-Patient Relationship',
                body: 'Using Safe Space does not establish a doctor-patient or therapist-client relationship. Assessment results are screening tools, not clinical diagnoses. Always consult a qualified healthcare professional for medical concerns.'
            },
            {
                subtitle: 'Crisis Situations',
                body: 'Safe Space is not a crisis intervention service. If you or someone you know is in immediate danger or experiencing a mental health emergency, please contact your local emergency services or a crisis hotline immediately.'
            }
        ]
    },
    {
        id: '03',
        icon: Ban,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        accent: 'bg-rose-600',
        title: 'Acceptable Use',
        content: [
            {
                subtitle: 'What You Agree Not To Do',
                body: 'You agree not to use Safe Space to harass, threaten, or harm others; to attempt to gain unauthorized access to any part of the platform; to submit false information; or to use automated tools to scrape, crawl, or extract data from our services.'
            },
            {
                subtitle: 'Respectful Conduct',
                body: 'All interactions on Safe Space — including conversations with our AI assistant — should be conducted respectfully. Abusive, offensive, or deliberately misleading input may result in account suspension.'
            },
            {
                subtitle: 'No Commercial Exploitation',
                body: 'You may not use Safe Space for commercial purposes, including reselling access, aggregating user data, or building competing products using our platform or its outputs without explicit written permission.'
            }
        ]
    },
    {
        id: '04',
        icon: Scale,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        accent: 'bg-purple-600',
        title: 'Our Rights & Limitations',
        content: [
            {
                subtitle: 'Service Availability',
                body: 'We strive to keep Safe Space available at all times, but we do not guarantee uninterrupted access. We may temporarily suspend the service for maintenance, updates, or circumstances beyond our control without prior notice.'
            },
            {
                subtitle: 'Content Ownership',
                body: 'All platform content — including assessment questions, AI responses, interface design, and written materials — is the intellectual property of Safe Space. You may not reproduce or distribute it without permission.'
            },
            {
                subtitle: 'Limitation of Liability',
                body: 'Safe Space and its team are not liable for decisions made based on assessment results or AI conversations. The platform is provided "as is" and we make no warranties regarding the accuracy or completeness of any content.'
            }
        ]
    },
    {
        id: '05',
        icon: RefreshCw,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        accent: 'bg-amber-600',
        title: 'Changes to These Terms',
        content: [
            {
                subtitle: 'We May Update These Terms',
                body: 'We reserve the right to modify these Terms of Use at any time. When we do, we will update the "Last updated" date at the top of this page. Continued use of Safe Space after changes are published constitutes acceptance of the revised terms.'
            },
            {
                subtitle: 'Notification of Major Changes',
                body: 'For significant changes that materially affect your rights or obligations, we will make reasonable efforts to notify registered users via email or an in-app notice before the changes take effect.'
            },
            {
                subtitle: 'Termination',
                body: 'You may stop using Safe Space and delete your account at any time. We reserve the right to suspend or terminate accounts that violate these terms, with or without prior notice depending on the severity of the violation.'
            }
        ]
    },
];

export default function TermsPage() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 min-h-screen bg-slate-50/40">

            {/* Hero Section */}
            <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-hidden border-b border-slate-800/40">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            white,
                            white 1px,
                            transparent 1px,
                            transparent 12px
                        )`
                    }}
                />
                
                {/* Glow Orbs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold mb-8 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-all group backdrop-blur-xs cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
                        Back
                    </button>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-14 h-14 bg-linear-to-tr from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/20 border border-white/10">
                            <FileText className="w-7 h-7 text-white stroke-2" />
                        </div>
                        <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2 select-none">
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Safe Space</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-[10px] font-bold text-slate-400">Last updated: June 2026</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                                Terms of Use
                            </h1>
                            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
                                By using Safe Space, you agree to these terms. Please read them carefully — they exist to protect both you and our community.
                            </p>
                        </div>
                    </div>

                    {/* Quick Nav Pills - تم تصحيح بناء الوسوم */}
                    <div className="flex flex-wrap gap-2.5 mt-10">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#section-${s.id}`}
                                className="flex items-center gap-2 text-[11px] font-black text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-2xs backdrop-blur-md"
                            >
                                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                                {s.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sections */}
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

                        {/* Section Content */}
                        <div className="divide-y divide-slate-50">
                            {section.content.map((item, idx) => (
                                <div key={idx} className="p-6 md:p-8 flex gap-5 group hover:bg-slate-50/40 transition-colors">
                                    {/* Accent Indicator */}
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

                {/* Contact Card - تم تصحيح الوسم وتحسين الـ UI */}
                <div className="bg-linear-to-br from-blue-600 via-blue-700 to-teal-600 border border-blue-500/30 rounded-4xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-200 stroke-[2.5]" />
                            <span className="text-[11px] font-black text-blue-200 uppercase tracking-widest">Still have questions?</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Talk to our team</h3>
                        <p className="text-sm text-blue-100 font-medium leading-relaxed max-w-xl">
                            If anything in these terms is unclear or you'd like to discuss a specific situation, we're happy to help.
                        </p>
                    </div>
                    
                    <a
                        href="mailto:mental.health.auth@gmail.com"
                        className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-700 font-black text-xs rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-black/10 cursor-pointer relative z-10"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        Contact Support
                    </a>
                </div>

                {/* Footer Note */}
                <p className="text-center text-[11px] font-semibold text-slate-400 pt-4 select-none">
                    © 2026 Safe Space Mental Wellness. These terms are effective as of June 2026.
                </p>
            </div>
        </div>
    );
}