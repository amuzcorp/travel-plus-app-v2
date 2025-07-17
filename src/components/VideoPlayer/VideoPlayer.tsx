import React, { useEffect } from "react";

interface VideoPlayerProps {
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title = "hello" }) => {
  useEffect(() => {
    console.log(title);
  }, [title]);

  return <div>123</div>;
};

export default VideoPlayer;