import { useState } from 'react'
import { FaSpa } from 'react-icons/fa'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

// 1. إعادة صياغة الأسئلة لتركز على "المجالات" اللي اليوزر محتاج فيها مساعدة
const stepsData = [
    {
        id: 1,
        title: "What is your primary focus area for your well-being today?",
        context: "Select the goal that feels most urgent to you right now so we can tailor your space.",
        options: [
            { label: "Lifting my mood and rediscovering energy or passion", category: "depression", emoji: "🌱" },
            { label: "Calming my mind and managing constant worry or tension", category: "anxiety", emoji: "🧘" },
            { label: "Clearing mental clutter, focusing, and getting things done", category: "adhd", emoji: "🎯" },
            { label: "Breaking free from repetitive, intrusive thoughts or habits", category: "ocd", emoji: "🧩" },
            { label: "Healing from past distressing events or heavy memories", category: "ptsd", emoji: "❤️" }
        ]
    },
    {
        id: 2,
        title: "Which of these emotional states resonates most with your recent days?",
        context: "It is natural for feelings to overlap. Choose the one that feels most prominent.",
        options: [
            { label: "Feeling heavy, empty, or unmotivated for no clear reason", category: "depression", emoji: "😔" },
            { label: "Experiencing restlessness, a racing heart, or a sense of dread", category: "anxiety", emoji: "😰" },
            { label: "Getting easily bored, forgetful, or distracted by everything", category: "adhd", emoji: "⚡" },
            { label: "An urgent need to double-check things or repeat certain actions", category: "ocd", emoji: "🧼" },
            { label: "Feeling sudden panic or numbness when reminded of the past", category: "ptsd", emoji: "💭" }
        ]
    },
    {
        id: 3,
        title: "How do these challenges mostly impact your daily routine?",
        context: "Understanding your day-to-day routine helps us build the right support system.",
        options: [
            { label: "Making it extremely hard to get out of bed and start my day", category: "depression", emoji: "🛏️" },
            { label: "Trapping me in endless overthinking instead of taking action", category: "anxiety", emoji: "🤯" },
            { label: "Starting multiple tasks at once but struggling to finish any", category: "adhd", emoji: "📉" },
            { label: "Losing precious time trying to make things feel 'just right'", category: "ocd", emoji: "⏳" },
            { label: "Avoiding certain places, people, or conversations entirely", category: "ptsd", emoji: "🚫" }
        ]
    },
    {
        id: 4,
        title: "When things get overwhelming, where do you feel the biggest strain?",
        context: "Your honesty here ensures we recommend the most accurate path forward.",
        options: [
            { label: "Losing interest in hobbies and disconnecting from loved ones", category: "depression", emoji: "👥" },
            { label: "Struggling to relax, rest, or get a peaceful night's sleep", category: "anxiety", emoji: "🌙" },
            { label: "Feeling constantly overwhelmed by long-term planning and dates", category: "adhd", emoji: "📅" },
            { label: "Feeling intense frustration if my environment isn't perfectly ordered", category: "ocd", emoji: "📐" },
            { label: "Experiencing vivid, unwanted flashbacks that disrupt my focus", category: "ptsd", emoji: "👁️" }
        ]
    },
    {
        id: 5,
        title: "What is the ultimate breakthrough you are looking for here?",
        context: "Your final step helps us define where your tailored map begins.",
        options: [
            { label: "Finding a sense of hope and purpose to move forward", category: "depression", emoji: "☀️" },
            { label: "Quieting my inner noise and finding true mental peace", category: "anxiety", emoji: "🕊️" },
            { label: "Building sustainable habits and staying organized with ease", category: "adhd", emoji: "📝" },
            { label: "Regaining control over my own thoughts and daily choices", category: "ocd", emoji: "🛡️" },
            { label: "Feeling safe within my own mind and resilient to the past", category: "ptsd", emoji: "💫" }
        ]
    }
];

