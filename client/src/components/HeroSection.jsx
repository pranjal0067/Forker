import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSection = () => {
  const navigate = useNavigate();
  const [popularPosts, setPopularPosts] = useState([]);
  const [post1, setPost1] = useState(null);
  const [post2, setPost2] = useState(null);
  const [post3, setPost3] = useState(null);
  const handleClickPost = (blognum) => {
    console.log("Clicked blog post:", blognum);
    navigate(`/blogs/${blognum}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/popular-posts`
        );
        setPopularPosts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    if (popularPosts.length > 0) {
      setPost1(popularPosts[0]);
      setPost2(popularPosts[1]);
      setPost3(popularPosts[2]);
    }
  }, [popularPosts]);

  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-4 h-[393px] mt-20">
      <div
        onClick={() => handleClickPost(post1?.BlogNumber)}
        className="hover:cursor-pointer"
      >
        <div className="">
          <img
            src={post1?.titleImage}
            alt="titleImage"
            className="rounded-[2rem] h-[233px] w-[475px] mx-auto object-cover"
          />
        </div>
        <div className="mx-auto">
          <div className="mt-3 text-[#fd7a33] font-semibold">
            {post1?.authorName}
          </div>
          <div>{post1?.title}</div>
          <p className="mt-3">{post1?.description}</p>
          <div className="text-[#fd7a33] underline">Read More...</div>
        </div>
      </div>
      <div className="">
        <div
          onClick={() => handleClickPost(post2?.BlogNumber)}
          className="mb-3 hover:cursor-pointer"
        >
          <div className="flex space-x-2">
            <div className="">
              <img
                src={post2?.titleImage}
                alt="titleImage"
                className="rounded-[2rem] h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[#fd7a33] font-semibold">
                {post2?.authorName}
              </div>
              <div className="truncate font-semibold mb-2">{post2?.title}</div>
              <p>{post2?.description}</p>
              <div className="text-[#fd7a33] underline">Read More...</div>
            </div>
          </div>
        </div>
        <div
          href=""
          onClick={() => handleClickPost(post3?.BlogNumber)}
          className="hover:cursor-pointer"
        >
          <div className="flex space-x-2">
            <div>
              <img
                src={post3?.titleImage}
                alt="titleImage"
                className="rounded-[2rem] h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[#fd7a33] font-semibold">
                {post3?.authorName}
              </div>
              <div className="truncate font-semibold mb-2">{post3?.title}</div>
              <p className="">{post3?.description}</p>
              <div className="text-[#fd7a33] underline">Read More...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
