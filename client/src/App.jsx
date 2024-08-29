import React,{useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import DiscoverFroker from "./pages/DiscoverFroker.jsx"
import Blogs from "./pages/Blogs.jsx"
import BlogPage from "./pages/BlogPage.jsx"
import NavBar from "./components/NavBar.jsx"
import Footer from './components/Footer.jsx'


const App = () => {
  // Important 
      useEffect(() => {
        const originalTitle = document.title;
        let intervalId = null;

        const handleVisibilityChange = () => {
          if (document.hidden) {
            // Start toggling titles
            let toggle = false;
            intervalId = setInterval(() => {
              document.title = toggle ? "Don't leave us" : "We are still here";
              toggle = !toggle;
            }, 1000); // Toggle every second
          } else {
            // Clear the interval and reset the title
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }
            document.title = originalTitle;
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup the event listener and interval on component unmount
        return () => {
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
        };
      }, []);
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/froker" element={<DiscoverFroker/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blogs/:blogNumber" element={<BlogPage/>} />
      </Routes>
     
      <Footer />
    </div>
  );
}

export default App