import { useState } from 'react'
import { FaSpa } from 'react-icons/fa'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const questions = [
    {
        id: 1,
        category: "depression",
        question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
        context: "Take a moment to check in with yourself. Your honesty helps us tailor your experience."
    },
    {
        id: 2,
        category: "anxiety",
        question: "How often do you find yourself worrying excessively or feeling unable to relax?",
        context: "Anxiety can manifest physically and mentally. Choose the option that fits your recent days."
    },
    {
        id: 3,
        category: "adhd",
        question: "How much do you struggle with focusing, staying organized, or finishing tasks?",
        context: "Think about your work, study, or daily routines when answering."
    },
    {
        id: 4,
        category: "ocd",
        question: "How often do you experience repetitive, unwanted thoughts or feel forced to repeat certain actions?",
        context: "We are here to help you find balance. Please answer as accurately as possible."
    },
    {
        id: 5,
        category: "ptsd",
        question: "How much do upsetting memories or reminders of a past stressful event disturb you day-to-day?",
        context: "Your safety and privacy are our top priority throughout this journey."
    }
];

const moodOptions = [
    { label: "Great", emoji: "😊", value: 1 },
    { label: "Good", emoji: "🙂", value: 2 },
    { label: "Okay", emoji: "😐", value: 3 },
    { label: "Not great", emoji: "😔", value: 4 },
    { label: "Very down", emoji: "😢", value: 5 }
];

export default function PreRegister({ setPage }: { setPage: (page: string) => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({
        depression: 0,
        anxiety: 0,
        adhd: 0,
        ocd: 0,
        ptsd: 0
    });

    const currentQuestion = questions[currentStep];
    const totalSteps = questions.length;
    const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

    // دالة التعامل مع اختيار الـ Mood لـ السؤال الحالي
    const handleSelectMood = (value: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.category]: value
        }));
    };

    // دالة حساب النتيجة النهائية وتحديد الاختبار الموصى به
    const handleContinue = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // هنا نهاية الأسئلة الـ 5 بالكامل - اللوجيك يحسب أعلى سكور
            const recommendedTest = Object.keys(answers).reduce((a, b) => 
                answers[a] > answers[b] ? a : b
            );
            
            const highestScore = answers[recommendedTest];

            setPage("register-form"); // بعد ما يخلص الأسئلة، نوجّه المستخدم لصفحة التسجيل الفعلية

            // النتيجة النهائية اللي طلبتها يا هندسة:
            console.log("--- ONBOARDING COMPLETED ---");
            console.log(`Recommended Test Name: ${recommendedTest}`);
            console.log(`With Highest Score: ${highestScore}`);
            console.log("All Scores:", answers);

            alert(`Recommended Test: ${recommendedTest.toUpperCase()} (Score: ${highestScore}/5)`);
            
            // هنا تقدر تعمل Router.push('/test/' + recommendedTest) عشان توجّه اليوزر
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <>
            <div className='bg-surface min-h-screen flex flex-col justify-between'>
                {/* Header / Brand Anchor */}
                <header className="w-full flex justify-center py-8 relative z-30">
                    <div className="flex items-center gap-2">
                        <FaSpa className='text-2xl text-primary' />
                        <h1 className="text-2xl leading-8 font-bold text-primary tracking-tight">Safe Space</h1>
                    </div>
                </header>

                {/* Main Content Canvas */}
                <main className="grow flex items-center justify-center pb-8 relative z-30">
                    <div className="max-w-160 mx-3 md:mx-0 w-full bg-white rounded-4xl p-8 md:p-12 shadow-soft border border-outline-variant/30 animate-[fadeIn_0.5s_ease-in-out]">
                        
                        {/* Progress Bar Section */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm leading-5 tracking-wider text-primary font-bold">
                                    Step {currentStep + 1} of {totalSteps}
                                </span>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655]">
                                    {progressPercentage}% Complete
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(0,74,198,0.3)]" 
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-semibold tracking-tighter leading-10 mb-3 min-h-20 flex items-center justify-center">
                                {currentQuestion.question}
                            </h2>
                            <p className="text-[#434655] font-normal max-w-100 mx-auto min-h-10">
                                {currentQuestion.context}
                            </p>
                        </div>

                        {/* Mood Selection Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-12">
                            {moodOptions.map((option) => {
                                // التحقق لو اليوزر مختار الـ Option ده حالياً في الـ State
                                const isSelected = answers[currentQuestion.category] === option.value;

                                return (
                                    <button 
                                        key={option.value}
                                        onClick={() => handleSelectMood(option.value)}
                                        className={`cursor-pointer hover:-translate-y-1 group flex flex-col items-center p-5 rounded-2xl border-2 transition-all ${
                                            isSelected 
                                                ? "border-primary bg-[#f0f4ff]" 
                                                : "border-outline-variant bg-surface hover:bg-primary/5"
                                        }`}
                                    >
                                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                            {option.emoji}
                                        </div>
                                        <span className={`text-sm font-medium leading-5 tracking-wider transition-colors ${
                                            isSelected ? "text-primary font-bold" : "text-[#434655] group-hover:text-primary"
                                        }`}>
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-outline-variant/30">
                            {currentStep === 0 ? 
                            <button
                                onClick={() => setPage("register-form")}
                                className="text-[#434655] cursor-pointer text-sm font-medium leading-5 tracking-wider hover:text-primary transition-colors flex items-center gap-2 group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform"><FaArrowRight /></span>
                                Skip For Now
                            </button>
                            :
                            <button 
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className="text-[#434655] cursor-pointer text-sm font-medium leading-5 tracking-wider hover:text-primary transition-colors flex items-center gap-2 group disabled:hidden disabled:pointer-events-none"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform"><FaArrowLeft /></span>
                                Back
                            </button>
                            }
                            
                            <button 
                                onClick={handleContinue}
                                // الزرار مش هيفتح إلا لو اختار سكور للسؤال الحالي (أكبر من 0)
                                disabled={answers[currentQuestion.category] === 0} 
                                className="bg-primary cursor-pointer text-white text-sm font-medium leading-5 tracking-wider px-10 py-3.5 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {currentStep === totalSteps - 1 ? "Finish & Result" : "Continue"}
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
                <footer className="w-full py-6 text-center relative z-30">
                    <p className="text-sm text-[#434655]/60">
                        © 2026 Safe Space. Your privacy is our priority.
                    </p>
                </footer>
            </div>
        </>
    )
}