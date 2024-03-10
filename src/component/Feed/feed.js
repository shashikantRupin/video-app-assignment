import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../VideoCard/videoCard";

function Feed() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const totalPages = 10; // Total number of pages

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const fetchVideos = (page) => {
    const apiUrl = `https://internship-service.onrender.com/videos?page=${page}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.message === "Success") {
          setVideos(response.data.data.posts);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (page) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <div className="flex-grow h-full overflow-y-auto bg-gray-900 bg-opacity-90">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 ">
        {!videos.length ? (
          <p>Loading...</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.postId}
              className="mb-8  bg-gray-900  text-white  shadow-2xl border-solid rounded p-2  hover:shadow-md transition duration-300 ease-in-out"
            >
              <VideoCard video={video} currentPage={currentPage} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mt-4">
        {/* "Previous" button */}
        <button
          className={`mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out ${
            currentPage === 0 ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Prev
        </button>

        {/* Current Page Button */}
        <button
          className={`mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out`}
          onClick={() => {}}
          disabled
        >
          {currentPage + 1}
        </button>

        {/* "Next" button */}
        <button
          className={`mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out ${
            currentPage === totalPages - 1 ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Feed