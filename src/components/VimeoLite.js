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
      const newSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;

      // Set iframe src directly
      iframeRef.current.src = newSrc;

      // Update state to playing
      setVideoState("playing");
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
        {videoState === "idle" && thumbnailUrl && (
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
              overflow: "hidden",
            }}
            onClick={handlePlay}
          >
            {/* Thumbnail Image with Next.js Image */}
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  zIndex: 1, // Ensure the image stays under the vignette
                }}
              />
            )}

            {/* Vignette Effect using pseudo-element */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.6) 100%)", // Vignette at corners, clear center
                zIndex: 2, // Ensure vignette is on top of the image
              }}
            ></div>

            {/* YouTube-style Play Button */}
            <div
              className={`youtube-play-button bg-[#212121] opacity-80 group-hover:bg-primary group-hover:opacity-100`}
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
          src={null} // Set initial src to null to avoid the empty string issue
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VimeoLite;
