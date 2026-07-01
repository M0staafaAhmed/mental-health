import { Link } from 'react-router-dom'
import hero from '../../assets/Home Hero.png'
import { MdOutlinePsychology, MdOutlineQuiz } from 'react-icons/md'
import { LiaBriefcaseMedicalSolid } from 'react-icons/lia'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaCheckCircle } from 'react-icons/fa'

export default function Home() {
    return (
        <div>
            <main className="grow">
                {/* Hero Section */}
                <section className="bg-hero-gradient relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
                    <div className="container px-3 md:px-0 mx-auto">
                        {/* Atmospheric micro-interaction backgrounds */}
                        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-150 h-150 bg-secondary-container px-3 md:px-0/20 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-125 h-125 bg-primary-fixed/30 rounded-full blur-[100px] pointer-events-none" />
                        <div className="max-w-6xl mx-auto text-center relative z-10">
                            <h1 className="text-4xl font-bold mb-6 text-gray-900 max-w-3xl mx-auto tracking-tight">
                                Your Safe Space for Mental Wellness
                            </h1>
                            <p className="font-normal text-lg leading-7 text-gray-800 mb-12 max-w-2xl mx-auto">
                                A small step today means a lot for a better tomorrow. Join a compassionate community designed to support your journey towards clarity and peace.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/register" className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-full font-medium text-lg hover:scale-105 transition-transform shadow-lg active:scale-95">
                                    Get Started
                                </Link>
                            </div>
                            {/* Floating Illustration/Abstract Element */}
                            <div className="mt-20 flex justify-center">
                                <div className="relative w-full max-w-4xl h-75 md:h-112.5 bg-white/70 backdrop-blur-md border border-white/30 rounded-4xl overflow-hidden soft-shadow flex items-center justify-center p-8 group">
                                    <img alt="Peaceful wellness scene" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A serene and minimalist interior scene showing a person sitting peacefully in a sun-drenched room with large windows overlooking a calm forest. The atmosphere is quiet and ethereal, with soft teal and blue color grading. High-key natural lighting creates long, gentle shadows, and the overall aesthetic is professional, modern, and deeply calming, aligning with a mental wellness brand." src={hero} />
                                    <div className="absolute inset-0 bg-linear-to-t from-white/40 to-transparent" />
                                    {/* Mini "Status" Badge floating interaction */}
                                    <div className="absolute bottom-8 left-8 bg-white/70 backdrop-blur-md border border-white/30 px-6 py-4 rounded-2xl flex items-center gap-4 animate-[bounce_5s_infinite]">
                                        <div className="w-3 h-3 rounded-full bg-secondary shadow-[0_0_12px_#006a61]" />
                                        <span className="text-sm font-medium leading-5 text-gray-700">1,240 Specialists Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Features Bento Grid */}
                <section className="py-24">
                    <div className="container px-3 md:px-0 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-semibold text-3xl leading-10 text-gray-900 mb-4">Empower Your Mind</h2>
                            <p className="text-gray-700">Carefully crafted tools to help you navigate your mental health journey.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Feature Card 1 */}
                            <div className="bg-[#f3f3fe] p-8 rounded-3xl border border-outline-variant/30 flex flex-col items-start hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MdOutlinePsychology className="text-3xl rotate-y-180" />
                                </div>
                                <h3 className="text-2xl font-semibold leading-8 text-gray-900 mb-4">AI Emotional Support</h3>
                                <p className="text-gray-700 grow">
                                    An intelligent, empathetic companion available 24/7 to listen and provide immediate coping strategies whenever you need them.
                                </p>
                                <Link to="/dashboard/chat" className="mt-8 text-primary text-sm font-medium leading-5 flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <FaArrowRightLong className="text-sm" />
                                </Link>
                            </div>
                            {/* Feature Card 2 */}
                            <div className="bg-[#f3f3fe] p-8 rounded-3xl border border-outline-variant/30 flex flex-col items-start hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                                    <MdOutlineQuiz className='text-3xl' />
                                </div>
                                <h3 className="text-2xl font-semibold leading-8 text-gray-900 mb-4">Self-Assessment</h3>
                                <p className="text-gray-700 grow">
                                    Certified clinical tests to help you understand your emotional state and track your mental health progress over time with data.
                                </p>
                                <Link to="/tests" className="mt-8 text-primary text-sm font-medium leading-5 flex items-center gap-2 hover:gap-3 transition-all">
                                    Start Test <FaArrowRightLong className="text-sm" />
                                </Link>
                            </div>
                            {/* Feature Card 3 */}
                            <div className="bg-[#f3f3fe] p-8 rounded-3xl border border-outline-variant/30 flex flex-col items-start hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 group-hover:bg-tertiary group-hover:text-white transition-colors">
                                    <LiaBriefcaseMedicalSolid className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-semibold leading-8 text-gray-900 mb-4">Specialist Connect</h3>
                                <p className="text-gray-700 grow">
                                    Seamlessly book sessions with certified mental health professionals and doctors who specialize in your specific needs.
                                </p>
                                <Link to="/doctors" className="mt-8 text-primary text-sm font-medium leading-5 flex items-center gap-2 hover:gap-3 transition-all">
                                    Find Doctor <FaArrowRightLong className="text-sm" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Social Proof / CTA Section */}
                <section className="py-24">
                    <div className="container px-3 md:px-0 mx-auto">
                        <div className="bg-primary rounded-[40px] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/20 to-transparent pointer-events-none" />
                            <h2 className="font-semibold text-3xl leading-10  text-white mb-6 relative z-10">Ready to take the first step?</h2>
                            <p className="text-lg font-normal leading-7 text-white/90 mb-10 max-w-xl relative z-10">
                                Join over 50,000 members who have found their peace and balance through our personalized wellness programs.
                            </p>
                            <Link to="/register" className="relative z-10 px-8 py-4 bg-white text-primary rounded-full text-sm font-medium leading-5 hover:bg-surface transition-all shadow-xl hover:shadow-2xl active:scale-95">
                                Create Free Account
                            </Link>
                            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
                                <div className="flex items-center gap-2 text-white text-xs font-semibold leading-4">
                                    <FaCheckCircle className="text-sm" />
                                    Verified Professionals
                                </div>
                                <div className="flex items-center gap-2 text-white text-xs font-semibold leading-4">
                                    <FaCheckCircle className="text-sm" />
                                    HIPAA Compliant
                                </div>
                                <div className="flex items-center gap-2 text-white text-xs font-semibold leading-4">
                                    <FaCheckCircle className="text-sm" />
                                    24/7 Access
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
        </div>

    )
}
