import { Link } from "react-router-dom";
import NoDataFoundImage from "../assets/noDataFound.png";

const NoDataFound = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center w-[100vw]">
      <img
        src={NoDataFoundImage}
        alt="no data found"
        className="place-self-center mx-auto mt-12"
      />
      <div className="flex flex-row w-full justify-center">
      <p className="text-3xl text-center text-red-500 font-mono mx-6">{message}</p>
      <Link to='/create-blog'>
        <p className="text-2xl text-blue-600 underline">Create post</p>
      </Link>
      </div>
    </div>
  );
};

export default NoDataFound;