export default function PreRegister({ setPage }: { setPage: (page: string) => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    // سكور لكل فئة، بنزوده لما اليوزر يختار خيار متعلق بالفئة دي
    const [scores, setScores] = useState<Record<string, number>>({
        depression: 0,
        anxiety: 0,
        adhd: 0,
        ocd: 0,
        ptsd: 0
    });

    // لحفظ الخيار المحدد في الخطوة الحالية (عشان نعمل له Active class)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const currentQuestion = stepsData[currentStep];
    const totalSteps = stepsData.length;
    const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

    // دالة التعامل مع اختيار الهدف
    const handleSelectOption = (category: string) => {
        setSelectedCategory(category);
    };

    const handleContinue = () => {
        if (!selectedCategory) return;

        // 1. حساب السكور الجديد وتحديث الـ State للخطوة الحالية
        const updatedScores = {
            ...scores,
            [selectedCategory]: scores[selectedCategory] + 1
        };
        setScores(updatedScores);

        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
            setSelectedCategory(null); // ريست للخطوة اللي جاية
        } else {
            // 2. حساب أعلى سكور وفلترة الأمراض الفائزة (سواء واحد أو المتعادلين)
            const maxScore = Math.max(...Object.values(updatedScores));
            const recommendedTests = Object.keys(updatedScores).filter(
                (category) => updatedScores[category] === maxScore
            );

            // 3. الأوبجكت النهائي اللي هيروح للـ API 🚀
            const apiPayload = {
                allScores: updatedScores,             // الـ 5 أمراض بالسكورز بتاعتهم
                highestScore: maxScore,              // أعلى سكور تم تسجيله
                recommendedTests: recommendedTests,  // الـ Array اللي فيها الفائز أو المتعادلين
                hasTie: recommendedTests.length > 1  // Boolean يسهل على الباك-إند معرفة لو في تعادل
            };

            // 4. طريقة الإرسال أو الحفظ
            console.log("--- FINAL API PAYLOAD ---", apiPayload);

            // لو هتبعتها فوراً في الـ API هنا:
            // myApiCallFunction(apiPayload);

            // أو لو هتحفظها في LocalStorage عشان تبعتها مع بيانات الـ Register Form:
            localStorage.setItem('recommendedTests', JSON.stringify(apiPayload));

            // الانتقال لصفحة الفورم
            setPage("register-form");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setSelectedCategory(null); // ريست للاختيار
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
                    <div className="max-w-2xl mx-3 md:mx-0 w-full bg-white rounded-4xl p-8 md:p-12 shadow-soft border border-outline-variant/30 animate-[fadeIn_0.5s_ease-in-out]">

                        {/* Progress Bar Section */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm leading-5 tracking-wider text-primary font-bold">
                                    Step {currentStep + 1} / {totalSteps}
                                </span>
                                <span className="text-sm font-medium leading-5 tracking-wider text-[#434655]">
                                    {progressPercentage}% completed
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
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 min-h-16 flex items-center justify-center">
                                {currentQuestion.title}
                            </h2>
                            <p className="text-[#434655] font-normal max-w-xl mx-auto min-h-10">
                                {currentQuestion.context}
                            </p>
                        </div>

                        {/* Goals Selection List (Vertical layout works best for text goals) */}
                        <div className="flex flex-col gap-3 mb-10">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedCategory === option.category;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectOption(option.category)}
                                        className={`cursor-pointer w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-right justify-start hover:translate-x-1 ${isSelected
                                            ? "border-primary bg-[#f0f4ff]"
                                            : "border-outline-variant bg-surface hover:bg-primary/5"
                                            }`}
                                    >
                                        <div className="text-2xl bg-white p-2 rounded-xl shadow-sm">
                                            {option.emoji}
                                        </div>
                                        <span className={`text-base font-medium transition-colors ${isSelected ? "text-primary font-bold" : "text-[#434655]"
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
                                    className="text-[#434655] cursor-pointer text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    Skip and go to registration
                                    <span className="group-hover:translate-x-1 transition-transform"><FaArrowRight /></span>
                                </button>
                                :
                                <button
                                    onClick={handleBack}
                                    className="text-[#434655] cursor-pointer text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform"><FaArrowLeft /></span>
                                    Back
                                </button>
                            }

                            <button
                                onClick={handleContinue}
                                disabled={!selectedCategory}
                                className="bg-primary cursor-pointer text-white text-sm font-medium px-10 py-3.5 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed w-full sm:w-auto"
                            >
                                {currentStep === totalSteps - 1 ? "Confirm and go to registration" : "Continue"}
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