import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PopularPosts = () => {
  const navigate = useNavigate();
  const { blogNumber } = useParams();
  const [popularPosts, setPopularPosts] = useState([]);
  const [currPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleClickPost = (blognum) => {
    console.log("Clicked blog post:", blognum);
    navigate(`/blogs/${blognum}`);
    window.scrollTo({ top: 0 });
  };

  const fetchBlogData = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/blogs/popular-pagination?page=${pageNumber}&limit=9`
      );
      setPopularPosts(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const getPrevPage = () => {
    if (currPage > 1) {
      fetchBlogData(currPage - 1);
    }
  };

  const getNextPage = () => {
    if (currPage < totalPages) {
      fetchBlogData(currPage + 1);
    }
  };

  return (
    <div className="flex flex-col mt-14">
      <div className="text-3xl font-semibold text-[#3d3d3d]">Popular Post</div>
      <div className="grid grid-rows-3 grid-flow-col gap-4 pt-10">
        {popularPosts.map((post) => (
          <div
            key={post._id}
            className="boox hover:cursor-pointer"
            onClick={() => handleClickPost(post.BlogNumber)}
          >
            <div className="imagee">
              <img
                src={post.titleImage}
                alt="title Image"
                className="rounded-[2rem]"
              />
            </div>
            <div className="author text-[#fd7a33] font-bold pt-3">
              by {post.authorName} -{" "}
              {moment(post.createdAt).format("D MMMM YYYY")}
            </div>
            <div className="ins mb-2 font-semibold text-[#1a1a1a]">
              {post.title}
            </div>
            <p className="text-[#667085]">{post.description}</p>
            <div className="text-[#fd7a33] underline font-semibold">
              Read More...
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[3rem] space-x-2 flex justify-center">
        <button
          className="border-[1px] border-gray-400 p-1 text-gray-600 rounded-full font-bold"
          onClick={getPrevPage}
          disabled={currPage === 1}
        >
          <NavigateBeforeIcon />
        </button>
        <button className="border-[1px] border-gray-400 px-3 py-1 text-gray-600 rounded-full">
          {currPage}
        </button>
        {currPage < totalPages && (
          <button className="border-[1px] border-gray-400 px-3 py-1 text-gray-600 rounded-full">
            {currPage + 1}
          </button>
        )}
        <button
          className="border-[1px] border-gray-400 p-1 text-gray-600 rounded-full font-bold"
          onClick={getNextPage}
          disabled={currPage === totalPages}
        >
          <NavigateNextIcon />
        </button>
      </div>
    </div>
  );
};

export default PopularPosts;
