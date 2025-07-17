import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";

import Button from "@enact/sandstone/Button";
import VideoPlayer from "@enact/sandstone/VideoPlayer";
import { MediaControls } from "@enact/sandstone/MediaPlayer";

const TestPage: React.FC = () => {
  const [isSeek] = useState(false);

  const videoPlayer = useRef<any>(null);

  const titleElement = useMemo(() => {
    return <VideoTitle $isSeek={isSeek}>HELLO</VideoTitle>;
  }, [isSeek]);

  const videoPlayerProps = {
    ref: videoPlayer,
    title: titleElement as any,
    titleHideDelay: 0,
    // infoComponents: (
    //   <div slot="infoComponents">
    //     A video about some things happening to and around some characters. Very
    //     exciting stuff.
    //   </div>
    // ),
    poster: "http://media.w3.org/2010/05/sintel/poster.png",
    thumbnailSrc: "http://media.w3.org/2010/05/sintel/poster.png",
    onScrub: (detail: any) => {
      console.log(detail);
    },
  };

  const mediaControlsProps = {
    id: "test",
    jumpBackwardIcon: "jumpbackward",
    jumpForwardIcon: "jumpforward",
    pauseIcon: "pause",
    playIcon: "play",
  };

  return (
    <VideoPlayer {...videoPlayerProps}>
      <source
        src="http://media.w3.org/2010/05/sintel/trailer.mp4"
        type="video/mp4"
      />
      <div slot="infoComponents">
        A video about some things happening to and around some characters. Very
        exciting stuff.
      </div>
      <MediaControls {...mediaControlsProps}>
        <Button icon="list" size="small" />
        <Button icon="playspeed" size="small" />
        <Button icon="speakercenter" size="small" />
        <Button icon="miniplayer" size="small" />
        <Button icon="subtitle" size="small" />
      </MediaControls>
    </VideoPlayer>
  );
};

export default TestPage;

const VideoTitle = styled.div<{ $isSeek: boolean }>`
  opacity: ${({ $isSeek }) => ($isSeek ? 0.5 : 1)};

  will-change: opacity;
`;