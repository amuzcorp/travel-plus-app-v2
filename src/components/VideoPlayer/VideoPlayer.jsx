import PropTypes from "prop-types";
import { useEffect } from "react";

const VideoPlayer = ({ title = "hello" }) => {
  useEffect(() => {
    console.log(title);
  }, [title]);

  return <div>123</div>;
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  title: PropTypes.string,
};
