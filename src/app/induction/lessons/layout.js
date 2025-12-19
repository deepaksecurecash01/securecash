"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInduction } from "@/context/InductionContext";
import Container from "@/components/layout/Container";

export default function LessonsLayout({ children })
{
    const router = useRouter();
    const { isAuthenticated } = useInduction(); // ✅ REMOVED: isLoading

    useEffect(() =>
    {
        // ✅ SIMPLIFIED: Just check auth, no loading check needed
        if (!isAuthenticated) {
            router.push("/induction/login");
        }
    }, [isAuthenticated, router]);

    // ✅ REMOVED: Loading check - not needed anymore
    // ✅ REMOVED: Auth check return null - handled by useEffect redirect

    // ✅ Render immediately if authenticated
    if (!isAuthenticated) {
        return null; // Brief moment before redirect
    }

    return (
        <>
            <section className="induction-single-hero bg-black text-white h-full relative">
                <Container className="w-full">
                    <div className="induction-single-hero--wrap flex items-center relative">
                        <div className="induction-single-hero--head h-[290px] p-0 max-w-[900px] mx-auto flex flex-col justify-center items-center 768px:h-[340px]">
                            <h1 className="induction-single-hero--head__title induction-index-hero--content__title text-[28px] leading-[34px] px-[10px] w-full 480px:text-[38px] 480px:leading-[36px] 480px:px-[40px] 768px:px-0 mb-[20px] text-center 768px:text-[46px] font-extrabold 768px:leading-[50px] capitalize">
                                Banking Courier Induction
                            </h1>
                            <hr className="w-[100px] mx-auto mt-[6px] h-[4px] rounded-[5px] border-0 bg-primary" />
                        </div>
                    </div>
                </Container>
            </section>
            {children}
        </>
    );
}