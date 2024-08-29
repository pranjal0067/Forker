import React from 'react'
import HeroSection from "../components/HeroSection"
import RecentPost from '../components/RecentPost';

const Blogs = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className="mt-16 max-w-[947px] flex flex-col  ">
        <div className="w-[834px] text-center font-semibold mx-auto">
          <div className="text-[2rem] font-semibold text-[#3d3d3d] font-size:clamp(24px,5vw,48px)">
            <span className="text-[#F76f32]">FROKER </span>BLOG
          </div>
          <p className="text-[3rem] text-[#3d3d3d]">
            Articles covering the most recent updates and advancements
          </p>
        </div>
        {/* TODO: Hero Section */}
        <HeroSection/>
        {/* TODO: Recent Post */}
        <RecentPost />
      </div>
    </div>
  );
}

export default Blogs