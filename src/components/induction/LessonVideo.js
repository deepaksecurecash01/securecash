"use client";
import React from "react";
import VimeoLite from "@/components/common/VimeoLite"; // Adjust this path to your actual component location

const LessonVideo = ({ videoId }) =>
{
    if (!videoId) return null;

    return (
        <div className="w-full mb-8">
            {/* Aspect Video Wrapper from your snippets */}
            <div className="aspect-video bg-gray-200 rounded-sm flex items-center justify-center">
                <div className="video-player rounded-lg overflow-hidden w-full h-full shadow-lg">
                    <VimeoLite videoId={videoId} />
                </div>
            </div>
        </div>
    );
};

export default LessonVideo;