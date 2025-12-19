"use client";
import React from "react";
import { InductionProvider } from "@/context/InductionContext";
import Container from '@/components/layout/Container';
import "./style.css";

// ✅ REMOVED: AuthGuard component (moved to lessons/layout.js)

export default function InductionLayout({ children })
{
    return (
        <>
           

            <InductionProvider>
                <div className="induction-wrapper font-montserrat min-h-[60vh]">
                    {/* ✅ CHANGED: No AuthGuard here - children render freely */}
                    {children}
                </div>
            </InductionProvider>
        </>
    );
}