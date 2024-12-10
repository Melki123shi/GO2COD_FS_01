import { Link } from "react-router-dom";
import HomeImage from "../../assets/blogbg.png";
import BlogList from "../Blogs/PostListPage";

import "./home.css";

const HomePage = () => {
  return (
    <>
      <div className="start">
        <div className="relative flex items-center justify-center h-[90vh] px-6 overflow-hidden w-full lg:px-[200px] -mt-6 pt-40">
        <div className="w-full md:w-[30vw] mb-8 md:mb-0 h-600 basis-4/6 items-center">
            <img
              src={HomeImage}
              alt="Blogging"
              className="rounded-lg md:w-[80vw] lg:w-[19vw] h-auto mx-auto"
            />
          </div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="circle"
            style={{ top: "10%", left: "15%", width: "50px", height: "50px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "25%", left: "70%", width: "90px", height: "90px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "25%", left: "40%", width: "80px", height: "80px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "10%", left: "70%", width: "60px", height: "60px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "20%", left: "50%", width: "40px", height: "40px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "50%", left: "95%", width: "90px", height: "90px" }}
          ></div>
          <div
            className="circle"
            style={{ top: "0%", left: "85%", width: "190px", height: "190px" }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="flex items-center max-w-7xl mx-auto space-x-8 flex-col md:flex-row relative w-full text-white">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-2xl md:text-[4vw] lg:text-[3vw] font-bold w-100  ">
              Welcome to Our Blog Platform!
            </h1>
            <p className="text-sm md:text-lg lg:text-xl">
              Share your thoughts, stories, and ideas with the world. Start your
              own blog today and join a community of passionate writers.
            </p>
   
            <div>
              <Link
                className=" px-14 py-3 text-2lg font-medium rounded-lg transition duration-300 
                bg-white buttonstart border-2 border-teal
                 hover:text-white"
                to="/create-blog"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      
        </div>
      </div>
      
      <div className="h-[100px]">
        <p></p>
      </div>
      <div className="flex justify-center items-center ">
        <BlogList length={10}/>
      </div>
    </>
  );
};

export default HomePage;
