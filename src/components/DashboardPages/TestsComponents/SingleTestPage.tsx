import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import type { RootState } from "../../../redux/store";
import { updateStats } from "../../../redux/slices/userInfoSlice";
import type { TestData } from "../../../Types/Types";



export default function SingleTestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.userInfo.token);
  const stats = useSelector((state: RootState) => state.userInfo.stats);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getAuthHeader = (rawToken: string) => {
    if (!rawToken) return "";
    return rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
  };

  const {
    data: testData,
    isLoading,
    error,
  } = useQuery<TestData, any>({
    queryKey: ["test", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://mental-heath-backend.vercel.app/tests/${id}`,
        {
          headers: {
            Authorization: getAuthHeader(token),
          },
        },
      );
      return res.data;
    },
    enabled: !!id && !!token,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[70vh] space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin stroke-[1.5]" />
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
          Loading Questions...
        </p>
      </div>
    );
  }

  const questions =
    testData?.questions || testData?.questions_data?.questions || [];
  const testName =
    testData?.TestName || testData?.test_details?.name || "Assessment";
  const description =
    testData?.Description || testData?.test_details?.description || "";

  if (error || !token || questions.length === 0) {
    let errorMessage = "We couldn't retrieve the questions for this test.";
    if (!token) errorMessage = "User token is missing. Please log in again.";
    if (error?.response?.data?.message)
      errorMessage = error.response.data.message;
    else if (error?.message) errorMessage = error.message;

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh] space-y-5">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-2xl">
          ⚠️
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-slate-800">
            Error Loading Assessment
          </h3>
          <p className="text-sm text-rose-600 max-w-sm mx-auto font-mono bg-rose-50 p-3 rounded-xl border border-rose-100">
            {errorMessage}
          </p>
        </div>
        <Link
          to="/dashboard/tests"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/10 transition-all"
        >
          Go Back to Tests
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = Math.round(
    ((currentIndex + 1) / totalQuestions) * 100,
  );

  const options = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 },
  ];

  const handleSelectOption = (value: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.QuestionID]: value,
    }));
  };

  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const totalScore = Object.values(answers).reduce(
          (sum, val) => sum + Number(val),
          0,
        );

        const payload = {
          TestTypeID: Number(id),
          ResultValue: totalScore,
        };

        await axios.post(
          `https://mental-heath-backend.vercel.app/test-results`,
          payload,
          {
            headers: {
              Authorization: getAuthHeader(token),
            },
          },
        );

        // تحديث الـ Redux فورًا بدون انتظار تسجيل خروج/دخول جديد
        const maxScore = totalQuestions * 3;
        const percentage = Math.round((totalScore / maxScore) * 100);
        dispatch(updateStats({
          totalTests: (stats.totalTests || 0) + 1,
          lastScore: percentage,
        }));

        toast.success("Assessment submitted successfully!");

        navigate(`/dashboard/tests/${id}/result`, {
          state: {
            testId: id,
            testName: testName,
            score: totalScore,
            maxScore: totalQuestions * 3,
          },
        });
      } catch (err: any) {
        console.error("Submission error details:", err.response?.data || err);
        const serverMsg =
          err.response?.data?.message ||
          "Failed to submit answers. Please try again.";
        toast.error(serverMsg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isCurrentQuestionAnswered =
    currentQuestion && answers[currentQuestion.QuestionID] !== undefined;

  return (
    <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="space-y-1.5 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          {testName}
        </h2>
        <p className="text-xs font-medium text-slate-400 tracking-wide max-w-xl">
          {description}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2.5 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span className="bg-slate-200/60 px-2.5 py-1 rounded-md text-slate-600 font-mono text-[11px]">
            QUESTION {currentIndex + 1} OF {totalQuestions}
          </span>
          <span className="text-blue-600">{progressPercentage}% Completed</span>
        </div>
        <div className="w-full h-1 bg-slate-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.08)] flex flex-col items-center justify-center min-h-91.25 space-y-8 transition-all duration-300">
        <div className="space-y-2.5 w-full text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block bg-slate-50 px-3 py-1 rounded-full w-fit mx-auto border border-slate-100/80">
            Over the last 2 weeks, how often have you been bothered by:
          </span>
          <h3 className="text-lg md:text-xl font-extrabold text-slate-800 leading-snug tracking-tight max-w-xl mx-auto">
            {currentQuestion?.QuestionText}
          </h3>
        </div>

        {/* Options */}
        <div className="w-full max-w-md space-y-2.5">
          {options.map((option) => {
            const isSelected =
              currentQuestion &&
              answers[currentQuestion.QuestionID] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                disabled={isSubmitting}
                className={`w-full p-4 text-left text-sm font-semibold rounded-xl border transition-all duration-300 flex items-center justify-between active:scale-[0.995] cursor-pointer disabled:opacity-60 group
                                    ${
                                      isSelected
                                        ? "bg-blue-50/40 border-blue-500/80 text-blue-600 shadow-sm shadow-blue-600/5"
                                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50/50 hover:border-slate-200"
                                    }`}
              >
                <span
                  className={`transition-colors duration-200 ${isSelected ? "text-blue-700 font-bold" : "text-slate-600 group-hover:text-slate-800"}`}
                >
                  {option.label}
                </span>

                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300
                                    ${isSelected ? "border-blue-500 bg-blue-500 scale-110" : "border-slate-300 bg-white group-hover:border-slate-400"}`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isSubmitting}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered || isSubmitting}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-600/10 disabled:shadow-none cursor-pointer min-w-32.5 justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : currentIndex === totalQuestions - 1 ? (
            "Submit Assessment"
          ) : (
            <>
              Next
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}