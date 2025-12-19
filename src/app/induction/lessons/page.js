"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInduction } from "@/context/InductionContext";
import LessonVideo from "@/components/induction/LessonVideo";
import QuizEngine from "@/components/induction/QuizEngine";
import Container from "@/components/layout/Container";

export default function LessonsPage()
{
    const router = useRouter();
    const { currentLesson, progress, totalLessons, completeLesson } = useInduction();
    const [showQuiz, setShowQuiz] = useState(false);

    if (!currentLesson) return null;

    const percentage = Math.round(((progress.currentLessonIndex) / totalLessons) * 100);

    const handleLessonPass = () =>
    {
        completeLesson(currentLesson.id);

        // ✅ FIXED: Check if last lesson BEFORE toggling quiz view
        if (progress.currentLessonIndex + 1 >= totalLessons) {
            // Navigate directly - don't toggle quiz state
            router.push("/induction/form");
        } else {
            // Only toggle quiz state if staying on page
            setShowQuiz(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    const handleStartQuiz = () =>
    {
        setShowQuiz(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handleReviewMaterial = () =>
    {
        setShowQuiz(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <div className="pt-10">
            <Container>
                {/* Progress Bar */}
                <div className="mb-10 max-w-[1200px] mx-auto pt-8">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase font-montserrat">
                        <span>Course Progress</span>
                        <span>{percentage}% Completed</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* Lesson Container */}
                <div className="max-w-[1200px] mx-auto bg-white rounded-lg overflow-hidden">
                    <div className="px-8 pt-8">
                        <h2 className="text-[26px] font-bold mb-6 text-gray-800 font-montserrat">
                            {showQuiz ? `Quiz: ${currentLesson.title}` : `${currentLesson.title}`}
                        </h2>
                    </div>

                    {!showQuiz ? (
                        <>
                            <div className="induction-single-main--content px-8" style={{ margin: '0', maxWidth: '100%' }}>
                                {currentLesson.modules.map((block, index) =>
                                {
                                    if (block.type === 'text') {
                                        return (
                                            <div
                                                key={index}
                                                className="induction-content-wrap"
                                                style={{ padding: '0' }}
                                                dangerouslySetInnerHTML={{ __html: block.content }}
                                            />
                                        );
                                    }

                                    if (block.type === 'video') {
                                        return (
                                            <div key={index} className="mb-8 mt-8">
                                                <LessonVideo videoId={block.videoId} />
                                            </div>
                                        );
                                    }

                                    if (block.type === 'image') {
                                        return (
                                            <div key={index} className="my-8 flex justify-center">
                                                <img src={block.src} alt={block.alt || "Lesson Image"} className="max-w-full h-auto rounded-md shadow-sm" />
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="animate-fade-in px-8 pb-12 mb-10">
                            <button
                                onClick={handleReviewMaterial}
                                className="mb-6 text-sm text-primary hover:underline flex items-center gap-2 font-semibold font-montserrat"
                            >
                                ← Review Training Material
                            </button>
                            <QuizEngine
                                lesson={currentLesson}
                                onPass={handleLessonPass}
                                handleReviewMaterial={handleReviewMaterial}
                            />
                        </div>
                    )}
                </div>
            </Container>

            {!showQuiz && (
                <div className="relative w-full h-[250px] mt-12">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center grayscale"
                        style={{
                            backgroundImage: "url('/images/induction/induction-banner.jpg')",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={handleStartQuiz}
                            className="bg-[#c6a54b] hover:bg-[#b09140] text-white text-[17px] font-bold py-4 px-12 rounded uppercase tracking-wide transition-all transform hover:scale-105 shadow-md font-montserrat"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}