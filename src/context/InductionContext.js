"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { INDUCTION_DATA } from "../data/induction-content";

const InductionContext = createContext();

// ✅ Auth duration: 2 hours
const AUTH_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const InductionProvider = ({ children }) =>
{
    // ✅ CHANGED: Read auth immediately from localStorage (synchronous)
    const getInitialAuth = () =>
    {
        if (typeof window === 'undefined') return false;

        try {
            const stored = localStorage.getItem("induction_auth");
            if (!stored) return false;

            const parsed = JSON.parse(stored);

            // Check if auth is expired (2 hours)
            if (Date.now() - parsed.timestamp > AUTH_DURATION) {
                localStorage.removeItem("induction_auth");
                return false;
            }

            return parsed.authenticated === true;
        } catch (e) {
            console.error("Auth parse error", e);
            return false;
        }
    };

    // ✅ CHANGED: Initialize with actual auth state (no loading needed)
    const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);
    const [isLoading, setIsLoading] = useState(false); // ✅ CHANGED: Start as false

    // Progress State
    const [progress, setProgress] = useState({
        currentLessonIndex: 0,
        completedLessonIds: [],
        isCourseComplete: false,
    });

    // ✅ CHANGED: Simplified initial load - only load progress
    useEffect(() =>
    {
        const savedProgress = localStorage.getItem("induction_progress_v1");
        if (savedProgress) {
            try {
                const parsed = JSON.parse(savedProgress);
                if (parsed.currentLessonIndex < INDUCTION_DATA.lessons.length) {
                    setProgress(parsed);
                }
            } catch (e) {
                console.error("Progress parse error", e);
            }
        }
    }, []);

    // Save Progress on Change
    useEffect(() =>
    {
        localStorage.setItem("induction_progress_v1", JSON.stringify(progress));
    }, [progress]);

    // ✅ CHANGED: Updated login to use localStorage with expiration
    const login = (username, password) =>
    {
        const validUsername = process.env.NEXT_PUBLIC_INDUCTION_USERNAME || "testing";
        const validPassword = process.env.NEXT_PUBLIC_INDUCTION_PASSWORD || "abcd";

        if (username === validUsername && password === validPassword) {
            // ✅ Store in localStorage (persists across sessions)
            localStorage.setItem("induction_auth", JSON.stringify({
                authenticated: true,
                username,
                timestamp: Date.now()
            }));
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    // ✅ NEW: Logout function
    const logout = () =>
    {
        localStorage.removeItem("induction_auth");
        setIsAuthenticated(false);
    };

    const completeLesson = (lessonId) =>
    {
        setProgress((prev) =>
        {
            const newCompleted = prev.completedLessonIds.includes(lessonId)
                ? prev.completedLessonIds
                : [...prev.completedLessonIds, lessonId];

            const nextIndex = prev.currentLessonIndex + 1;
            const totalLessons = INDUCTION_DATA.lessons.length;
            const isComplete = newCompleted.length === totalLessons;

            return {
                ...prev,
                completedLessonIds: newCompleted,
                currentLessonIndex: Math.min(nextIndex, totalLessons - 1),
                isCourseComplete: isComplete,
            };
        });
    };

    return (
        <InductionContext.Provider
            value={{
                isAuthenticated,
                isLoading, // ✅ Now always false, kept for compatibility
                progress,
                login,
                logout, // ✅ NEW
                completeLesson,
                currentLesson: INDUCTION_DATA.lessons[progress.currentLessonIndex],
                totalLessons: INDUCTION_DATA.lessons.length,
            }}
        >
            {children}
        </InductionContext.Provider>
    );
};

export const useInduction = () => useContext(InductionContext);