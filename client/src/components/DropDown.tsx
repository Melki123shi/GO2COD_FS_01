import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/user/userSlice";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user.user);

  if (!currentUser) return null;

  return (
    <div className="relative">
      <img
        src={currentUser?.profilePicture}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-1 text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
                navigate("/auth/signin")
              }}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
