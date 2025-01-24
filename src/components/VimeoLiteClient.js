"use client";

import Image from "next/image";

const VimeoLiteClient = ({
  videoId,
  title = "Vimeo Video",
  width = "100%",
  aspectRatio = "16:9",
  thumbnail,
}) => {
  const iframeUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;

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
        {thumbnail && (
          <div
            id={`thumbnail-${videoId}`}
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
            }}
            onClick={() => {
              const iframeElement = document.getElementById(
                `iframe-${videoId}`
              );
              if (iframeElement) {
                iframeElement.style.display = "block"; // Show iframe
                iframeElement.src = iframeUrl; // Load video
              }
              const thumbnailElement = document.getElementById(
                `thumbnail-${videoId}`
              );
              if (thumbnailElement) {
                thumbnailElement.style.display = "none"; // Hide thumbnail
              }
            }}
          >
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority={true}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            {/* Play Button */}
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
          id={`iframe-${videoId}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: 9,
            display: "none", // Initially hidden
          }}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VimeoLiteClient;
