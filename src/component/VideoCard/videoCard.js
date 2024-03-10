import React, { useState } from "react";
import VideoLength from "../Shared/videoLength";
import { Link } from "react-router-dom";

const VideoCard = ({ video, currentPage }) => {
  const [isLiked, setIsLiked] = useState(video?.reaction?.voted || false);
  const [likeCount, setLikeCount] = useState(video?.reaction?.count || 0);
  const [commentCount, setCommentCount] = useState(video?.comment?.count || 0);
  const videoTimeInSeconds = 840; // hardcoded, dynamic approach found using flv lib for frontend
  const abbrStyle = {
    cursor: "help",
    textDecoration: "none",
    justifyContent: "start",
  };

  const handleLike = (e) => {
    e.preventDefault(); // Prevent the default behavior of the Link component

    // Toggle like status
    setIsLiked((prevIsLiked) => !prevIsLiked);

    // Update like count
    setLikeCount((prevLikeCount) =>
      isLiked ? prevLikeCount - 1 : prevLikeCount + 1
    );
  };

  const handleComment = (e) => {
    e.preventDefault(); // Prevent the default behavior of the Link component

    // You can add logic for handling comments here if needed
    // For now, let's just increment the comment count
    setCommentCount((prevCommentCount) => prevCommentCount + 1);
  };

  return (
    <Link to={`/video/${video?.postId}?page=${currentPage}`}>
      <div className="flex flex-col mb-8 bg-gray-900 bg-opacity-90 text-white">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden flex items-center justify-center">
          {video?.submission?.thumbnail && (
            <img
              className="h-56 w-half object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              src={video.submission.thumbnail}
              alt="Video Thumbnail"
            />
          )}
          <VideoLength time={videoTimeInSeconds} />
        </div>
        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              {video?.creator?.pic && (
                <img
                  className="h-full w-full object-cover"
                  src={video.creator.pic}
                  alt="Creator's Avatar"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col ml-3 overflow-hidden">
            {video?.submission?.title && (
              <span className="text-sm font-bold line-clamp-2 flex items-center text-white">
                {video.submission.title}
              </span>
            )}
            {video?.creator?.name && (
              <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                {video.creator.name}
              </span>
            )}
            <br />
            <div className="flex text-[12px] font-semibold text-white/[0.7] truncate">
              <abbr title={video?.submission?.description} style={abbrStyle}>
                {video?.submission?.description.substring(0, 100)}
                {video?.submission?.description.length > 100 && "..."}
              </abbr>
            </div>

            <div className="flex mt-2">
              <div
                className="flex text-[14px] font-bold text-white/[0.9] truncate overflow-hidden p-2 cursor-pointer border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
                onClick={handleComment}
              >
                <span>{`${commentCount} 💬 comments`}</span>
              </div>
              <div
                className="flex ml-2 text-[14px] font-bold text-white/[0.9] truncate overflow-hidden p-2 cursor-pointer border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
                onClick={handleLike}
              >
                <span>{`${likeCount} ${isLiked ? "❤️" : "👍"} likes`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
