"use client";
import React from "react";
import { InductionProvider } from "@/context/InductionContext";
import "./style.css";


export default function InductionLayout({ children })
{
    return (
        <>
            <InductionProvider>
                <div className="induction-wrapper font-montserrat min-h-[60vh]">
                    {children}
                </div>
            </InductionProvider>
        </>
    );
}