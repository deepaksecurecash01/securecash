import React from 'react'
import Facade from './Facade';

const VideoSection = () => {
  return (
    <div className="home-video-section">
      <div
        id="video-section"
        className="w-full inline-block  mt-[-1px] relative 1024px:h-[630px] 1024px:max-h-[680px]"
      >
        <div className="black-bar hidden 1024px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0" />
        <Facade />
      </div>
    </div>
  );
}

export default VideoSection