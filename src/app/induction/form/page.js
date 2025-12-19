"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInduction } from "@/context/InductionContext";
import InductionForm from "@/components/common/forms-new/forms/InductionForm";

export default function FormPage()
{
    const router = useRouter();
    const { progress } = useInduction(); // ✅ REMOVED: isLoading

    useEffect(() =>
    {
        // ✅ SIMPLIFIED: Just check completion
        if (!progress.isCourseComplete) {
            router.push("/induction/lessons");
        }
    }, [progress, router]);

    // ✅ REMOVED: Loading check
    // if (isLoading) return <div className="p-12 text-center">Checking completion...</div>;

    // ✅ Guard: Don't render form until complete
    if (!progress.isCourseComplete) {
        return null; // Brief moment before redirect
    }

    return (
        <section className="1024px:py-[120px] 768px:bg-[#f2f2f2]">
            <div className="max-w-[1200px] mx-auto">
                <InductionForm />
            </div>
        </section>
    );
}