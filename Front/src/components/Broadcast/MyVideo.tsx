import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import { StreamManager } from "openvidu-browser";
import styled from "styled-components";

import { RiFullscreenFill } from "react-icons/ri";
import { AiFillSound } from "react-icons/ai";
import { MdOutlinePictureInPictureAlt } from "react-icons/md";

const VideoContainer = styled.div`
  position: relative;
  text-align: center;
  max-height: 70vh;
  background-color: #121212;
`;

const FullscreenButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0px;
  border: none;
  cursor: pointer;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
  padding: 0 2%;
`;

const GroupComtainer = styled.div`
  display: flex;

  button {
    margin-left: 1rem;
  }
`;

interface VideoProps {
  streamManager: StreamManager;
}

const Video: React.FC<VideoProps> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pipActive, setPipActive] = useState(false);
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

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      console.log(pipActive);
      setPipActive(false);
    } else {
      videoRef.current
        ?.requestPictureInPicture()
        .then(() => {
          setPipActive(true);
        })
        .catch((error) => {
          console.error("Error entering PiP mode:", error);
        });
    }
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
      <video
        autoPlay={true}
        ref={videoRef}
        style={{ height: "100%", width: "100%" }}
      >
        <track kind="captions" />
      </video>
      {showControls && (
        <FullscreenButtonContainer>
          <GroupComtainer>
            <AiFillSound />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </GroupComtainer>
          <GroupComtainer>
            <button onClick={togglePictureInPicture}>
              <MdOutlinePictureInPictureAlt />
            </button>
            <button onClick={handleFullscreen}>
              <RiFullscreenFill />
            </button>
          </GroupComtainer>
        </FullscreenButtonContainer>
      )}
    </VideoContainer>
  );
};

export default Video;
