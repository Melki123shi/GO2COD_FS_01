import { Link } from "react-router-dom";
import { Blog } from "../services/types";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

interface Props {
  isOwner?: boolean; 
  onEdit?: () => void; 
  onDelete?: (id: string) => void; 
}

type PostCardProps = Blog & Props;

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userPhoto,
  title,
  image,
  date,
  content,
  id,
  isOwner = false,
  onEdit,
  onDelete,
}) => {
  const displayedcontent =
    content.length > 80 ? `${content.slice(0, 80)}...` : content;

    // console.log(isOwner, "isOwner");

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-[350px] h-[500px] mb-4 relative"
    >
      {/* Blog Image */}
      <div className="relative h-[40%] w-full">
        <img
          src={image}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <img
            src={userPhoto}
            alt={userName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">{userName}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Content */}
        <div
          dangerouslySetInnerHTML={{ __html: displayedcontent }}
          className="text-gray-600 mb-4"
        ></div>

        {/* Read More Link */}
        <Link
          to={`/blogs/${id}`}
          className="text-blue-500 hover:underline font-semibold"
        >
          Read More
        </Link>
      </div>

      {/* Conditional Edit and Delete Icons */}
      {isOwner && (
        <div className="absolute bottom-6 right-2 flex space-x-2">
          <button
            className=" p-2 rounded-full hover:bg-blue-50"
            onClick={(e) => {
              e.preventDefault(); 
              onEdit?.();
              console.log("Edit Clicked");
            }}
          >
            <FaEdit className="text-gray-600" size={20} />
          </button>
          <button
            className=" p-2 rounded-full hover:bg-blue-50"
            onClick={(e) => {
              e.preventDefault(); 
              onDelete?.(id);
              console.log("delete Clicked");

            }}
          >
            <FaTrash className="text-red-600" size={20}/>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
