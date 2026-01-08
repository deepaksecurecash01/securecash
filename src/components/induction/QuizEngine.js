"use client";
import React, { useState, useEffect } from "react";
import { INDUCTION_DATA } from "@/data/induction-content";
import ScrollableSection from "@/components/layout/ScrollbarSection";

const QuizEngine = ({ lesson, onPass, handleReviewMaterial }) =>
{
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState("idle");
  const [dismissTimeout, setDismissTimeout] = useState(null);

  // Auto-dismiss success message after 5 seconds
  useEffect(() =>
  {
    if (status === "success") {
      const timeout = setTimeout(() =>
      {
        setStatus("idle");
      }, 5000);
      setDismissTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [status]);

  // Cleanup timeout on unmount
  useEffect(() =>
  {
    return () =>
    {
      if (dismissTimeout) {
        clearTimeout(dismissTimeout);
      }
    };
  }, [dismissTimeout]);

  const handleSelect = (questionId, optionIndex) =>
  {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setStatus("idle");
  };

  const handleDismiss = () =>
  {
    if (dismissTimeout) {
      clearTimeout(dismissTimeout);
    }
    setStatus("idle");
  };

  const scrollToTop = () =>
  {
    const quizArea = document.getElementById("quiz-content-area");
    if (quizArea) {
      quizArea.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleSubmit = () =>
  {
    const allAnswered = lesson.quiz.questions.every(
      (q) => answers[q.id] !== undefined
    );

    if (!allAnswered) {
      setStatus("warning");
      return;
    }

    let isCorrect = true;
    lesson.quiz.questions.forEach((q) =>
    {
      if (answers[q.id] !== q.correctIndex) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      setStatus("success");
      // Scroll to bottom to show success message
      setTimeout(() =>
      {
        const quizContent = document.getElementById('quiz-content-area');
        if (quizContent) {
          quizContent.scrollTo({ top: quizContent.scrollHeight, behavior: 'smooth' });
        }
      }, 100);

      // Then move to next module after user has seen the message
      setTimeout(() =>
      {
        onPass();
        setAnswers({});
        setStatus("idle");
      }, 5000);
    } else {
      setStatus("error");
      // Scroll to bottom to show error message
      setTimeout(() =>
      {
        const quizContent = document.getElementById('quiz-content-area');
        if (quizContent) {
          quizContent.scrollTo({ top: quizContent.scrollHeight, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-none md:rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[800px] font-montserrat">
      {/* LEFT COLUMN: Abstract Image */}
      <div className="hidden md:block md:w-[30%] relative bg-gray-100">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center grayscale contrast-125"
          style={{
            backgroundImage: "url('/images/induction/induction-bg.jpg')",
            filter: "grayscale(100%) brightness(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
      </div>

      {/* RIGHT COLUMN: Quiz Content */}
      <div
        id="quiz-content-area"
        className="w-full md:w-[70%] flex flex-col relative"
      >
      

        <ScrollableSection className=" py-4  768px:max-h-[992px] bg-white 768px:py-4 768px:px-12 768px:pt-4 1024px:py-4 1024px:px-16 1024px:pt-4">
          <div className="space-y-12">
            {lesson.quiz.questions.map((q, idx) => (
              <div
                key={q.id}
                className="pb-8 border-b border-dark-border/50 last:border-0"
              >
                <h3 className="text-[20px] leading-snug font-semibold text-gray-900 mb-6">
                  {q.text}
                </h3>

                <div className="space-y-4">
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-start gap-4 cursor-pointer group hover:bg-gray-100 ${answers[q.id] === optIdx ? " bg-gray-100" : "text-gray-700"} 
                          ${status === "error" &&
                          answers[q.id] === optIdx &&
                          optIdx !== q.correctIndex
                          ? "bg-red-100"
                          : ""
                        } transition-colors p-1 rounded`}
                    >
                      <div className="relative flex items-center pt-1">
                        <input
                          type="radio"
                          name={q.id}
                          value={optIdx}
                          checked={answers[q.id] === optIdx}
                          onChange={() => handleSelect(q.id, optIdx)}
                          className="peer appearance-none w-5 h-5 border border-gray-400 group-hover:border-primary/60 rounded-sm group-hover:bg-primary/50 checked:bg-[#c6a54b] checked:border-[#c6a54b] checked:group-hover:bg-[#c6a54b] transition-all"
                          aria-label={`Option ${optIdx + 1}: ${opt}`}
                        />
                        <svg
                          className="absolute top-1 left-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>

                      <span
                        className={`font-light leading-relaxed group-hover:text-gray-800 transition-all 
                          ${answers[q.id] === optIdx ? "text-gray-900 font-medium" : "text-gray-700"} 
                          ${status === "error" &&
                            answers[q.id] === optIdx &&
                            optIdx !== q.correctIndex
                            ? "text-red-500 font-medium"
                            : ""
                          }`}
                      >
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="relative pointer-events-none h-20 w-full">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 z-40 pointer-events-none">
              {/* Error Alert */}
              {status === "error" && (
                <div className="px-8 pointer-events-auto animate-slide-down">
                  <div className="bg-red-50 text-red-600 px-6 py-4 border border-red-100 text-sm font-medium rounded-sm shadow-lg relative">
                    <button
                      onClick={handleDismiss}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Dismiss alert"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="pr-6" role="alert" aria-live="assertive">
                      {INDUCTION_DATA.meta.failMessage}
                    </div>
                  </div>
                </div>
              )}

              {/* Warning Alert */}
              {status === "warning" && (
                <div className="px-8 pointer-events-auto animate-slide-down">
                  <div className="bg-orange-50 text-orange-600 px-6 py-4 border border-orange-100 text-sm font-medium rounded-sm shadow-lg relative">
                    <button
                      onClick={handleDismiss}
                      className="absolute top-2 right-2 text-orange-400 hover:text-orange-600 transition-colors"
                      aria-label="Dismiss alert"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="pr-6" role="alert" aria-live="polite">
                      Please answer all questions before submitting.
                    </div>
                  </div>
                </div>
              )}

              {/* Success Alert */}
              {status === "success" && (
                <div className="px-8 pointer-events-auto animate-slide-down">
                  <div className="bg-green-50 text-green-700 px-6 py-4 border border-green-100 text-sm font-medium rounded-sm shadow-lg relative overflow-hidden">
                    {/* Progress bar for auto-dismiss */}
                    <div className="absolute bottom-0 left-0 h-1 bg-green-200 animate-progress-bar"></div>

                    <button
                      onClick={handleDismiss}
                      className="absolute top-2 right-2 text-green-400 hover:text-green-600 transition-colors"
                      aria-label="Dismiss alert"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="pr-6" role="alert" aria-live="polite">
                      {INDUCTION_DATA.meta.passMessage}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* FOOTER BUTTONS */}
          <div className="mt-4 mb-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSubmit}
              disabled={status === "success"}
              className="bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors flex-1 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit your quiz answers"
            >
              Submit your answers
            </button>

            <button
              onClick={handleReviewMaterial}
              className="bg-[#c6a54b] hover:bg-[#b09140] text-white px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors flex-1 text-center"
              aria-label="Review training material"
            >
              Review Training Material
            </button>
          </div>
        </ScrollableSection>
      </div>
    </div>
  );
};

export default QuizEngine;