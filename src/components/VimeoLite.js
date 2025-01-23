import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VimeoLite = ({
  videoId,
  title = "Vimeo Video",
  width = "100%",
  aspectRatio = "16:9",
  thumbnail,
}) => {
  const [videoState, setVideoState] = useState("idle");
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail);

  useEffect(() => {
    if (!thumbnail) {
      fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]) {
            setThumbnailUrl(data[0].thumbnail_large);
          }
        })
        .catch((error) =>
          console.error("Error fetching Vimeo thumbnail:", error)
        );
    }
  }, [videoId, thumbnail]);

  const handlePlay = () => {
    if (iframeRef.current) {
      setVideoState("loading");

      const newSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;

      const tempIframe = document.createElement("iframe");
      tempIframe.src = newSrc;
      tempIframe.style.display = "none";
      document.body.appendChild(tempIframe);

      tempIframe.onload = () => {
        if (iframeRef.current) {
          iframeRef.current.src = newSrc;

          setTimeout(() => {
            setVideoState("playing");
            document.body.removeChild(tempIframe);
          }, 100);
        }
      };
    }
  };

  return (
    <div
      className="vimeo-lite"
      style={{
        position: "relative",
        width: width,
        maxWidth: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: `${
            (1 / aspectRatio.split(":").reduce((a, b) => a / b)) * 100
          }%`,
        }}
      >
        {/* Thumbnail Layer */}
        {(videoState === "idle" || videoState === "loading") &&
          thumbnailUrl && (
            <div
              className="vimeo-lite-preview group"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
                opacity: videoState === "loading" ? 0.5 : 1,
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={handlePlay}
            >
              {/* Thumbnail Image with Next.js Image */}
              {thumbnailUrl && (
                <Image
                  src={thumbnailUrl}
                  alt={title}
                  fill
                              priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              )}

              {/* YouTube-style Play Button */}
              {videoState === "idle" && (
                <div
                  className={`youtube-play-button  bg-[#212121] opacity-80 group-hover:bg-primary group-hover:opacity-100`}
                  style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10%",
                    transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
                    zIndex: 11,
                    width: "70px",
                    height: "46px",
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
              )}

              {/* Loading Indicator */}
              {videoState === "loading" && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60px",
                    height: "60px",
                    border: "4px solid rgba(255,255,255,0.3)",
                    borderTop: "4px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    zIndex: 11,
                  }}
                />
              )}
            </div>
          )}

        {/* Iframe Layer */}
        <iframe
          ref={iframeRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: videoState === "playing" ? 9 : 1,
          }}
          src=""
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Hover and Interaction Styles */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default VimeoLite;
