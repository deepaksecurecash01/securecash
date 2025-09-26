import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VideoPlayer = ({
  videoId,
  title = "Video Player",
  width = "100%",
  aspectRatio = "16:9",
  thumbnail,
  provider = "vimeo", // Future-proof for YouTube, etc.
  className = "",
}) =>
{
  const [videoState, setVideoState] = useState("idle");
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);

  // Fetch thumbnail if not provided
  useEffect(() =>
  {
    if (!thumbnail && provider === "vimeo") {
      setIsLoading(true);
      fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
        .then((response) => response.json())
        .then((data) =>
        {
          if (data && data[0]) {
            setThumbnailUrl(data[0].thumbnail_large);
          }
        })
        .catch((error) =>
        {
          console.error("Error fetching Vimeo thumbnail:", error);
        })
        .finally(() =>
        {
          setIsLoading(false);
        });
    }
  }, [videoId, thumbnail, provider]);

  const getPlayerUrl = () =>
  {
    switch (provider) {
      case "vimeo":
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
      case "youtube":
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      default:
        return "";
    }
  };

  const handlePlay = () =>
  {
    setVideoState("playing");
    // Set iframe src after component re-renders with iframe present
    setTimeout(() =>
    {
      if (iframeRef.current) {
        const playerUrl = getPlayerUrl();
        iframeRef.current.src = playerUrl;
      }
    }, 0);
  };

  const aspectRatioPercentage = (() =>
  {
    const [width, height] = aspectRatio.split(":").map(Number);
    return (height / width) * 100;
  })();

  return (
    <div className={`relative w-full max-w-full overflow-hidden bg-black ${className}`}>
      <div
        className="relative w-full"
        style={{ paddingTop: `${aspectRatioPercentage}%` }}
      >
        {/* Thumbnail Layer */}
        {videoState === "idle" && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer group transition-all duration-200 overflow-hidden z-10"
            onClick={handlePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
            {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePlay();
              }
            }}
            aria-label={`Play video: ${title}`}
          >
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Thumbnail Image */}
            {thumbnailUrl && !isLoading && (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            )}

            {/* Vignette Effect */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background: "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.6) 100%)"
              }}
            />

            {/* Play Button */}
            <div
              className="absolute z-[11] flex items-center justify-center bg-[#212121] opacity-80 group-hover:bg-primary group-hover:opacity-100 transition-all duration-200"
              style={{
                width: "70px",
                height: "46px",
                borderRadius: "10%"
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                  borderLeft: "19px solid white",
                  marginLeft: "8px",
                  marginRight: "4px",
                }}
              />
            </div>
          </div>
        )}

        {/* Video Iframe - Only render when playing */}
        {videoState === "playing" && (
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full border-none z-[9]"
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;