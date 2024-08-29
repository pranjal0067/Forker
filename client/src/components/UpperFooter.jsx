import React from "react";
import ArrowLogo from "../assets/arrow_wxeel0.jpg";
import FrokerLogo from "../assets/frokerLogo.png";
import LocationIcon from "../assets/locationIcon.svg";
import MailIcon from "../assets/mailIcon.svg";
import TwitterLogo from "../assets/twitterLogo.svg";
import LinkedInLogo from "../assets/linkedin.svg";
import FaceBookLogo from "../assets/facebook.svg";
import InstaGramLogo from "../assets/instagram.svg";
import YoutubeLogo from "../assets/youtube.svg";
import QrCode from "../assets/froker-1-3-10_pb9yln.jpg"
import FooterImage from "../assets/OBJECTS_lpey0b.png"

const UpperFooter = () => {
  return (
    <div className="relative mt-16 text-[#3d3d3d]">
      <div className="w-[67%] flex justify-center rounded-lg mx-auto border-[#ababab] border-[1px] p-16 space-x-7">
        {/* TODO: NewsLetter */}
        <img src={FooterImage} alt="footerimage" className="w-[30%]" />
        <div className="space-y-5">
          <div className="text-[#3d3d3d] text-2xl font-semibold">
            Subscribe to our newsletter to get the latest updates and news
          </div>
          <div className="flex justify-center h-[45%]">
            <input
              type="email"
              name="newsletter"
              placeholder="Enter your email"
              className="border-[#ababab] border-[1px] w-[70%] rounded-l-full pl-5 focus:outline-none"
            />
            <button className="bg-[#fe8849] text-white cursor-pointer w-[30%] rounded-r-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly items-center mb-9 pt-[4%]">
        <img src={FrokerLogo} alt="frokerlogo" className="w-[168px] h-[82px]" />
        <div className="space-y-3">
          <h4 className="text-[#F76f32] font-semibold text-2xl">Quicklink</h4>
          <div className="flex items-center">
            <img
              src={ArrowLogo}
              alt="arrow"
              className="w-[12.9px] h-[12.9px]"
            />
            Home
          </div>
          <div className="flex items-center">
            <img
              src={ArrowLogo}
              alt="arrow"
              className="w-[12.9px] h-[12.9px]"
            />
            About US
          </div>
          <div className="flex items-center">
            <img
              src={ArrowLogo}
              alt="arrow"
              className="w-[12.9px] h-[12.9px]"
            />
            Privacy policy
          </div>
          <div className="flex items-center">
            <img
              src={ArrowLogo}
              alt="arrow"
              className="w-[12.9px] h-[12.9px]"
            />
            Terms & Conditions
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-[#F76f32] font-semibold text-2xl">Contacts</h4>
          <div className="flex space-x-3">
            <a
              target="_blank"
              href="https://www.google.com/maps/place/Froker/@12.9556403,77.7202612,15z/data=!4m6!3m5!1s0x3bae13d152fd68ed:0x7427946171c830c1!8m2!3d12.9556403!4d77.7202612!16s%2Fg%2F11stskm2hv?entry=ttu"
            >
              <img src={LocationIcon} alt="locationicon" />
            </a>
            <div>Whitefield, Bengaluru, 560066</div>
          </div>
          <div className="flex space-x-3">
            <a href="mailto:support@froker.in">
              <img src={MailIcon} alt="locationicon" />
            </a>
            <div>support@froker.in</div>
          </div>
          <div className="flex space-x-3">
            <a href="https://twitter.com/FrokerSocial" target="_blank">
              <img src={TwitterLogo} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com/company/froker/" target="_blank">
              <img src={LinkedInLogo} alt="linkedIn" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090044834703&mibextid=YMEMSu"
              target="_blank"
            >
              <img src={FaceBookLogo} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/frokerofficial/" target="_blank">
              <img src={InstaGramLogo} alt="instagram" />
            </a>
            <a href="https://www.youtube.com/@frokerofficial">
              <img src={YoutubeLogo} alt="youtube" />
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-[#F76f32] font-semibold text-2xl">
            Scan To Download
          </h4>
          <img src={QrCode} alt="qrcode" />
        </div>
      </div>
    </div>
  );
};

export default UpperFooter;
