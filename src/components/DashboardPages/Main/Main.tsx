import { MdOutlineAnalytics, MdOutlineQuiz } from 'react-icons/md'
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../DoctorCompnents/DoctorCard';
import DoctorCardSkeleton from '../DoctorCompnents/DoctorCardSkeleton';
import TestCard from '../TestsComponents/TestCard';
import TestCardSkeleton from '../TestsComponents/TestCardSkeleton';
import type { DoctorType, TestType } from '../../../Types/Types';



export default function Main() {
    const stats = useSelector((state: RootState) => state.userInfo.stats); // Assuming you have a stats slice in your Redux store

    const token = useSelector((state: RootState) => state.userInfo.token);

    const {
        data: tests = [],
        isLoading: testsLoading,
        error: testsError,
    } = useQuery<TestType[]>({
        queryKey: ["tests"],
        queryFn: async () => {
            const res = await axios.get("https://mental-heath-backend.vercel.app/tests", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await res.data;
            return json.tests ?? [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: doctors = [],
        isLoading: doctorsLoading,
        error: doctorsError,
    } = useQuery<DoctorType[]>({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await axios.get("https://mental-heath-backend.vercel.app/doctors");
            const json = await res.data;
            return json.data ?? [];
        },
        staleTime: 1000 * 60 * 5,
    });


    return (
        <main className="flex-1 py-4 px-2 md:py-8 space-y-8 max-w-6xl mx-auto w-full">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Mood Widget */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
                    <div className="flex justify-between items-center gap-2">
                        {[
                            { emoji: "😢", label: "Sad" },
                            { emoji: "😕", label: "Neutral" },
                            { emoji: "🙂", label: "Okay" },
                            { emoji: "😊", label: "Happy" },
                            { emoji: "🤩", label: "Great" },
                        ].map(({ emoji, label }) => (
                            <button
                                key={label}
                                className="group flex flex-col items-center gap-2 flex-1 p-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                <span className="text-lg sm:text-3xl grayscale group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110">
                                    {emoji}
                                </span>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col gap-2">
                        <MdOutlineQuiz className="text-primary text-2xl" />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tests Taken</p>
                        <h4 className="text-3xl font-bold text-primary">{stats.totalTests}</h4>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col gap-2">
                        <MdOutlineAnalytics className="text-teal-600 text-2xl" />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Score</p>
                        <h4 className={`${stats.lastScore ? 'text-3xl' : ' text-sm font-bold'} text-teal-600 `}>{stats.lastScore ? `${stats.lastScore}%` : 'Take Your First Test to See Your Score'}</h4>
                    </div>
                </div>
            </div>



            {/* Self-Assessment Tests */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className='w-3/4 lg:w-fit'>
                        <h3 className="text-xl font-semibold text-gray-900">Self-Assessment Tests</h3>
                        {tests.filter((test)=> test.isRecommended).length > 0 && <p className='text-sm font-medium'>The <span className='text-primary font-bold'>Recommended</span> tag added based on your answers during registration</p>}
                    </div>
                    <Link to="tests" className="text-primary text-sm font-medium hover:underline">View All</Link>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                    {testsLoading
                        && Array.from({ length: 4 }).map((_, i) => <TestCardSkeleton key={i} />)

                    }
                    {testsError && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8 border border-red-100 shadow-sm text-center">
                            There is an error at tests loading, try again
                        </div>
                    )}
                    {tests.slice(0,4).map((test) => {
                        
                        return (
                            <TestCard key={test.TestName} test={test}/>
                        )
                    })}
                </div>
            </section>

            {/* Available Doctors */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Available Doctors</h3>
                    <Link to="doctors" className="text-primary text-sm font-medium hover:underline">
                        View All
                    </Link>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                    {doctorsLoading && (
                        Array.from({length : 3}).map((_ , i)=>{
                            return <DoctorCardSkeleton key={i}/>
                        })
                    )}

                    {doctorsError && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8 border border-red-100 shadow-sm text-center">
                            There is an error at doctor loading, try again
                        </div>
                    )}
                    
                    {doctors.slice(0,5).map((doctor) => (
                        <DoctorCard key={doctor.FullName} doctor={doctor}/>
                    ))}

                </div>
            </section>

        </main>
    )
}
