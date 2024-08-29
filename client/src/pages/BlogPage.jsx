import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PopularPosts from "../components/PopularPosts";
import DOMPurify from "dompurify";
import ArrowLogo from "../assets/arrow_wxeel0.jpg";
import LikeNotColoredLogo from "../assets/Artboard_ne0yo2.jpg"
import LikeColoredLogo from "../assets/Page-1_igjnhi.jpg"


const BlogPage = () => {
  // important
  const { blogNumber } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [activeLike, setActiveLike] = useState(false);
  

  useEffect(() => {
    // Check if active like is stored in local storage
    // const storedActiveLike = localStorage.getItem("activeLike");

    // if (storedActiveLike!== null && storedActiveLike !== undefined) {
    //   setActiveLike(JSON.parse(storedActiveLike));
    // }

    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/blog-page?blogNumber=${blogNumber}`
        );
        setBlogData(response?.data?.data); // handled useState() asynchronous nature, TIPS: set the directly from response instead of assigning varibale indirectly
        setLikeCount(response?.data?.data?.like);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogNumber]);

  const handleLike = () => {
    if (activeLike) {
      setLikeCount((prevCount) => prevCount - 1);
      setActiveLike(false);
      axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/liked?blogNumber=${blogNumber}&like=${!activeLike}`
      );
    } else {
      setLikeCount((prevCount) => prevCount + 1);
      setActiveLike(true);
      axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/liked?blogNumber=${blogNumber}&like=${!activeLike}`
      );
    }

    // localStorage.setItem("activeLike", JSON.stringify(!activeLike));
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(blogData.content);

  return (
    <div className="flex flex-col mt-16 max-w-[947px] mx-auto">
      {/* Navigation at the top */}
      <div className="flex items-center text-[#3d3d3d] mb-3 space-x-2">
        <div>Blog</div>
        <img src={ArrowLogo} alt="arrowlogo" className="w-[10px] h-[10px]" />
        <div>{blogData.title}</div>
      </div>
      {/* Article Image */}
      <div className="relative rounded-[2rem]">
        <img
          src={blogData.titleImage}
          alt="article Img"
          className="rounded-[2rem] h-96 w-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-[2rem]"></div>
        <div className="absolute bottom-[7%] left-[2%] uppercase text-white font-bold text-2xl">
          {blogData.title}
        </div>
      </div>
      {/* Author and details */}
      <div className="flex justify-between my-3">
        <div className="text-[#F76f32] font-semibold">
          {blogData.authorName}
        </div>
        <div className="flex items-center space-x-4">
          {activeLike === false ? (
            <img
              src={LikeNotColoredLogo}
              alt="like icon"
              className="w-9 h-9 text-orange-500 hover:cursor-pointer"
              onClick={() => handleLike(likeCount)}
            />
          ) : (
            <img
              src={LikeColoredLogo}
              alt="like icon"
              className="w-9 h-9 text-orange-500 hover:cursor-pointer"
              onClick={() => handleLike(likeCount)}
            />
          )}

          <div className="">{likeCount} Likes</div>
        </div>
      </div>
      {/* Title */}
      <div className="text-[#666] font-bold">{blogData.title}</div>
      {/* Article Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
      {/*TODO:  Popular posts component */}
      <div>
        <PopularPosts />
      </div>
    </div>
  );
};

export default BlogPage;
