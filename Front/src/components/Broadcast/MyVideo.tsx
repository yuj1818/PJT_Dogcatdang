import React, { useRef, useEffect } from "react";
import { StreamManager } from "openvidu-browser";

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
    console.log(streamManager);
  }, [streamManager]);

  return (
    <video autoPlay={autoplay} ref={videoRef} style={{ width: "100%" }}>
      <track kind="captions" />
    </video>
  );
};

export default Video;
