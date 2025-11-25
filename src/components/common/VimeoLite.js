import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VideoPlayer = ({
  videoId,
  title = "Video Player",
  width = "100%",
  aspectRatio = "16:9",
  thumbnail,
  provider = "vimeo",
  className = "",
  priority = false,
}) =>
{
  const [videoState, setVideoState] = useState("idle");
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() =>
  {
    if (!thumbnail && provider === "vimeo" && typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) =>
        {
          if (entries[0].isIntersecting) {
            setIsLoading(true);
            fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
              .then((response) => response.json())
              .then((data) =>
              {
                if (data && data[0]) {
                  setThumbnailUrl(data[0].thumbnail_large);
                }
              })
              .catch(() => { })
              .finally(() =>
              {
                setIsLoading(false);
              });
            observer.disconnect();
          }
        },
        { rootMargin: "50px" }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
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
    requestAnimationFrame(() =>
    {
      if (iframeRef.current) {
        const playerUrl = getPlayerUrl();
        iframeRef.current.src = playerUrl;
      }
    });
  };

  const aspectRatioPercentage = (() =>
  {
    const [width, height] = aspectRatio.split(":").map(Number);
    return (height / width) * 100;
  })();

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full overflow-hidden bg-black ${className}`}
    >
      <div
        className="relative w-full"
        style={{ paddingTop: `${aspectRatioPercentage}%` }}
      >
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
            {isLoading && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading video thumbnail" />
              </div>
            )}

            {thumbnailUrl && !isLoading && (
              <Image
                src={thumbnailUrl}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={60}
                loading="lazy"
                aria-hidden="true"
              />
            )}

            <div
              className="absolute inset-0 z-[2]"
              style={{
                background: "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.6) 100%)",
              }}
              aria-hidden="true"
            />

            <div
              className="absolute z-[11] flex items-center justify-center bg-[#212121] opacity-80 group-hover:bg-primary group-hover:opacity-100 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                width: "70px",
                height: "46px",
                borderRadius: "10%",
              }}
              aria-hidden="true"
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