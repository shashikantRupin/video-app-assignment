import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
const VideoDetails = () => {
  const { id } = useParams(); // Video ID
  const [video, setVideo] = useState(null);
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get("page");

  useEffect(() => {
    fetchVideoDetails(id,currentPage);
  }, [id, currentPage]);

  const fetchVideoDetails = async (videoId, currentPage) => {
    try {
      const response = await fetch(`https://internship-service.onrender.com/videos?page=${currentPage}`);
      if (response.ok) {
        const data = await response.json();
        // Find the post with the matching ID
        const videoPost = data.data.posts.find(post => post.postId === videoId);
        console.log(data);

        if (videoPost) {
          setVideo(videoPost);
        } else {
          console.error("Video not found");
        }
      } else {
        console.error("Failed to fetch video details");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Checking if video data is available
  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center bg-black">
      <div className="w-full max-w-screen-lg relative">
        {/* <div className="absolute top-4 left-4 z-10">
          <div className="text-white">
            <i className="fas fa-volume-up"></i>
          </div>
          <div className="text-white mt-2">
            <i className="fas fa-play-circle text-3xl"></i>
          </div>
        </div> */}
        <div className="relative w-full" style={{ paddingTop: "63%" }}>
          {/* Video with border radius */}
          <video
            controls
            className="absolute top-0 left-0 w-full h-full rounded-md"
            src={video.submission.mediaUrl}
            type="video/mp4"
          />
        </div>

        {/* User picture and title positioned above the end of the video */}
        <div className="flex flex-row align-item center absolute bottom-4 left-4 text-white">
          <div className="flex items-center p-2">
            <div className="flex h-10 w-10 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video.creator.pic}
                alt="Author Avatar"
              />
            </div>
            <div className="flex flex-col ml-2">
              {/* Display author information here */}
              <span className="text-[12px] font-semibold">
                {video.creator.name}
              </span>
            </div>
          </div>
          <div className="text-sm md:text-xl line-clamp-2">
            {video.submission.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
