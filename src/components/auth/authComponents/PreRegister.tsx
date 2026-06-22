import React from 'react'
import { FaSpa } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'

export default function PreRegister() {
    return (
        <>
            <div className='bg-surface min-h-screen'>
                {/* Header / Brand Anchor */}
                <header className="w-full flex justify-center py-8">
                    <div className="flex items-center gap-2">
                        <FaSpa className='text-2xl text-primary' />
                        <h1 className="text-2xl leading-8 font-bold text-primary tracking-tight">Safe Space</h1>
                    </div>
                </header>
                {/* Main Content Canvas */}
                <main className="grow flex items-center justify-center pb-8 relative z-30">
                    <div className="max-w-160 mx-3 md:mx-0 w-full bg-white rounded-4xl p-8 md:p-12 shadow-soft border border-outline-variant/30">
                        {/* Progress Bar Section */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm leading-5 tracking-wider text-primary font-bold">Step 1 of 4</span>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655]">25% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full transition-all duration-700 ease-out shadow-[0 0 12px rgba(0, 74, 198, 0.3)] w-[25%]"/>
                            </div>
                        </div>
                        {/* Content Area */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-semibold tracking-tighter leading-10 mb-3">How are you feeling today?</h2>
                            <p className="text-[#434655] font-normal max-w-100 mx-auto">Take a moment to check in with yourself. Your honesty helps us tailor your experience.</p>
                        </div>
                        {/* Mood Selection Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-12">
                            {/* Great */}
                            <button className="border-primary bg-[#f0f4ff] cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 hover:bg-primary/5 transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😊</div>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655] group-hover:text-primary">Great</span>
                            </button>
                            {/* Good */}
                            <button className=" cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 border-outline-variant bg-surface hover:bg-primary/5 transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🙂</div>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655] group-hover:text-primary">Good</span>
                            </button>
                            {/* Okay */}
                            <button className=" cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 border-outline-variant bg-surface hover:bg-primary/5 transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😐</div>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655] group-hover:text-primary">Okay</span>
                            </button>
                            {/* Not Great */}
                            <button className=" cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 border-outline-variant bg-surface hover:bg-primary/5 transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😔</div>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655] group-hover:text-primary">Not great</span>
                            </button>
                            {/* Very Down */}
                            <button className=" cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 border-outline-variant bg-surface hover:bg-primary/5 transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😢</div>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655] group-hover:text-primary">Very down</span>
                            </button>
                        </div>
                        {/* Footer Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-outline-variant/30">
                            <button className="text-[#434655] cursor-pointer text-sm font-medium leading-5 tracking-wider hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="group-hover:-translate-x-1 transition-transform"><FaArrowLeft /></span>
                                Skip for now
                            </button>
                            <button className="bg-primary text-white text-sm font-medium leading-5 tracking-wider px-10 py-3.5 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled id="next-button">
                                Continue
                            </button>
                        </div>
                    </div>
                </main>
                {/* Visual Atmosphere (Decorative) */}
                <div className="fixed bottom-0 left-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#86f2e4] rounded-full blur-[100px]" />
                    <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#dbe1ff] rounded-full blur-[80px]" />
                </div>
                {/* Page Footer */}
                <footer className="w-full py-stack-md text-center relative z-30">
                    <p className="font-label-sm text-label-sm text-[#434655]/60">
                        © 2024 Safe Space. Your privacy is our priority.
                    </p>
                </footer>
            </div>

        </>
    )
}
