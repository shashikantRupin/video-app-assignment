import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
  // Convert time (in seconds) to a moment duration
  const videoLength = moment.duration(time, "seconds");

  // Format the duration as H:mm:ss
  const formattedLength = moment.utc(videoLength.asMilliseconds()).format("H:mm:ss");

  return (
    <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {formattedLength}
    </span>
  );
};

export default VideoLength;
