import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownMenu from "./DropDown";
import { RootState } from "../app/store";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()
  const [activeLink, setActiveLink] = useState(location.pathname.slice(1, location.pathname.length) === "" ? 'Home' :  location.pathname.slice(1, location.pathname.length).split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" "));

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const { currentUser } = useSelector((state: RootState) => state.user.user);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 flex p-4 items-end justify-between w-full bg-white z-50">
      <div className="flex justify-between w-[50] items-end space-x-2">
        <img src={logo} alt="blog logo" className="w-13 h-10" />
        <h3 className="ml-[2px] text-base font-extralight text-blue-800">
          MelkiBlog
        </h3>
      </div>

      <div className="hidden md:flex space-x-10">
        {["Home", "Blogs", "My Blogs", "Create Blog"].map((link, index) => (
          <NavLink
            key={index}
            to={`${
              link.toLowerCase().replace(" ", "-") !== "home"
                ? `/${link.toLowerCase().replace(" ", "-")}`
                : "/"
            }`}
            onClick={() => handleLinkClick(link)}
            className={`relative text-gray-700 font-medium transition duration-800 
            ${
              activeLink === link
                ? "text-blue-700 font-bold"
                : "hover:text-blue-600"
            }`}
          >
            {link}
            <span
              className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-800 rounded-full 
              transition-all duration-200 ${
                activeLink === link ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </NavLink>
        ))}
      </div>

      <div className="flex justify-between md:hidden">
        {currentUser !== null && currentUser !== undefined  && (
            <DropdownMenu />
        )}
        {(currentUser === null || currentUser === undefined) && isOpen && (
          <Link
            to="/auth/signup"
            className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </Link>
        )}
        
        <button
          className="md:hidden flex items-center justify-center text-gray-700 focus:outline-none"
          onClick={toggleNavbar}
        >
          {isOpen ? (
            // Close (X) icon
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            // Hamburger icon
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className="hidden md:flex items-end space-x-4">
        {(currentUser === null || currentUser === undefined) ? (
          <div>
            <Link
              to="/auth/signin"
              className="text-gray-700 hover:text-blue-500 pr-5"
            >
              Sign In
            </Link>
            <Link
              to="/auth/signup"
              className="start hover:bg-white hover:text-blue-500 border hover:border-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </Link>
          </div>
          ) : 
          <DropdownMenu />
        }
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-20 md:hidden">
          <div className="flex flex-col items-start p-4 space-y-2">
            {["Home", "Blogs", "My Blogs", "Create Blog"].map((link, index) => (
              <Link
                key={index}
                to={`${
                  link.toLowerCase().replace(" ", "-") === "home"
                    ? "/"
                    : link.toLowerCase().replace(" ", "-")
                } `}
                className="text-gray-700 hover:text-blue-800 font-medium w-full"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
            <hr />
            <Link
              to="/auth/signin"
              className="text-gray-700 hover:text-blue-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
