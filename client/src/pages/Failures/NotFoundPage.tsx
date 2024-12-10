import { Link } from "react-router-dom";
import PageNotFoundImage from "../../assets/404.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen -mt-32">
      <h1 className="text-8xl font-bold text-red-500 font-mono mb-24">404</h1>
      <img src={PageNotFoundImage} alt="page not found" />
      <p className="text-4xl font-bold text-red-500 mt-12 font-mono">Page Not Found</p>
      <Link to='/'>
        <button className="border border-blue-500 rounded-full px-8 py-2 mt-12 hover:bg-blue-500 hover:text-white">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
