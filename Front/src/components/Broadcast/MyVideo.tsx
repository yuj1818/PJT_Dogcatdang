import React, { useRef, useEffect, useState } from "react";
import { StreamManager } from "openvidu-browser";
import styled from "styled-components";

const VideoContainer = styled.div`
  text-align: center;
  max-height: 70vh;
`;

interface VideoProps {
  streamManager: StreamManager;
}

const Video: React.FC<VideoProps> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  let hideControlsTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleFullscreen = () => {
    const video = videoRef.current;

    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const handleMouseEnter = () => {
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    hideControlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds
  };

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <VideoContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video autoPlay={true} ref={videoRef} style={{ width: "100%" }}>
        <track kind="captions" />
      </video>
      {showControls && <button onClick={handleFullscreen}>Full Screen</button>}
    </VideoContainer>
  );
};

export default Video;
