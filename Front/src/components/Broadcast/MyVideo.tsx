import React, { useRef, useEffect } from "react";
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
  const autoplay = true;

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <VideoContainer>
      <video autoPlay={autoplay} ref={videoRef} style={{ width: "100%" }}>
        <track kind="captions" />
      </video>
    </VideoContainer>
  );
};

export default Video;
