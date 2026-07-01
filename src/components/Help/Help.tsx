import { 
    HelpCircle, MessageCircle, BookOpen, ShieldCheck, 
    Smartphone, ChevronDown, ArrowLeft, Mail, 
    ClipboardList, Brain, Lock, Zap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const faqs = [
    {
        category: 'Assessments',
        icon: ClipboardList,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        items: [
            {
                q: 'How accurate are the self-assessment tests?',
                a: 'Our assessments are based on clinically validated screening tools such as PHQ-9 and GAD-7, widely used by mental health professionals worldwide. However, they are screening tools — not diagnostic instruments. Results should be interpreted as a starting point for self-awareness, not a clinical diagnosis.'
            },
            {
                q: 'How often should I retake an assessment?',
                a: 'We recommend retaking assessments every 2 to 4 weeks to track meaningful changes over time. Taking them too frequently (daily) can produce noise rather than signal, since mood fluctuates naturally day to day.'
            },
            {
                q: 'What do the score percentages mean?',
                a: 'Scores are expressed as a percentage of the maximum possible score. A lower percentage indicates fewer or less severe symptoms. The labels (Minimal, Mild, Moderate, Severe) correspond to standard clinical ranges for each tool.'
            },
            {
                q: 'Can I retake a test I already completed?',
                a: 'Yes. You can retake any test at any time from the Tests section. Each attempt is saved separately, and your Score Progress section will show how your results compare across attempts.'
            },
        ]
    },
    {
        category: 'AI Chat',
        icon: Brain,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        items: [
            {
                q: 'Is the AI chat a replacement for therapy?',
                a: 'No. The AI assistant is a supportive tool designed to help you explore your feelings and navigate the platform. It is not a licensed therapist and cannot provide clinical advice. If you are struggling, we always recommend speaking with a qualified mental health professional.'
            },
            {
                q: 'Is my chat history private?',
                a: 'Yes. Your conversations are stored securely and are only accessible by you. We do not share chat content with third parties. You can request deletion of your chat history by contacting our support team.'
            },
            {
                q: 'Why does the AI sometimes seem unavailable?',
                a: 'During periods of high demand, the AI service may briefly pause responses. This is usually resolved within a few seconds. If the issue persists for more than a minute, try refreshing the page.'
            },
        ]
    },
    {
        category: 'Account & Security',
        icon: Lock,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        items: [
            {
                q: 'How do I reset my password?',
                a: 'On the login screen, tap "Forgot Password" and enter your registered email address. You will receive a 6-digit OTP code valid for 10 minutes. Enter the code, then set your new password. Passwords must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.'
            },
            {
                q: 'I did not receive my verification email. What should I do?',
                a: 'First, check your spam or junk folder. If it is not there, wait 2 minutes and try registering again. Make sure the email address you entered is correct. If the problem continues, contact our support team.'
            },
            {
                q: 'How do I delete my account?',
                a: 'Account deletion is currently handled by our support team. Send a deletion request to our email address with the subject line "Account Deletion Request" and include your registered email. We will process it within 30 days.'
            },
        ]
    },
    {
        category: 'Platform',
        icon: Smartphone,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        items: [
            {
                q: 'Is Safe Space available as a mobile app?',
                a: 'Currently, Safe Space is a web application optimized for both desktop and mobile browsers. A dedicated native app is on our roadmap. In the meantime, you can add the website to your home screen on iOS or Android for an app-like experience.'
            },
            {
                q: 'Why are some features showing placeholder content?',
                a: 'Safe Space is actively being developed. Some sections (such as Settings and certain profile fields) are still being built out. We update the platform regularly and new features are added continuously.'
            },
        ]
    },
];

const guides = [
    {
        icon: Zap,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        title: 'Getting Started',
        steps: ['Create your account and verify your email', 'Complete the onboarding questions to get personalized test recommendations', 'Take your first self-assessment from the Tests page', 'Review your result and explore the recommended next steps']
    },
    {
        icon: ClipboardList,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        title: 'Tracking Your Progress',
        steps: ['Retake assessments every 2–4 weeks', 'Visit My Results to view your full history and trends', 'Use the Score Progress section to compare attempts side by side', 'Book a consultation if your scores are consistently high']
    },
    {
        icon: MessageCircle,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        title: 'Using the AI Chat',
        steps: ['Open the Chat section from the sidebar', 'Describe how you are feeling in your own words', 'The AI will respond with support and may suggest a relevant test', 'Your conversation history is saved and accessible on your next visit']
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-50 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-50/60 transition-colors group"
            >
                <span className="text-sm font-bold text-slate-700 leading-snug group-hover:text-blue-600 transition-colors">
                    {q}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180 text-blue-500' : ''}`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <p className="text-sm font-medium text-slate-500 leading-relaxed border-l-2 border-blue-100 pl-4">
                        {a}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function HelpPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(faqs[0].category);

    const activeSection = faqs.find(f => f.category === activeCategory)!;

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50">

            {/* Hero */}
            <div className="relative bg-linear-to-br from-teal-600 via-blue-600 to-blue-700 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(ellipse at 0% 100%, white 0%, transparent 60%),
                                         radial-gradient(ellipse at 100% 0%, white 0%, transparent 60%)`
                    }}
                />
                <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs font-bold mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back
                    </button>

                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                            <HelpCircle className="w-7 h-7 text-white" />
                        </div>
                        <div className="space-y-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Safe Space</span>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                Help Center
                            </h1>
                            <p className="text-sm text-blue-100 leading-relaxed max-w-xl font-medium">
                                Everything you need to get the most out of Safe Space — from taking your first assessment to understanding your results.
                            </p>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
                        {[
                            { icon: ClipboardList, label: 'Assessments', onClick: () => setActiveCategory('Assessments') },
                            { icon: Brain, label: 'AI Chat', onClick: () => setActiveCategory('AI Chat') },
                            { icon: Lock, label: 'Account', onClick: () => setActiveCategory('Account & Security') },
                            { icon: Smartphone, label: 'Platform', onClick: () => setActiveCategory('Platform') },
                        ].map(({ icon: Icon, label, onClick }) => (
                            <button
                                key={label}
                                onClick={() => { onClick(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-4 py-3 rounded-2xl transition-all active:scale-95"
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-10">

                {/* How-to Guides */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Quick Guides</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {guides.map((guide) => (
                            <div key={guide.title} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                                <div className={`w-10 h-10 ${guide.bg} rounded-xl flex items-center justify-center`}>
                                    <guide.icon className={`w-5 h-5 ${guide.color}`} />
                                </div>
                                <h3 className="text-sm font-black text-slate-800">{guide.title}</h3>
                                <ol className="space-y-2.5">
                                    {guide.steps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className={`text-[10px] font-black ${guide.color} shrink-0 mt-0.5 w-4`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="space-y-4">
                    <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h2>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {faqs.map((f) => {
                            const isActive = activeCategory === f.category;
                            return (
                                <button
                                    key={f.category}
                                    onClick={() => setActiveCategory(f.category)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                        isActive
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <f.icon className="w-3.5 h-3.5" />
                                    {f.category}
                                </button>
                            );
                        })}
                    </div>

                    {/* FAQ Items */}
                    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                        <div className={`flex items-center gap-3 p-5 border-b border-slate-50 ${activeSection.bg}`}>
                            <activeSection.icon className={`w-4 h-4 ${activeSection.color}`} />
                            <span className={`text-xs font-black uppercase tracking-wider ${activeSection.color}`}>
                                {activeSection.category}
                            </span>
                        </div>
                        {activeSection.items.map((item, i) => (
                            <FAQItem key={i} q={item.q} a={item.a} />
                        ))}
                    </div>
                </section>

                {/* Still need help */}
                <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-teal-400" />
                            <span className="text-[11px] font-black text-teal-400 uppercase tracking-widest">Still stuck?</span>
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight">We're here for you</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
                            If you couldn't find what you were looking for, send us a message and we'll get back to you as soon as we can.
                        </p>
                    </div>
                    <a
                        href="mailto:mental.health.auth@gmail.com"
                        className="shrink-0 flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs rounded-2xl transition-all active:scale-95 shadow-lg shadow-teal-900/30"
                >
                        <Mail className="w-3.5 h-3.5" />
                        Email Support
                    </a>
                </div>

                <p className="text-center text-[11px] font-medium text-slate-400 pb-4">
                    © 2026 Safe Space Mental Wellness. Help Center last updated June 2026.
                </p>
            </div>
        </div>
    );
}